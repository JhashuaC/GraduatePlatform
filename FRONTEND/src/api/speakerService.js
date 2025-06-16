const BASE_URL = "http://localhost:3000/api/speakers";

// Headers con token JWT
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Obtener todos los ponentes (requiere login)
export async function getSpeakers() {
  try {
    const response = await fetch(BASE_URL, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener ponentes");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Obtener un ponente por ID (requiere login)
export async function getSpeakerById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener ponente");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Crear un nuevo ponente (solo admin)
export async function createSpeaker(data) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear ponente");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Actualizar un ponente (requiere login)
export async function updateSpeaker(id, data) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar ponente");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Eliminar un ponente (solo admin)
export async function deleteSpeaker(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al eliminar ponente");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
