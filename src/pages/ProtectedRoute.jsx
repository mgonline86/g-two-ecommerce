import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

export default function ProtectedRoute() {
  const { isLogged } = useContext(AuthContext);
  if (!isLogged) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
