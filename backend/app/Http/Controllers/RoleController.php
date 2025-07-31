<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();
        
        return response()->json([
            'message' => 'Roles retrieved successfully!',
            'roles' => $roles,
        ]);
    }

    public function show($id)
    {
        try {
            $role = Role::findOrFail($id);
            
            return response()->json([
                'message' => 'Role retrieved successfully!',
                'role' => $role,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Role not found.',
            ], 404);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles,name|max:50',
            'description' => 'nullable|max:500',
        ]);

        $role = Role::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Role added successfully!',
            'role' => $role,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:50|unique:roles,name,' . $id,
            'description' => 'nullable|max:500',
        ]);

        try {
            $role = Role::findOrFail($id);
            $role->update([
                'name' => $request->name,
                'description' => $request->description,
            ]);
            
            return response()->json([
                'message' => 'Role updated successfully!',
                'role' => $role,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Role not found or could not be updated.',
            ], 404);
        }
    }

    public function destroy($id)
    {
        try {
            $role = Role::findOrFail($id);
            $role->delete();
            
            return response()->json([
                'message' => 'Role deleted successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Role not found or could not be deleted.',
            ], 404);
        }
    }
}
