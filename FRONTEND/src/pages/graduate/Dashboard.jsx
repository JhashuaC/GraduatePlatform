import { useAuth } from "../../context/AuthContext";
import { FaUserGraduate, FaClipboardList, FaHeart } from "react-icons/fa";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 mb-6 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          ¡Hola, {user?.first_name} {user?.last_name1}!
        </h1>
        <p className="text-gray-600 text-lg">
          Bienvenido a tu panel de graduado. Desde aquí puedes gestionar tus talleres,
          preferencias y visualizar tu historial de participación.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 border border-blue-300 rounded-xl p-5 text-center shadow hover:shadow-md transition">
          <FaClipboardList className="text-blue-700 text-3xl mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-blue-800">Mis Talleres</h3>
          <p className="text-gray-600 text-sm">Consulta los talleres en los que estás inscrito.</p>
        </div>

        <div className="bg-green-100 border border-green-300 rounded-xl p-5 text-center shadow hover:shadow-md transition">
          <FaHeart className="text-green-700 text-3xl mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-green-800">Preferencias</h3>
          <p className="text-gray-600 text-sm">Elige tus temas favoritos y áreas de interés.</p>
        </div>

        <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-5 text-center shadow hover:shadow-md transition">
          <FaUserGraduate className="text-yellow-700 text-3xl mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-yellow-800">Historial</h3>
          <p className="text-gray-600 text-sm">Visualiza el procesos de tus Talleres.</p>
        </div>
      </div>
    </div>
  );
}
