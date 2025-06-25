import { getAuthHeaders } from './authHeader';

const BASE_URL = import.meta.env.VITE_API_URL + '/email_recipients';

export const getAllEmailRecipients = async () => {
  const res = await fetch(BASE_URL, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener destinatarios de correos');
  return await res.json();
};

export const getEmailRecipient = async (id_historial, id_graduate) => {
  const res = await fetch(`${BASE_URL}/${id_historial}/${id_graduate}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener destinatario del historial');
  return await res.json();
};

export const assignRecipientToEmail = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al asignar destinatario al historial');
  return await res.json();
};

export const removeRecipientFromEmail = async (id_historial, id_graduate) => {
  const res = await fetch(`${BASE_URL}/${id_historial}/${id_graduate}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar destinatario del historial');
  return await res.json();
};
