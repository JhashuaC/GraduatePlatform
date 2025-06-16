import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
   logout();
   navigate("/login");
  };

  return (
  <nav className="fixed top-0 w-full z-50 bg-blue-950 text-white px-6 py-4 flex justify-between items-center shadow-md">
  
      <h1 className="text-xl font-bold ">Menú</h1>
      <ul className="flex gap-7 items-center">
        <li><Link className="text-xl hover:underline" to="/home">Home</Link></li>
        <li><Link className="text-xl hover:underline" to="/graduados">Graduados</Link></li>
        <li><Link className="text-xl hover:underline" to="/careers">Carreras</Link></li>
        <li><Link className="text-xl hover:underline" to="/courses">Cursos</Link></li>
        <li><Link className="text-xl hover:underline" to="/speakers">Expositores</Link></li>
        <li>
         <button onClick={handleLogout} className="text-white text-xl bg-red-900 px-3 py-1 rounded hover:bg-red-100 hover:text-black transition">
            Cerrar sesión
          </button> 
        </li>
      </ul>
    </nav>
  );
}

