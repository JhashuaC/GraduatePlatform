const BASE_URL = "http://localhost:3000/api/course-speakers"; // Ajusta si el endpoint usa otro prefijo

// Headers con token JWT
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Asignar ponente a curso (solo admin)
export async function assignSpeakerToCourse(data) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al asignar ponente al curso");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Obtener todas las asignaciones (requiere login)
export async function getAllCourseSpeakerAssignments() {
  try {
    const response = await fetch(BASE_URL, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener asignaciones de ponentes");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// Obtener una asignación específica (requiere login)
export async function getCourseSpeakerAssignment(courseId, speakerId) {
  try {
    const response = await fetch(`${BASE_URL}/${courseId}/${speakerId}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener asignación");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Eliminar una asignación (solo admin)
export async function removeSpeakerFromCourse(courseId, speakerId) {
  try {
    const response = await fetch(`${BASE_URL}/${courseId}/${speakerId}`, {
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
