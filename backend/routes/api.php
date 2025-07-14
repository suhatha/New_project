<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
Route::post('login', [AuthController::class, 'login']);
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