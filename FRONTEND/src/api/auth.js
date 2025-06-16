// src/api/auth.js
const API = "http://localhost:3000/api";

export async function loginRequest(credentials) {
  const res = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const { message } = await res.json().catch(() => ({}));
    throw new Error(message || "Error al iniciar sesión");
  }

  const { token, user, role } = await res.json();

  return { user: { ...user, role }, token };
}

export async function registerRequest(data) {
  const res = await fetch(`${API}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const { message } = await res.json().catch(() => ({}));
    throw new Error(message || "Error al registrarse");
  }
  // Auto‑login tras registrar
  return loginRequest({ email: data.email, password: data.password });
}
