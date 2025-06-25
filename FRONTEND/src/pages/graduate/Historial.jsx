import { useEffect, useState, useRef } from "react";
import { getAllCourseGraduatesById } from "../../api/course_graduate.service";
import { useAuth } from "../../context/AuthContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CalendarDays, FileCheck, Eye, EyeOff, Download } from "lucide-react";

export default function Historial() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCertId, setShowCertId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const certRef = useRef();

  useEffect(() => {
    if (user?.id_user) loadCourses();
  }, [user]);

  const loadCourses = async () => {
    try {
      const data = await getAllCourseGraduatesById(user.id_user);
      setCourses(data);
    } catch (err) {
      console.error("Error al cargar cursos:", err);
    }
  };

  const handleDownload = async () => {
    if (!certRef.current) return;

    try {
      const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`Certificado_${selected.Graduate.User.first_name}.pdf`);
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Error generando PDF");
    }
  };

  const filteredCourses = courses.filter(c =>
    c.Course.name_course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-900 text-center">Historial de Talleres</h2>

      <input
        type="text"
        placeholder="Buscar por nombre del taller..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md mx-auto mb-6 block p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm"
      />

      {filteredCourses.map((c) => {
        const isShowing = showCertId === c.id_course;

        return (
          <div
            key={`${c.id_course}-${c.id_graduate}`}
            className="bg-white shadow-lg border border-blue-100 rounded-2xl p-6 mb-8 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-blue-800 mb-2">{c.Course.name_course}</h3>
            <p className="text-gray-600 flex items-center gap-2 mb-1">
              <CalendarDays size={18} className="text-blue-500" />
              Fecha del curso: {new Date(c.Course.date_course).toLocaleDateString()}
            </p>
            <p className="text-gray-700 flex items-center gap-2 mb-3">
              <FileCheck size={18} className="text-green-500" />
              Estado:{" "}
              {c.completed ? (
                <>
                  <span className="text-green-700 font-medium">
                    Completado el {new Date(c.completed_at).toLocaleDateString()}
                  </span>
                </>
              ) : (
                <span className="text-yellow-600 font-medium">En proceso</span>
              )}
            </p>

            {c.completed && (
              <button
                onClick={() => {
                  setSelected(c);
                  setShowCertId(isShowing ? null : c.id_course);
                }}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition mb-4"
              >
                {isShowing ? <EyeOff size={18} /> : <Eye size={18} />}
                {isShowing ? "Ocultar Certificado" : "Ver Certificado"}
              </button>
            )}

            {isShowing && selected && (
              <div className="mt-4">
                <div
                  ref={certRef}
                  className="mx-auto bg-white shadow-xl"
                  style={{
                    width: "100%",
                    maxWidth: "1000px",
                    minHeight: "700px",
                    padding: "60px",
                    border: "15px solid #d4af37",
                    fontFamily: "Georgia, serif",
                    backgroundColor: "#fff",
                    color: "#000",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="Logo"
                    style={{
                      width: "100px",
                      position: "absolute",
                      top: "40px",
                      left: "40px",
                    }}
                  />

                  <h1 className="text-4xl font-bold mb-8">Certificado de Participación</h1>

                  <p className="text-lg mb-4">Por medio de la presente se hace constar que</p>

                  <p className="text-3xl font-bold underline mb-6">
                    {selected.Graduate.User.first_name} {selected.Graduate.User.last_name1}{" "}
                    {selected.Graduate.User.last_name2}
                  </p>

                  <p className="text-lg mb-4">ha participado satisfactoriamente en el taller</p>

                  <p className="text-2xl font-semibold mb-4">“{selected.Course.name_course}”</p>

                  <p className="text-lg mb-2">
                    realizado el día {new Date(selected.Course.date_course).toLocaleDateString()}.
                  </p>

                  <p className="text-md mb-8 max-w-3xl mx-auto">
                    Este certificado reconoce el esfuerzo, dedicación y cumplimiento de los
                    objetivos establecidos durante el desarrollo del taller, demostrando
                    compromiso con el aprendizaje continuo y el desarrollo profesional.
                  </p>

                  <div className="mt-16 flex justify-between items-center px-16">
                    <div className="text-center">
                      <img
                        src="/firma.png"
                        alt="Firma del facilitador"
                        style={{ width: "160px", marginBottom: "6px" }}
                      />
                      <p className="italic">Firma del Facilitador</p>
                    </div>

                    <div>
                      <img src="/sello.png" alt="Sello oficial" style={{ width: "120px" }} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                  >
                    <Download size={18} /> Descargar PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
