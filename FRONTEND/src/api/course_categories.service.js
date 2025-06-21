import { getAuthHeaders } from './authHeader';

const BASE_URL = 'http://localhost:3000/api/course_categories';

export const getAllCourseCategories = async () => {
  const res = await fetch(BASE_URL, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener categorías de cursos');
  return await res.json();
};

export const getCourseCategory = async (id_course, id_option) => {
  const res = await fetch(`${BASE_URL}/${id_course}/${id_option}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener la categoría del curso');
  return await res.json();
};

export const assignCategoryToCourse = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al asignar categoría al curso');
  return await res.json();
};

export const removeCategoryFromCourse = async (id_course, id_option) => {
  const res = await fetch(`${BASE_URL}/${id_course}/${id_option}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar categoría del curso');
  return await res.json();
};
