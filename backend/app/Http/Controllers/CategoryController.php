<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // GET /api/categories
    public function index()
    {
        return response()->json(Category::all(), 200);
    }

    // POST /api/categories
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category = Category::create($validated);

        return response()->json($category, 201);
    }

    // GET /api/categories/{id}
    public function show(Category $category)
    {
        return response()->json($category, 200);
    }

    // PUT /api/categories/{id}
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'category_name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category->update($validated);

        return response()->json($category, 200);
    }

    // DELETE /api/categories/{id}
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }
}
