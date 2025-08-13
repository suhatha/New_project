<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index()
    {
        try {
            $users = User::with(['role', 'branch'])->get();
            
            // Transform data for frontend
            $transformedUsers = $users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => '••••••••', // Hide password
                    'role' => $user->role->name ?? 'No Role',
                    'role_id' => $user->role_id,
                    'status' => $user->status,
                    'branch' => $user->branch->name ?? 'No Branch',
                    'branch_id' => $user->branch_id,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at
                ];
            });
            
            return response()->json([
                'message' => 'Users retrieved successfully!',
                'users' => $transformedUsers
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve users',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created user
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
                'role_id' => 'required|exists:roles,id',
                'status' => 'required|in:active,inactive',
                'branch_id' => 'nullable|exists:branches,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $userData = [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $request->role_id,
                'status' => $request->status,
            ];

            // Only set branch_id if it's provided and not null
            if ($request->has('branch_id') && $request->branch_id !== null) {
                $userData['branch_id'] = $request->branch_id;
            }

            $user = User::create($userData);
            $user->load(['role', 'branch']);

            return response()->json([
                'message' => 'User created successfully!',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => '••••••••',
                    'role' => $user->role->name ?? 'No Role',
                    'role_id' => $user->role_id,
                    'status' => $user->status,
                    'branch_id' => $user->branch_id,
                    'branch' => $user->branch->name ?? 'No Branch',
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create user',
                'error' => $e->getMessage(),
                'details' => [
                    'request_data' => $request->all(),
                    'validation_rules' => [
                        'name' => 'required|string|max:255',
                        'email' => 'required|email|unique:users,email',
                        'password' => 'required|string|min:6',
                        'role_id' => 'required|exists:roles,id',
                        'status' => 'required|in:active,inactive',
                        'branch_id' => 'nullable|exists:branches,id', // validate the branch_id
                    ]
                ]
            ], 500);
        }
    }

    /**
     * Display the specified user
     */
    public function show($id)
    {
        try {
            $user = User::with(['role', 'branch'])->findOrFail($id);
            
            return response()->json([
                'message' => 'User retrieved successfully!',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => '••••••••',
                    'role' => $user->role->name ?? 'No Role',
                    'role_id' => $user->role_id,
                    'status' => $user->status,
                    'branch_id' => $user->branch_id,
                    'branch' => $user->branch->name ?? 'No Branch',
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'User not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified user
     */
    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . $id,
                'password' => 'nullable|string|min:6',
                'role_id' => 'required|exists:roles,id',
                'status' => 'required|in:active,inactive',
                'branch_id' => 'required|exists:branches,id', // branch_id is now required
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $updateData = [
                'name' => $request->name,
                'email' => $request->email,
                'role_id' => $request->role_id,
                'status' => $request->status,
                'branch_id' => $request->branch_id,
            ];

            // Only update branch_id if it's provided
            if ($request->has('branch_id')) {
                $updateData['branch_id'] = $request->branch_id;
            }

            // Only update password if provided
            if ($request->filled('password')) {
                $updateData['password'] = Hash::make($request->password);
            }

            $user->update($updateData);
            $user->load(['role', 'branch']);

            return response()->json([
                'message' => 'User updated successfully!',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => '••••••••',
                    'role' => $user->role->name ?? 'No Role',
                    'role_id' => $user->role_id,
                    'status' => $user->status,
                    'branch_id' => $user->branch_id,
                    'branch' => $user->branch->name ?? 'No Branch',
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified user
     */
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            
            // Prevent deletion of admin users
            if ($user->role && $user->role->name === 'admin') {
                return response()->json([
                    'message' => 'Cannot delete admin users'
                ], 403);
            }
            
            $user->delete();

            return response()->json([
                'message' => 'User deleted successfully!'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete user',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get roles for dropdown
     */
    public function getRoles()
    {
        try {
            $roles = Role::all();
            return response()->json([
                'message' => 'Roles retrieved successfully!',
                'roles' => $roles
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve roles',
                'error' => $e->getMessage()
            ], 500);
        }
    }



} 