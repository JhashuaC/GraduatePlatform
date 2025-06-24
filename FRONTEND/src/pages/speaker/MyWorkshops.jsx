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
  const [notes, setNotes] = useState({}); // Para almacenar la nota por estudiante

  useEffect(() => {
    if (user?.id_user) fetchCourses();
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
      const allAssignments = await getAllCourseGraduates();
      const filtered = allAssignments.filter(a => a.id_course == courseId);
      setStudents(filtered);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleNoteChange = (graduateId, value) => {
    setNotes(prev => ({ ...prev, [graduateId]: value }));
  };

  const handleSendNote = async (graduateId) => {
    const nota = notes[graduateId];
    if (!nota || isNaN(nota) || nota < 0 || nota > 100) {
      alert("Por favor, ingrese una nota válida (0-100)");
      return;
    }

    try {
      await sendNoteByEmail(graduateId, parseInt(nota));
      await updateCompletionStatus(selectedCourseId, graduateId, {
        completed: true,
        completed_at: new Date().toISOString(),
      });
      alert("Nota enviada y marcado como completado");
      fetchStudents(selectedCourseId);
    } catch (error) {
      console.error(error);
      alert("Error al enviar nota o marcar como completado");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Mis Talleres</h2>
      <p className="mb-4">
        Selecciona un taller para ver los graduados inscritos y enviar sus notas.
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
            {c.name_course} - Fecha: {c.date_course}
          </option>
        ))}
      </select>

      {loading && <p>Cargando estudiantes...</p>}

      {students.length > 0 && (
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-xl font-semibold mb-4 text-teal-800">Graduados Inscritos</h3>
          <ul className="space-y-3">
            {students.map((s) => (
              <li
                key={`${s.id_course}-${s.Graduate.id_graduate}`}

                className="flex justify-between items-center border-b py-2"
              >

                <div>
                  <strong>{s.Graduate.User.first_name} {s.Graduate.User.last_name1}</strong> - {s.Graduate.User.email}
                  <br />
                  Teléfono: {s.Graduate.work_phone} | Categoría: {s.Graduate.category || "N/A"}
                  <br />
                  Estado: {s.completado ? "✅ Completado" : "⏳ Pendiente"}
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    placeholder="Nota"
                    value={notes[s.Graduate.id_graduate] || ""}
                    onChange={(e) => handleNoteChange(s.Graduate.id_graduate, e.target.value)}
                    disabled={s.completado}
                    className="border p-1 rounded w-20"
                  />
                  <button
                    onClick={() => handleSendNote(s.Graduate.id_graduate)}
                    disabled={s.completado}
                    className={`${s.completado ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
                      } text-white px-3 py-1 rounded`}
                  >
                    {s.completado ? "Enviado" : "Enviar Nota"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
