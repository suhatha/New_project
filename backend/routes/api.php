<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

Route::get('/roles', [RoleController::class, 'index']);
Route::post('/roles', [RoleController::class, 'store']);
Route::put('/roles/{id}', [RoleController::class, 'update']);
Route::delete('/roles/{id}', [RoleController::class, 'destroy']);


Route::post('login', [AuthController::class, 'login']);

// User management routes (temporarily without auth for testing)
Route::get('users', [UserController::class, 'index']);
Route::post('users', [UserController::class, 'store']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::put('users/{id}', [UserController::class, 'update']);
Route::delete('users/{id}', [UserController::class, 'destroy']);
Route::get('users/roles/list', [UserController::class, 'getRoles']);

// Test route to check roles
Route::get('test/roles', function() {
    $roles = \App\Models\Role::all();
    return response()->json([
        'roles' => $roles,
        'count' => $roles->count()
    ]);
});

// Test route to check user creation data
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

Route::middleware('auth:api')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('super-admin', function () {
        return response()->json(['message' => 'Super Admin Dashboard']);
    })->middleware('role:super_admin');
    Route::get('admin', function () {
        return response()->json(['message' => 'Admin Dashboard']);
    })->middleware('role:admin');
    Route::get('manager', function () {
        return response()->json(['message' => 'Manager Dashboard']);
    })->middleware('role:manager');
    Route::get('branch-manager', function () {
        return response()->json(['message' => 'Branch Manager Dashboard']);
    })->middleware('role:branch_manager');
    Route::get('cashier', function () {
        return response()->json(['message' => 'Cashier Dashboard']);
    })->middleware('role:cashier');
});