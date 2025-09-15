import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  requiredRole?: 'practitioner' | 'patient';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // If the user is not authenticated, redirect to the login page.
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and the user's role does not match,
  // redirect them to their default dashboard.
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  // If all checks pass, render the child route (e.g., the dashboard).
  return <Outlet />;
};

export default ProtectedRoute;