import { useEffect, useState } from "react";
import { getAllCourseGraduatesById } from "../../api/course_graduate.service";
import { useAuth } from "../../context/AuthContext";
import { CalendarDays, FileCheck, ExternalLink } from "lucide-react";

export default function Historial() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const openCertificateInNewWindow = (courseData) => {
    const certHTML = `
    <html>
      <head>
        <title>Certificado</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
        <style>
          body {
            font-family: Georgia, serif;
            background: white;
            margin: 0;
            padding: 40px;
            text-align: center;
          }
          .cert-container {
            border: 10px solid #d4af37;
            padding: 40px 40px 80px 40px; /* más espacio abajo para sello y firma */
            max-width: 900px;
            margin: auto;
            background-color: #fff;
            color: #000;
            position: relative;
            box-sizing: border-box;
          }
          .logo {
            position: absolute;
            top: 20px;
            left: 20px;
            width: 80px;
          }
          .firma {
            width: 160px;
            margin: 20px auto 5px;
            display: block;
          }
          .sello {
            width: 120px;
            margin: 20px auto 0;
            display: block;
          }
          .download-btn {
            background-color: #16a34a;
            color: white;
            border: none;
            padding: 10px 16px;
            border-radius: 8px;
            font-size: 16px;
            margin: 20px auto;
            display: block;
            cursor: pointer;
          }
          h1, h2, h3 {
            margin-top: 0;
            margin-bottom: 1rem;
          }
          p {
            margin: 0.5rem 0;
          }
        </style>
      </head>
      <body>
        <div id="certificate" class="cert-container">
          <img src="${window.location.origin}/logo.png" class="logo" />
          <h1>Certificado de Participación</h1>
          <p>Por medio de la presente se hace constar que</p>
          <h2 style="text-decoration: underline;">
            ${courseData.Graduate.User.first_name} ${courseData.Graduate.User.last_name1} ${courseData.Graduate.User.last_name2}
          </h2>
          <p>ha participado satisfactoriamente en el taller</p>
          <h3>“${courseData.Course.name_course}”</h3>
          <p>Realizado el día ${new Date(courseData.Course.date_course).toLocaleDateString()}</p>
          <p style="max-width: 700px; margin: 20px auto; font-size: 14px;">
            Este certificado reconoce el esfuerzo, dedicación y cumplimiento de los objetivos establecidos durante el desarrollo del taller, demostrando compromiso con el aprendizaje continuo y el desarrollo profesional.
          </p>
          <img src="${window.location.origin}/firma.png" class="firma" alt="Firma del Facilitador" />
          <p><em>Firma del Facilitador</em></p>
          <img src="${window.location.origin}/sello.png" class="sello" alt="Sello oficial" />
        </div>

        <button class="download-btn" onclick="downloadCertificate()">Descargar como PDF</button>

        <script>
          async function downloadCertificate() {
            const { jsPDF } = window.jspdf;
            const certificate = document.getElementById('certificate');

            const canvas = await html2canvas(certificate, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
              orientation: "landscape",
              unit: "pt",
              format: [canvas.width, canvas.height],
            });

            pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
            pdf.save("Certificado_${courseData.Graduate.User.first_name}.pdf");
          }
        </script>
      </body>
    </html>
    `;

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(certHTML);
      newWindow.document.close();
    } else {
      alert("El navegador bloqueó la ventana emergente. Permite pop-ups e inténtalo de nuevo.");
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.Course.name_course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-blue-900 text-center break-words">
        Historial de Talleres
      </h2>

      <input
        type="text"
        placeholder="Buscar por nombre del taller..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md mx-auto mb-6 block p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
      />

      {filteredCourses.map((c) => (
        <div
          key={`${c.id_course}-${c.id_graduate}`}
          className="bg-white shadow-lg border border-blue-100 rounded-2xl p-6 mb-8 transition-all duration-300"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-2">
            {c.Course.name_course}
          </h3>
          <p className="text-gray-600 flex items-center gap-2 mb-1 text-sm sm:text-base">
            <CalendarDays size={18} className="text-blue-500" />
            Fecha del curso: {new Date(c.Course.date_course).toLocaleDateString()}
          </p>
          <p className="text-gray-700 flex items-center gap-2 mb-3 text-sm sm:text-base">
            <FileCheck size={18} className="text-green-500" />
            Estado:{" "}
            {c.completed ? (
              <span className="text-green-700 font-medium">
                Completado el {new Date(c.completed_at).toLocaleDateString()}
              </span>
            ) : (
              <span className="text-yellow-600 font-medium">En proceso</span>
            )}
          </p>

          {c.completed && (
            <button
              onClick={() => openCertificateInNewWindow(c)}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition"
            >
              <ExternalLink size={18} />
              Ver certificado
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
