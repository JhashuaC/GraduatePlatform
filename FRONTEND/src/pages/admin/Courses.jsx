import { useState, useEffect } from "react";
import { getAllCourses, createCourse, deleteCourse } from "../../api/course.service";
import { getAllSpeakers } from "../../api/speaker.service";

import {
  Trash2Icon,
  CirclePlus,
} from "lucide-react"

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name_course: "",
    description: "",
    date_course: "",
    time_course: "",
    modality: "",
    id_speaker: "",
  });

  useEffect(() => {
    async function fetchData() {
      const [coursesData, speakersData] = await Promise.all([
        getAllCourses(),
        getAllSpeakers(),
      ]);
      setCourses(coursesData);
      setSpeakers(speakersData);
    }
    fetchData();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCourse = await createCourse(formData);
    if (newCourse) {
      setCourses((prev) => [...prev, newCourse]);
      setFormData({
        name_course: "",
        description: "",
        date_course: "",
        time_course: "",
        modality: "",
        id_speaker: "",
      });
      setShowForm(false);
    }
    const updatedCourses = await getAllCourses();
    setCourses(updatedCourses);
  };

  const handleDelete = async (id) => {
    if (await deleteCourse(id)) {
      const updatedCourses = await getAllCourses();
      setCourses(updatedCourses);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-teal-800 mb-6">Gestión de Talleres</h2>

      <div className="text-center mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-800 hover:bg-teal-900 text-white py-2 px-6 rounded shadow-md transition"
        >
          {showForm ? "Ocultar Formulario" : "Agregar Curso"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg p-6 rounded-2xl mb-10 max-w-xl mx-auto space-y-4"
        >
          <input
            name="name_course"
            placeholder="Título del curso"
            value={formData.name_course}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="date"
            name="date_course"
            value={formData.date_course}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="time"
            name="time_course"
            value={formData.time_course}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <select
            name="modality"
            value={formData.modality}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Seleccione modalidad</option>
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
            <option value="Mixto">Mixto</option>
          </select>
          <select
            name="id_speaker"
            value={formData.id_speaker}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Seleccione un facilitador</option>
            {speakers.map((s) => (
              <option key={s.id_speaker} value={s.id_speaker}>
                {s.User.first_name} {s.User.last_name1} – {s.work_phone}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded w-full"
          >
            Guardar Curso
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id_course}
            className="bg-white shadow-md rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-teal-700 mb-2">{c.name_course}</h3>
              <p className="text-gray-700 mb-4">{c.description}</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>📅 Fecha:</strong> {c.date_course}</p>
                <p><strong>⏰ Hora:</strong> {c.time_course}</p>
                <p><strong>🌐 Modalidad:</strong> {c.modality}</p>
                <p><strong>📞 Info al:</strong> {c.Speaker?.work_phone || "N/D"}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(c.id_course)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2 "
            >
             <Trash2Icon className="w-4 h-4" />
                Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
