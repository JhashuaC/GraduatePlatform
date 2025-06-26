import { useEffect, useState } from "react";
import {
  getAllCourseGraduatesById,
  removeGraduateFromCourse,
} from "../../api/course_graduate.service";
import { useAuth } from "../../context/AuthContext";
import { CalendarDays, Clock, Laptop, BookX } from "lucide-react";

export default function Workshops() {
  const [graduateCourse, setGraduateCourse] = useState([]);
  const [showMoreMap, setShowMoreMap] = useState({});
  const { user } = useAuth();
  const id_graduate = user?.id_user;

  useEffect(() => {
    async function fetchData() {
      if (!id_graduate) return;
      const data = await getAllCourseGraduatesById(id_graduate);
      setGraduateCourse(data);
    }
    fetchData();
  }, [id_graduate]);

  const handleToggleDescription = (id_course) => {
    setShowMoreMap((prev) => ({
      ...prev,
      [id_course]: !prev[id_course],
    }));
  };

  const handleUnenroll = async (id_course) => {
    try {
      await removeGraduateFromCourse(id_course, id_graduate);
      setGraduateCourse((prev) =>
        prev.filter((cg) => cg.id_course !== id_course)
      );
      alert("✅ Desmatriculación exitosa.");
    } catch (error) {
      console.error("Error desmatriculando curso:", error);
      alert("❌ Error al desmatricular el curso.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
        Mis Talleres Inscritos
      </h2>

      {graduateCourse.length === 0 ? (
        <p className="text-center text-gray-500">
          No estás inscrito en ningún taller actualmente.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {graduateCourse.map((gc) => {
            const { id_course, id_graduate, Course } = gc;
            const fullDescription = Course.description || "";
            const isExpanded = showMoreMap[id_course];
            const displayDescription =
              isExpanded || fullDescription.length <= 100
                ? fullDescription
                : fullDescription.slice(0, 100) + "...";

            return (
              <div
                key={`${id_course}-${id_graduate}`}
                className="bg-white shadow-lg rounded-2xl border border-gray-200 p-5 flex flex-col justify-between h-full transition-transform hover:scale-[1.02] duration-300"
              >
                <div>
                  <h3 className="text-2xl font-bold text-blue-800 mb-2 flex items-center gap-2">
                    {Course.name_course}
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm">
                    {displayDescription}
                    {fullDescription.length > 100 && (
                      <button
                        onClick={() => handleToggleDescription(id_course)}
                        className="ml-2 text-blue-600 hover:underline text-xs"
                      >
                        {isExpanded ? "Ver menos" : "Ver más"}
                      </button>
                    )}
                  </p>

                  <div className="text-sm text-gray-600 space-y-2 mb-4">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-blue-500" />
                      <strong>Fecha:</strong> {Course.date_course}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <strong>Hora:</strong> {Course.time_course}
                    </p>
                    <p className="flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-blue-500" />
                      <strong>Modalidad:</strong> {Course.modality}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleUnenroll(id_course)}
                  className="mt-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 justify-center transition-all"
                >
                  <BookX className="w-4 h-4" />
                  Desmatricular
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
