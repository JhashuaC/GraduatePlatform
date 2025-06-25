import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllCourses } from "../../api/course.service";
import { getAllCourseGraduates, updateCompletionStatus } from "../../api/course_graduate.service";
import { sendNoteByEmail } from "../../api/note.service";
import { FaCheckCircle, FaHourglassHalf, FaPaperPlane, FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineEditNote } from "react-icons/md";

export default function MyWorkshops() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState({});

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

  const handleNoteChange = (graduateId, value, courseName) => {
    setNotes(prev => ({
      ...prev,
      [graduateId]: {
        nota: value,
        curso: courseName
      }
    }));
  };

  const handleSendNote = async (graduateId) => {
    const noteData = notes[graduateId];

    if (!noteData || isNaN(noteData.nota) || noteData.nota < 0 || noteData.nota > 100) {
      alert("Por favor, ingrese una nota válida (0-100)");
      return;
    }

    try {
      await sendNoteByEmail(graduateId, {
        note: parseInt(noteData.nota),
        course_name: noteData.curso,
      });

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
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-8">
        <FaChalkboardTeacher className="mx-auto text-5xl text-sky-800 mb-2" />
        <h2 className="text-4xl font-bold text-sky-800">Mis Talleres</h2>
        <p className="text-gray-600">Selecciona un taller para calificar a los graduados.</p>
      </div>

      <select
        value={selectedCourseId}
        onChange={(e) => {
          setSelectedCourseId(e.target.value);
          fetchStudents(e.target.value);
        }}
        className="mb-6 border border-gray-300 p-2 rounded w-full shadow-sm"
      >
        <option value="">📘 Selecciona un taller</option>
        {courses.map((c) => (
          <option key={c.id_course} value={c.id_course}>
            {c.name_course} – {c.date_course}
          </option>
        ))}
      </select>

      {loading && <p className="text-gray-600 text-center">Cargando estudiantes...</p>}

      {students.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-sky-800">Graduados Inscritos</h3>
          <ul className="space-y-6">
            {students.map((s) => {
              const completed = s.completado;
              const userInfo = s.Graduate.User;
              const gradInfo = s.Graduate;

              return (
                <li
                  key={`${s.id_course}-${gradInfo.id_graduate}`}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4"
                >
                  <div className="text-gray-800 space-y-1">
                    <p className="text-lg font-medium">
                      {userInfo.first_name} {userInfo.last_name1}
                    </p>
                    <p className="text-sm">📧 {userInfo.email}</p>
                    <p className="text-sm">📱 {gradInfo.work_phone} | Categoría: {gradInfo.category || "N/A"}</p>
                    <p className="text-sm flex items-center gap-1">
                      {completed ? (
                        <>
                          <FaCheckCircle className="text-green-600" /> <span>Completado</span>
                        </>
                      ) : (
                        <>
                          <FaHourglassHalf className="text-yellow-500" /> <span>Pendiente</span>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-3">
                    <input
                      type="number"
                      placeholder="Nota"
                      value={notes[gradInfo.id_graduate]?.nota || ""}
                      onChange={(e) =>
                        handleNoteChange(gradInfo.id_graduate, e.target.value, s.Course.name_course)
                      }
                      disabled={completed}
                      className="border p-2 rounded w-24 text-center"
                    />
                    <button
                      onClick={() => handleSendNote(gradInfo.id_graduate)}
                      disabled={completed}
                      className={`flex items-center gap-2 px-4 py-2 rounded text-white transition ${
                        completed
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-sky-800 hover:bg-sky-900"
                      }`}
                    >
                      {completed ? "Enviado" : <>
                        <FaPaperPlane /> Enviar Nota
                      </>}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
