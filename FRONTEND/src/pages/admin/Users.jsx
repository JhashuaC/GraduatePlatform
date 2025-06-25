// src/pages/admin/Users.jsx
import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../api/user.service";
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, Trash2Icon } from "lucide-react";

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
      setUsers((prev) => prev.filter((u) => u.id_user !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-teal-800 text-center mb-8">USUARIOS REGISTRADOS</h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No hay usuarios registrados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id_user}
              className="bg-white border border-gray-200 shadow-md rounded-2xl p-5 flex flex-col justify-between transition hover:shadow-lg"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-blue-800 flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  {user.first_name} {user.last_name1} {user.last_name2}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>ID:</strong> {user.identity_number}
                </p>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <p className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4 text-teal-600" />
                  {user.email}
                </p>
                <p className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-teal-600" />
                  {user.phone}
                </p>
                <p className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-teal-600" />
                  {user.address}
                </p>
                <p className="text-sm mt-1">
                  <strong>Rol:</strong> {user.Role?.name || user.id_role}
                </p>
              </div>

              <button
                onClick={() => handleDelete(user.id_user)}
                className="mt-4 w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded flex items-center justify-center gap-2"
              >
                <Trash2Icon className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
