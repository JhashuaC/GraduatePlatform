import { useEffect, useState } from "react";
import { getAllCourseGraduatesById } from "../../api/course_graduate.service";
import { useAuth } from "../../context/AuthContext";

export default function Historial() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id_user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const data = await getAllCourseGraduatesById(user.id_user);
      setAssignments(data);
    } catch (error) {
      console.error("Error al cargar historial de cursos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Mi Historial de Talleres</h2>

      {loading && <p>Cargando historial...</p>}

      {assignments.length === 0 && !loading && (
        <p>No tienes talleres registrados.</p>
      )}

      <ul className="space-y-4">
        {assignments.map((a) => (
          <li key={`${a.id_course}-${a.id_graduate}`} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{a.Course.name_course}</h3>
            <p className="text-gray-700">Fecha del taller: {a.Course.date_course}</p>
            <p className="text-gray-700">Modalidad: {a.Course.modality}</p>
            <p className={`mt-2 font-medium ${a.completed ? "text-green-600" : "text-yellow-600"}`}>
              Estado: {a.completed ? "✅ Completado" : "⏳ En proceso"}
            </p>
            {a.completed && (
              <p className="text-sm text-gray-600">
                Fecha de finalización: {new Date(a.completed_at).toLocaleDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
