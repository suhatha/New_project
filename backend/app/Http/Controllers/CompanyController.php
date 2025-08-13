<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    // GET /api/companies
    public function index()
    {
        return response()->json(Company::all(), 200);
    }

    // POST /api/companies
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $company = Company::create($validated);

        return response()->json($company, 201);
    }

    // GET /api/companies/{id}
    public function show(Company $company)
    {
        return response()->json($company, 200);
    }

    // PUT /api/companies/{id}
    public function update(Request $request, Company $company)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $company->update($validated);

        return response()->json($company, 200);
    }

    // DELETE /api/companies/{id}
    public function destroy(Company $company)
    {
        $company->delete();

        return response()->json(null, 204);
    }
}
