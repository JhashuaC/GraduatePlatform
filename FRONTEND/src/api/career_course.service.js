//auth.Service.js

import { getAuthHeaders } from './authHeader';

const BASE_URL = 'http://localhost:3000/api/assign-career';

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
  if (!res.ok) throw new Error('Error al remover curso de carrera');
  return await res.json();
};

