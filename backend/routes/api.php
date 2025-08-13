<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ServiceWorkflowController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceBayController;
use App\Http\Controllers\TechnicianController;  

// Role routes
Route::get('/roles', [RoleController::class, 'index']);
Route::get('/roles/{id}', [RoleController::class, 'show']);
Route::post('/roles', [RoleController::class, 'store']);
Route::put('/roles/{id}', [RoleController::class, 'update']);
Route::delete('/roles/{id}', [RoleController::class, 'destroy']);

// Role-Permission routes (UI-managed permissions)
Route::get('/role-permissions/{role_id}', [RolePermissionController::class, 'index']);
Route::post('/role-permissions', [RolePermissionController::class, 'store']);

// Branch management routes (API resource)
Route::apiResource('branches', BranchController::class);
Route::put('/branches/{id}', [BranchController::class, 'update']);

// Authentication routes
Route::post('login', [AuthController::class, 'login']);

// User management routes (can add auth middleware later)
// Important: Place the specific route before the wildcard route
Route::get('users/roles/list', [UserController::class, 'getRoles']);
Route::get('users', [UserController::class, 'index']);
Route::post('users', [UserController::class, 'store']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::put('users/{id}', [UserController::class, 'update']);
Route::delete('users/{id}', [UserController::class, 'destroy']);

// Appointment routes
Route::apiResource('appointments', AppointmentController::class);
Route::patch('appointments/{appointment}/status', [AppointmentController::class, 'updateStatus']);
Route::get('appointments/{appointment}/status', [AppointmentController::class, 'updateStatus']);
Route::get('appointments/{appointment}/status', [AppointmentController::class, 'updateStatus']);
Route::get('appointments/{appointment}/status', [AppointmentController::class, 'updateStatus']);
Route::get('appointments/{appointment}/status', [AppointmentController::class, 'updateStatus']);

// Service Workflow routes
Route::apiResource('service-workflows', ServiceWorkflowController::class);

Route::apiResource('technicians', TechnicianController::class);
Route::apiResource('service-bays', ServiceBayController::class);
Route::apiResource('services', ServiceController::class);
// ... rest of the 

// Test routes
Route::get('test/roles', function() {
    $roles = \App\Models\Role::all();
    return response()->json([
        'roles' => $roles,
        'count' => $roles->count()
    ]);
});

Route::get('test/role-permissions-table', function() {
    try {
        // Check if table exists
        $tableExists = \Schema::hasTable('role_permissions');
        
        if ($tableExists) {
            // Get table columns
            $columns = \Schema::getColumnListing('role_permissions');
            
            // Try to get a sample record
            $sampleRecord = \App\Models\RolePermission::first();
            
            return response()->json([
                'table_exists' => true,
                'columns' => $columns,
                'sample_record' => $sampleRecord,
                'total_records' => \App\Models\RolePermission::count()
            ]);
        } else {
            return response()->json([
                'table_exists' => false,
                'message' => 'role_permissions table does not exist. Run migrations first.'
            ]);
        }
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'table_exists' => false
        ]);
    }
});

Route::get('test/role-permissions/{role_id}', function($role_id) {
    try {
        $role = \App\Models\Role::find($role_id);
        $permissions = \App\Models\RolePermission::where('role_id', $role_id)->get();
        
        return response()->json([
            'role' => $role,
            'permissions' => $permissions,
            'permission_count' => $permissions->count(),
            'all_permissions' => \App\Models\RolePermission::all()
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage()
        ]);
    }
});

Route::get('/branches', [App\Http\Controllers\BranchController::class, 'index']);

Route::get('test/check-permissions', function() {
    try {
        $allRoles = \App\Models\Role::all();
        $allPermissions = \App\Models\RolePermission::all();
        
        $rolePermissions = [];
        foreach ($allRoles as $role) {
            $rolePermissions[$role->id] = [
                'role_name' => $role->name,
                'permissions' => \App\Models\RolePermission::where('role_id', $role->id)->get(),
                'count' => \App\Models\RolePermission::where('role_id', $role->id)->count()
            ];
        }
        
        return response()->json([
            'total_roles' => $allRoles->count(),
            'total_permissions' => $allPermissions->count(),
            'role_permissions' => $rolePermissions,
            'all_permissions_data' => $allPermissions
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage()
        ]);
    }
});

Route::get('test/add-permission/{role_id}', function($role_id) {
    try {
        $role = \App\Models\Role::find($role_id);
        if (!$role) {
            return response()->json(['error' => 'Role not found'], 404);
        }
        
        // Check if test permission already exists
        $existingPermission = \App\Models\RolePermission::where('role_id', $role_id)
            ->where('module_name', 'test_module')
            ->first();
            
        if ($existingPermission) {
            return response()->json([
                'message' => 'Test permission already exists',
                'role' => $role,
                'permission' => $existingPermission,
                'total_permissions' => \App\Models\RolePermission::where('role_id', $role_id)->count()
            ]);
        }
        
        // Add a test permission
        $permission = \App\Models\RolePermission::create([
            'role_id' => $role_id,
            'module_name' => 'test_module',
            'display_name' => 'Test Module',
            'description' => 'Test permission for debugging',
            'can_view' => true,
            'can_create' => false,
            'can_update' => false,
            'can_delete' => false
        ]);
        
        return response()->json([
            'message' => 'Test permission added successfully',
            'role' => $role,
            'permission' => $permission,
            'total_permissions' => \App\Models\RolePermission::where('role_id', $role_id)->count()
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
    }
});

Route::get('test/verify-api', function() {
    try {
        $roles = \App\Models\Role::all();
        $permissions = \App\Models\RolePermission::all();
        
        return response()->json([
            'status' => 'API is working',
            'roles_count' => $roles->count(),
            'permissions_count' => $permissions->count(),
            'sample_role' => $roles->first(),
            'sample_permission' => $permissions->first()
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage()
        ]);
    }
});

Route::post('test/user-create', function(\Illuminate\Http\Request $request) {
    return response()->json([
        'received_data' => $request->all(),
        'headers' => $request->headers->all(),
        'validation_rules' => [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role_id' => 'required|exists:roles,id',
            'status' => 'required|in:active,inactive'
        ]
    ]);
});

// Protected routes
Route::middleware('auth:api')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('super-admin', fn() => response()->json(['message' => 'Super Admin Dashboard']))
        ->middleware('role:super_admin');
        
    Route::get('admin', fn() => response()->json(['message' => 'Admin Dashboard']))
        ->middleware('role:admin');

    Route::get('manager', fn() => response()->json(['message' => 'Manager Dashboard']))
        ->middleware('role:manager');

    Route::get('branch-manager', fn() => response()->json(['message' => 'Branch Manager Dashboard']))
        ->middleware('role:branch_manager');

    Route::get('cashier', fn() => response()->json(['message' => 'Cashier Dashboard']))
        ->middleware('role:cashier');
});