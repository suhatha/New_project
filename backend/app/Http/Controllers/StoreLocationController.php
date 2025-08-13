<?php

namespace App\Http\Controllers;

use App\Models\StoreLocation;
use Illuminate\Http\Request;

class StoreLocationController extends Controller
{
    public function index()
    {
        $storeLocations = StoreLocation::all();
        return response()->json($storeLocations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'location_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string'
        ]);

        $storeLocation = StoreLocation::create($request->all());
        return response()->json($storeLocation, 201);
    }

    public function show($id)
    {
        $storeLocation = StoreLocation::findOrFail($id);
        return response()->json($storeLocation);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'location_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string'
        ]);

        $storeLocation = StoreLocation::findOrFail($id);
        $storeLocation->update($request->all());
        return response()->json($storeLocation);
    }

    public function destroy($id)
    {
        $storeLocation = StoreLocation::findOrFail($id);
        $storeLocation->delete();
        return response()->json(['message' => 'Store location deleted successfully']);
    }
}
