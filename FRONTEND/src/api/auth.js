

export async function loginRequest({ email, password }) {
  const res = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Error al iniciar sesión");
  const { token } = await res.json();

  // Obtener datos del usuario (opcional)
  const userRes = await fetch("http://localhost:3000/api/users/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const user = await userRes.json();

  return { user, token };
}

export async function registerRequest(data) {
  const res = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Error al registrarse");
  const user = await res.json();

  // También iniciar sesión luego del registro
  return loginRequest({ email: data.email, password: data.password });
}
