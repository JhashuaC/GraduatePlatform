import { getAuthHeaders } from './authHeader';

const BASE_URL = import.meta.env.VITE_API_URL + '/graduate-preferences';

export const getAllGraduatePreferences = async () => {
  const res = await fetch(BASE_URL, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener preferencias de graduados');
  return await res.json();
};

export const getAllGraduatePreferencesById = async (id_graduate) => {
  const res = await fetch(`${BASE_URL}/byID/${id_graduate}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener preferencias de graduados');
  return await res.json();
};


export const getGraduatePreference = async (id_graduate, id_option) => {
  const res = await fetch(`${BASE_URL}/${id_graduate}/${id_option}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Error al obtener la preferencia del graduado');
  return await res.json();
};

export const assignPreferenceToGraduate = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al asignar preferencia al graduado');
  return await res.json();
};

export const removePreferenceFromGraduate = async (id_graduate, id_option) => {
  const res = await fetch(`${BASE_URL}/${id_graduate}/${id_option}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar preferencia del graduado');
  return await res.json();
};
