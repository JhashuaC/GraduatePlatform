import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import GraduateRoutes from "./routes/GraduateRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import LoginRegister from "./pages/common/LoginRegister";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  return (
    <BrowserRouter>
      <Routes>

        {/* Página raíz */}
        <Route
          path="/"
          element={
            !user ? (
              <LoginRegister />
            ) : user.role === undefined ? (
              <div>Cargando redirección...</div>
            ) : user.role === "graduate" ? (
              <Navigate to="/graduate" replace />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />

        {/* Rutas específicas por rol */}
        <Route path="/graduate/*" element={<GraduateRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Rutas desconocidas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
