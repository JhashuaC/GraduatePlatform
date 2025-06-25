import { useEffect, useState } from "react";
import { getAllCourseGraduatesById, removeGraduateFromCourse } from '../../api/course_graduate.service';
import { useAuth } from "../../context/AuthContext";

export default function Workshops() {
  const [graduateCourse, setGraduateCourse] = useState([]);
  const { user } = useAuth();
  const id_graduate = user?.id_user; // id_user === id_graduate

  useEffect(() => {
    async function fetchData() {
      if (!id_graduate) return;
      const data = await getAllCourseGraduatesById(id_graduate);
      setGraduateCourse(data);
    }
    fetchData();
  }, [id_graduate]);

  const handleUnenroll = async (id_course) => {
    try {
      await removeGraduateFromCourse(id_course, id_graduate);
      // Actualizar el estado local para remover el curso sin recargar
      setGraduateCourse(prev => prev.filter(cg => cg.id_course !== id_course));
      alert("Desmatriculación exitosa");
    } catch (error) {
      console.error("Error desmatriculando curso:", error);
      alert("Error al desmatricular el curso");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Mis Talleres</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {graduateCourse.map((graduateCourse) => (
          <div key={`${graduateCourse.id_course}-${graduateCourse.id_graduate}`} className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-semibold text-blue-700 mb-2">{graduateCourse.Course.course_name}</h3>
              <p className="text-gray-700 mb-3">{graduateCourse.Course.description}</p>
              <div className="text-sm text-gray-500 space-y-1 mb-3">
                <p><strong>Fecha:</strong> {graduateCourse.Course.date_course}</p>
                <p><strong>Hora:</strong> {graduateCourse.Course.time_course}</p>
                <p><strong>Modalidad:</strong> {graduateCourse.Course.modality}</p>
              </div>
            </div>

            <button
              onClick={() => handleUnenroll(graduateCourse.id_course)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Desmatricular
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
