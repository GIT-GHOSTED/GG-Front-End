import { Navigate, Outlet } from "react-router-dom";

export default function Layout({ token }) {
  // Step 1: Check whether the user is authenticated.
  if (!token) {
    // Step 2: If no token exists, redirect to login.
    return <Navigate to="/login" replace />;
  }

  // Step 3: If authenticated, render nested protected routes.
  return <Outlet />;
}
