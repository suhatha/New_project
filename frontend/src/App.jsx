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
import BranchManagement from "./components/BranchManagement";
import Expiry from "./components/Expiry";
import Supplier from "./components/Supplier";
import Category from "./components/Category";
import Company from "./components/Company";
import Unit from "./components/Unit";
import StoreLocation from "./components/StoreLocation";
import Barcode from "./components/Barcode";
import ItemAgeAnalysis from "./components/ItemAgeAnalysis";
import Sales from "./components/Sales";
import TaxManagement from "./components/TaxManagement";
import SalesReturn from "./components/SalesReturn";
import CustomerManagement from "./components/CustomerManagement";
import Purchasing from "./components/Purchasing";
import PurchaseOrder from "./components/PurchaseOrder";
import Quotation from "./components/Quotation";
import JobScheduler from "./components/JobScheduler";
import ServiceBay from "./components/ServiceBay";
import PartsEstimation from "./components/PartsEstimation";
import PhotoUpload from "./components/PhotoUpload";
import TechnicianTracking from "./components/TechnicianTracking";
import QuotationTemplates from "./components/QuotationTemplates";
import QuoteToJob from "./components/QuoteToJob";
import PaymentSupport from "./components/PaymentSupport";
import VehicleProfiles from "./components/VehicleProfiles";
import InsuranceWarranty from "./components/InsuranceWarranty";
import PaymentVoucher from "./components/PaymentVoucher";
import ReceiptVoucher from "./components/ReceiptVoucher";
import Ledger from "./components/Ledger";
import Statement from "./components/Statement";
import ProfitLoss from "./components/ProfitLoss";
import BalanceSheet from "./components/BalanceSheet";
import TrialBalance from "./components/TrialBalance";
import Attendance from "./components/Attendance";
import ShiftPlanning from "./components/ShiftPlanning";
import Payroll from "./components/Payroll";
import BranchLocations from "./components/BranchLocations";
import OwnerDashboard from "./components/OwnerDashboard";
import CloudHosting from "./components/CloudHosting";
import { PageProvider } from "./context/PageContext";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import RolePermissions from "./components/RolePermissions";

import SalesEntry from "./components/SalesEntry";

import ServiceWorkflow from './components/ServiceWorkflow';



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
    <PageProvider>
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
        <Route 
          path="service-workflow" 
          element={
            <ProtectedRoute>
              <ServiceWorkflow />
            </ProtectedRoute>
          } 
        />

        {/* Item management routes */}
        <Route path="item" element={<ItemTable />} />
        <Route path="item-form" element={<ItemFormWrapper />} />

        {/* Branch Management route */}
        <Route path="branch-management" element={<BranchManagement />} />

        {/* Expiry route - Added key to prevent flashing */}
        <Route path="expiry" element={<React.StrictMode><Expiry key="expiry-component" /></React.StrictMode>} />

        {/* Supplier route */}
        <Route path="supplier" element={<Supplier />} />

        {/* Category route */}
        <Route path="category" element={<Category />} />

        {/* Company route */}
        <Route path="company" element={<Company />} />

        {/* Unit route */}
        <Route path="unit" element={<Unit />} />

        {/* Store Location route */}
        <Route path="store-location" element={<StoreLocation />} />

        {/* Barcode route */}
        <Route path="barcode" element={<Barcode />} />

        {/* Item Age Analysis route */}
        <Route path="item-age-analysis" element={<ItemAgeAnalysis />} />

        {/* Sales route */}
        <Route path="sales" element={<Sales />} />

        {/* Tax Management route */}
        <Route path="tax-management" element={<TaxManagement />} />

        {/* Sales Return route */}
        <Route path="sales-return" element={<SalesReturn />} />

        {/* Customer Management route */}
        <Route path="customer-management" element={<CustomerManagement />} />

        {/* Purchasing route */}
        <Route path="purchasing" element={<Purchasing />} />

        {/* Purchase Order route */}
        <Route path="purchase-order" element={<PurchaseOrder />} />

        {/* Quotation route */}
        <Route path="quotation" element={<Quotation />} />

        {/* Job Scheduler route */}
        <Route path="job-scheduler" element={<JobScheduler />} />

        {/* Service Bay route */}
        <Route path="service-bay" element={<ServiceBay />} />

        {/* Parts Estimation route */}
        <Route path="parts-estimation" element={<PartsEstimation />} />

        {/* Photo Upload route */}
        <Route path="photo-upload" element={<PhotoUpload />} />

        {/* Technician Tracking route */}
        <Route path="technician-tracking" element={<TechnicianTracking />} />

        {/* Quotation Templates route */}
        <Route path="quotation-templates" element={<QuotationTemplates />} />

        {/* Quote to Job route */}
        <Route path="quote-to-job" element={<QuoteToJob />} />

        {/* Payment Support route */}
        <Route path="payment-support" element={<PaymentSupport />} />

        {/* User Management route */}
        <Route path="users" element={<UserManagement />} />

        {/* Vehicle Profiles route */}
        <Route path="vehicle-profiles" element={<VehicleProfiles />} />

        {/* Role Management route */}
        <Route path="roles" element={<RoleManagement />} />

        {/* Role Permissions route */}
        <Route path="role-permissions/:roleId" element={<RolePermissions />} />

        {/* Insurance Warranty route */}
        <Route path="insurance-warranty" element={<InsuranceWarranty />} />

        {/* Accounting Routes */}
        <Route path="payment-voucher" element={<PaymentVoucher />} />
        <Route path="receipt-voucher" element={<ReceiptVoucher />} />
        <Route path="ledger" element={<Ledger />} />
        <Route path="statement" element={<Statement />} />
        <Route path="profit-loss" element={<ProfitLoss />} />
        <Route path="balance-sheet" element={<BalanceSheet />} />
        <Route path="trial-balance" element={<TrialBalance />} />

        {/* HR & Payroll Routes */}
        <Route path="attendance" element={<Attendance />} />
        <Route path="shift-planning" element={<ShiftPlanning />} />
        <Route path="payroll" element={<Payroll />} />

        {/* Multi-Branch & Cloud Access Routes */}
        <Route path="branch-locations" element={<BranchLocations />} />
        <Route path="owner-dashboard" element={<OwnerDashboard />} />
        <Route path="cloud-hosting" element={<CloudHosting />} />

        {/* Explicit role-based dashboards */}
        {["super_admin", "admin", "manager", "branch_manager", "cashier"].map(
          (role) => (
            <Route
              key={role}
              path={role}
              element={
                <Dashboard role={role} />
              }
            />
          )
        )}

        {/* Sales Entry route */}
        <Route path="sales-entry" element={<SalesEntry />} />

        {/* Catch all inside protected layout */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Global catch all fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </PageProvider>
  );
}

export default App;
