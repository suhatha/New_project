import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaCube,
  FaTruck,
  FaBuilding,
  FaBarcode,
  FaUsers,
  FaUserShield,
  FaUserTie,
  FaUserCog,
  FaUser,
  FaTools,
  FaCashRegister,
  FaCarSide,
  FaList,
  FaCarAlt,
  FaPaintBrush,
  FaFileInvoice,
  FaClipboardList,
  FaSignOutAlt,
  FaCogs,
  FaDoorOpen,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  // Dropdown states
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [jobCardOpen, setJobCardOpen] = useState(false);
  const [salesInventoryOpen, setSalesInventoryOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setRole(storedUser?.role || "guest");
  }, []);

  const hasFullAccess = ["super_admin", "admin", "manager"].includes(role);

  const navItem = (Icon, label, path) => (
    <li
      key={label}
      className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white/20 cursor-pointer transition-colors"
      onClick={() => navigate(path)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(path)}
      role="link"
      aria-label={`Go to ${label}`}
    >
      <Icon className="min-w-[20px]" />
      <span className="truncate">{label}</span>
    </li>
  );

  return (
    <nav className="w-64 h-screen text-white relative flex flex-col shadow-xl select-none">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/car.jpg')", filter: "brightness(0.7)" }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div
          className="flex items-center justify-center gap-2 py-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 shadow-md text-white text-2xl font-bold cursor-pointer select-none"
          onClick={() => navigate("/dashboard")}
        >
          <FaCarSide className="text-3xl" />
          <span>Master</span>
        </div>

        {/* Navigation */}
        <div className="flex-grow bg-black/60 p-4 overflow-y-auto m-3 rounded-b-lg">
          <ul className="space-y-3">
            {navItem(FaTachometerAlt, "Dashboard", "/dashboard")}

            {/* Inventory */}
            {hasFullAccess && (
              <li>
                <button onClick={() => setInventoryOpen(!inventoryOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                  <div className="flex items-center gap-3">
                    <FaBox />
                    <span>Inventory</span>
                  </div>
                  <span>{inventoryOpen ? "▲" : "▼"}</span>
                </button>
                {inventoryOpen && (
                  <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                    {navItem(FaCube, "Item", "/item")}
                    {navItem(FaBox, "Unit", "/unit")}
                    {navItem(FaTruck, "Supplier", "/supplier")}
                    {navItem(FaBuilding, "Company", "/company")}
                    {navItem(FaBarcode, "Barcode", "/barcode")}
                  </ul>
                )}
              </li>
            )}

            {/* Users */}
            {hasFullAccess && (
              <li>
                <button onClick={() => setUsersOpen(!usersOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                  <div className="flex items-center gap-3">
                    <FaUsers />
                    <span>Users</span>
                  </div>
                  <span>{usersOpen ? "▲" : "▼"}</span>
                </button>
                {usersOpen && (
                  <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                    {navItem(FaUserShield, "Admin", "/admin")}
                    {navItem(FaUserTie, "Manager", "/manager")}
                    {navItem(FaUserCog, "Accountant", "/accountant")}
                    {navItem(FaUser, "Cashier", "/cashier")}
                    {navItem(FaUserTie, "Supervisor", "/supervisor")}
                  </ul>
                )}
              </li>
            )}

            {/* Services - all roles */}
            {navItem(FaTools, "Services", "/services")}

            {/* Vehicles */}
            {hasFullAccess && (
              <li>
                <button onClick={() => setVehicleOpen(!vehicleOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                  <div className="flex items-center gap-3">
                    <FaCarAlt />
                    <span>Vehicles</span>
                  </div>
                  <span>{vehicleOpen ? "▲" : "▼"}</span>
                </button>
                {vehicleOpen && (
                  <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                    {navItem(FaList, "Vehicle List", "/vehicle-list")}
                    {navItem(FaCarAlt, "Vehicle Type List", "/vehicle-type")}
                    {navItem(FaCarSide, "Vehicle Brand List", "/vehicle-brand")}
                    {navItem(FaPaintBrush, "Colours", "/vehicle-colours")}
                  </ul>
                )}
              </li>
            )}

            {/* Quotation - all roles */}
            {navItem(FaFileInvoice, "Quotation", "/quotation")}

            {/* Sales Inventory */}
            {hasFullAccess && (
              <li>
                <button onClick={() => setSalesInventoryOpen(!salesInventoryOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                  <div className="flex items-center gap-3">
                    <FaCashRegister />
                    <span>Sales Inventory</span>
                  </div>
                  <span>{salesInventoryOpen ? "▲" : "▼"}</span>
                </button>
                {salesInventoryOpen && (
                  <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                    {navItem(FaCube, "Item", "/item")}
                  </ul>
                )}
              </li>
            )}

            {/* Job Card - all roles */}
            <li>
              <button onClick={() => setJobCardOpen(!jobCardOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                <div className="flex items-center gap-3">
                  <FaClipboardList />
                  <span>Job Card</span>
                </div>
                <span>{jobCardOpen ? "▲" : "▼"}</span>
              </button>
              {jobCardOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                  {navItem(FaClipboardList, "Job Card", "/job-card")}
                  {navItem(FaDoorOpen, "Gate Pass", "/gate-pass")}
                </ul>
              )}
            </li>

            {/* Settings & Logout - all roles */}
            {navItem(FaCogs, "Settings", "/settings")}
            {navItem(FaSignOutAlt, "Logout", "/logout")}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
