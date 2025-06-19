import { useState, useEffect } from "react";
import { getAllCourses, deleteCourse } from "../../api/course.service";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });

  useEffect(() => {
    async function fetchData() {
      const data = await getAllCourses();
      setCourses(data);
    }
    fetchData();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCourse = await addCourse(formData);
    if (newCourse) {
      setCourses((prev) => [...prev, newCourse]);
      setFormData({ title: "", description: "" });
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
      <h2 className="text-3xl mb-6">Cursos</h2>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-600 text-white py-2 px-4 rounded"
      >
        {showForm ? "Ocultar formulario" : "Agregar Curso"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
          <input
            name="title"
            placeholder="Título"
            value={formData.title}
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
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded"
          >
            Guardar Curso
          </button>
        </form>
      )}

      <ul>
        {courses.map((c) => (
          <li
            key={c.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              {c.title} - {c.description}
            </span>
            <button
              onClick={() => handleDelete(c.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
