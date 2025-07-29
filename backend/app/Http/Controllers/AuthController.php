<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $user = auth('api')->user();
        // Map role names to frontend expected values
        $roleMap = [
            'Super Admin' => 'super_admin',
            'Admin' => 'admin',
            'Manager' => 'manager',
            'Branch Manager' => 'branch_manager',
            'Cashier' => 'cashier',
            'Accountant' => 'accountant', // If needed
        ];
        $roleName = $user->role->name ?? null;
        $frontendRole = $roleMap[$roleName] ?? strtolower(str_replace(' ', '_', $roleName));
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $frontendRole,
                'branch_id' => $user->branch_id,
            ]
        ]);
    }
    public function me()
    {
        return response()->json(auth('api')->user());
    }
    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
}