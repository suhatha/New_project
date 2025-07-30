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

        {/* Branch Management route */}
        <Route
          path="branch-management"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <BranchManagement />
            </ProtectedRoute>
          }
        />

        {/* Expiry route */}
        <Route
          path="expiry"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Expiry />
            </ProtectedRoute>
          }
        />

        {/* Supplier route */}
        <Route
          path="supplier"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Supplier />
            </ProtectedRoute>
          }
        />

        {/* Category route */}
        <Route
          path="category"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Category />
            </ProtectedRoute>
          }
        />

        {/* Company route */}
        <Route
          path="company"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Company />
            </ProtectedRoute>
          }
        />

        {/* Unit route */}
        <Route
          path="unit"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Unit />
            </ProtectedRoute>
          }
        />

        {/* Store Location route */}
        <Route
          path="store-location"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <StoreLocation />
            </ProtectedRoute>
          }
        />

        {/* Barcode route */}
        <Route
          path="barcode"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Barcode />
            </ProtectedRoute>
          }
        />

        {/* Item Age Analysis route */}
        <Route
          path="item-age-analysis"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <ItemAgeAnalysis />
            </ProtectedRoute>
          }
        />

        {/* Sales route */}
        <Route
          path="sales"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Sales />
            </ProtectedRoute>
          }
        />

        {/* Tax Management route */}
        <Route
          path="tax-management"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <TaxManagement />
            </ProtectedRoute>
          }
        />

        {/* Sales Return route */}
        <Route
          path="sales-return"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <SalesReturn />
            </ProtectedRoute>
          }
        />

        {/* Customer Management route */}
        <Route
          path="customer-management"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <CustomerManagement />
            </ProtectedRoute>
          }
        />

        {/* Purchasing route */}
        <Route
          path="purchasing"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Purchasing />
            </ProtectedRoute>
          }
        />

        {/* Purchase Order route */}
        <Route
          path="purchase-order"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <PurchaseOrder />
            </ProtectedRoute>
          }
        />

        {/* Quotation route */}
        <Route
          path="quotation"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Quotation />
            </ProtectedRoute>
          }
        />

        {/* Job Scheduler route */}
        <Route
          path="job-scheduler"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <JobScheduler />
            </ProtectedRoute>
          }
        />

        {/* Service Bay route */}
        <Route
          path="service-bay"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <ServiceBay />
            </ProtectedRoute>
          }
        />

        {/* Parts Estimation route */}
        <Route
          path="parts-estimation"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <PartsEstimation />
            </ProtectedRoute>
          }
        />

        {/* Photo Upload route */}
        <Route
          path="photo-upload"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <PhotoUpload />
            </ProtectedRoute>
          }
        />

        {/* Technician Tracking route */}
        <Route
          path="technician-tracking"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <TechnicianTracking />
            </ProtectedRoute>
          }
        />

        {/* Quotation Templates route */}
        <Route
          path="quotation-templates"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <QuotationTemplates />
            </ProtectedRoute>
          }
        />

        {/* Quote to Job route */}
        <Route
          path="quote-to-job"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <QuoteToJob />
            </ProtectedRoute>
          }
        />

        {/* Payment Support route */}
        <Route
          path="payment-support"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <PaymentSupport />
            </ProtectedRoute>
          }
        />

        {/* User Management route */}
        <Route
          path="users"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        {/* Vehicle Profiles route */}
        <Route
          path="vehicle-profiles"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <VehicleProfiles />
            </ProtectedRoute>
          }
        />
        {/* Role Management route */}
        <Route
          path="roles"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <RoleManagement />
            </ProtectedRoute>
          }
        />
        {/* Insurance Warranty route */}
        <Route
          path="insurance-warranty"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <InsuranceWarranty />
            </ProtectedRoute>
          }
        />

        {/* Accounting Routes */}
        <Route
          path="payment-voucher"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <PaymentVoucher />
            </ProtectedRoute>
          }
        />
        <Route
          path="receipt-voucher"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <ReceiptVoucher />
            </ProtectedRoute>
          }
        />
        <Route
          path="ledger"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Ledger />
            </ProtectedRoute>
          }
        />
        <Route
          path="statement"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Statement />
            </ProtectedRoute>
          }
        />
        <Route
          path="profit-loss"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <ProfitLoss />
            </ProtectedRoute>
          }
        />
        <Route
          path="balance-sheet"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <BalanceSheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="trial-balance"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <TrialBalance />
            </ProtectedRoute>
          }
        />

        {/* HR & Payroll Routes */}
        <Route
          path="attendance"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="shift-planning"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <ShiftPlanning />
            </ProtectedRoute>
          }
        />
        <Route
          path="payroll"
          element={
            <ProtectedRoute roles={["super_admin", "admin", "manager"]}>
              <Payroll />
            </ProtectedRoute>
          }
        />

        {/* Multi-Branch & Cloud Access Routes */}
        <Route
          path="branch-locations"
          element={
            <ProtectedRoute roles={["super_admin", "admin"]}>
              <BranchLocations />
            </ProtectedRoute>
          }
        />
        <Route
          path="owner-dashboard"
          element={
            <ProtectedRoute roles={["super_admin", "admin"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="cloud-hosting"
          element={
            <ProtectedRoute roles={["super_admin", "admin"]}>
              <CloudHosting />
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
    </PageProvider>
  );
}

export default App;
