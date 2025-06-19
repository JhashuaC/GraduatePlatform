// src/api/authService.js
const API_URL = 'http://localhost:3000/api';   

const defaultHeaders = { 'Content-Type': 'application/json' };

export const loginRequest = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('Credenciales inválidas');
  return res.json();          
};

export const registerRequest = async (data) => {
  const res = await fetch(`http://localhost:3000/api/user`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('No se pudo registrar');
  return res.json();          
};

export const getAuthHeaders = () => {
  const raw = localStorage.getItem('auth');
  let token = null;
  try {
    token = raw ? JSON.parse(raw).token : null;
  } catch { /* nada */ }

  return {
    ...defaultHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
