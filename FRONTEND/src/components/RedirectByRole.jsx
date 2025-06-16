// src/components/RedirectByRole.jsx
import { Navigate } from "react-router-dom";

export default function RedirectByRole({ user }) {
  if (!user) return <Navigate to="/" />;

  switch (user.role) {
    case "graduate":
      return <Navigate to="/graduate/dashboard" />;
    case "admin":
      return <Navigate to="/admin/dashboard" />;
    case "facilitator":
      return <Navigate to="/facilitator/dashboard" />;
    default:
      return <Navigate to="/" />;
  }
}
