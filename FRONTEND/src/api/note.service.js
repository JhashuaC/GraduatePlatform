import { getAuthHeaders } from './authHeader';

const BASE_URL = 'http://localhost:3000/api/notes';

export const sendNoteByEmail = async (id, note) => {
  const res = await fetch(`${BASE_URL}/send`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ id, note }),
  });
  if (!res.ok) throw new Error('Error al enviar nota por correo');
  return await res.json();
};
