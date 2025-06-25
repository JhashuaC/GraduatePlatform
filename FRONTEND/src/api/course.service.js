import { getAuthHeaders } from './authHeader';

const BASE_URL = import.meta.env.VITE_API_URL + '/courses';

export const getAllCourses = async () => {
  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener cursos');
  return await res.json();
};

export const getCourseById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener curso');
  return await res.json();
};

export const createCourse = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear curso');
  return await res.json();
};

export const updateCourse = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar curso');
  return await res.json();
};

export const deleteCourse = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar curso');
  return await res.json();
};
