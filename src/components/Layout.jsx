import { Navigate, Outlet } from "react-router-dom";

export default function Layout({ token }) {
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
