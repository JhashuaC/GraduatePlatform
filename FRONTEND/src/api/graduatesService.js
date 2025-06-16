const BASE_URL = "http://localhost:3000/api/graduates";

// Headers con token JWT
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Obtener todos los egresados (requiere login)
export async function getGraduates() {
  try {
    const response = await fetch(BASE_URL, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener egresados");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Obtener un egresado por ID (requiere login)
export async function getGraduateById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener egresado");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Crear nuevo egresado (solo admin)
export async function createGraduate(data) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear egresado");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Actualizar egresado (requiere login)
export async function updateGraduate(id, data) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar egresado");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Eliminar egresado (solo admin)
export async function deleteGraduate(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al eliminar egresado");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}


