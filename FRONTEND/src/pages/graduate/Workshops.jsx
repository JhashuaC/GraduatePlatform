import { useEffect, useState } from "react";
import { getAllCourses } from "../../api/course.service";
import CourseCard from "../../components/CourseCard";
import { assignGraduateToCourse } from '../../api/course_graduate.service';
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Workshops() {
  const { user } = useAuth();               
  const idGraduate = user?.id_user;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (err) {
        toast.error("Error al cargar los cursos");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleRegister = async (courseId) => {
    if (!user) {
      toast.warning("Debes iniciar sesión para inscribirte");
      return;
    }

    const data = {
      id_course: courseId,
      id_graduate: idGraduate,
      completado: 0,
      fecha_completado: null,
    };

    try {
      await assignGraduateToCourse(data);
      toast.success("¡Te has inscrito correctamente al taller!");
    } catch (err) {
      toast.error("Ocurrió un error al inscribirte");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900 animate-fade-in">
        Talleres Disponibles
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Cargando talleres...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-500 italic">No hay talleres disponibles por el momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {courses.map((course, index) => (
            <div
              key={course.id_course}
              className="transition transform duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CourseCard
                name={course.name_course}
                description={course.description}
                date={course.date_course}
                time={course.time_course}
                modality={course.modality}
                onRegister={() => handleRegister(course.id_course)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
