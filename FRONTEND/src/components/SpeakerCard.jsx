import React from "react";
import { User, BookOpen, Phone, Mail } from "lucide-react";

export default function SpeakerCard({ speakers, onDelete }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden max-w-sm mx-auto shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="relative">
        <img
          src={`https://randomuser.me/api/portraits/men/${speakers.id_speaker}.jpg`}
          alt={`${speakers.User.first_name} ${speakers.User.last_name1}`}
          className="w-full h-52 object-cover rounded-t-2xl"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <User size={16} /> Facilitador
        </div>
      </div>

      <div className="p-5 flex flex-col">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2 truncate">
          {speakers.User.first_name} {speakers.User.last_name1}
        </h2>

        <div className="space-y-2 text-gray-700 text-sm flex-grow">
          <p className="flex items-center gap-2">
            <BookOpen size={16} className="text-teal-600" />
            <span><strong>Especialidad:</strong> {speakers.specialty}</span>
          </p>

          <p className="flex items-center gap-2">
            <Phone size={16} className="text-teal-600" />
            <span><strong>Teléfono:</strong> {speakers.work_phone}</span>
          </p>

          <p className="flex items-center gap-2 text-teal-700 font-medium truncate">
            <Mail size={16} />
            <span>{speakers.User.email}</span>
          </p>
        </div>

        {/* Barra de progreso opcional */}
        <div className="mt-4">
          <div className="text-xs font-semibold text-gray-500 mb-1">Calificación</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${speakers.progress || 60}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={onDelete}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-2xl shadow-md transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-offset-2"
          aria-label={`Eliminar ${speakers.User.first_name}`}
          title={`Eliminar ${speakers.User.first_name}`}
          type="button"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
