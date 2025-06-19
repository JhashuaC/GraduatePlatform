import { getAuthHeaders } from './authHeader';

const BASE_URL = 'http://localhost:3000/api/recipients';

export const getRecipientsByEmail = async (id_email) => {
  const res = await fetch(`${BASE_URL}/${id_email}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener destinatarios');
  return await res.json();
};

export const addRecipient = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al agregar destinatario');
  return await res.json();
};

export const removeRecipient = async (id_email, id_graduate) => {
  const res = await fetch(`${BASE_URL}/${id_email}/${id_graduate}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar destinatario');
  return await res.json();
};
