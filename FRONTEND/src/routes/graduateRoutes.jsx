// src/routes/GraduateRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GraduateLayout from "../layouts/GraduateLayout";
import Dashboard  from "../pages/graduate/Dashboard";
import Workshops  from "../pages/graduate/Workshops";
import Profile    from "../pages/graduate/Profile";

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
        <Route path="*"           element={<Navigate to="" replace />} />
      </Route>
    </Routes>
  );
}
