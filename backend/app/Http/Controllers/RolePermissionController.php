<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\RolePermission;

class RolePermissionController extends Controller
{
    public function index($role_id)
    {
        try {
            $role = Role::with('permissions')->findOrFail($role_id);

            // Define all available modules (hardcoded list)
            $availableModules = [
                ['name' => 'dashboard', 'display_name' => 'Dashboard', 'description' => 'Access to main dashboard'],
                ['name' => 'user_management', 'display_name' => 'User Management', 'description' => 'Manage system users'],
                ['name' => 'role_management', 'display_name' => 'Role Management', 'description' => 'Manage user roles and permissions'],
                ['name' => 'branch_management', 'display_name' => 'Branch Management', 'description' => 'Manage system branches'],
                ['name' => 'item_management', 'display_name' => 'Item Management', 'description' => 'Manage inventory items'],
                ['name' => 'category_management', 'display_name' => 'Category Management', 'description' => 'Manage item categories'],
                ['name' => 'supplier_management', 'display_name' => 'Supplier Management', 'description' => 'Manage suppliers'],
                ['name' => 'unit_management', 'display_name' => 'Unit Management', 'description' => 'Manage units of measurement'],
                ['name' => 'store_location', 'display_name' => 'Store Location', 'description' => 'Manage store locations'],
                ['name' => 'barcode_management', 'display_name' => 'Barcode Management', 'description' => 'Manage barcodes'],
                ['name' => 'item_age_analysis', 'display_name' => 'Item Age Analysis', 'description' => 'Analyze item age'],
                ['name' => 'expiry_management', 'display_name' => 'Expiry Management', 'description' => 'Manage item expiry dates'],
                ['name' => 'sales_management', 'display_name' => 'Sales Management', 'description' => 'Manage sales transactions'],
                ['name' => 'sales_return', 'display_name' => 'Sales Return', 'description' => 'Process sales returns'],
                ['name' => 'customer_management', 'display_name' => 'Customer Management', 'description' => 'Manage customers'],
                ['name' => 'tax_management', 'display_name' => 'Tax Management', 'description' => 'Manage tax settings'],
                ['name' => 'purchasing_management', 'display_name' => 'Purchasing Management', 'description' => 'Manage purchasing'],
                ['name' => 'purchase_order', 'display_name' => 'Purchase Order', 'description' => 'Create and manage purchase orders'],
                ['name' => 'quotation_management', 'display_name' => 'Quotation Management', 'description' => 'Manage service quotations'],
                ['name' => 'quotation_templates', 'display_name' => 'Quotation Templates', 'description' => 'Manage quotation templates'],
                ['name' => 'quote_to_job', 'display_name' => 'Quote to Job', 'description' => 'Convert quotes to jobs'],
                ['name' => 'job_scheduler', 'display_name' => 'Job Scheduler', 'description' => 'Schedule and manage jobs'],
                ['name' => 'service_bay', 'display_name' => 'Service Bay', 'description' => 'Manage service bays'],
                ['name' => 'parts_estimation', 'display_name' => 'Parts Estimation', 'description' => 'Estimate parts for services'],
                ['name' => 'technician_tracking', 'display_name' => 'Technician Tracking', 'description' => 'Track technician activities'],
                ['name' => 'photo_upload', 'display_name' => 'Photo Upload', 'description' => 'Upload service photos'],
                ['name' => 'vehicle_profiles', 'display_name' => 'Vehicle Profiles', 'description' => 'Manage vehicle profiles'],
                ['name' => 'insurance_warranty', 'display_name' => 'Insurance & Warranty', 'description' => 'Manage insurance and warranty'],
                ['name' => 'payment_voucher', 'display_name' => 'Payment Voucher', 'description' => 'Manage payment vouchers'],
                ['name' => 'receipt_voucher', 'display_name' => 'Receipt Voucher', 'description' => 'Manage receipt vouchers'],
                ['name' => 'ledger', 'display_name' => 'Ledger', 'description' => 'View general ledger'],
                ['name' => 'statement', 'display_name' => 'Statement', 'description' => 'View financial statements'],
                ['name' => 'profit_loss', 'display_name' => 'Profit & Loss', 'description' => 'View profit and loss reports'],
                ['name' => 'balance_sheet', 'display_name' => 'Balance Sheet', 'description' => 'View balance sheet'],
                ['name' => 'trial_balance', 'display_name' => 'Trial Balance', 'description' => 'View trial balance'],
                ['name' => 'payment_support', 'display_name' => 'Payment Support', 'description' => 'Payment support features'],
                ['name' => 'attendance_management', 'display_name' => 'Attendance Management', 'description' => 'Manage employee attendance'],
                ['name' => 'shift_planning', 'display_name' => 'Shift Planning', 'description' => 'Plan employee shifts'],
                ['name' => 'payroll_management', 'display_name' => 'Payroll Management', 'description' => 'Manage payroll'],
                ['name' => 'branch_locations', 'display_name' => 'Branch Locations', 'description' => 'Manage branch locations'],
                ['name' => 'owner_dashboard', 'display_name' => 'Owner Dashboard', 'description' => 'Access owner dashboard'],
                ['name' => 'cloud_hosting', 'display_name' => 'Cloud Hosting', 'description' => 'Manage cloud hosting'],
            ];

            return response()->json([
                'message' => 'Role permissions retrieved successfully!',
                'role' => $role,
                'available_modules' => $availableModules,
                'current_permissions' => $role->permissions
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve role permissions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            \Log::info('RolePermissionController::store called with data:', $request->all());

            $validator = \Validator::make($request->all(), [
                'role_id' => 'required|integer|exists:roles,id',
                'permissions' => 'required|array'
            ]);

            if ($validator->fails()) {
                \Log::error('Validation failed:', $validator->errors()->toArray());
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $role = Role::findOrFail($request->role_id);
            \Log::info('Found role:', ['role_id' => $role->id, 'role_name' => $role->name]);

            $deletedCount = RolePermission::where('role_id', $request->role_id)->delete();
            \Log::info('Deleted existing permissions:', ['count' => $deletedCount]);

            $createdPermissions = [];
            foreach ($request->permissions as $permission) {
                try {
                    $newPermission = RolePermission::create([
                        'role_id' => $request->role_id,
                        'module_name' => $permission['module_name'],
                        'display_name' => $permission['display_name'],
                        'description' => $permission['description'] ?? null,
                        'can_view' => $permission['can_view'] ?? false,
                        'can_create' => $permission['can_create'] ?? false,
                        'can_update' => $permission['can_update'] ?? false,
                        'can_delete' => $permission['can_delete'] ?? false,
                    ]);
                    $createdPermissions[] = $newPermission;
                    \Log::info('Created permission:', $newPermission->toArray());
                } catch (\Exception $e) {
                    \Log::error('Failed to create permission:', [
                        'permission_data' => $permission,
                        'error' => $e->getMessage()
                    ]);
                    throw $e;
                }
            }

            \Log::info('Successfully created permissions:', ['count' => count($createdPermissions)]);

            return response()->json([
                'message' => 'Role permissions updated successfully!',
                'role' => $role->load('permissions'),
                'created_count' => count($createdPermissions)
            ]);
        } catch (\Exception $e) {
            \Log::error('RolePermissionController::store error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);

            return response()->json([
                'message' => 'Failed to update role permissions',
                'error' => $e->getMessage(),
                'details' => [
                    'role_id' => $request->role_id ?? 'not provided',
                    'permissions_count' => count($request->permissions ?? []),
                    'request_data' => $request->all()
                ]
            ], 500);
        }
    }
}
