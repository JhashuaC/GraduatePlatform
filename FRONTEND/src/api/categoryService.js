const BASE_URL = "http://localhost:3000/api/categories";

// Encabezados con token JWT
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Obtener todas las categorías (requiere login)
export async function getCategories() {
  try {
    const response = await fetch(BASE_URL, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener categorías");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Obtener una categoría por ID (requiere login)
export async function getCategoryById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener categoría");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Crear una nueva categoría (solo admin)
export async function createCategory(data) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear categoría");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Actualizar una categoría (requiere login)
export async function updateCategory(id, data) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar categoría");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Eliminar una categoría (solo admin)
export async function deleteCategory(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al eliminar categoría");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
