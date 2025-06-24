import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import { assignGraduateToCourse, getAllCourseGraduatesById } from '../../api/course_graduate.service';
import { useAuth } from "../../context/AuthContext";

export default function Workshops() {
  const [graduateCourse, setGraduateCourse] = useState([]);
  const { user } = useAuth();
  const id_graduate = user?.id_user; // id_user === id_graduate


  useEffect(() => {
    async function fetchData() {
      const data = await getAllCourseGraduatesById(id_graduate);  //BRO SIRVE
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
        {graduateCourse.map((graduateCourse) => (
          <CourseCard
            key={graduateCourse.id_course}
            name={graduateCourse.Course.name_course}
            description={graduateCourse.Course.description}
            date={graduateCourse.Course.date_course}
            time={graduateCourse.Course.time_course}
            modality={graduateCourse.Course.modality}
            onRegister={() => handleRegister(graduateCourse.id_course)}
          />
        ))}
      </div>
    </div>
  );
}
