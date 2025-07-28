import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const PrivateRoute = () => {
  const { token } = useAuth();

  // Si no hay token, redirige a login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si está logueado, renderiza las rutas hijas
  return <Outlet />;
};
