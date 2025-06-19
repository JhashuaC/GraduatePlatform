import { getAuthHeaders } from './authHeader';

const BASE_URL = 'http://localhost:3000/api/responses';

export const getAllResponses = async () => {
  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener respuestas');
  return await res.json();
};

export const getResponsesByGraduate = async (id_graduate) => {
  const res = await fetch(`${BASE_URL}/graduate/${id_graduate}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener respuestas del graduado');
  return await res.json();
};

export const submitResponse = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al enviar respuesta');
  return await res.json();
};
