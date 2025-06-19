import { getAuthHeaders } from './authHeader';

const BASE_URL = 'http://localhost:3000/api/course-categories';

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
  if (!res.ok) throw new Error('Error al remover categoría del curso');
  return await res.json();
};
