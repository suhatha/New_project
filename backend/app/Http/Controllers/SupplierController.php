<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    // GET /api/suppliers
    public function index()
    {
        return response()->json(Supplier::all(), 200);
    }

    // POST /api/suppliers
    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'contact' => 'nullable|string',
            'opening_balance' => 'nullable|numeric',
        ]);

        $supplier = Supplier::create($validated);

        return response()->json($supplier, 201);
    }

    // GET /api/suppliers/{id}
    public function show(Supplier $supplier)
    {
        return response()->json($supplier, 200);
    }

    // PUT /api/suppliers/{id}
    public function update(Request $request, Supplier $supplier)
    {
        $validated = $request->validate([
            'supplier_name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'contact' => 'nullable|string',
            'opening_balance' => 'nullable|numeric',
        ]);

        $supplier->update($validated);

        return response()->json($supplier, 200);
    }

    // DELETE /api/suppliers/{id}
    public function destroy(Supplier $supplier)
    {
        $supplier->delete();

        return response()->json(null, 204);
    }
}
