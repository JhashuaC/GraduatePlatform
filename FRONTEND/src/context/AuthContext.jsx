// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { loginRequest, registerRequest } from '../api/auth.Service'; // ← corrige el nombre si lo tenías mal

const AuthContext = createContext();
const STORAGE_KEY = 'auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Restaurar sesión desde localStorage */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const { token: t, user: u } = JSON.parse(raw);
        if (t && u) {
          setToken(t);
          setUser(u);
          setRole(u.role); // ← esto solo sirve si `role` ya viene dentro del user
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY); // JSON corrupto
      }
    }
    setLoading(false);
  }, []);

  /* Guardar sesión después de login o registro */
  const saveSession = ({ token: t, User: u, Role: r }) => {
    const { password, ...safeUser } = u;

    // Asegurarnos de guardar el rol dentro del objeto user
    const userWithRole = { ...safeUser, role: r };

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      user: userWithRole,
      token: t,
    }));

    setUser(userWithRole);
    setToken(t);
    setRole(r);
  };

  const clearSession = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setToken(null);
    setRole(null);
  };

  const login = async (credentials) => {
    const session = await loginRequest(credentials);
    saveSession(session);
  };

  const register = async (data) => {
    const session = await registerRequest(data);
    saveSession(session);
  };

  const logout = clearSession;

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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
