import { getAuthHeaders } from './authHeader';

const BASE_URL = import.meta.env.VITE_API_URL + '/roles';

export const getAllRoles = async () => {
  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener roles');
  return await res.json();
};

export const getRoleById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener rol');
  return await res.json();
};

export const createRole = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear rol');
  return await res.json();
};

export const updateRole = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar rol');
  return await res.json();
};

export const deleteRole = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar rol');
  return await res.json();
};
