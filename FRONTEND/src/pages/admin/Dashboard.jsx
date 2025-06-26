import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/user.service";
import { getAllGraduates } from "../../api/graduate.service";
import { getAllSpeakers } from "../../api/speaker.service";
import { getAllCourses } from "../../api/course.service";
import { getAllCourseGraduates } from "../../api/course_graduate.service";
import { useAuth } from "../../context/AuthContext";

import {
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaCheckCircle,
  FaClipboardList,
  FaFileAlt,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

export default function DashboardAdmin() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [graduates, setGraduates] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [usersData, graduatesData, speakersData, coursesData, assignmentsData] =
        await Promise.all([
          getAllUsers(),
          getAllGraduates(),
          getAllSpeakers(),
          getAllCourses(),
          getAllCourseGraduates(),
        ]);

      setUsers(usersData);
      setGraduates(graduatesData);
      setSpeakers(speakersData);
      setCourses(coursesData);
      setAssignments(assignmentsData);
    }

    fetchData();
  }, []);

  const statCards = [
    {
      icon: <FaUsers />, label: "Usuarios", value: users.length,
      color: "bg-blue-100", text: "text-blue-700"
    },
    {
      icon: <FaUserGraduate />, label: "Graduados", value: graduates.length,
      color: "bg-sky-100", text: "text-sky-700"
    },
    {
      icon: <FaChalkboardTeacher />, label: "Facilitadores", value: speakers.length,
      color: "bg-indigo-100", text: "text-indigo-700"
    },
    {
      icon: <FaBook />, label: "Talleres", value: courses.length,
      color: "bg-green-100", text: "text-green-700"
    },
    {
      icon: <FaCheckCircle />, label: "Talleres Activos",
      value: courses.filter(c => new Date(c.date_course) >= new Date()).length,
      color: "bg-yellow-100", text: "text-yellow-700"
    },
    {
      icon: <FaClipboardList />, label: "Total Inscripciones", value: assignments.length,
      color: "bg-pink-100", text: "text-pink-700"
    },
    {
      icon: <FaFileAlt />, label: "Notas Enviadas",
      value: assignments.filter(a => a.completado).length,
      color: "bg-purple-100", text: "text-purple-700"
    },
  ];

  const usersByRole = [
    { name: "Administradores", total: users.filter(u => u.id_role === "admin" || u.id_role === 1).length },
    { name: "Graduados", total: graduates.length },
    { name: "Facilitadores", total: speakers.length },
  ];

  const modalityData = ["Presencial", "Virtual", "Mixto"].map((mod) => ({
    name: mod,
    value: courses.filter(c => c.modality === mod).length,
  }));

  const COLORS = ["#38bdf8", "#6366f1", "#10b981"];

  const coursesByMonth = Array.from({ length: 12 }, (_, i) => {
    const monthName = new Date(0, i).toLocaleString("es", { month: "short" });
    return {
      month: monthName,
      value: courses.filter(c => new Date(c.date_course).getMonth() === i).length,
    };
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Bienvenida */}
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 mb-6 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-teal-800 mb-2">
          ¡Bienvenido, {user?.first_name} {user?.last_name1}!
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Este es el panel de administración. Gestiona usuarios, graduados, facilitadores y talleres.
        </p>
      </div>

      {/* Tarjetas estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`${card.color} border rounded-xl p-4 sm:p-6 shadow hover:shadow-md transition text-center`}
          >
            <div className={`${card.text} text-2xl sm:text-3xl mb-2`}>{card.icon}</div>
            <h3 className={`text-lg sm:text-xl font-semibold ${card.text}`}>{card.label}</h3>
            <p className="text-gray-600 text-base sm:text-lg mt-1 font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Gráficos de barras y pie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-900">Usuarios por Rol</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usersByRole}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-green-800">Modalidad de Talleres</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={modalityData} cx="50%" cy="50%" outerRadius={80} label dataKey="value">
                  {modalityData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Línea por mes */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-sky-900">Talleres por Mes</h3>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={coursesByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
