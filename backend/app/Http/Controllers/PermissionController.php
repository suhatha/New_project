<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Permission;
use App\Models\Role;

class PermissionController extends Controller
{
    /**
     * Get all permissions grouped by module
     */
    public function index()
    {
        try {
            $permissions = Permission::orderBy('module')->orderBy('display_name')->get();
            
            // Group permissions by module
            $groupedPermissions = $permissions->groupBy('module');
            
            return response()->json([
                'message' => 'Permissions retrieved successfully!',
                'permissions' => $permissions,
                'grouped_permissions' => $groupedPermissions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve permissions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get permissions for a specific role
     */
    public function getRolePermissions($roleId)
    {
        try {
            $role = Role::with('permissions')->findOrFail($roleId);
            
            return response()->json([
                'message' => 'Role permissions retrieved successfully!',
                'role' => $role,
                'permissions' => $role->permissions->pluck('id')->toArray()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve role permissions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update permissions for a specific role
     */
    public function updateRolePermissions(Request $request, $roleId)
    {
        try {
            $request->validate([
                'permissions' => 'required|array',
                'permissions.*' => 'exists:permissions,id'
            ]);

            $role = Role::findOrFail($roleId);
            
            // Sync permissions (this will add/remove permissions as needed)
            $role->permissions()->sync($request->permissions);
            
            return response()->json([
                'message' => 'Role permissions updated successfully!',
                'role' => $role->load('permissions')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update role permissions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Seed default permissions
     */
    public function seedPermissions()
    {
        try {
            $permissions = [
                // Dashboard
                ['name' => 'dashboard', 'display_name' => 'Dashboard', 'module' => 'dashboard', 'description' => 'Access to main dashboard'],
                
                // Administration
                ['name' => 'user_management', 'display_name' => 'User Management', 'module' => 'administration', 'description' => 'Manage system users'],
                ['name' => 'role_management', 'display_name' => 'Role Management', 'module' => 'administration', 'description' => 'Manage user roles and permissions'],
                ['name' => 'branch_management', 'display_name' => 'Branch Management', 'module' => 'administration', 'description' => 'Manage system branches'],
                
                // Inventory Management
                ['name' => 'item_management', 'display_name' => 'Item Management', 'module' => 'inventory', 'description' => 'Manage inventory items'],
                ['name' => 'category_management', 'display_name' => 'Category Management', 'module' => 'inventory', 'description' => 'Manage item categories'],
                ['name' => 'supplier_management', 'display_name' => 'Supplier Management', 'module' => 'inventory', 'description' => 'Manage suppliers'],
                ['name' => 'unit_management', 'display_name' => 'Unit Management', 'module' => 'inventory', 'description' => 'Manage units of measurement'],
                ['name' => 'store_location', 'display_name' => 'Store Location', 'module' => 'inventory', 'description' => 'Manage store locations'],
                ['name' => 'barcode_management', 'display_name' => 'Barcode Management', 'module' => 'inventory', 'description' => 'Manage barcodes'],
                ['name' => 'item_age_analysis', 'display_name' => 'Item Age Analysis', 'module' => 'inventory', 'description' => 'Analyze item age'],
                ['name' => 'expiry_management', 'display_name' => 'Expiry Management', 'module' => 'inventory', 'description' => 'Manage item expiry dates'],
                
                // Sales
                ['name' => 'sales_management', 'display_name' => 'Sales Management', 'module' => 'sales', 'description' => 'Manage sales transactions'],
                ['name' => 'sales_return', 'display_name' => 'Sales Return', 'module' => 'sales', 'description' => 'Process sales returns'],
                ['name' => 'customer_management', 'display_name' => 'Customer Management', 'module' => 'sales', 'description' => 'Manage customers'],
                ['name' => 'tax_management', 'display_name' => 'Tax Management', 'module' => 'sales', 'description' => 'Manage tax settings'],
                
                // Purchasing
                ['name' => 'purchasing_management', 'display_name' => 'Purchasing Management', 'module' => 'purchasing', 'description' => 'Manage purchasing'],
                ['name' => 'purchase_order', 'display_name' => 'Purchase Order', 'module' => 'purchasing', 'description' => 'Create and manage purchase orders'],
                
                // Services
                ['name' => 'quotation_management', 'display_name' => 'Quotation Management', 'module' => 'services', 'description' => 'Manage service quotations'],
                ['name' => 'quotation_templates', 'display_name' => 'Quotation Templates', 'module' => 'services', 'description' => 'Manage quotation templates'],
                ['name' => 'quote_to_job', 'display_name' => 'Quote to Job', 'module' => 'services', 'description' => 'Convert quotes to jobs'],
                ['name' => 'job_scheduler', 'display_name' => 'Job Scheduler', 'module' => 'services', 'description' => 'Schedule and manage jobs'],
                ['name' => 'service_bay', 'display_name' => 'Service Bay', 'module' => 'services', 'description' => 'Manage service bays'],
                ['name' => 'parts_estimation', 'display_name' => 'Parts Estimation', 'module' => 'services', 'description' => 'Estimate parts for services'],
                ['name' => 'technician_tracking', 'display_name' => 'Technician Tracking', 'module' => 'services', 'description' => 'Track technician activities'],
                ['name' => 'photo_upload', 'display_name' => 'Photo Upload', 'module' => 'services', 'description' => 'Upload service photos'],
                ['name' => 'vehicle_profiles', 'display_name' => 'Vehicle Profiles', 'module' => 'services', 'description' => 'Manage vehicle profiles'],
                ['name' => 'insurance_warranty', 'display_name' => 'Insurance & Warranty', 'module' => 'services', 'description' => 'Manage insurance and warranty'],
                
                // Accounting
                ['name' => 'payment_voucher', 'display_name' => 'Payment Voucher', 'module' => 'accounting', 'description' => 'Manage payment vouchers'],
                ['name' => 'receipt_voucher', 'display_name' => 'Receipt Voucher', 'module' => 'accounting', 'description' => 'Manage receipt vouchers'],
                ['name' => 'ledger', 'display_name' => 'Ledger', 'module' => 'accounting', 'description' => 'View general ledger'],
                ['name' => 'statement', 'display_name' => 'Statement', 'module' => 'accounting', 'description' => 'View financial statements'],
                ['name' => 'profit_loss', 'display_name' => 'Profit & Loss', 'module' => 'accounting', 'description' => 'View profit and loss reports'],
                ['name' => 'balance_sheet', 'display_name' => 'Balance Sheet', 'module' => 'accounting', 'description' => 'View balance sheet'],
                ['name' => 'trial_balance', 'display_name' => 'Trial Balance', 'module' => 'accounting', 'description' => 'View trial balance'],
                ['name' => 'payment_support', 'display_name' => 'Payment Support', 'module' => 'accounting', 'description' => 'Payment support features'],
                
                // HR & Payroll
                ['name' => 'attendance_management', 'display_name' => 'Attendance Management', 'module' => 'hr', 'description' => 'Manage employee attendance'],
                ['name' => 'shift_planning', 'display_name' => 'Shift Planning', 'module' => 'hr', 'description' => 'Plan employee shifts'],
                ['name' => 'payroll_management', 'display_name' => 'Payroll Management', 'module' => 'hr', 'description' => 'Manage payroll'],
                
                // Multi-Branch
                ['name' => 'branch_locations', 'display_name' => 'Branch Locations', 'module' => 'multi_branch', 'description' => 'Manage branch locations'],
                ['name' => 'owner_dashboard', 'display_name' => 'Owner Dashboard', 'module' => 'multi_branch', 'description' => 'Access owner dashboard'],
                ['name' => 'cloud_hosting', 'display_name' => 'Cloud Hosting', 'module' => 'multi_branch', 'description' => 'Manage cloud hosting'],
            ];

            foreach ($permissions as $permission) {
                Permission::updateOrCreate(
                    ['name' => $permission['name']],
                    $permission
                );
            }

            return response()->json([
                'message' => 'Permissions seeded successfully!',
                'count' => Permission::count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to seed permissions',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 