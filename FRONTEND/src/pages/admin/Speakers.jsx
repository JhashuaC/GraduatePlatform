import { useState, useEffect } from "react";
import { getAllSpeakers, deleteSpeaker } from "../../api/speaker.service";

export default function Speakers() {
  const [speakers, setSpeakers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", expertise: "", email: "" });

  useEffect(() => {
    async function fetchData() {
      const data = await getAllSpeakers();
      setSpeakers(data);
    }
    fetchData();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSpeaker = await addSpeaker(formData);
    if (newSpeaker) {
      setSpeakers((prev) => [...prev, newSpeaker]);
      setFormData({ name: "", expertise: "", email: "" });
      setShowForm(false);
    }
  };

  const handleDelete = async (id) => {
    if (await deleteSpeaker(id)) {
      setSpeakers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-3xl mb-6">Facilitadores</h2>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-600 text-white py-2 px-4 rounded"
      >
        {showForm ? "Ocultar formulario" : "Agregar Facilitador"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
          <input
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            name="expertise"
            placeholder="Especialidad"
            value={formData.expertise}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded"
          >
            Guardar Facilitador
          </button>
        </form>
      )}

      <ul>
        {speakers.map((sp) => (
          <li key={sp.id} className="flex justify-between items-center border-b py-2">
            <span>
              {sp.name} - {sp.expertise} ({sp.email})
            </span>
            <button
              onClick={() => handleDelete(sp.id)}
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
