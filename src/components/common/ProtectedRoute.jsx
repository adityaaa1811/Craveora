import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated, selectCurrentUser } from "../../store/slices/authSlice";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page and store the original path location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && (!currentUser || !allowedRoles.includes(currentUser.role))) {
    // Role not allowed, redirect to homepage
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
