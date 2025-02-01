import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  const token = localStorage.getItem("access_token");
  if (token) {
    <Outlet />;
    return;
  }
  return <Navigate to="/login" />;
}
