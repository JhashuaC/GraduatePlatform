import { useEffect, useState, useRef } from "react";
import { getAllCourseGraduatesById } from "../../api/course_graduate.service";
import { useAuth } from "../../context/AuthContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Historial() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCert, setShowCert] = useState(false);
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

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-900 text-center">Historial de Talleres</h2>

      {courses.map((c) => (
        <div
          key={`${c.id_course}-${c.id_graduate}`}
          className="bg-white shadow-md rounded-lg p-4 mb-4 border"
        >
          <h3 className="text-xl font-semibold text-blue-800">{c.Course.name_course}</h3>
          <p>Fecha del curso: {new Date(c.Course.date_course).toLocaleDateString()}</p>
          <p>
            Estado:{" "}
            {c.completed ? (
              <>
                ✅ Completado el {new Date(c.completed_at).toLocaleDateString()}
              </>
            ) : (
              "⏳ En proceso"
            )}
          </p>

          {c.completed && (
            <button
              onClick={() => {
                setSelected(c);
                setShowCert(true);
              }}
              className="mt-3 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition"
            >
              Ver Certificado
            </button>
          )}
        </div>
      ))}

      {showCert && selected && (
        <div className="my-10 text-center">
          <h3 className="text-2xl font-bold mb-4 text-blue-800">Certificado de Participación</h3>

          <div
            ref={certRef}
            className="mx-auto bg-white shadow-xl"
            style={{
              width: "1000px",
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

            <h1 className="text-4xl font-bold mb-8">
              Certificado de Participación
            </h1>

            <p className="text-lg mb-4">
              Por medio de la presente se hace constar que
            </p>

            <p className="text-3xl font-bold underline mb-6">
              {selected.Graduate.User.first_name} {selected.Graduate.User.last_name1} {selected.Graduate.User.last_name2}
            </p>

            <p className="text-lg mb-4">
              ha participado satisfactoriamente en el taller
            </p>

            <p className="text-2xl font-semibold mb-4">
              “{selected.Course.name_course}”
            </p>

            <p className="text-lg mb-2">
              realizado el día {new Date(selected.Course.date_course).toLocaleDateString()}.
            </p>

            <p className="text-md mb-8 max-w-3xl mx-auto">
              Este certificado reconoce el esfuerzo, dedicación y cumplimiento
              de los objetivos establecidos durante el desarrollo del taller, 
              demostrando compromiso con el aprendizaje continuo y el desarrollo profesional.
            </p>

            {/* Firma y sello */}
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
                <img
                  src="/sello.png"
                  alt="Sello oficial"
                  style={{ width: "120px" }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            >
              Descargar PDF
            </button>
            <button
              onClick={() => setShowCert(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
            >
              Ocultar Certificado
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
