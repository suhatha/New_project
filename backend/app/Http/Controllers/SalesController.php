<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SalesController extends Controller
{
    /**
     * Display a listing of sales entries
     */
    public function index(Request $request)
    {
        try {
            $query = Sale::query();
            
            // Search functionality
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('bill_number', 'like', "%{$search}%")
                      ->orWhere('customer', 'like', "%{$search}%")
                      ->orWhere('type', 'like', "%{$search}%");
                });
            }
            
            // Filter by status
            if ($request->has('status') && $request->status) {
                $query->where('status', $request->status);
            }
            
            // Filter by payment method
            if ($request->has('payment_method') && $request->payment_method) {
                $query->where('payment_method', $request->payment_method);
            }
            
            // Filter by date range
            if ($request->has('date_from') && $request->date_from) {
                $query->whereDate('created_at', '>=', $request->date_from);
            }
            
            if ($request->has('date_to') && $request->date_to) {
                $query->whereDate('created_at', '<=', $request->date_to);
            }
            
            // Order by latest first
            $sales = $query->orderBy('created_at', 'desc')->get();
            
            return response()->json($sales);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch sales data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created sales entry
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'type' => 'string|max:255',
                'bill_number' => 'required|string|unique:sales,bill_number|max:255',
                'customer' => 'required|string|max:255',
                'total' => 'required|numeric|min:0',
                'payment_method' => 'required|string|max:255',
                'status' => 'string|max:255',
                'notes' => 'nullable|string'
            ]);
            
            $sale = Sale::create($validatedData);
            
            return response()->json($sale, 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to create sales entry',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified sales entry
     */
    public function show(Sale $sale)
    {
        try {
            return response()->json($sale);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch sales entry',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified sales entry
     */
    public function update(Request $request, Sale $sale)
    {
        try {
            $validatedData = $request->validate([
                'type' => 'string|max:255',
                'bill_number' => 'required|string|max:255|unique:sales,bill_number,' . $sale->id,
                'customer' => 'required|string|max:255',
                'total' => 'required|numeric|min:0',
                'payment_method' => 'required|string|max:255',
                'status' => 'string|max:255',
                'notes' => 'nullable|string'
            ]);
            
            $sale->update($validatedData);
            
            return response()->json($sale);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update sales entry',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified sales entry
     */
    public function destroy(Sale $sale)
    {
        try {
            $sale->delete();
            
            return response()->json([
                'message' => 'Sales entry deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete sales entry',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get sales statistics and KPIs
     */
    public function getStatistics(Request $request)
    {
        try {
            $query = Sale::query();
            
            // Filter by date range if provided
            if ($request->has('date_from') && $request->date_from) {
                $query->whereDate('created_at', '>=', $request->date_from);
            }
            
            if ($request->has('date_to') && $request->date_to) {
                $query->whereDate('created_at', '<=', $request->date_to);
            }
            
            $sales = $query->get();
            
            $totalEntries = $sales->count();
            $totalRevenue = $sales->sum('total');
            $averageSale = $totalEntries > 0 ? $totalRevenue / $totalEntries : 0;
            
            // Get date range
            $dateFrom = $request->date_from ?? $sales->min('created_at');
            $dateTo = $request->date_to ?? $sales->max('created_at');
            
            return response()->json([
                'totalEntries' => $totalEntries,
                'totalRevenue' => round($totalRevenue, 2),
                'averageSale' => round($averageSale, 2),
                'dateRange' => [
                    'from' => $dateFrom ? Carbon::parse($dateFrom)->format('n/j/Y') : null,
                    'to' => $dateTo ? Carbon::parse($dateTo)->format('n/j/Y') : null
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch sales statistics',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate next bill number
     */
    public function generateBillNumber()
    {
        try {
            $lastSale = Sale::orderBy('id', 'desc')->first();
            $nextNumber = $lastSale ? $lastSale->id + 1 : 1;
            
            // Format: #U2/SHA/0001
            $billNumber = sprintf('#U2/SHA/%04d', $nextNumber);
            
            return response()->json([
                'bill_number' => $billNumber
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate bill number',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
