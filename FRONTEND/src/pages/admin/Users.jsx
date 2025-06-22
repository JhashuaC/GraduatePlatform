// src/pages/admin/Users.jsx
import { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../../api/user.service";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllUsers();
      setUsers(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (await deleteUser(id)) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl mb-6 font-bold text-blue-900">Lista de Usuarios</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded border">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">Apellidos</th>
              <th className="py-2 px-4">Identificación</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Teléfono</th>
              <th className="py-2 px-4">Dirección</th>
              <th className="py-2 px-4">Rol</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id_user} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{u.first_name}</td>
                <td className="py-2 px-4">{u.last_name1} {u.last_name2}</td>
                <td className="py-2 px-4">{u.identity_number}</td>
                <td className="py-2 px-4">{u.email}</td>
                <td className="py-2 px-4">{u.phone}</td>
                <td className="py-2 px-4">{u.address}</td>
                <td className="py-2 px-4">{u.Role?.name || u.id_role}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(u.id_user)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No hay usuarios registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
