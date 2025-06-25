import React from "react";
import { GraduationCap, Calendar, Mail, IdCard, BookOpen } from "lucide-react";

export default function GraduatedCard({ graduado }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden max-w-sm mx-auto shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="relative">
        <img
          src={`https://randomuser.me/api/portraits/men/${graduado.id_graduate}.jpg`}
          alt={`${graduado.User.first_name} ${graduado.User.last_name1}`}
          className="w-full h-52 object-cover rounded-t-2xl"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <GraduationCap size={16} /> Graduado
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2 truncate">
          {graduado.User.first_name} {graduado.User.last_name1}
        </h2>

        <div className="space-y-2 text-gray-700 text-sm">
          <p className="flex items-center gap-2">
            <IdCard size={16} className="text-blue-600" />
            <span><strong>ID:</strong> {graduado.User.identity_number}</span>
          </p>

          <p className="flex items-center gap-2">
            <BookOpen size={16} className="text-blue-600" />
            <span><strong>Carrera:</strong> {graduado.Career.name}</span>
          </p>

          <p className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-600" />
            <span><strong>Año de Graduación:</strong> {graduado.graduation_year}</span>
          </p>

          <p className="flex items-center gap-2 text-blue-700 font-medium truncate">
            <Mail size={16} />
            <span>{graduado.User.email}</span>
          </p>
        </div>

        {/* Barra para el progeso pero es extra */}
        <div className="mt-4">
          <div className="text-xs font-semibold text-gray-500 mb-1">Progreso en Talleres</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${graduado.progress || 70}%` }} 
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
