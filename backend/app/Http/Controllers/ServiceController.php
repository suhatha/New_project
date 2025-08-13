<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return Service::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration'    => 'required|integer|min:1',
            'price'       => 'required|numeric|min:0',
        ]);

        $service = Service::create($validated);
        return response()->json($service, 201);
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);
        return response()->json($service);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'service'        => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'duration'    => 'sometimes|required|integer|min:1',
            'price'       => 'sometimes|required|numeric|min:0',
        ]);

        $service->update($validated);
        return response()->json($service);
    }

    public function destroy($id)
    {
        Service::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
