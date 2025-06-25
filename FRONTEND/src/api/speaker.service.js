import { getAuthHeaders } from './authHeader';

const BASE_URL = import.meta.env.VITE_API_URL + '/speakers';

export const getAllSpeakers = async () => {
    const res = await fetch(BASE_URL, {
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al obtener facilitadores');
    return await res.json();
};

export const getSpeakerById = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al obtener facilitador');
    return await res.json();
};

export const createSpeaker = async (data) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear facilitador');
    return await res.json();
};

export const updateSpeaker = async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar facilitador');
    return await res.json();
};

export const deleteSpeaker = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Error al eliminar facilitador');
    return await res.json();
};