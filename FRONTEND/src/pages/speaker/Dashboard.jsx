import { useAuth } from "../../context/AuthContext";
import { FaChalkboardTeacher, FaUsers, FaClipboardCheck, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const cards = [
    {
      title: "Mis Talleres",
      description: "Visualiza y administra los cursos que impartes.",
      icon: <FaChalkboardTeacher className="text-sky-700 text-4xl mx-auto mb-3 animate-pulse" />,
      bg: "bg-sky-100",
      text: "text-sky-800",
      route: "/speaker/misTalleres",
    },
    {
      title: "Graduados",
      description: "Consulta los participantes de cada taller.",
      icon: <FaUsers className="text-indigo-700 text-4xl mx-auto mb-3 animate-pulse" />,
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      route: "speaker/asistencia",
    },
    {
      title: "Notas y Asistencia",
      description: "Asigna calificaciones y certifica participación.",
      icon: <FaClipboardCheck className="text-green-700 text-4xl mx-auto mb-3 animate-pulse" />,
      bg: "bg-green-100",
      text: "text-green-800",
      route: "/speaker/misTalleres",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Bienvenida */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold text-sky-800 mb-2">
          ¡Bienvenido, {user?.first_name} {user?.last_name1}!
        </h1>
        <p className="text-gray-600 text-lg">
          Este es tu panel de facilitador. Desde aquí puedes administrar tus talleres, revisar inscritos y asignar calificaciones.
        </p>
      </div>

      {/* Tarjetas de navegación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.bg} border rounded-xl p-6 text-center shadow-md hover:shadow-lg transition transform hover:scale-[1.02] duration-300`}
          >
            {card.icon}
            <h3 className={`text-xl font-semibold mb-2 ${card.text}`}>{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.description}</p>
            <button
              onClick={() => navigate(card.route)}
              className="mt-4 bg-white border border-gray-300 hover:border-gray-400 text-sm px-4 py-1 rounded-full hover:bg-gray-100 transition"
            >
              Ver más
            </button>
          </div>
        ))}
      </div>

      {/* Footer dinámico */}
      <div className="mt-12 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
        <FaCog className="animate-spin" />
          Panel en constante mejora — gracias por ser parte de la comunidad.
      </div>
    </div>
  );
}
