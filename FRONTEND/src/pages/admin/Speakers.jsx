import { useState, useEffect } from "react";
import { getAllSpeakers, deleteSpeaker, createSpeaker } from "../../api/speaker.service";
import SpeakerCard from "../../components/SpeakerCard";

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
    const newSpeaker = await createSpeaker(formData);
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
        <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-center text-black text-4xl font-bold my-6">FACILITADOR</h2>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-teal-800 hover:bg-teal-950 text-white py-2 px-4 rounded"
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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {speakers.map((sp) => (
         
            <SpeakerCard  key={sp.id_speaker} speakers={sp}  onDelete={() => handleDelete(sp.id_speaker)}/>
         
        ))}
      </div>
    </div>
    </div>
  );
}
