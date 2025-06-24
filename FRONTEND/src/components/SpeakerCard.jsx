// src/components/SpeakerCard.jsx
import React from 'react';

export default function SpeakerCard({ speakers, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-sm mx-auto transition transform hover:scale-105 hover:shadow-xl">
      <img
        src={`https://randomuser.me/api/portraits/men/${speakers.id_speaker}.jpg` }
        alt={speakers.User.first_name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{speakers.User.first_name} {speakers.User.last_name1}</h2>
        <p className="text-gray-600 mt-2"><strong> ID:</strong> {speakers.User.identity_number}</p>
        <p className="text-gray-600 mt-2"><strong>Especialidad:</strong> {speakers.specialty}</p>
        <p className="text-gray-600 mt-2"><strong>Tel:</strong> {speakers.work_phone}</p>
        <p className="text-blue-500 mt-2">{speakers.User.email}</p>
         <button
               onClick={onDelete}
              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
      </div>
    </div>
  );
}
