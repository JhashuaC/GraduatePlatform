const BASE_URL = "http://localhost:3000/api/assignments";

// Obtener token y headers con autenticación
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Asignar egresado a curso (solo admin)
export async function assignGraduateToCourse(data) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al asignar egresado al curso");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Obtener todas las asignaciones (requiere login)
export async function getAllAssignments() {
  try {
    const response = await fetch(BASE_URL, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener asignaciones");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Obtener asignación específica (requiere login)
export async function getAssignment(courseId, graduateId) {
  try {
    const response = await fetch(`${BASE_URL}/${courseId}/${graduateId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener asignación");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Eliminar asignación (solo admin)
export async function removeGraduateFromCourse(courseId, graduateId) {
  try {
    const response = await fetch(`${BASE_URL}/${courseId}/${graduateId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al eliminar asignación");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
