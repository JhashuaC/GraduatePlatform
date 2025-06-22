import { useEffect, useState } from "react";
import { getAllCourses } from "../../api/course.service";
import CourseCard from "../../components/CourseCard";
import { assignGraduateToCourse, getAllCourseGraduatesById } from '../../api/course_graduate.service'; 
import { useAuth } from "../../context/AuthContext"; 

export default function Workshops() {
  const { user } = useAuth(); 
  const [graduateCourse, setGraduateCourse] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllCourseGraduates(); 
      setGraduateCourse(data);
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
      id_graduate: user.id_user,
      completed: 0,
      completed_at: null,
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
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Mis Talleres</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {graduateCourse.map((course) => (
          <CourseCard
            key={graduateCourse.id_course}
            name={graduateCourse.name}
            description={graduateCourse.description}
            date={graduateCourse.date}
            time={graduateCourse.time}
            modality={graduateCourse.modality}
            onRegister={() => handleRegister(graduateCourse.id_course)}
          />
        ))}
      </div>
    </div>
  );
}
