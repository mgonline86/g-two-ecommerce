import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ isLogged }) {
  if (!isLogged) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
