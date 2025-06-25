import { useAuth } from "../../context/AuthContext";
import { FaUserTie  , FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaIdCard, FaCalendarAlt, FaUniversity } from "react-icons/fa";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-sky-800 mb-6 text-center flex items-center justify-center gap-2">
        <FaUserTie   className="text-sky-700" /> Mi perfil
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        {/* Nombres y Apellidos */}
        <div>
          <p className="font-semibold">Nombre:</p>
          <p className="text-lg">{user?.first_name}</p>
        </div>
        <div>
          <p className="font-semibold">Apellidos:</p>
          <p className="text-lg">{user?.last_name1} {user?.last_name2}</p>
        </div>

        {/* Identificación y Email */}
        <div className="flex items-center gap-2">
          <FaIdCard className="text-sky-600" />
          <div>
            <p className="font-semibold">Identificación:</p>
            <p>{user?.identity_number}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-sky-600" />
          <div>
            <p className="font-semibold">Correo:</p>
            <p>{user?.email}</p>
          </div>
        </div>

        {/* Teléfono y Dirección */}
        <div className="flex items-center gap-2">             
          <FaPhoneAlt className="text-sky-600" />
          <div>
            <p className="font-semibold">Teléfono:</p>
            <p>{user?.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-sky-600" />
          <div>
            <p className="font-semibold">Dirección:</p>
            <p>{user?.address}</p>
          </div>
        </div>

        {/* Información de facilitador */}         
        {user?.Speaker && (
          <>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-sky-600" />
              <div>
                <p className="font-semibold">Año de Graduación:</p>
                <p>{user.Speaker.graduation_year}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaUniversity className="text-sky-600" />
              <div>
                <p className="font-semibold">ID de Carrera:</p>
                <p>{user.Speaker.id_career}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold">Categoría:</p>
              <p>{user.Speaker.specialty || "No especificado"}</p>
            </div>
            <div>
              <p className="font-semibold">Teléfono laboral:</p>
              <p>{user.Speaker.work_phone || "No disponible"}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
