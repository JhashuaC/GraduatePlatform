import { getAuthHeaders } from './authHeader';

const BASE_URL = import.meta.env.VITE_API_URL + '/notes';

export const sendNoteByEmail = async (id, note, course_name) => {
  const res = await fetch(`${BASE_URL}/send`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ id, note, course_name }),
  });
  if (!res.ok) throw new Error('Error al enviar nota por correo');
  return await res.json();
};
