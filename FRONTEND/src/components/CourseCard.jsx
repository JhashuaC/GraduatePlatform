import {
  CalendarDays,
  Clock,
  Laptop,
  Users,
  BookOpen,
  CheckCircle,
} from "lucide-react";

import { useState } from "react";

export default function CourseCard({
  name,
  description,
  date,
  time,
  modality,
  onRegister,
}) {
  const [showMore, setShowMore] = useState(false);

  const displayDescription = showMore
    ? description
    : description.length > 100
    ? description.slice(0, 100) + "..."
    : description;

  return (
    <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-5 flex flex-col justify-between h-full transition-transform hover:scale-[1.02] duration-300">
      <div>
        <h3 className="text-2xl font-bold text-blue-800 mb-2 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          {name}
        </h3>

        <p className="text-gray-700 mb-3 text-sm">
          {displayDescription}
          {description.length > 100 && (
            <button
              onClick={() => setShowMore((prev) => !prev)}
              className="ml-2 text-blue-600 hover:underline text-xs"
            >
              {showMore ? "Ver menos" : "Ver más"}
            </button>
          )}
        </p>

        <div className="text-sm text-gray-600 space-y-2 mb-4">
          <p className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-blue-500" />
            <strong>Fecha:</strong> {date}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <strong>Hora:</strong> {time}
          </p>
          <p className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-blue-500" />
            <strong>Modalidad:</strong> {modality}
          </p>
        </div>
      </div>

      <button
        onClick={onRegister}
        className="w-full mt-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 shadow hover:shadow-lg flex items-center justify-center gap-2"
      >
        <CheckCircle className="w-4 h-4" />
        Inscribirme
      </button>
    </div>
  );
}
