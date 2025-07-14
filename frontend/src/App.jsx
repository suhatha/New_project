import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Unauthorized from "./components/Unauthorized";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import ItemForm from "./components/ItemForm";
import ItemTable from "./components/ItemTable";
import Logout from "./components/Logout";

function ItemFormWrapper() {
  const navigate = useNavigate();

  const handleSave = (item) => {
    console.log("Item saved:", item);
    navigate("/item");
  };

  return <ItemForm onSave={handleSave} />;
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/logout" element={<Logout />} />

      {/* Protected Routes wrapped with MainLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Default redirect to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        {/* Shared dashboard route, role passed from localStorage user */}
        <Route
          path="dashboard"
          element={
            <Dashboard
              role={JSON.parse(localStorage.getItem("user"))?.role || "guest"}
            />
          }
        />

        {/* Item management routes with role-based protection */}
        <Route
          path="item"
          element={
            <ProtectedRoute roles={["super_admin", "admin"]}>
              <ItemTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="item-form"
          element={
            <ProtectedRoute roles={["super_admin", "admin"]}>
              <ItemFormWrapper />
            </ProtectedRoute>
          }
        />

        {/* Explicit role-based dashboards */}
        {["super_admin", "admin", "manager", "branch_manager", "cashier"].map(
          (role) => (
            <Route
              key={role}
              path={role}
              element={
                <ProtectedRoute role={role}>
                  <Dashboard role={role} />
                </ProtectedRoute>
              }
            />
          )
        )}

        {/* Catch all inside protected layout */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Global catch all fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
