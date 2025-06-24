// src/routes/GraduateRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GraduateLayout from "../layouts/GraduateLayout";
import Dashboard  from "../pages/graduate/Dashboard";
import Workshops  from "../pages/graduate/Workshops";
import Profile    from "../pages/graduate/Profile";
import Preferences from "../pages/graduate/Preferences";
import MyWorkshops from "../pages/graduate/MyWorkshops";
import Historial from "../pages/graduate/Historial";

export default function GraduateRoutes() {
  const { user, role, loading } = useAuth();

  /* 1. Mientras se restaura la sesión, no hagas nada */
  if (loading) return null;

  /* 2. Si no hay user o su rol no es graduate, manda al login 1 sola vez */
  if (!user || role !== "graduate") {
    return <Navigate to="/" replace />;
  }

  /* 3. Rutas reales para graduado */
  return (
    <Routes>
      <Route element={<GraduateLayout />}>
        <Route index              element={<Dashboard />} />          {/* /graduate */}
        <Route path="talleres"    element={<Workshops />} />
        <Route path="perfil"      element={<Profile />} />
        <Route path="preferencias" element={<Preferences />} />
        <Route path="misTalleres" element={<MyWorkshops />} />  {/* Mis talleres */}
        <Route path="historial"   element={<Historial />} /> 
        
        {/* Redirección por defecto */}
        <Route path="*"           element={<Navigate to="" replace />} />
      </Route>
    </Routes>
  );
}
