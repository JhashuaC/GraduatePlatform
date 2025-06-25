import { useState, useEffect } from "react";
import { getAllGraduates, createGraduate } from "../../api/graduate.service";
import { getAllCareers } from "../../api/career.service";
import GraduatedCard from "../../components/GraduatedCard";

export default function Graduates() {
  const [graduados, setGraduados] = useState([]);
  const [careers, setCareers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    identification: "",
    address: "",
    email: "",
    phone: "",
    work_phone: "",
    graduation_year: "",
    id_career: ""
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getAllGraduates();
      setGraduados(data);

      const careerData = await getAllCareers();
      setCareers(careerData);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formToSend = {
      ...formData,
      graduation_year: Number(formData.graduation_year),
      id_career: Number(formData.id_career),
    };
    const nuevo = await createGraduate(formToSend);
    if (nuevo) {
      setGraduados([...graduados, nuevo]);
      setFormData({
        name: "",
        identification: "",
        address: "",
        email: "",
        phone: "",
        work_phone: "",
        graduation_year: "",
        id_career: ""
      });
      setShowForm(false);
    }
  };

  return (
      <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center text-teal-800 mb-6">
          GRADUADOS
        </h2>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-teal-700 hover:bg-teal-900 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 "
            aria-expanded={showForm}
          >
            {showForm ? "Ocultar formulario" : "Agregar graduado"}
          </button>
        </div>

        <section
          className={`overflow-hidden rounded-xl shadow-lg bg-white p-3 max-w-3xl mx-auto mb-7 transition-all duration-700 ease-in-out ${
            showForm ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!showForm}
        >
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            noValidate
          >
            {[
              { name: "name", placeholder: "Nombre completo", type: "text" },
              { name: "identification", placeholder: "Identificación", type: "text" },
              { name: "address", placeholder: "Dirección", type: "text" },
              { name: "email", placeholder: "Correo electrónico", type: "email" },
              { name: "phone", placeholder: "Teléfono personal", type: "tel" },
              { name: "work_phone", placeholder: "Teléfono de trabajo", type: "tel" },
              { name: "graduation_year", placeholder: "Año de graduación", type: "number", min: 1900, max: new Date().getFullYear() },
            ].map(({ name, placeholder, type, min, max }) => (
              <input
                key={name}
                name={name}
                type={type}
                min={min}
                max={max}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent shadow-sm transition"
                required
              />
            ))}

            <select
              name="id_career"
              value={formData.id_career}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent shadow-sm transition"
              required
            >
              <option value="" disabled>
                Seleccionar carrera
              </option>
              {careers.map((c) => (
                <option key={c.id_career} value={c.id_career}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="col-span-full bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 rounded-lg shadow-md"
            >
              Guardar Graduado
            </button>
          </form>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {graduados.map((g) => (
            <GraduatedCard key={g.identification || g.id} graduado={g} />
          ))}
        </section>
      </div>
  );
}
