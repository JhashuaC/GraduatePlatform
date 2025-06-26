import { useEffect, useState } from "react";
import { removeGraduateFromCourse, getAllCourseGraduates } from "../../api/course_graduate.service";
import { User, Mail, BookOpen, Search } from "lucide-react";

export default function Attendance() {
  const [groupedCourses, setGroupedCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCourseGraduates();

        const grouped = {};
        data.forEach(item => {
          const courseId = item.Course.id_course;
          if (!grouped[courseId]) {
            grouped[courseId] = {
              course: item.Course,
              students: [],
            };
          }
          grouped[courseId].students.push({
            id_graduate: item.Graduate.id_graduate,
            graduate: item.Graduate,
          });
        });

        const result = Object.values(grouped);
        setGroupedCourses(result);
        setFilteredCourses(result);
      } catch (err) {
        console.error("Error cargando cursos:", err);
      }
    }

    fetchData();
  }, []);

  const handleUnenroll = async (idCourse, idGraduate) => {
    try {
      await removeGraduateFromCourse(idCourse, idGraduate);
      const updated = groupedCourses.map(group => ({
        ...group,
        students: group.course.id_course === idCourse
          ? group.students.filter(s => s.id_graduate !== idGraduate)
          : group.students
      }));
      setGroupedCourses(updated);
      handleSearch(searchTerm, updated); // Actualizar filtro
    } catch (err) {
      console.error("Error al desmatricular:", err);
      alert("Hubo un error al desmatricular");
    }
  };

  const handleSearch = (term, data = groupedCourses) => {
    setSearchTerm(term);
    const filtered = data.filter(group =>
      group.course.name_course.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
  <div className="max-w-6xl mx-auto p-4 sm:p-6">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-sky-800 text-center sm:text-left">
      Asistencia a Talleres
    </h2>

    <div className="mb-6">
      <div className="relative w-full sm:w-1/2 mx-auto sm:mx-0">
        <input
          type="text"
          placeholder="Buscar curso por nombre..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>
    </div>

    {filteredCourses.length === 0 ? (
      <p className="text-gray-500 text-center">No hay talleres que coincidan.</p>
    ) : (
      <div className="space-y-8">
        {filteredCourses.map(({ course, students }) => (
          <div
            key={course.id_course}
            className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 border border-gray-200"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-1">
              {course.name_course}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {course.date_course} - {course.time_course} | {course.modality}
            </p>

            {students.length === 0 ? (
              <p className="text-gray-500 italic">Sin estudiantes inscritos.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {students.map(({ id_graduate, graduate }) => (
                  <div
                    key={id_graduate}
                    className="bg-sky-50 rounded-lg p-4 border flex flex-col justify-between"
                  >
                    <div className="space-y-1 text-sm">
                      <p className="flex items-center gap-2 text-gray-800">
                        <User size={16} className="text-blue-600" />
                        {graduate.User.first_name} {graduate.User.last_name1}
                      </p>
                      <p className="flex items-center gap-2 text-gray-600">
                        <BookOpen size={16} className="text-blue-500" />
                        {graduate.Career?.name || "Carrera no disponible"}
                      </p>
                      <p className="flex items-center gap-2 text-blue-700 break-words">
                        <Mail size={16} />
                        {graduate.User.email}
                      </p>
                    </div>
                    <button
                      onClick={() => handleUnenroll(course.id_course, id_graduate)}
                      className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Desmatricular
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);
}
