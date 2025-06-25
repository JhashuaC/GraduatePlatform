import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaChalkboardTeacher,
  FaListAlt,
  FaClipboardCheck,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";

export default function SpeakerLayout() {
  const { logout } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Sidebar lateral */}
      {showSidebar && (
        <div className="fixed top-0 left-0 h-full w-64 bg-sky-800 text-white z-50 shadow-lg p-6 transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaChalkboardTeacher /> Menú
            </h2>
            <button onClick={() => setShowSidebar(false)}>
              <FaTimes className="text-white text-xl hover:text-red-300" />
            </button>
          </div>

          <nav className="space-y-4">
            <Link
              to="/speaker/dashboard"
              className="flex items-center gap-2 hover:bg-sky-700 px-3 py-2 rounded"
              onClick={() => setShowSidebar(false)}
            >
              <FaHome /> Inicio
            </Link>
            <Link
              to="/speaker/misTalleres"
              className="flex items-center gap-2 hover:bg-sky-700 px-3 py-2 rounded"
              onClick={() => setShowSidebar(false)}
            >
              <FaListAlt /> Mis Talleres
            </Link>
            <Link
              to="/speaker/asistencia"
              className="flex items-center gap-2 hover:bg-sky-700 px-3 py-2 rounded"
              onClick={() => setShowSidebar(false)}
            >
              <FaClipboardCheck /> Asistencia
            </Link>
            <Link
              to="/speaker/perfil"
              className="flex items-center gap-2 hover:bg-sky-700 px-3 py-2 rounded"
              onClick={() => setShowSidebar(false)}
            >
              <FaUser /> Perfil
            </Link>
          </nav>

          <button
            onClick={logout}
            className="mt-8 flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded w-full justify-center"
          >
            <FaSignOutAlt /> Salir
          </button>
        </div>
      )}

      {/* Navbar superior */}
      <nav className="bg-sky-800 text-white px-6 py-4 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSidebar(true)}
              className="text-white text-2xl hover:text-gray-300"
            >
              <FaBars />
            </button>
            <div className="text-2xl font-bold flex items-center gap-2">
              <FaChalkboardTeacher />Facilitador
            </div>
          </div>

          <div className="flex space-x-6 items-center text-sm font-medium">
            <Link
              to="/speaker/dashboard"
              className="flex items-center gap-1 hover:text-gray-200 transition"
            >
              <FaHome /> Inicio
            </Link>
            <Link
              to="/speaker/misTalleres"
              className="flex items-center gap-1 hover:text-gray-200 transition"
            >
              <FaListAlt /> Mis Talleres
            </Link>
            <Link
              to="/speaker/asistencia"
              className="flex items-center gap-1 hover:text-gray-200 transition"
            >
              <FaClipboardCheck /> Asistencia
            </Link>
            <Link
              to="/speaker/perfil"
              className="flex items-center gap-1 hover:text-gray-200 transition"
            >
              <FaUser /> Perfil
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

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
