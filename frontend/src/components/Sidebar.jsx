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
  FaUserGraduate,
  FaTools,
  FaCashRegister,
  FaCarSide,
  FaList,
  FaCarAlt,
  FaPaintBrush,
  FaFileInvoice,
  FaClipboardList,
  FaSignOutAlt,
  FaCog,
  FaCogs,
  FaDoorOpen,
  FaCalendar,
  FaCalendarCheck,
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
  FaFileExport,
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
  FaSync,
  FaFileContract
} from "react-icons/fa";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Sidebar Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500">
          <h3>Something went wrong with the sidebar.</h3>
          <p>{this.state.error?.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const Sidebar = () => {
  const navigate = useNavigate();
  const { updateCurrentPage } = usePageContext();
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]); // <-- FIX: add permissions state

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
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  // DEBUG: Add a test button to verify state
  // Remove after debugging
  // <button onClick={() => setUserManagementOpen(!userManagementOpen)}>Toggle User Management (debug)</button>

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setRole(storedUser?.role || "guest");
    // Fetch permissions for the current user's role_id
    if (storedUser?.role_id) {
      import('axios').then(({default: axios}) => {
        axios.get(`http://localhost:8000/api/role-permissions/${storedUser.role_id}`)
          .then(res => setPermissions(res.data.current_permissions || []))
          .catch(() => setPermissions([]));
      });
    }
  }, []);

  // Step 2: canView helper
  const canView = (moduleName) => {
    const norm = (s) => s?.toString().toLowerCase().trim();
    const perm = permissions.find(p => norm(p.module_name) === norm(moduleName));
    return perm?.can_view;
  };

  const hasFullAccess = ["super_admin", "admin", "manager", "user"].includes(role);

  const navItem = (Icon, label, path) => (
    <li
      key={label}

      className="group"
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-200"
        onClick={() => {
          navigate(path);
          updateCurrentPage(label);
        }}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && (navigate(path), updateCurrentPage(label))}
        role="link"
        aria-label={`Go to ${label}`}
      >
        <Icon className="w-5 h-5 flex-shrink-0 text-blue-300 group-hover:text-white transition-colors" />
        <span className="font-medium text-sm text-gray-200 group-hover:text-white transition-colors">{label}</span>
      </div>

    </li>
  );

  // Add null check for updateCurrentPage
  const safeUpdateCurrentPage = (label) => {
    try {
      if (updateCurrentPage && typeof updateCurrentPage === 'function') {
        updateCurrentPage(label);
      }
    } catch (error) {
      console.error('Error updating page:', error);
    }
  };

  return (

    <ErrorBoundary>
    <nav className="w-64 h-screen text-white relative flex flex-col shadow-xl select-none bg-gray-900">
      <div className="flex flex-col h-full">
        {/* Branding Area - Improved */}

        <div
          className="flex items-center justify-start p-4 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => navigate("/dashboard")}
        >
          <div className="flex-shrink-0 mr-3">
            <div className="relative">
              <FaCarSide className="text-3xl text-white" />
              <FaCogs className="text-xl text-amber-300 absolute -top-1 -right-2" />
            </div>
          </div>
          <div className="text-left">
            <div className="flex items-baseline">
              <h1 className="text-2xl font-bold text-white">IMSS</h1>
              <span className="ml-2 text-lg font-semibold text-amber-300">AutoSuite</span>
            </div>
            <p className="text-xs text-blue-100 mt-0.5">
              All-in-One Solution for Smarter Garages
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-grow bg-gray-800 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {/* I. Dashboard */}
            {/* I. Dashboard */}
            {navItem(FaTachometerAlt, "Dashboard", "/dashboard")}

            {/* II. Branch Management */}
            {navItem(FaBuilding, "Branch Management", "/branch-management")}


            {/* III. User Management Dropdown */}
            <li>
              <button onClick={() => setUserManagementOpen(!userManagementOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">
                <div className="flex items-center gap-3">
                  <FaUsersCog />
                  <span>User Management</span>
                </div>
                <span>{userManagementOpen ? "▲" : "▼"}</span>
              </button>
              {userManagementOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                  {navItem(FaUsers, "Users", "/users")}
                  {navItem(FaUserShield, "Roles", "/roles")}
                </ul>
              )}
            </li>

            {/* IV. Inventory */}
            <li>
              <button onClick={() => setInventoryOpen(!inventoryOpen)} className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-white/20">

                <div className="flex items-center gap-3">
                  <FaBox className="w-5 h-5 text-blue-300" />
                  <span className="font-medium text-sm">Inventory</span>
                </div>
                <span className={`transition-transform duration-200 ${inventoryOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {inventoryOpen && (

                <ul className="pl-8 py-2 space-y-1 mt-1 border-l-2 border-blue-500/20 ml-4">
                  {navItem(FaCube, "Items", "/item")}
                  {navItem(FaCalendar, "Expiry Tracking", "/expiry")}
                  {navItem(FaTruck, "Suppliers", "/supplier")}
                  {navItem(FaTags, "Categories", "/category")}
                  {navItem(FaBuilding, "Companies", "/company")}
                  {navItem(FaBox, "Units", "/unit")}
                  {navItem(FaMapMarker, "Store Locations", "/store-location")}
                  {navItem(FaBarcode, "Barcodes", "/barcode")}
                  {navItem(FaChartLine, "Item Age Analysis", "/item-age-analysis")}

                </ul>
              )}
            
            </li>

            {/* IV. Sales */}
            <li className="mb-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSalesOpen(!salesOpen);
                }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <FaCashRegister className="w-5 h-5 text-blue-300" />
                  <span className="font-medium text-sm">Sales</span>
                </div>
                <span className={`transition-transform duration-200 ${salesOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {salesOpen && (
                <ul className="pl-8 py-2 space-y-1 mt-1 border-l-2 border-blue-500/20 ml-4">
                  {navItem(FaShoppingCart, "Sales", "/sales")}
                  {navItem(FaCalculator, "Tax Management", "/tax-management")}
                  {navItem(FaUndo, "Sales Returns", "/sales-return")}
                  {navItem(FaUsers, "Customers", "/customer-management")}
                  {navItem(FaFileInvoice, "Quotations", "/quotation")}
                </ul>
              )}
            </li>

            {/* V. Purchasing */}
            <li className="mb-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setPurchasingOpen(!purchasingOpen);
                }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <FaShoppingBag className="w-5 h-5 text-blue-300" />
                  <span className="font-medium text-sm">Purchasing</span>
                </div>
                <span className={`transition-transform duration-200 ${purchasingOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {purchasingOpen && (
                <ul className="pl-8 py-2 space-y-1 mt-1 border-l-2 border-blue-500/20 ml-4">
                  {navItem(FaShoppingBag, "Purchase Orders", "/purchase-orders")}
                  {navItem(FaUndo, "Purchase Returns", "/purchase-return")}
                  {navItem(FaFileInvoice, "Bills", "/bills")}
                  {navItem(FaFileAlt, "Purchase Reports", "/purchase-reports")}
                </ul>
              )}
            </li>

            {/* VI. Job Order */}
            <li className="mb-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setJobOrderOpen(!jobOrderOpen);
                }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <FaTools className="w-5 h-5 text-blue-300" />
                  <span className="font-medium text-sm">Job Order</span>
                </div>
                <span className={`transition-transform duration-200 ${jobOrderOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {jobOrderOpen && (
                <ul className="pl-10 pt-2 space-y-2 text-white/90 bg-white/10 rounded">
                  {navItem(FaCalendarAlt, "Job Scheduler", "/job-scheduler")}

                  {navItem(FaTools, "Service Workflow", "/service-workflow")}
                  {navItem(FaCogs, "Service Bay Assignment", "/service-bay")}
                  {navItem(FaTools, "Parts Estimation, Labor Costing", "/parts-estimation")}
                  {navItem(FaCamera, "Photo Upload for Damages", "/photo-upload")}
                  {navItem(FaClock, "Technician Time Tracking", "/technician-tracking")}

                </ul>
              )}
            </li>

            {/* VII. Invoicing */}
            <li className="mb-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setInvoicingOpen(!invoicingOpen);
                }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <FaFileInvoice className="w-5 h-5 text-blue-300" />
                  <span className="font-medium text-sm">Invoicing</span>
                </div>
                <span className={`transition-transform duration-200 ${invoicingOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {invoicingOpen && (
                <ul className="pl-8 py-2 space-y-1 mt-1 border-l-2 border-blue-500/20 ml-4">
                  {navItem(FaFileAlt, "Quotation Templates", "/quotation-templates")}
                  {navItem(FaExchangeAlt, "Quote to Job", "/quote-to-job")}
                  {navItem(FaCreditCard, "Payment Support", "/payment-support")}
                </ul>
              )}
            </li>

            {/* VIII. Vehicle & Customer */}
            <li className="mb-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setVehicleCustomerOpen(!vehicleCustomerOpen);
                }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <FaCarAlt className="w-5 h-5 text-blue-300" />
                  <span className="font-medium text-sm">Vehicle & Customer</span>
                </div>
                <span className={`transition-transform duration-200 ${vehicleCustomerOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {vehicleCustomerOpen && (
                <ul className="pl-8 py-2 space-y-1 mt-1 border-l-2 border-blue-500/20 ml-4">
                  {navItem(FaUser, "Vehicle Profiles", "/vehicle-profiles")}
                  {navItem(FaShieldAlt, "Insurance & Warranty", "/insurance-warranty")}
                  {navItem(FaHistory, "Service History", "/service-history")}
                  {navItem(FaBell, "Service Reminders", "/service-reminders")}
                </ul>
              )}
            </li>

            {/* IX. Accounting */}
            <li className="mb-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setAccountingOpen(!accountingOpen);
                }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <FaMoneyBillWave className="w-5 h-5 text-blue-300" />
                  <span className="font-medium text-sm">Accounting</span>
                </div>
                <span className={`transition-transform duration-200 ${accountingOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {accountingOpen && (
                <ul className="pl-8 py-2 space-y-1 mt-1 border-l-2 border-blue-500/20 ml-4">
                  {navItem(FaMoneyBillWave, "Payment Voucher", "/payment-voucher")}
                  {navItem(FaReceipt, "Receipt Voucher", "/receipt-voucher")}
                  {navItem(FaBook, "General Ledger", "/ledger")}
                  {navItem(FaFileAlt, "Financial Statements", "/statements")}
                  {navItem(FaChartPie, "Profit & Loss", "/profit-loss")}
                  {navItem(FaBalanceScale, "Balance Sheet", "/balance-sheet")}
                  {navItem(FaClipboardCheck, "Trial Balance", "/trial-balance")}
                  {navItem(FaExchangeAlt, "Bank Reconciliation", "/bank-reconciliation")}
                </ul>
              )}
            </li>

            {/* X. HR & Payroll */}
            <li className="mb-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setHrPayrollOpen(!hrPayrollOpen);
                }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <FaUsersCog className="w-5 h-5 text-blue-300" />
                  <span className="font-medium text-sm">HR & Payroll</span>
                </div>
                <span className={`transition-transform duration-200 ${hrPayrollOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {hrPayrollOpen && (
                <ul className="pl-8 py-2 space-y-1 mt-1 border-l-2 border-blue-500/20 ml-4">
                  {navItem(FaUserTie, "Employees", "/employees")}
                  {navItem(FaFingerprint, "Attendance", "/attendance")}
                  {navItem(FaCalendarAlt, "Shift Planning", "/shift-planning")}
                  {navItem(FaCalendarCheck, "Leave Management", "/leave-management")}
                  {navItem(FaMoneyBillWave, "Payroll", "/payroll")}
                  {navItem(FaFileContract, "Employee Contracts", "/employee-contracts")}
                  {navItem(FaUserGraduate, "Training & Development", "/training")}
                </ul>
              )}
            </li>

            {/* XI. Multi-Branch & Cloud Access */}
            <li className="mb-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setMultiBranchOpen(!multiBranchOpen);
                }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <FaNetworkWired className="w-5 h-5 text-blue-300" />
                  <span className="font-medium text-sm">Multi-Branch & Cloud</span>
                </div>
                <span className={`transition-transform duration-200 ${multiBranchOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {multiBranchOpen && (
                <ul className="pl-8 py-2 space-y-1 mt-1 border-l-2 border-blue-500/20 ml-4">
                  {navItem(FaNetworkWired, "Branch Management", "/branch-management")}
                  {navItem(FaExchangeAlt, "Inter-Branch Transfers", "/interbranch-transfers")}
                  {navItem(FaTachometerAlt, "Owner Dashboard", "/owner-dashboard")}
                  {navItem(FaServer, "Cloud Hosting", "/cloud-hosting")}
                  {navItem(FaSync, "Data Sync Status", "/data-sync")}
                </ul>
              )}
            </li>

            {/* XII. Analytics */}
            <li className="mb-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setAnalyticsOpen(!analyticsOpen);
                }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <FaChartBar className="w-5 h-5 text-blue-300" />
                  <span className="font-medium text-sm">Analytics</span>
                </div>
                <span className={`transition-transform duration-200 ${analyticsOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {analyticsOpen && (
                <ul className="pl-8 py-2 space-y-1 mt-1 border-l-2 border-blue-500/20 ml-4">
                  <li className="text-xs font-semibold text-blue-200 uppercase tracking-wider px-4 py-1">Business Insights</li>
                  {navItem(FaTachometerAlt, "Real-Time Dashboard", "/dashboard")}
                  {navItem(FaChartLine, "Sales Performance", "/analytics/sales")}
                  {navItem(FaChartPie, "Revenue Analysis", "/analytics/revenue")}
                  
                  <li className="text-xs font-semibold text-blue-200 uppercase tracking-wider px-4 py-1 mt-2">Inventory</li>
                  {navItem(FaBoxes, "Stock & Movements", "/analytics/stock")}
                  {navItem(FaExclamationTriangle, "Low Stock Alerts", "/analytics/low-stock")}
                  {navItem(FaChartBar, "Inventory Turnover", "/analytics/turnover")}
                  
                  <li className="text-xs font-semibold text-blue-200 uppercase tracking-wider px-4 py-1 mt-2">Service</li>
                  {navItem(FaTools, "Service Performance", "/analytics/service")}
                  {navItem(FaUserCog, "Technician Productivity", "/analytics/technicians")}
                  {navItem(FaCalendarCheck, "Appointment Analysis", "/analytics/appointments")}
                  
                  <li className="text-xs font-semibold text-blue-200 uppercase tracking-wider px-4 py-1 mt-2">Advanced</li>
                  {navItem(FaFileExport, "Export Reports", "/analytics/export")}
                  {navItem(FaCog, "Custom Reports", "/analytics/custom")}
                </ul>
              )}
            </li>

            {/* XIII. Settings & Logout */}
            <li className="pt-4 mt-4 border-t border-white/10">
              <div className="space-y-1">
                <div className="group">
                  <div 
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-200"
                    onClick={() => navigate("/settings")}
                  >
                    <FaCog className="w-5 h-5 text-blue-400 group-hover:text-blue-100 transition-colors" />
                    <span className="font-medium text-sm text-gray-200 group-hover:text-white">Settings</span>
                  </div>
                </div>
                <div className="group">
                  <div 
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-red-600 hover:text-white cursor-pointer transition-all duration-200"
                    onClick={() => {
                      // Handle logout logic here
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      navigate('/login');
                    }}
                  >
                    <FaSignOutAlt className="w-5 h-5 text-red-400 group-hover:text-red-100 transition-colors" />
                    <span className="font-medium text-sm text-red-200 group-hover:text-white">Logout</span>
                  </div>
                </div>
                
                {/* User Profile */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                      {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name?.charAt(0) || 'U' : 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name || 'User' : 'User'}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role?.replace('_', ' ') || 'User' : 'User'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </ErrorBoundary>
  );
};

export default Sidebar;
