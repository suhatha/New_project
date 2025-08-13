<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function index()
    {
        $units = Unit::all();
        return response()->json($units);
    }

    public function store(Request $request)
    {
        $request->validate([
            'unit_name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $unit = Unit::create($request->all());
        return response()->json($unit, 201);
    }

    public function show($id)
    {
        $unit = Unit::findOrFail($id);
        return response()->json($unit);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'unit_name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $unit = Unit::findOrFail($id);
        $unit->update($request->all());
        return response()->json($unit);
    }

    public function destroy($id)
    {
        $unit = Unit::findOrFail($id);
        $unit->delete();
        return response()->json(['message' => 'Unit deleted successfully']);
    }
}
