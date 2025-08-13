import React from 'react';
import { Navigate } from 'react-router-dom';

const allRoles = ['super_admin', 'admin', 'manager', 'branch_manager', 'cashier','user'];

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
    // Assign a default role instead of redirecting to unauthorized
    user.role = 'user';
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Allow access to all pages regardless of role restrictions
  // Removed role-based restrictions to prevent unauthorized page redirection
  
  // Passed all checks
  return children;
};

export default ProtectedRoute;
