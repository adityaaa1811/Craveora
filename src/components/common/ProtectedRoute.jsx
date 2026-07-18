import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../store/slices/authSlice";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page and store the original path location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
