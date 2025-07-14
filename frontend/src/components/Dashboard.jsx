// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaUsers,
  FaTruck,
  FaBox,
  FaTools,
  FaSignOutAlt,
  FaBuilding,
} from "react-icons/fa";
import Calendar from "./Calendar"; // adjust path if needed
import axios from "axios";

const Dashboard = ({ role }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const Title = ({ children }) => (
    <h2 className="text-xl font-bold mb-4 text-blue-700">{children}</h2>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
          {role.replace("_", " ").toUpperCase()} Dashboard
        </h1>
        
      </div>

      {/* Role-Based Content */}
      {role === "super_admin" && (
        <div className="space-y-6">
          <Title>👑 Full Access</Title>
          <p>You have access to everything.</p>
          <Calendar />
        </div>
      )}

      {role === "admin" && (
        <div className="space-y-6">
          <Title>📋 Admin Panel</Title>
          <p>You can manage users and view reports.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card icon={<FaUserTie />} label="Employees" />
            <Card icon={<FaUsers />} label="Customers" />
            <Card icon={<FaBox />} label="Products" />
          </div>
        </div>
      )}

      {role === "manager" && (
        <div className="space-y-6">
          <Title>🧑‍💼 Team Management</Title>
          <p>You can manage teams and assign tasks.</p>
          <Calendar />
        </div>
      )}

      {role === "branch_manager" && (
        <div className="space-y-6">
          <Title>🏢 Branch Operations</Title>
          <p>You can manage branch-level operations.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card icon={<FaTruck />} label="Suppliers" />
            <Card icon={<FaBuilding />} label="Branch Details" />
          </div>
        </div>
      )}

      {role === "cashier" && (
        <div className="space-y-6">
          <Title>💰 Cashier Panel</Title>
          <p>You can process transactions and invoices.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card icon={<FaBox />} label="Items" />
            <Card icon={<FaTools />} label="Services" />
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Card Component
const Card = ({ icon, label }) => (
  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-5 rounded-xl shadow-md text-center">
    <div className="text-2xl mb-2">{icon}</div>
    <h4 className="text-lg font-semibold">{label}</h4>
  </div>
);

export default Dashboard;
