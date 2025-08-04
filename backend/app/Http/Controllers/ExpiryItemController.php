<?php

namespace App\Http\Controllers;

use App\Models\ExpiryItem;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ExpiryItemController extends Controller
{
    /**
     * Display a listing of expiry items
     */
    public function index(Request $request)
    {
        try {
            $query = ExpiryItem::query();

            // Search functionality
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('itemName', 'LIKE', "%{$search}%")
                      ->orWhere('batchNumber', 'LIKE', "%{$search}%")
                      ->orWhere('category', 'LIKE', "%{$search}%")
                      ->orWhere('supplier', 'LIKE', "%{$search}%");
                });
            }

            // Filter by status
            if ($request->has('status') && $request->status && $request->status !== 'All') {
                $query->where('status', $request->status);
            }

            // Filter by date range
            if ($request->has('referenceDate') && $request->referenceDate) {
                // This will be used for custom date filtering if needed
                $referenceDate = $request->referenceDate;
            }

            $expiryItems = $query->orderBy('expiryDate', 'asc')->get();

            return response()->json([
                'success' => true,
                'data' => $expiryItems,
                'message' => 'Expiry items retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve expiry items: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve expiry items',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created expiry item
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'itemName' => 'required|string|max:255',
                'batchNumber' => 'nullable|string|max:255',
                'category' => 'nullable|string|max:255',
                'quantity' => 'nullable|integer',
                'expiryDate' => 'required|date',
                'supplier' => 'nullable|string|max:255',
                'purchaseDate' => 'nullable|date',
                'cost' => 'nullable|numeric',
                'location' => 'nullable|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Calculate status based on expiry date
            $expiryDate = new \DateTime($request->expiryDate);
            $today = new \DateTime();
            $diff = $expiryDate->diff($today)->days;
            $diffDirection = $expiryDate > $today ? -1 : 1; // -1 if future, 1 if past
            $diff *= $diffDirection;

            if ($diff >= 0) {
                $status = 'Expired';
            } elseif ($diff >= -30) {
                $status = 'Expiring Soon';
            } else {
                $status = 'Good';
            }

            $expiryItem = ExpiryItem::create([
                'itemName' => $request->itemName,
                'batchNumber' => $request->batchNumber,
                'category' => $request->category,
                'quantity' => $request->quantity ?? 0,
                'expiryDate' => $request->expiryDate,
                'supplier' => $request->supplier,
                'purchaseDate' => $request->purchaseDate,
                'cost' => $request->cost,
                'location' => $request->location,
                'status' => $status
            ]);

            // Also update or create a corresponding item in the items table
            $item = Item::updateOrCreate(
                ['name' => $request->itemName],
                [
                    'category' => $request->category,
                    'supplier' => $request->supplier,
                    'quantity' => $request->quantity ?? 0,
                    'status' => 'active'
                ]
            );

            return response()->json([
                'success' => true,
                'data' => $expiryItem,
                'message' => 'Expiry item created successfully'
            ], 201);

        } catch (\Exception $e) {
            Log::error('Failed to create expiry item: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create expiry item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified expiry item
     */
    public function show($id)
    {
        try {
            $expiryItem = ExpiryItem::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $expiryItem,
                'message' => 'Expiry item retrieved successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve expiry item: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve expiry item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified expiry item
     */
    public function update(Request $request, $id)
    {
        try {
            $expiryItem = ExpiryItem::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'itemName' => 'required|string|max:255',
                'batchNumber' => 'nullable|string|max:255',
                'category' => 'nullable|string|max:255',
                'quantity' => 'nullable|integer',
                'expiryDate' => 'required|date',
                'supplier' => 'nullable|string|max:255',
                'purchaseDate' => 'nullable|date',
                'cost' => 'nullable|numeric',
                'location' => 'nullable|string|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Calculate status based on expiry date
            $expiryDate = new \DateTime($request->expiryDate);
            $today = new \DateTime();
            $diff = $expiryDate->diff($today)->days;
            $diffDirection = $expiryDate > $today ? -1 : 1; // -1 if future, 1 if past
            $diff *= $diffDirection;

            if ($diff >= 0) {
                $status = 'Expired';
            } elseif ($diff >= -30) {
                $status = 'Expiring Soon';
            } else {
                $status = 'Good';
            }

            $expiryItem->update([
                'itemName' => $request->itemName,
                'batchNumber' => $request->batchNumber,
                'category' => $request->category,
                'quantity' => $request->quantity ?? 0,
                'expiryDate' => $request->expiryDate,
                'supplier' => $request->supplier,
                'purchaseDate' => $request->purchaseDate,
                'cost' => $request->cost,
                'location' => $request->location,
                'status' => $status
            ]);

            return response()->json([
                'success' => true,
                'data' => $expiryItem,
                'message' => 'Expiry item updated successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to update expiry item: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to update expiry item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified expiry item
     */
    public function destroy($id)
    {
        try {
            $expiryItem = ExpiryItem::findOrFail($id);
            $expiryItem->delete();

            return response()->json([
                'success' => true,
                'message' => 'Expiry item deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to delete expiry item: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete expiry item',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}