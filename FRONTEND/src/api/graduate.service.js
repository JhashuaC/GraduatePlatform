import { getAuthHeaders } from './authHeader';

const BASE_URL = 'http://localhost:3000/api/graduates';

export const getAllGraduates = async() => {
    const res = await fetch(BASE_URL, {
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al obtener graduados');
    return await res.json();
};

export const getGraduateById = async(id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al obtener graduado');
    return await res.json();
};

export const createGraduate = async(data) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear graduado');
    return await res.json();
};

export const updateGraduate = async(id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar graduado');
    return await res.json();
};

export const deleteGraduate = async(id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al eliminar graduado');
    return await res.json();
};