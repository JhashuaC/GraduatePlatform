const BASE_URL = "http://localhost:3000/api/courses";

// Encabezados con token JWT
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Obtener todos los cursos (requiere login)
export async function getCourses() {
  try {
    const response = await fetch(BASE_URL, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener cursos");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Obtener un curso por ID (requiere login)
export async function getCourseById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener curso");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Crear un nuevo curso (solo admin)
export async function createCourse(data) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear curso");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Actualizar un curso (requiere login)
export async function updateCourse(id, data) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar curso");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Eliminar un curso (solo admin)
export async function deleteCourse(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al eliminar curso");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
