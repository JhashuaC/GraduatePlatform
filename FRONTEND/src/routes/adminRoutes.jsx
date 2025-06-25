import { Routes, Route, Navigate, Router } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../layouts/AdminLayout";

// Páginas del admin
import Users from "../pages/admin/Users";
import Speakers from "../pages/admin/Speakers";
import Courses from "../pages/admin/Courses";
import Graduates from "../pages/admin/Graduates";
import Dashboard from "../pages/admin/Dashboard";

export default function AdminRoutes() {
  const { user, role, loading } = useAuth();

  // 1. Mientras se restaura la sesión, no hagas nada
  if (loading) return null;

  // 2. Si no hay user o su rol no es admin, manda al login 1 sola vez
  if (!user || role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // 3. Rutas reales para administrador
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="graduates" element={<Graduates />} />
        <Route path="speakers" element={<Speakers />} />
        <Route path="courses" element={<Courses />} />
        <Route path="*"           element={<Navigate to="" replace />} />
      </Route>
    </Routes>
  );
}
