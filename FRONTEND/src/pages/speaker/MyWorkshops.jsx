import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllCourses } from "../../api/course.service";
import { getAllCourseGraduates, updateCompletionStatus } from "../../api/course_graduate.service";
import { sendNoteByEmail } from "../../api/note.service";

export default function MyWorkshops() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar todos los cursos y filtrar por facilitador
  useEffect(() => {
    if (user?.id_user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const allCourses = await getAllCourses();
      const myCourses = allCourses.filter(c => c.id_speaker === user.id_user);
      setCourses(myCourses);
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  const fetchStudents = async (courseId) => {
    setLoading(true);
    try {
      const data = await getAllCourseGraduates(courseId);
      setStudents(data);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendCertificate = async (graduateId) => {
    try {
      await sendNoteByEmail(selectedCourseId, graduateId);
      await updateCompletionStatus(selectedCourseId, graduateId); // Marca como completado
      alert("Certificado enviado y marcado como completado");
      fetchStudents(selectedCourseId); // Refrescar lista
    } catch (error) {
      console.error(error);
      alert("Error al enviar certificado o marcar completado");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Mis Talleres</h2>
      <p className="mb-4">
        Selecciona uno de los talleres para ver los graduados inscritos.
      </p>

      <select
        value={selectedCourseId}
        onChange={(e) => {
          setSelectedCourseId(e.target.value);
          fetchStudents(e.target.value);
        }}
        className="mb-6 border p-2 rounded w-full"
      >
        <option value="">Selecciona un taller</option>
        {courses.map((c) => (
          <option key={c.id_course} value={c.id_course}>
            {c.name_course} - Fecha: ({c.date_course})
          </option>
        ))}
      </select>

      {loading && <p>Cargando estudiantes...</p>}

      {students.length > 0 && (
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-xl font-semibold mb-4 text-teal-800">Graduados Inscritos</h3>
          <ul className="space-y-3">
            {students.map((s) => (
              <li key={s.Graduate.id_graduate} className="flex justify-between items-center border-b py-2">
                <span>
                  {s.Graduate.id_graduate} 
                  <br />
                Categoría: {s.Graduate.category || "N/A"}
                  <br />
                  Estado: {s.completado ? "✅ Completado" : "⏳ Pendiente"}
                </span>
                <button
                  onClick={() => handleSendCertificate(s.Graduate.id_graduate)}
                  disabled={s.completado}
                  className={`${
                    s.completado ? "bg-gray-400" : "bg-green-700 hover:bg-green-800"
                  } text-white px-3 py-1 rounded`}
                >
                  {s.completado ? "Enviado" : "Enviar Certificado"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
