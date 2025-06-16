const BASE_URL = "http://localhost:3000/api/careers";

// Encabezados con token JWT
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Obtener todas las carreras (público)
export async function getCareers() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Error al obtener carreras");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Obtener carrera por ID (requiere login)
export async function getCareerById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener carrera");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Crear nueva carrera (solo admin)
export async function createCareer(data) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear carrera");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Actualizar carrera (requiere login)
export async function updateCareer(id, data) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar carrera");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Eliminar carrera (solo admin)
export async function deleteCareer(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al eliminar carrera");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
