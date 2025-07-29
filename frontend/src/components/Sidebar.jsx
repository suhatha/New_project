import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePageContext } from "../context/PageContext";
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
  FaCalendar,
  FaTags,
  FaMapMarker,
  FaChartLine,
  FaShoppingCart,
  FaCalculator,
  FaUndo,
  FaShoppingBag,
  FaCalendarAlt,
  FaCamera,
  FaClock,
  FaFileAlt,
  FaExchangeAlt,
  FaCreditCard,
  FaShieldAlt,
  FaMoneyBillWave,
  FaReceipt,
  FaBook,
  FaChartPie,
  FaBalanceScale,
  FaClipboardCheck,
  FaUsersCog,
  FaFingerprint,
  FaCloud,
  FaNetworkWired,
  FaServer,
  FaChartBar,
  FaBoxes,
  FaExclamationTriangle,
  FaCalendarTimes,
  FaTrash,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const { updateCurrentPage } = usePageContext();
  const [role, setRole] = useState("");

  // Dropdown states
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [purchasingOpen, setPurchasingOpen] = useState(false);
  const [jobOrderOpen, setJobOrderOpen] = useState(false);
  const [invoicingOpen, setInvoicingOpen] = useState(false);
  const [vehicleCustomerOpen, setVehicleCustomerOpen] = useState(false);
  const [accountingOpen, setAccountingOpen] = useState(false);
  const [hrPayrollOpen, setHrPayrollOpen] = useState(false);
  const [multiBranchOpen, setMultiBranchOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setRole(storedUser?.role || "guest");
  }, []);

  const hasFullAccess = ["super_admin", "admin", "manager"].includes(role);

  const navItem = (Icon, label, path) => (
    <li
      key={label}
      className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white/20 cursor-pointer transition-colors"
      onClick={() => {
        navigate(path);
        updateCurrentPage(label);
      }}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && (navigate(path), updateCurrentPage(label))}
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
          className="flex flex-col items-center justify-center py-6 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg cursor-pointer select-none hover:animate-pulse"
          onClick={() => navigate("/dashboard")}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <FaCarSide className="text-4xl text-red-600 hover:animate-bounce" />
              <FaCogs className="text-2xl text-red-600 absolute -top-1 -right-1 hover:animate-spin" />
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-800">IMSS</div>
              <div className="text-sm font-semibold text-gray-700">
                <span className="font-bold">Auto</span>Suite
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-600 font-medium">
            All-in-One Solution for Smarter Garages
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-grow bg-black/60 p-4 overflow-y-auto m-3 rounded-b-lg">
          <ul className="space-y-3">
            {/* I. Dashboard */}
            {navItem(FaTachometerAlt, "Dashboard", "/dashboard")}

            {/* II. Branch Management */}
            {navItem(FaBuilding, "Branch Management", "/branch-management")}

            {/* III. Inventory */}
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
                  {navItem(FaCalendar, "Expiry", "/expiry")}
                  {navItem(FaTruck, "Supplier", "/supplier")}
                  {navItem(FaTags, "Category", "/category")}
                  {navItem(FaBuilding, "Company", "/company")}
                  {navItem(FaBox, "Unit", "/unit")}
                  {navItem(FaMapMarker, "Store Location", "/store-location")}
                  {navItem(FaBarcode, "Barcode", "/barcode")}
                  {navItem(FaChartLine, "Item Age Analyze", "/item-age-analyze")}
                </ul>
              )}
            </li>

            {/* IV. Sales */}
            <li>
              <button onClick={() => setSalesOpen(!salesOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                <div className="flex items-center gap-3">
                  <FaCashRegister />
                  <span>Sales</span>
                </div>
                <span>{salesOpen ? "▲" : "▼"}</span>
              </button>
              {salesOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                  {navItem(FaShoppingCart, "Sales", "/sales")}
                  {navItem(FaCalculator, "Tax", "/tax")}
                  {navItem(FaUndo, "Sales Return", "/sales-return")}
                  {navItem(FaUsers, "Customers", "/customers")}
                  {navItem(FaFileInvoice, "Quotation", "/quotation")}
                </ul>
              )}
            </li>

            {/* V. Purchasing */}
            <li>
              <button onClick={() => setPurchasingOpen(!purchasingOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                <div className="flex items-center gap-3">
                  <FaShoppingBag />
                  <span>Purchasing</span>
                </div>
                <span>{purchasingOpen ? "▲" : "▼"}</span>
              </button>
              {purchasingOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                  {navItem(FaShoppingBag, "Purchasing", "/purchasing")}
                  {navItem(FaClipboardList, "Purchase Order", "/purchase-order")}
                  {navItem(FaUndo, "Purchase Return", "/purchase-return")}
                </ul>
              )}
            </li>

            {/* VI. Job Order & Service Workflow */}
            <li>
              <button onClick={() => setJobOrderOpen(!jobOrderOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                <div className="flex items-center gap-3">
                  <FaClipboardList />
                  <span>Job Order & Service Workflow</span>
                </div>
                <span>{jobOrderOpen ? "▲" : "▼"}</span>
              </button>
              {jobOrderOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                  {navItem(FaCalendarAlt, "Job Scheduler", "/job-scheduler")}
                  {navItem(FaCogs, "Service Bay Assignment", "/service-bay")}
                  {navItem(FaTools, "Parts Estimation, Labor Costing", "/parts-estimation")}
                  {navItem(FaCamera, "Photo Upload for Damages", "/photo-upload")}
                  {navItem(FaClock, "Technician Time Tracking", "/technician-tracking")}
                </ul>
              )}
            </li>

            {/* VII. Invoicing */}
            <li>
              <button onClick={() => setInvoicingOpen(!invoicingOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                <div className="flex items-center gap-3">
                  <FaFileInvoice />
                  <span>Invoicing</span>
                </div>
                <span>{invoicingOpen ? "▲" : "▼"}</span>
              </button>
              {invoicingOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                  {navItem(FaFileAlt, "Quotation Templates", "/quotation-templates")}
                  {navItem(FaExchangeAlt, "Quote to Job Orders", "/quote-to-job")}
                  {navItem(FaCreditCard, "Multi-mode Payment Support", "/payment-support")}
                </ul>
              )}
            </li>

            {/* VIII. Vehicle & Customer Management */}
            <li>
              <button onClick={() => setVehicleCustomerOpen(!vehicleCustomerOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                <div className="flex items-center gap-3">
                  <FaCarSide />
                  <span>Vehicle & Customer Management</span>
                </div>
                <span>{vehicleCustomerOpen ? "▲" : "▼"}</span>
              </button>
              {vehicleCustomerOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                  {navItem(FaUser, "Vehicle Profiles", "/vehicle-profiles")}
                  {navItem(FaShieldAlt, "Insurance, Warranty & Reminder Setup", "/insurance-warranty")}
                </ul>
              )}
            </li>

            {/* IX. Accounting System */}
            <li>
              <button onClick={() => setAccountingOpen(!accountingOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                <div className="flex items-center gap-3">
                  <FaCalculator />
                  <span>Accounting System</span>
                </div>
                <span>{accountingOpen ? "▲" : "▼"}</span>
              </button>
              {accountingOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                  {navItem(FaMoneyBillWave, "Payment Voucher", "/payment-voucher")}
                  {navItem(FaReceipt, "Receipt Voucher", "/receipt-voucher")}
                  {navItem(FaBook, "Ledger", "/ledger")}
                  {navItem(FaFileAlt, "Statement", "/statement")}
                  {navItem(FaChartPie, "Profit and Loss", "/profit-loss")}
                  {navItem(FaBalanceScale, "Balance Sheet", "/balance-sheet")}
                  {navItem(FaClipboardCheck, "Trial Balance", "/trial-balance")}
                </ul>
              )}
            </li>

            {/* X. HR & Payroll Management */}
            <li>
              <button onClick={() => setHrPayrollOpen(!hrPayrollOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                <div className="flex items-center gap-3">
                  <FaUsersCog />
                  <span>HR & Payroll Management</span>
                </div>
                <span>{hrPayrollOpen ? "▲" : "▼"}</span>
              </button>
              {hrPayrollOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                  {navItem(FaFingerprint, "Attendance via Biometric or Mobile App", "/attendance")}
                  {navItem(FaCalendarAlt, "Shift Planning", "/shift-planning")}
                  {navItem(FaMoneyBillWave, "Monthly Payroll with Advance, Loans & Deductions", "/payroll")}
                </ul>
              )}
            </li>

            {/* XI. Multi-Branch & Cloud Access */}
            <li>
              <button onClick={() => setMultiBranchOpen(!multiBranchOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                <div className="flex items-center gap-3">
                  <FaCloud />
                  <span>Multi-Branch & Cloud Access</span>
                </div>
                <span>{multiBranchOpen ? "▲" : "▼"}</span>
              </button>
              {multiBranchOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                  {navItem(FaNetworkWired, "Manage Unlimited Locations & Franchises", "/branch-locations")}
                  {navItem(FaTachometerAlt, "Central Dashboard for Owners", "/owner-dashboard")}
                  {navItem(FaServer, "Cloud-based or On-Premise Hosting", "/cloud-hosting")}
                </ul>
              )}
            </li>

            {/* XII. Advanced Analytics & Reporting */}
            <li>
              <button onClick={() => setAnalyticsOpen(!analyticsOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                <div className="flex items-center gap-3">
                  <FaChartBar />
                  <span>Advanced Analytics & Reporting</span>
                </div>
                <span>{analyticsOpen ? "▲" : "▼"}</span>
              </button>
              {analyticsOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                  {navItem(FaTachometerAlt, "Real-Time Dashboard", "/real-time-dashboard")}
                  {navItem(FaBoxes, "Stock & Movements Report", "/stock-movements")}
                  {navItem(FaExclamationTriangle, "Low Stock & Fast-moving Alerts", "/stock-alerts")}
                  {navItem(FaChartLine, "Bill-wise & Service-wise Profit Reports", "/profit-reports")}
                  {navItem(FaCalendarAlt, "Daily, Weekly, Monthly Sales Insights", "/sales-insights")}
                  {navItem(FaCalendarTimes, "Non-Sales Day Analysis", "/non-sales-analysis")}
                  {navItem(FaTrash, "Recycle Bin with Audit Trail", "/recycle-bin")}
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
