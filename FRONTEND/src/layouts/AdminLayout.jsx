// src/layouts/AdminLayout.jsx
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-teal-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Administrador</div>
        <div className="flex space-x-4 items-center">
          <Link to="/admin/users" className="hover:underline">Usuarios</Link>
          <Link to="/admin/graduates" className="hover:underline">Graduados</Link>
          <Link to="/admin/speakers" className="hover:underline">Facilitadores</Link>
          <Link to="/admin/courses" className="hover:underline">Talleres</Link>
          <button
            onClick={logout}
            className="ml-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Salir
          </button>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
