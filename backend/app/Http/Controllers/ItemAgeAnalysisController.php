<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ItemAgeAnalysisController extends Controller
{
    public function getAgeAnalysisData()
    {
        try {
            // Get all items with their age in days
            $items = Item::select('*')
                ->selectRaw('DATEDIFF(NOW(), created_at) as age_days')
                ->get();

            // Group items by age ranges
            $ageGroups = [
                '0-30 days' => 0,
                '31-60 days' => 0,
                '61-90 days' => 0,
                '90+ days' => 0
            ];

            $ageGroupValues = [
                '0-30 days' => 0,
                '31-60 days' => 0,
                '61-90 days' => 0,
                '90+ days' => 0
            ];

            $detailedItems = [];

            foreach ($items as $item) {
                $age = $item->age_days;
                $value = ($item->quantity ?? 0) * ($item->cost ?? 0);

                // Categorize by age
                if ($age <= 30) {
                    $ageGroups['0-30 days']++;
                    $ageGroupValues['0-30 days'] += $value;
                } elseif ($age <= 60) {
                    $ageGroups['31-60 days']++;
                    $ageGroupValues['31-60 days'] += $value;
                } elseif ($age <= 90) {
                    $ageGroups['61-90 days']++;
                    $ageGroupValues['61-90 days'] += $value;
                } else {
                    $ageGroups['90+ days']++;
                    $ageGroupValues['90+ days'] += $value;
                }

                // Add to detailed items array
                $detailedItems[] = [
                    'id' => $item->id,
                    'product' => $item->name,
                    'category' => $item->category ?? 'N/A',
                    'batch' => $item->item_id ?? 'N/A',
                    'created' => $item->created_at ? $item->created_at->format('M d, Y') : 'N/A',
                    'age' => $age,
                    'purchased' => $item->quantity ?? 0,
                    'sold' => ($item->quantity ?? 0) - ($item->open_qty ?? 0),
                    'stock' => $item->open_qty ?? 0,
                    'value' => round($value, 2)
                ];
            }

            // Prepare pie chart data
            $pieData = [];
            $colors = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
            $colorIndex = 0;
            
            foreach ($ageGroups as $range => $count) {
                if ($count > 0) {
                    $pieData[] = [
                        'name' => $range,
                        'value' => $count,
                        'color' => $colors[$colorIndex % count($colors)]
                    ];
                }
                $colorIndex++;
            }

            // Prepare bar chart data
            $barData = [];
            foreach ($ageGroupValues as $range => $value) {
                $barData[] = [
                    'age' => $range,
                    'value' => round($value, 2)
                ];
            }

            return response()->json([
                'pieData' => $pieData,
                'barData' => $barData,
                'tableData' => $detailedItems,
                'summary' => [
                    'totalItems' => $items->count(),
                    'totalValue' => round(array_sum($ageGroupValues), 2)
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch age analysis data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function generateReport(Request $request)
    {
        try {
            // Get age analysis data
            $analysisResponse = $this->getAgeAnalysisData();
            $analysisData = json_decode($analysisResponse->getContent(), true);

            if (isset($analysisData['error'])) {
                return response()->json([
                    'error' => 'Failed to generate report',
                    'message' => $analysisData['message']
                ], 500);
            }

            // Generate report data
            $reportData = [
                'reportId' => 'IAR-' . date('YmdHis'),
                'generatedAt' => now()->format('Y-m-d H:i:s'),
                'generatedBy' => 'System', // You can get this from authenticated user
                'summary' => $analysisData['summary'],
                'ageDistribution' => $analysisData['pieData'],
                'valueDistribution' => $analysisData['barData'],
                'detailedItems' => $analysisData['tableData']
            ];

            // You can save this report to database if needed
            // For now, we'll just return the report data

            return response()->json([
                'success' => true,
                'message' => 'Report generated successfully!',
                'report' => $reportData
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate report',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
