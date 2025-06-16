import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest } from "../api/auth";

// Crear el contexto
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // Objeto completo del usuario
  const [token, setToken] = useState(null); // JWT
  const [role, setRole] = useState(null);   // Rol del usuario (admin, user, etc.)

  // Restaurar sesión si hay datos en localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("auth"));
    if (stored?.token && stored?.user) {
      setUser(stored.user);
      setToken(stored.token);
      setRole(stored.user.role); // Extraer rol
    }
  }, []);

  // Función para iniciar sesión
  const login = async (credentials) => {
    const { user, token } = await loginRequest(credentials);
    localStorage.setItem("auth", JSON.stringify({ user, token }));
    setUser(user);
    setToken(token);
    setRole(user.role);
  };

  // Función para registrar usuario
  const register = async (data) => {
    const { user, token } = await registerRequest(data);
    localStorage.setItem("auth", JSON.stringify({ user, token }));
    setUser(user);
    setToken(token);
    setRole(user.role);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAdmin: role === "admin", // bandera útil
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto
export const useAuth = () => useContext(AuthContext);
