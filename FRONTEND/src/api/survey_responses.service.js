import { getAuthHeaders } from './authHeader';

const BASE_URL = 'http://localhost:3000/api/survey_responses';

export const getAllSurveyResponses = async () => {
  const res = await fetch(BASE_URL, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener respuestas de la encuesta');
  return await res.json();
};

export const getSurveyResponse = async (id_question, id_graduate) => {
  const res = await fetch(`${BASE_URL}/${id_question}/${id_graduate}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener respuesta del graduado');
  return await res.json();
};

export const createSurveyResponse = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al registrar respuesta');
  return await res.json();
};

export const updateSurveyResponse = async (id_question, id_graduate, data) => {
  const res = await fetch(`${BASE_URL}/${id_question}/${id_graduate}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar respuesta');
  return await res.json();
};

export const deleteSurveyResponse = async (id_question, id_graduate) => {
  const res = await fetch(`${BASE_URL}/${id_question}/${id_graduate}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar respuesta');
  return await res.json();
};
