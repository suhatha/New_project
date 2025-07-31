import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaArrowLeft, FaCheck, FaTimes, FaEye, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';

export default function RolePermissions() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  
  const [role, setRole] = useState(null);
  const [availableModules, setAvailableModules] = useState([]);
  const [currentPermissions, setCurrentPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");
        
        console.log('Fetching data for roleId:', roleId);
        
        const response = await axios.get(`http://localhost:8000/api/role-permissions/${roleId}`);
        console.log('Role permissions response:', response.data);
        
        setRole(response.data.role);
        setAvailableModules(response.data.available_modules);
        setCurrentPermissions(response.data.current_permissions);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Error response:', error.response?.data);
        
        if (error.response?.status === 404) {
          setError(`Role with ID ${roleId} not found. Please check if the role exists.`);
        } else {
          setError(`Failed to load role and permissions data: ${error.response?.data?.message || error.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [roleId]);

  const getPermissionForModule = (moduleName) => {
    return currentPermissions.find(p => p.module_name === moduleName) || {
      can_view: false,
      can_create: false,
      can_update: false,
      can_delete: false
    };
  };

  const handlePermissionChange = (moduleName, action, value) => {
    setCurrentPermissions(prev => {
      const existing = prev.find(p => p.module_name === moduleName);
      if (existing) {
        return prev.map(p => 
          p.module_name === moduleName 
            ? { ...p, [action]: value }
            : p
        );
      } else {
        return [...prev, {
          role_id: parseInt(roleId),
          module_name: moduleName,
          display_name: availableModules.find(m => m.name === moduleName)?.display_name || moduleName,
          description: availableModules.find(m => m.name === moduleName)?.description || '',
          can_view: action === 'can_view' ? value : false,
          can_create: action === 'can_create' ? value : false,
          can_update: action === 'can_update' ? value : false,
          can_delete: action === 'can_delete' ? value : false,
        }];
      }
    });
  };

  const handleSelectAll = (moduleName) => {
    const allActions = ['can_view', 'can_create', 'can_update', 'can_delete'];
    const currentPermission = getPermissionForModule(moduleName);
    const hasAllAccess = allActions.every(action => currentPermission[action]);
    
    allActions.forEach(action => {
      handlePermissionChange(moduleName, action, !hasAllAccess);
    });
  };

  const handleSelectAllModules = () => {
    availableModules.forEach(module => {
      const allActions = ['can_view', 'can_create', 'can_update', 'can_delete'];
      allActions.forEach(action => {
        handlePermissionChange(module.name, action, true);
      });
    });
  };

  const handleClearAllModules = () => {
    setCurrentPermissions([]);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError("");
      setMessage("");
      
      // Filter out permissions that have no access rights
      const permissionsToSave = currentPermissions.filter(permission => 
        permission.can_view || permission.can_create || permission.can_update || permission.can_delete
      );
      
      console.log('Saving permissions:', {
        role_id: parseInt(roleId),
        permissions: permissionsToSave
      });
      
      const response = await axios.post(`http://localhost:8000/api/role-permissions`, {
        role_id: parseInt(roleId),
        permissions: permissionsToSave
      });
      
      console.log('Save response:', response.data);
      
      setMessage("Role permissions updated successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
      
    } catch (error) {
      console.error('Error saving permissions:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMessage = 'Failed to save permissions';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      if (error.response?.data?.error) {
        errorMessage += `: ${error.response.data.error}`;
      }
      if (error.response?.data?.details) {
        errorMessage += ` (Details: ${JSON.stringify(error.response.data.details)})`;
      }
      
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const getModuleDisplayName = (module) => {
    const moduleNames = {
      'dashboard': 'Dashboard',
      'user_management': 'User Management',
      'role_management': 'Role Management',
      'branch_management': 'Branch Management',
      'item_management': 'Item Management',
      'category_management': 'Category Management',
      'supplier_management': 'Supplier Management',
      'unit_management': 'Unit Management',
      'store_location': 'Store Location',
      'barcode_management': 'Barcode Management',
      'item_age_analysis': 'Item Age Analysis',
      'expiry_management': 'Expiry Management',
      'sales_management': 'Sales Management',
      'sales_return': 'Sales Return',
      'customer_management': 'Customer Management',
      'tax_management': 'Tax Management',
      'purchasing_management': 'Purchasing Management',
      'purchase_order': 'Purchase Order',
      'quotation_management': 'Quotation Management',
      'quotation_templates': 'Quotation Templates',
      'quote_to_job': 'Quote to Job',
      'job_scheduler': 'Job Scheduler',
      'service_bay': 'Service Bay',
      'parts_estimation': 'Parts Estimation',
      'technician_tracking': 'Technician Tracking',
      'photo_upload': 'Photo Upload',
      'vehicle_profiles': 'Vehicle Profiles',
      'insurance_warranty': 'Insurance & Warranty',
      'payment_voucher': 'Payment Voucher',
      'receipt_voucher': 'Receipt Voucher',
      'ledger': 'Ledger',
      'statement': 'Statement',
      'profit_loss': 'Profit & Loss',
      'balance_sheet': 'Balance Sheet',
      'trial_balance': 'Trial Balance',
      'payment_support': 'Payment Support',
      'attendance_management': 'Attendance Management',
      'shift_planning': 'Shift Planning',
      'payroll_management': 'Payroll Management',
      'branch_locations': 'Branch Locations',
      'owner_dashboard': 'Owner Dashboard',
      'cloud_hosting': 'Cloud Hosting'
    };
    return moduleNames[module] || module;
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading permissions...</div>
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center text-red-600">Role not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/roles')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaArrowLeft />
            Back to Roles
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Role Permissions</h2>
            <p className="text-gray-600">Configure permissions for: <span className="font-semibold">{role.name}</span></p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleSelectAllModules}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Select All
          </button>
          <button
            onClick={handleClearAllModules}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
          <p className="text-green-800">{message}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Permissions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {availableModules.map((module) => {
          const permission = getPermissionForModule(module.name);
          const hasAnyAccess = permission.can_view || permission.can_create || permission.can_update || permission.can_delete;
          const hasAllAccess = permission.can_view && permission.can_create && permission.can_update && permission.can_delete;
          
          return (
            <div key={module.name} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {module.display_name}
                </h3>
                <button
                  onClick={() => handleSelectAll(module.name)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {hasAllAccess ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-2 rounded hover:bg-white transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permission.can_view}
                    onChange={(e) => handlePermissionChange(module.name, 'can_view', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <FaEye className="text-gray-600" />
                  <span className="font-medium text-gray-800">View</span>
                </label>
                
                <label className="flex items-center gap-3 p-2 rounded hover:bg-white transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permission.can_create}
                    onChange={(e) => handlePermissionChange(module.name, 'can_create', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <FaPlus className="text-gray-600" />
                  <span className="font-medium text-gray-800">Create</span>
                </label>
                
                <label className="flex items-center gap-3 p-2 rounded hover:bg-white transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permission.can_update}
                    onChange={(e) => handlePermissionChange(module.name, 'can_update', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <FaEdit className="text-gray-600" />
                  <span className="font-medium text-gray-800">Update</span>
                </label>
                
                <label className="flex items-center gap-3 p-2 rounded hover:bg-white transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permission.can_delete}
                    onChange={(e) => handlePermissionChange(module.name, 'can_delete', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <FaTrash className="text-gray-600" />
                  <span className="font-medium text-gray-800">Delete</span>
                </label>
              </div>
              
              {module.description && (
                <div className="mt-3 text-sm text-gray-600">
                  {module.description}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-800 font-medium">
              Modules with Access: <span className="font-bold">
                {currentPermissions.filter(p => p.can_view || p.can_create || p.can_update || p.can_delete).length}
              </span> of {availableModules.length}
            </p>
            <p className="text-blue-600 text-sm">
              {currentPermissions.filter(p => p.can_view || p.can_create || p.can_update || p.can_delete).length === availableModules.length ? 'All modules selected' : 
               currentPermissions.filter(p => p.can_view || p.can_create || p.can_update || p.can_delete).length === 0 ? 'No modules selected' : 
               `${Math.round((currentPermissions.filter(p => p.can_view || p.can_create || p.can_update || p.can_delete).length / availableModules.length) * 100)}% of modules selected`}
            </p>
          </div>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              isSaving
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSaving ? (
              <>
                <FaTimes className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                Save Permissions
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 