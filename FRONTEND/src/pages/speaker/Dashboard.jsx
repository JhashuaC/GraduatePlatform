import { useAuth } from "../../context/AuthContext";
import { FaChalkboardTeacher, FaUsers, FaClipboardCheck } from "react-icons/fa";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 mb-6 text-center">
        <h1 className="text-4xl font-bold text-sky-800 mb-2">
          ¡Bienvenido, {user?.first_name} {user?.last_name1}!
        </h1>
        <p className="text-gray-600 text-lg">
          Este es tu panel de facilitador. Desde aquí puedes administrar tus talleres, revisar inscritos y asignar calificaciones.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-sky-100 border border-sky-300 rounded-xl p-5 text-center shadow hover:shadow-md transition">
          <FaChalkboardTeacher className="text-sky-700 text-3xl mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-sky-800">Mis Talleres</h3>
          <p className="text-gray-600 text-sm">Visualiza y administra los cursos que impartes.</p>
        </div>

        <div className="bg-indigo-100 border border-indigo-300 rounded-xl p-5 text-center shadow hover:shadow-md transition">
          <FaUsers className="text-indigo-700 text-3xl mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-indigo-800">Graduados</h3>
          <p className="text-gray-600 text-sm">Consulta los participantes de cada taller.</p>
        </div>

        <div className="bg-green-100 border border-green-300 rounded-xl p-5 text-center shadow hover:shadow-md transition">
          <FaClipboardCheck className="text-green-700 text-3xl mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-green-800">Notas</h3>
          <p className="text-gray-600 text-sm">Asigna calificaciones y certifica participación.</p>
        </div>
      </div>
    </div>
  );
}
