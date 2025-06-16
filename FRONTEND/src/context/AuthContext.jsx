// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest } from "../api/auth";

const AuthContext = createContext();
const STORAGE_KEY = "auth";

export const AuthProvider = ({ children }) => {
  /* ---------- Estados ---------- */
  const [user,  setUser]  = useState(null);
  const [token, setToken] = useState(null);
  const [role,  setRole]  = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- Restaurar sesión ---------- */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.token && parsed?.user) {
          setUser(parsed.user);
          setToken(parsed.token);
          setRole(parsed.user.role);
        }
      } catch {
        // JSON corrupto -> limpiar
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  /* ---------- Helpers ---------- */
  const saveSession = (userObj, tokenValue) => {
    // Nunca guardes password
    const { password, ...safeUser } = userObj;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: safeUser, token: tokenValue }));
    setUser(safeUser);
    setToken(tokenValue);
    setRole(safeUser.role);
  };

  const clearSession = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setToken(null);
    setRole(null);
  };

  /* ---------- Login ---------- */
  const login = async (credentials) => {
    try {
      const { user: userObj, token: tokenValue } = await loginRequest(credentials);
      saveSession(userObj, tokenValue);
    } catch (err) {
      clearSession();
      throw err; // para que el componente de Login lo capture
    }
  };

  /* ---------- Registro ---------- */
  const register = async (data) => {
    try {
      const { user: userObj, token: tokenValue } = await registerRequest(data);
      saveSession(userObj, tokenValue);
    } catch (err) {
      clearSession();
      throw err;
    }
  };

  /* ---------- Logout ---------- */
  const logout = clearSession;

  /* ---------- Valor del contexto ---------- */
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
