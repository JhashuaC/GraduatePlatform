// src/layouts/GraduateLayout.jsx
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GraduateLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Graduado</div>
        <div className="flex space-x-4">
          <Link to="/graduate/dashboard">Inicio</Link>
          <Link to="/graduate/misTalleres">Mis Talleres</Link>
          <Link to="/graduate/preferencias">Preferencias</Link>
          <Link to="/graduate/talleres">Talleres</Link>
          <Link to="/graduate/perfil">Perfil</Link>
          <Link to="/graduate/historial">Historial</Link>
          <button onClick={logout} className="ml-4 bg-red-500 px-3 py-1 rounded">Salir</button>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
