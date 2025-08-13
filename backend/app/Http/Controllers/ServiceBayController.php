<?php

namespace App\Http\Controllers;

use App\Models\ServiceBay;
use Illuminate\Http\Request;

class ServiceBayController extends Controller
{
    public function index()
    {
        return ServiceBay::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'bay'      => 'required|string|max:255',
            'location'  => 'required|string|max:255',
            'type'      => 'nullable|string|max:255',
            'available' => 'required|boolean',
        ]);

        $serviceBay = ServiceBay::create($validated);
        return response()->json($serviceBay, 201);
    }

    public function show($id)
    {
        $serviceBay = ServiceBay::findOrFail($id);
        return response()->json($serviceBay);
    }

    public function update(Request $request, $id)
    {
        $serviceBay = ServiceBay::findOrFail($id);

        $validated = $request->validate([
            'bay'       => 'sometimes|required|string|max:255',
            'location'  => 'sometimes|required|string|max:255',
            'type'      => 'nullable|string|max:255',
            'available' => 'sometimes|required|boolean',
        ]);

        $serviceBay->update($validated);
        return response()->json($serviceBay);
    }

    public function destroy($id)
    {
        ServiceBay::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
