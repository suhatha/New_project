import React from 'react';
import { Navigate } from 'react-router-dom';

const allRoles = ['super_admin', 'admin', 'manager', 'branch_manager', 'cashier'];

const ProtectedRoute = ({ children, roles = [], role }) => {
  const token = localStorage.getItem('token');

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {
    user = null;
  }

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user's role is valid
  if (!user.role || !allRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Build allowed roles list
  const allowedRoles = roles.length > 0 ? roles : role ? [role] : allRoles;

  // User role not allowed for this route
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  // Passed all checks
  return children;
};

export default ProtectedRoute;
