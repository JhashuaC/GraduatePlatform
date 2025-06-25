import { useState, useEffect } from "react";
import { getAllSpeakers, deleteSpeaker, createSpeaker } from "../../api/speaker.service";
import SpeakerCard from "../../components/SpeakerCard";

export default function Speakers() {
  const [speakers, setSpeakers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", expertise: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getAllSpeakers();
        setSpeakers(data);
      } catch (err) {
        setError("Error al cargar facilitadores");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newSpeaker = await createSpeaker(formData);
      if (newSpeaker) {
        setSpeakers((prev) => [...prev, newSpeaker]);
        setFormData({ name: "", expertise: "", email: "" });
        setShowForm(false);
      }
    } catch {
      setError("Error al guardar facilitador");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este facilitador?")) {
      try {
        setLoading(true);
        const deleted = await deleteSpeaker(id);
        if (deleted) {
          setSpeakers((prev) => prev.filter((s) => s.id_speaker !== id));
        }
      } catch {
        setError("Error al eliminar facilitador");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
   
      <div className="">
        <h2 className="text-4xl font-bold text-teal-800 text-center mb-8">
          FACILITADORES
        </h2>

        <button
          onClick={() => {
            setShowForm((prev) => !prev);
            setError(null);
          }}
          className={`mb-8 mx-auto block bg-teal-700 hover:bg-teal-900 text-white font-semibold py-3 px-8 rounded-lg shadow-md`}
        >
          {showForm ? "Ocultar formulario" : "Agregar Facilitador"}
        </button>

        {error && (
          <p className="mb-6 text-center text-red-600 font-semibold animate-pulse">
            {error}
          </p>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 max-w-lg mx-auto grid gap-6"
            autoComplete="off"
          >
            <input
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-teal-600 focus:border-gray-100 rounded-lg px-4 py-3 text-lg shadow-sm transition focus:outline-none"
            />
            <input
              name="expertise"
              placeholder="Especialidad"
              value={formData.expertise}
              onChange={handleChange}
              required
              className="border border-teal-600 focus:border-gray-100 rounded-lg px-4 py-3 text-lg shadow-sm transition focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-teal-600 focus:border-gray-100 rounded-lg px-4 py-3 text-lg shadow-sm transition focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-800 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Guardando..." : "Guardar Facilitador"}
            </button>
          </form>
        )}

        {loading && !showForm ? (
          <p className="text-center text-gray-600 text-lg animate-pulse">
            Cargando facilitadores...
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {speakers.length > 0 ? (
              speakers.map((sp) => (
                <SpeakerCard
                  key={sp.id_speaker}
                  speakers={sp}
                  onDelete={() => handleDelete(sp.id_speaker)}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No hay facilitadores disponibles.
              </p>
            )}
          </div>
        )}
      </div>
  );
}
