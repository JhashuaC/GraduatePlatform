import { useState, useEffect } from "react";
import { getAllCourses, createCourse, deleteCourse } from "../../api/course.service";
import { getAllSpeakers } from "../../api/speaker.service";

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
  };


  const handleDelete = async (id) => {
    if (await deleteCourse(id)) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-center text-black text-4xl font-bold my-4">TALLERES</h2>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-teal-800 hover:bg-teal-950 text-white py-2 px-4 rounded"
      >
        {showForm ? "Ocultar formulario" : "Agregar Curso"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
          <input
            name="name_course"
            placeholder="Título del curso"
            value={formData.name_course}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            name="date_course"
            value={formData.date_course}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="time"
            name="time_course"
            value={formData.time_course}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <select
            name="modality"
            value={formData.modality}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
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
            className="border p-2 rounded w-full"
          >
            <option value="">Seleccione un facilitador</option>
            {speakers.map((s) => (
              <option key={s.id_speaker} value={s.id_speaker}>
                {s.specialty} Tel: {s.work_phone}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-700 text-white py-2 px-4 rounded"
          >
            Guardar Curso
          </button>
        </form>
      )}

      <ul>
        {courses.map((c) => (
          
             <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-teal-800 mb-2">{c.name_course}</h3>
                <p className="text-2 text-gray-700 mb-4">{c.description}</p>
                <div className="text-2 text-gray-500 space-y-1 mb-3">
                  <p><strong>Fecha:</strong> {c.date_course}</p>
                  <p><strong>Hora:</strong> {c.description}</p>
                  <p><strong>Modalidad:</strong> {c.modality}</p>
                  <button
              onClick={() => handleDelete(c.id_course)}
              className=" bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
                </div>
              </div>
            </div>
      
        ))}
      </ul>
    </div>
  );
}
