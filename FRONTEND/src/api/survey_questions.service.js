import { getAuthHeaders } from './authHeader';

const BASE_URL = import.meta.env.VITE_API_URL + '/questions';

export const getAllQuestions = async () => {
  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener preguntas');
  return await res.json();
};

export const getQuestionById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener pregunta');
  return await res.json();
};

export const createQuestion = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear pregunta');
  return await res.json();
};

export const updateQuestion = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar pregunta');
  return await res.json();
};

export const deleteQuestion = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar pregunta');
  return await res.json();
};
