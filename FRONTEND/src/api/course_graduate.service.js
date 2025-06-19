import { getAuthHeaders } from './authHeader';

const BASE_URL = 'http://localhost:3000/api/assignments';

export const assignGraduateToCourse = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al asignar graduado al curso');
  return await res.json();
};

export const updateCompletionStatus = async (id_course, id_graduate, data) => {
  const res = await fetch(`${BASE_URL}/${id_course}/${id_graduate}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar estado de finalización');
  return await res.json();
};

export const removeGraduateFromCourse = async (id_course, id_graduate) => {
  const res = await fetch(`${BASE_URL}/${id_course}/${id_graduate}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al remover graduado del curso');
  return await res.json();
};
