import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getGraduateById } from "../../api/graduate.service"; // asegúrate de tener este import

export default function Profile() {
  const { user, setUser } = useAuth(); // user inicialmente puede ser básico (solo tiene id)
  const id_graduate = user?.id_user; // id_user === id_graduate

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name1: "",
    last_name2: "",
    identity_number: "",
    email: "",
    phone: "",
    address: "",
    graduation_year: "",
    category: "",
    career_name: "",
    work_phone: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const gradData = await getGraduateById(id_graduate); // Aquí traes todo con User y Career
        setUser(gradData); // Guarda todo en el contexto para reutilizar
        setForm({
          first_name: gradData?.User?.first_name || "",
          last_name1: gradData?.User?.last_name1 || "",
          last_name2: gradData?.User?.last_name2 || "",
          identity_number: gradData?.User?.identity_number || "",
          email: gradData?.User?.email || "",
          phone: gradData?.User?.phone || "",
          address: gradData?.User?.address || "",
          graduation_year: user.graduation_year || "",
          category: user.category || "",
          id_career: user.Career?.id_career || "",
          career_name: user.Career?.name || "",
          work_phone: user.work_phone || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar graduado", err);
      }
    }

    if (id_graduate) {
      fetchData();
    }
  }, [id_graduate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSave = () => {
    // Aquí deberías hacer un PUT a /graduates/:id y a /users/:id si cambia el User
    console.log("Guardar en backend:", form);
    const updatedUser = {
      ...user,
      ...form,
      User: { ...user.User, ...form },
      Career: user.Career,
    };
    setUser(updatedUser);
    localStorage.setItem("auth", JSON.stringify({ user: updatedUser, token: localStorage.getItem("auth")?.token }));
    setEditMode(false);
  };


  if (loading) {
    return <p className="text-center mt-10">Cargando perfil...</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Perfil del Graduado</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Nombre", name: "first_name" },
          { label: "Primer Apellido", name: "last_name1" },
          { label: "Segundo Apellido", name: "last_name2" },
          { label: "Número de Identificación", name: "identity_number" },
          { label: "Correo Electrónico", name: "email" },
          { label: "Teléfono", name: "phone" },
          { label: "Dirección", name: "address" },
          { label: "Año de Graduación", name: "graduation_year", type: "number" },
          { label: "Categoría Profesional", name: "category" },
          { label: "Carrera Cursada", name: "career_name", disabled: true },
        ].map(({ label, name, type = "text", disabled = false }) => (
          <div key={name}>
            <label className="block font-semibold text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              disabled={!editMode || disabled}
              className={`w-full mt-1 px-3 py-2 border rounded-md ${editMode && !disabled ? "bg-white" : "bg-gray-100"
                }`}
            />
          </div>
        ))}
      </form>

      <div className="mt-8 flex justify-end gap-4">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Editar Perfil
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => {
                setForm({
                  first_name: user?.User?.first_name || "",
                  last_name1: user?.User?.last_name1 || "",
                  last_name2: user?.User?.last_name2 || "",
                  identity_number: user?.User?.identity_number || "",
                  email: user?.User?.email || "",
                  phone: user?.User?.phone || "",
                  address: user?.User?.address || "",
                  graduation_year: user?.graduation_year || "",
                  category: user?.category || "",
                  career_name: user?.Career?.name_career || "",
                });
                setEditMode(false);
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow"
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
