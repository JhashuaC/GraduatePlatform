// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import GraduatedCard from '../components/GraduatedCard';
import { getGraduates } from '../api/graduates';
import Navbar from "../components/Navbar";

export default function Home() {
  const [graduados, setGraduados] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      const datos = await getGraduates();
      setGraduados(datos);
      setLoading(false);
    }
    cargarDatos();
  }, []);

  const graduadosFiltrados = graduados.filter(g =>
    g.name.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="pt-20 min-h-screen flex flex-col justify-start items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-10">
      <Navbar />
      <h1 className="text-4xl font-bold text-white text-center mb-10 drop-shadow-lg">
        Lista de Graduados
      </h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="p-3 rounded-lg w-80 shadow-md outline-none focus:ring-2 focus:ring-white text-gray-800"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {graduadosFiltrados.length > 0 ? (
            graduadosFiltrados.map(graduado => (
              <GraduatedCard key={graduado.id_graduate} graduado={graduado} />
            ))
          ) : (
            <p className="text-center text-white text-xl">No se encontraron graduados.</p>
          )}
        </div>
      )}
    </div>
  );
}
