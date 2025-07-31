<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            // Validate the request
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            $credentials = $request->only('email', 'password');
            
            // Log the login attempt (for debugging)
            Log::info('Login attempt', ['email' => $request->email]);
            
            if (!$token = auth('api')->attempt($credentials)) {
                Log::warning('Login failed - invalid credentials', ['email' => $request->email]);
                return response()->json([
                    'error' => 'Invalid credentials',
                    'message' => 'Email or password is incorrect'
                ], 401);
            }

            $user = auth('api')->user();
            
            // Check if user has a role
            if (!$user->role) {
                Log::error('User has no role assigned', ['user_id' => $user->id]);
                return response()->json([
                    'error' => 'User role missing',
                    'message' => 'User account is not properly configured'
                ], 500);
            }

            // Map role names to frontend expected values
            $roleMap = [
                'Super Admin' => 'super_admin',
                'Admin' => 'admin',
                'Manager' => 'manager',
                'Branch Manager' => 'branch_manager',
                'Cashier' => 'cashier',
                'Accountant' => 'accountant',
            ];
            
            $roleName = $user->role->name ?? null;
            $frontendRole = $roleMap[$roleName] ?? strtolower(str_replace(' ', '_', $roleName));
            
            Log::info('Login successful', [
                'user_id' => $user->id,
                'email' => $user->email,
                'role' => $frontendRole
            ]);

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

        } catch (\Exception $e) {
            Log::error('Login error', [
                'message' => $e->getMessage(),
                'email' => $request->email ?? 'not provided'
            ]);
            
            return response()->json([
                'error' => 'Login failed',
                'message' => 'An error occurred during login. Please try again.'
            ], 500);
        }
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