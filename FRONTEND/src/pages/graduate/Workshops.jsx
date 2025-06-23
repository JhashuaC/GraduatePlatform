import { useEffect, useState } from "react";
import { getAllCourses } from "../../api/course.service";
import CourseCard from "../../components/CourseCard";
import { assignGraduateToCourse } from '../../api/course_graduate.service';
import { useAuth } from "../../context/AuthContext";

export default function Workshops() {
  const { user } = useAuth();               
  const idGraduate = user?.id_user;

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllCourses(); // Aquí deberías retornar los cursos reales
      setCourses(data);
    }
    fetchData();
  }, []);

  const handleRegister = async (courseId) => {
    try {
      if (!user) {
        alert('Debes iniciar sesión para inscribirte');
        return;
      }

      const data = {
        id_course: courseId,
        id_graduate: idGraduate,
        completado: 0,
        fecha_completado: null,
      };

      await assignGraduateToCourse(data);
      alert(`Te inscribiste exitosamente al curso con ID ${courseId}`);
    } catch (err) {
      alert('Ocurrió un error al inscribirte. Intenta más tarde.');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Talleres Disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id_course}
            name={course.name}
            description={course.description}
            date={course.date_course}
            time={course.time_course}
            modality={course.modality}
            onRegister={() => handleRegister(course.id_course)}
          />
        ))}
      </div>
    </div>
  );
}
