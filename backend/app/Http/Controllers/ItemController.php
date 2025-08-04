<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ItemController extends Controller
{
    /**
     * Display a listing of items
     */
    public function index(Request $request)
    {
        try {
            $query = Item::query();

            // Search functionality
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%")
                      ->orWhere('short_name', 'LIKE', "%{$search}%")
                      ->orWhere('category', 'LIKE', "%{$search}%")
                      ->orWhere('company', 'LIKE', "%{$search}%")
                      ->orWhere('supplier', 'LIKE', "%{$search}%");
                });
            }

            // Filter by status
            if ($request->has('status') && $request->status) {
                $query->where('status', $request->status);
            }

            // Filter by category
            if ($request->has('category') && $request->category) {
                $query->where('category', $request->category);
            }

            $items = $query->orderBy('created_at', 'desc')->paginate(10);

            return response()->json([
                'success' => true,
                'data' => $items,
                'message' => 'Items retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching items: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching items',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created item
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'short_name' => 'nullable|string|max:100',
                'category' => 'required|string|max:100',
                'company' => 'nullable|string|max:255',
                'supplier' => 'nullable|string|max:255',
                'mrp' => 'required|numeric|min:0',
                'quantity' => 'required|integer|min:0',
                'description' => 'nullable|string',
                'status' => 'required|in:active,inactive'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $item = Item::create([
                'name' => $request->name,
                'short_name' => $request->short_name,
                'category' => $request->category,
                'company' => $request->company,
                'supplier' => $request->supplier,
                'mrp' => $request->mrp,
                'quantity' => $request->quantity,
                'description' => $request->description,
                'status' => $request->status,
                'created_by' => auth()->id(),
                'updated_by' => auth()->id()
            ]);

            return response()->json([
                'success' => true,
                'data' => $item,
                'message' => 'Item created successfully'
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error creating item: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error creating item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified item
     */
    public function show($id)
    {
        try {
            $item = Item::find($id);

            if (!$item) {
                return response()->json([
                    'success' => false,
                    'message' => 'Item not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $item,
                'message' => 'Item retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching item: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified item
     */
    public function update(Request $request, $id)
    {
        try {
            $item = Item::find($id);

            if (!$item) {
                return response()->json([
                    'success' => false,
                    'message' => 'Item not found'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'short_name' => 'nullable|string|max:100',
                'category' => 'required|string|max:100',
                'company' => 'nullable|string|max:255',
                'supplier' => 'nullable|string|max:255',
                'mrp' => 'required|numeric|min:0',
                'quantity' => 'required|integer|min:0',
                'description' => 'nullable|string',
                'status' => 'required|in:active,inactive'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $item->update([
                'name' => $request->name,
                'short_name' => $request->short_name,
                'category' => $request->category,
                'company' => $request->company,
                'supplier' => $request->supplier,
                'mrp' => $request->mrp,
                'quantity' => $request->quantity,
                'description' => $request->description,
                'status' => $request->status,
                'updated_by' => auth()->id()
            ]);

            return response()->json([
                'success' => true,
                'data' => $item,
                'message' => 'Item updated successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error updating item: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error updating item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified item
     */
    public function destroy($id)
    {
        try {
            $item = Item::find($id);

            if (!$item) {
                return response()->json([
                    'success' => false,
                    'message' => 'Item not found'
                ], 404);
            }

            $item->delete();

            return response()->json([
                'success' => true,
                'message' => 'Item deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error deleting item: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error deleting item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get categories for dropdown
     */
    public function getCategories()
    {
        try {
            $categories = Item::distinct()->pluck('category')->filter()->values();

            return response()->json([
                'success' => true,
                'data' => $categories,
                'message' => 'Categories retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching categories: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get suppliers for dropdown
     */
    public function getSuppliers()
    {
        try {
            $suppliers = Item::distinct()->pluck('supplier')->filter()->values();

            return response()->json([
                'success' => true,
                'data' => $suppliers,
                'message' => 'Suppliers retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error fetching suppliers: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching suppliers',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 