import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

export default function AdminLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-teal-800 text-white px-6 py-4 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold flex items-center gap-2">
            <FaHome className="text-white" />
            Panel Administrador
          </div>
          <div className="flex space-x-6 items-center text-sm font-medium">
            <Link
              to="/admin/inicio"
              className="flex items-center gap-1 hover:text-gray-200 transition"
            >
              <FaHome /> Inicio
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center gap-1 hover:text-gray-200 transition"
            >
              <FaUsers /> Usuarios
            </Link>
            <Link
              to="/admin/graduates"
              className="flex items-center gap-1 hover:text-gray-200 transition"
            >
              <FaUserGraduate /> Graduados
            </Link>
            <Link
              to="/admin/speakers"
              className="flex items-center gap-1 hover:text-gray-200 transition"
            >
              <FaChalkboardTeacher /> Facilitadores
            </Link>
            <Link
              to="/admin/courses"
              className="flex items-center gap-1 hover:text-gray-200 transition"
            >
              <FaBookOpen /> Talleres
            </Link>
            <button
              onClick={logout}
              className="ml-2 flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition text-white"
            >
              <FaSignOutAlt /> Salir
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
