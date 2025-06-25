import { getAuthHeaders } from './authHeader';

const BASE_URL = import.meta.env.VITE_API_URL + '/emails';

export const getAllEmails = async () => {
  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener historial de correos');
  return await res.json();
};

export const getEmailById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener correo');
  return await res.json();
};

export const createEmail = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear correo');
  return await res.json();
};
