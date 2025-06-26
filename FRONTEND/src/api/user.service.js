import { getAuthHeaders } from './authHeader';

const BASE_URL = import.meta.env.VITE_API_URL + '/users';

export const getAllUsers = async () => {
  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return await res.json();
};

export const getUserById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener usuario');
  return await res.json();
};

export const createUser = async (data) => {
  console.log(data);
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear usuario');
  return await res.json();
};

export const updateUser = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar usuario');
  return await res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const errorText = await res.text(); // para depurar el error del servidor
    console.error("Error al eliminar:", res.status, errorText);
    throw new Error('Error al eliminar usuario');
  }

  // Solo intenta leer el body si el status no es 204
  if (res.status !== 204) {
    return await res.json();
  }

  return true; // si fue exitoso y no hay contenido
};
