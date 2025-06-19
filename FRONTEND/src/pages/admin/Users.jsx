import { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../../api/user.service";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "graduate",
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getAllUsers();
      setUsers(data);
    }
    fetchData();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await addUser(formData);
    if (newUser) {
      setUsers((prev) => [...prev, newUser]);
      setFormData({ name: "", email: "", role: "graduate" });
      setShowForm(false);
    }
  };

  const handleDelete = async (id) => {
    if (await deleteUser(id)) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-3xl mb-6">Usuarios</h2>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-600 text-white py-2 px-4 rounded"
      >
        {showForm ? "Ocultar formulario" : "Agregar Usuario"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
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
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="graduate">Graduado</option>
            <option value="admin">Administrador</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded"
          >
            Guardar Usuario
          </button>
        </form>
      )}

      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              {user.name} ({user.email}) - {user.role}
            </span>
            <button
              onClick={() => handleDelete(user.id)}
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
