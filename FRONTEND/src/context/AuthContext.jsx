// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { loginRequest, registerRequest } from '../api/auth.Service';

const AuthContext  = createContext();
const STORAGE_KEY  = 'auth';

export const AuthProvider = ({ children }) => {

  /* ---------- Estado ---------- */
  const [user,  setUser]  = useState(null);
  const [token, setToken] = useState(null);
  const [role,  setRole]  = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- Restaurar sesión ---------- */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const { token: t, user: u } = JSON.parse(raw);
        if (t && u) {
          setToken(t);
          setUser(u);
          setRole(u.role);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);   // JSON corrupto
      }
    }
    setLoading(false);
  }, []);

  /* ---------- Helpers ---------- */
  const saveSession = ({ token: t, User: u, Role: r }) => {
    // Nunca guardes el password
    const { password, ...safeUser } = u;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: safeUser, token: t }));
    setToken(t);
    setUser(safeUser);
    setRole(r || safeUser.role);     // pref de back o del propio user
  };

  const clearSession = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setToken(null);
    setRole(null);
  };

  /* ---------- Acciones ---------- */
  const login    = async (credentials) => saveSession(await loginRequest(credentials));
  const register = async (data)        => saveSession(await registerRequest(data));
  const logout   = clearSession;

  /* ---------- Context Value ---------- */
  const value = {
    user,
    token,
    role,
    isAuthenticated: !!token,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* Hook de conveniencia */
export const useAuth = () => useContext(AuthContext);
