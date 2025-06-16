// src/api/fetchWithAuth.js
import { useAuth } from "../context/AuthContext";

export function useAuthFetch() {
  const { token, logout } = useAuth();

  return async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) logout(); // token expirado
    return res;
  };
}
