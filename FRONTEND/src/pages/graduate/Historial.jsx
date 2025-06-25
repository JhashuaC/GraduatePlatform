import { useEffect, useState, useRef } from "react";
import { getAllCourseGraduatesById } from "../../api/course_graduate.service";
import { useAuth } from "../../context/AuthContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Historial() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const certRef = useRef();

  useEffect(() => {
    if (user?.id_user) {
      loadCourses();
    }
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
      const element = certRef.current;
      // Captura el elemento como canvas
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });

      // Agrega la imagen al pdf
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`Certificado_${selected.Graduate.User.first_name}.pdf`);
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Error generando PDF, revisa la consola.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Historial de Talleres</h2>
      {courses.map((c) => (
        <div
          key={`${c.id_course}-${c.id_graduate}`}
          className="bg-white shadow-md rounded p-4 mb-4"
        >
          <h3 className="text-xl font-semibold text-blue-800">{c.Course.name_course}</h3>
          <p>Fecha del curso: {new Date(c.Course.date_course).toLocaleDateString()}</p>
          <p>
            Estado:{" "}
            {c.completed ? (
              <>
                ✅ Completado el{" "}
                {new Date(c.completed_at).toLocaleDateString()}
              </>
            ) : (
              "⏳ En proceso"
            )}
          </p>

          {c.completed && (
            <button
              onClick={() => setSelected(c)}
              className="mt-3 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
            >
              Ver Certificado
            </button>
          )}
        </div>
      ))}

      {/* Certificado para descargar */}
      {selected && (
        <div className="my-10 text-center">
          <h3 className="text-xl font-bold mb-4">Certificado</h3>
          <div
            ref={certRef}
            className="relative border shadow-lg mx-auto w-[1000px] bg-white p-8"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              padding: "40px",
              fontFamily: "Arial, sans-serif",
              minHeight: "600px",
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: "100px", position: "absolute", top: "30px", left: "30px" }}
            />
            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: "700",
                marginTop: "2.5rem",
                color: "#1e40af",
              }}
            >
              Certificado de Participación
            </h1>
            <p className="text-lg mt-6">Se otorga a</p>
            <p className="text-2xl font-semibold mt-2">
              {selected.Graduate.User.first_name} {selected.Graduate.User.last_name1}{" "}
              {selected.Graduate.User.last_name2}
            </p>
            <p className="mt-6 text-lg">Por haber completado satisfactoriamente el curso:</p>
            <p className="text-xl font-bold mt-2">{selected.Course.name_course}</p>
            <p className="mt-6">
              Fecha de finalización: {new Date(selected.Course.date_course).toLocaleDateString()}
            </p>

            <div className="mt-16 text-right pr-10">
              <p>__________________________</p>
              <p>Firma del Facilitador</p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="mt-4 bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            Descargar Certificado
          </button>
        </div>
      )}
    </div>
  );
}
