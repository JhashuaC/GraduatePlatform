import { useAuth } from "../../context/AuthContext";
import { FaUserGraduate, FaClipboardList, FaHeart, FaChartBar, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: "Talleres inscritos", value: 4, icon: <FaClipboardList className="text-blue-500 text-2xl" /> },
    { label: "Preferencias activas", value: 7, icon: <FaHeart className="text-pink-500 text-2xl" /> },
    { label: "Asistencias completadas", value: "90%", icon: <FaChartBar className="text-green-500 text-2xl" /> },
  ];

  const cards = [
    {
      title: "Mis Talleres",
      description: "Consulta y gestiona tus talleres activos e históricos.",
      icon: <FaClipboardList className="text-blue-700 text-4xl mx-auto mb-3 animate-pulse" />,
      bg: "bg-blue-100",
      text: "text-blue-800",
      route: "/graduate/talleres",
    },
    {
      title: "Mis Preferencias",
      description: "Explora tus intereses y actualiza tus preferencias.",
      icon: <FaHeart className="text-green-700 text-4xl mx-auto mb-3 animate-pulse" />,
      bg: "bg-green-100",
      text: "text-green-800",
      route: "/graduate/preferencias",
    },
    {
      title: "Historial",
      description: "Revisa tu historial de talleres, calificaciones y participación.",
      icon: <FaUserGraduate className="text-yellow-700 text-4xl mx-auto mb-3 animate-pulse" />,
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      route: "/graduate/historial",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Bienvenida */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          ¡Hola, {user?.first_name} {user?.last_name1}!
        </h1>
        <p className="text-gray-600 text-lg">
          Este es tu panel principal como graduado. Aquí podrás monitorear tu progreso, acceder a tus talleres, actualizar preferencias y mucho más.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow hover:shadow-lg transition duration-300">
            <div className="mb-2">{stat.icon}</div>
            <h2 className="text-3xl font-bold text-gray-800">{stat.value}</h2>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
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
              className="mt-4 bg-white border border-gray-300 hover:border-gray-400 text-sm px-4 py-1 rounded-full hover:bg-gray-100 transition"
              onClick={() => navigate(card.route)}
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
