import { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function CertificateDownloader({ graduate, course }) {
    const certRef = useRef();

    const handleDownload = () => {
        const element = certRef.current;

        const opt = {
            margin: 0.5,
            filename: `certificado_${graduate.User.first_name}_${course.name_course}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div>
            <div ref={certRef} style={{
                width: '1000px',
                height: '700px',
                padding: '60px',
                textAlign: 'center',
                border: '10px solid #1e3a8a',
                backgroundColor: '#fefefe',
                fontFamily: 'Georgia, serif',
                position: 'relative'
            }}>
                {/* Logo */}
                <img
                    src="assets//logo.png" // <- Cambia esta ruta si tienes otro logo
                    alt="Logo"
                    style={{ width: '120px', position: 'absolute', top: '40px', left: '40px' }}
                />

                <h1 style={{ fontSize: '42px', color: '#1e3a8a', marginTop: '40px' }}>
                    Certificado de Participación
                </h1>

                <p style={{ fontSize: '22px', marginTop: '40px' }}>
                    Se otorga el presente certificado a:
                </p>

                <p style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px' }}>
                    {graduate.User.first_name} {graduate.User.last_name1} {graduate.User.last_name2}
                </p>

                <p style={{ fontSize: '20px', marginTop: '30px', maxWidth: '800px', marginInline: 'auto' }}>
                    Por haber completado satisfactoriamente el taller:
                </p>

                <p style={{ fontSize: '24px', color: '#2563eb', fontWeight: 'bold', marginTop: '10px' }}>
                    {course.name_course}
                </p>

                <p style={{ fontSize: '18px', marginTop: '20px' }}>
                    Fecha de finalización: {new Date(course.date_course).toLocaleDateString()}
                </p>

                <div style={{ position: 'absolute', bottom: '60px', right: '80px', textAlign: 'center' }}>
                    <p style={{ marginBottom: '40px' }}>__________________________</p>
                    <p>Firma del Facilitador</p>
                </div>
            </div>


            <button
                onClick={handleDownload}
                className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded"
            >
                Descargar Certificado
            </button>
        </div>
    );
}
