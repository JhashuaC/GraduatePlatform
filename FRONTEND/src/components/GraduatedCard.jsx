// src/components/GraduadoCard.jsx
import React from 'react';

export default function GraduatedCard({ graduado }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-sm mx-auto transition transform hover:scale-105 hover:shadow-xl">
      <img
        src={`https://randomuser.me/api/portraits/men/${graduado.id_graduate}.jpg` }
        alt={graduado.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{graduado.User.first_name} {graduado.User.last_name1}</h2>
        <p className="text-black mt-2"> ID: {graduado.User.identity_number}</p>
        <p className="text-gray-600 mt-2"> <strong>Carrera: </strong>{graduado.Career.name}</p>
        <p className="text-gray-600 mt-2"><strong>Año de Graduacion: </strong>{graduado.graduation_year}</p>
        <p className="text-blue-500 mt-2">{graduado.User.email}</p>
      </div>
    </div>
  );
}
