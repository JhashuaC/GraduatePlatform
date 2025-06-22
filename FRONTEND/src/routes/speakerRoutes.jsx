// src/routes/GraduateRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SpeakerLayout from "../layouts/SpeakerLayout";
import Dashboard from "../pages/speaker/Dashboard";
import Attendance from "../pages/speaker/Attendance";
import MyWorkshops from "../pages/speaker/MyWorkshops";

export default function SpeakerRoutes() {
  const { user, role, loading } = useAuth();

  if (loading) return null;

  if (!user || role !== "speaker") {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route element={<SpeakerLayout />}>
        <Route index              element={<Dashboard />} />          {/* /graduate */}
        <Route path="asistencia" element={<Attendance />} />
        <Route path="misTalleres" element={<MyWorkshops />} />  {/* Mis talleres */}
        
        {/* Redirección por defecto */}
        <Route path="*"           element={<Navigate to="" replace />} />
      </Route>
    </Routes>
  );
}
