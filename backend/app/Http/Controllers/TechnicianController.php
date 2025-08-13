<?php

namespace App\Http\Controllers;

use App\Models\Technician;
use Illuminate\Http\Request;

class TechnicianController extends Controller
{
    public function index()
    {
        return Technician::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'phone'          => 'required|string|max:20',
            'email'          => 'nullable|email|max:255',
            'specialization' => 'nullable|string|max:255',
            'status'         => 'required|in:active,inactive',
            'created_at'     => 'nullable',
            'updated_at'     => 'nullable',
        ]);

        $technician = Technician::create($validated);
        return response()->json($technician, 201);
    }

    public function show($id)
    {
        $technician = Technician::findOrFail($id);
        return response()->json($technician);
    }

    public function update(Request $request, $id)
    {
        $technician = Technician::findOrFail($id);

        $validated = $request->validate([
            'name'           => 'sometimes|required|string|max:255',
            'phone'          => 'sometimes|required|string|max:20',
            'email'          => 'nullable|email|max:255',
            'specialization' => 'nullable|string|max:255',
            'status'         => 'sometimes|required|in:active,inactive',
        ]);

        $technician->update($validated);
        return response()->json($technician);
    }

    public function destroy($id)
    {
        Technician::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
