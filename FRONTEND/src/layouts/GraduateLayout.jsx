import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  CalendarCheck,
  SlidersHorizontal,
  BookOpenCheck,
  History,
  GraduationCap,
  User,
  LogOut,
  Menu,
  Home,
  X,
} from "lucide-react";

export default function GraduateLayout() {
  const { logout } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed top-0 left-0 h-full w-64 bg-blue-900 text-white z-50 shadow-lg p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <GraduationCap className="w-5 h-5" /> Menú
            </h2>
            <button onClick={() => setShowSidebar(false)}>
              <X className="w-6 h-6 hover:text-red-400" />
            </button>
          </div>

          <nav className="space-y-4 text-sm">
            <Link to="/graduate/dashboard" className="flex items-center gap-2 hover:bg-blue-800 px-3 py-2 rounded" onClick={() => setShowSidebar(false)}>
              <Home className="w-4 h-4" /> Inicio
            </Link>
            <Link to="/graduate/misTalleres" className="flex items-center gap-2 hover:bg-blue-800 px-3 py-2 rounded" onClick={() => setShowSidebar(false)}>
              <CalendarCheck className="w-4 h-4" /> Mis Talleres
            </Link>
            <Link to="/graduate/preferencias" className="flex items-center gap-2 hover:bg-blue-800 px-3 py-2 rounded" onClick={() => setShowSidebar(false)}>
              <SlidersHorizontal className="w-4 h-4" /> Preferencias
            </Link>
            <Link to="/graduate/talleres" className="flex items-center gap-2 hover:bg-blue-800 px-3 py-2 rounded" onClick={() => setShowSidebar(false)}>
              <BookOpenCheck className="w-4 h-4" /> Talleres
            </Link>
            <Link to="/graduate/historial" className="flex items-center gap-2 hover:bg-blue-800 px-3 py-2 rounded" onClick={() => setShowSidebar(false)}>
              <History className="w-4 h-4" /> Historial
            </Link>
            <Link to="/graduate/perfil" className="flex items-center gap-2 hover:bg-blue-800 px-3 py-2 rounded" onClick={() => setShowSidebar(false)}>
              <User className="w-4 h-4" /> Perfil
            </Link>
            <button onClick={() => { logout(); setShowSidebar(false); }} className="w-full mt-6 flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded justify-center">
              <LogOut className="w-4 h-4" /> Salir
            </button>
          </nav>
        </div>
      )}

      {/* Navbar fijo */}
      <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center fixed top-0 w-full z-40 shadow-lg">
        <div className="flex items-center gap-4">
          <button onClick={() => setShowSidebar(true)} className="text-white hover:text-gray-300">
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-xl font-bold flex items-center gap-2">
            <GraduationCap className="w-6 h-6" /> Graduado
          </div>
        </div>

        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/graduate/dashboard" className="flex items-center gap-1 hover:underline"><Home className="w-4 h-4" /> Inicio</Link>
          <Link to="/graduate/misTalleres" className="flex items-center gap-1 hover:underline"><CalendarCheck className="w-4 h-4" /> Mis Talleres</Link>
          <Link to="/graduate/preferencias" className="flex items-center gap-1 hover:underline"><SlidersHorizontal className="w-4 h-4" /> Preferencias</Link>
          <Link to="/graduate/talleres" className="flex items-center gap-1 hover:underline"><BookOpenCheck className="w-4 h-4" /> Talleres</Link>
          <Link to="/graduate/historial" className="flex items-center gap-1 hover:underline"><History className="w-4 h-4" /> Historial</Link>
          <Link to="/graduate/perfil" className="flex items-center gap-1 hover:underline"><User className="w-4 h-4" /> Perfil</Link>
          <button onClick={logout} className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1">
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </div>
      </nav>

      {/* Contenido con padding-top para evitar que se tape por la navbar */}
      <main className="pt-24 px-6">
        <Outlet />
      </main>
    </div>
  );
}
