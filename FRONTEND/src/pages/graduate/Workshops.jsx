import { useEffect, useState } from "react";
import { getAllCourses } from "../../api/course.service";
import CourseCard from "../../components/CourseCard";
import { useAuth } from "../../context/AuthContext";
getAllCoursesgetAllCourses
export default function Workshops() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllCourses(); // Aquí deberías retornar los cursos reales
      setCourses(data);
    }
    fetchData();
  }, []);

  const handleRegister = (courseId) => {
    
    alert(`Te inscribiste al curso con ID ${courseId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Cursos Disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id_course}
            name={course.name}
            description={course.description}
            date={course.date}
            time={course.time}
            modality={course.modality}
            onRegister={() => handleRegister(course.id_course)}
          />
        ))}
      </div>
    </div>
  );
}
