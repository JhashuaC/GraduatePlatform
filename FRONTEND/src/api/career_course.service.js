import { getAuthHeaders } from './authHeader';

const BASE_URL = 'http://localhost:3000/api/career_course';

export const getAllCareerCourses = async () => {
  const res = await fetch(BASE_URL, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener relaciones carrera-curso');
  return await res.json();
};

export const getCareerCourse = async (id_career, id_course) => {
  const res = await fetch(`${BASE_URL}/${id_career}/${id_course}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener la relación carrera-curso');
  return await res.json();
};

export const assignCourseToCareer = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al asignar curso a carrera');
  return await res.json();
};

export const removeCourseFromCareer = async (id_career, id_course) => {
  const res = await fetch(`${BASE_URL}/${id_career}/${id_course}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar curso de la carrera');
  return await res.json();
};
