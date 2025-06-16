import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Rutas internas del graduado
import GraduateRoutes from "./routes/GraduateRoutes";

// Página pública (login + registro)
import LoginRegister from "./pages/common/LoginRegister";

export default function App() {
  const { user, loading } = useAuth();       // user === null  → no logueado
  // user.role === "graduate" → graduado

  if (loading) {
    return <div>Cargando...</div>; // O un spinner / splash screen
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* Página raíz: login si no hay sesión, redirige si ya hay sesión */}
        <Route
          path="/"
          element={
            !user ? <LoginRegister /> : <Navigate to="/graduate" replace />
          }
        />
        <Route path="/graduate/*" element={<GraduateRoutes />} />

        {/* Cualquier otra URL → vuelve al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
