import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const graduateLinks = [
    { name: "Cursos", path: "/graduate/workshops" },
    { name: "Perfil", path: "/graduate/profile" },
  ];

  const adminLinks = [
    { name: "Usuarios", path: "/admin/users" },
    { name: "Facilitadores", path: "/admin/speakers" },
  ];

  const links = user?.role === "admin" ? adminLinks : graduateLinks;

  return (
    <nav className="bg-blue-900 text-white py-4 shadow">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Graduate App</h1>
        <div className="flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:underline ${
                location.pathname === link.path ? "underline font-bold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
