import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Profile() {
  const { user, setUser } = useAuth(); // Asegúrate de que `setUser` esté disponible en tu AuthContext
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    nombre: user?.nombre || "",
    identificacion: user?.identificacion || "",
    correo: user?.correo || "",
    telefono: user?.telefono || "",
    direccion: user?.direccion || "",
    carrera: user?.carrera || "",
    anio_graduacion: user?.anio_graduacion || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Aquí deberías llamar al backend para guardar los cambios
    console.log("Datos guardados:", form);
    setUser({ ...user, ...form });
    localStorage.setItem("auth", JSON.stringify({ user: { ...user, ...form }, token: localStorage.getItem("auth").token }));
    setEditMode(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Perfil del Graduado</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Nombre completo", name: "nombre" },
          { label: "Identificación", name: "identificacion" },
          { label: "Correo electrónico", name: "correo" },
          { label: "Teléfono", name: "telefono" },
          { label: "Dirección", name: "direccion" },
          { label: "Carrera cursada", name: "carrera" },
          { label: "Año de graduación", name: "anio_graduacion", type: "number" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>
        ))}
      </form>

      <div className="mt-6 flex justify-end gap-3">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Editar Perfil
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => {
                setForm({ ...user });
                setEditMode(false);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
