<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Branch;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(['branches' => Branch::all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
            'status' => 'required|boolean',
        ]);
        $branch = Branch::create($validated);
        return response()->json($branch, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Branch::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $branch = Branch::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',          
             'phone' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
            'status' => 'required|boolean',
        ]);
        $branch->update($validated);
        return response()->json($branch);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $branch = Branch::findOrFail($id);
        $branch->delete();
        return response()->json(null, 204);
    }

}
