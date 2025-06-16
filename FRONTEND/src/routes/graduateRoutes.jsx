// src/routes/GraduateRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import GraduateLayout from "../layouts/GraduateLayout";
import Dashboard from "../pages/graduate/Dashboard";
import Workshops from "../pages/graduate/Workshops";
import Profile from "../pages/graduate/Profile";
import { useAuth } from "../context/AuthContext";

export default function GraduateRoutes() {
  const { user } = useAuth();

  // Protege las rutas si el usuario no es graduado
  if (!user || user.role !== "graduate") {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route element={<GraduateLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="talleres" element={<Workshops />} />
        <Route path="perfil" element={<Profile />} />
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Route>
    </Routes>
  );
}
