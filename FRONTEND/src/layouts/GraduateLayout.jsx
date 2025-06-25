// src/layouts/GraduateLayout.jsx
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Iconos de lucide-react
import {
  Home,
  CalendarCheck,
  SlidersHorizontal,
  BookOpenCheck,
  History,
  GraduationCap,
  User,
  LogOut,
} from "lucide-react";

export default function GraduateLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold flex items-center gap-2">
          <GraduationCap  className="w-6 h-6" /> Graduado
        </div>

        <div className="flex space-x-4 items-center">
          <Link to="/graduate/dashboard" className="flex items-center gap-1 hover:underline">
            <Home className="w-4 h-4" /> Inicio
          </Link>
          <Link to="/graduate/misTalleres" className="flex items-center gap-1 hover:underline">
            <CalendarCheck className="w-4 h-4" /> Mis Talleres
          </Link>
          <Link to="/graduate/preferencias" className="flex items-center gap-1 hover:underline">
            <SlidersHorizontal className="w-4 h-4" /> Preferencias
          </Link>
          <Link to="/graduate/talleres" className="flex items-center gap-1 hover:underline">
            <BookOpenCheck className="w-4 h-4" /> Talleres
          </Link>
          <Link to="/graduate/historial" className="flex items-center gap-1 hover:underline">
            <History className="w-4 h-4" /> Historial
          </Link>
          <Link to="/graduate/perfil" className="flex items-center gap-1 hover:underline">
            <User className="w-4 h-4" /> Perfil
          </Link>
          <button
            onClick={logout}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
