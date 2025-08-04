<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpiryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'itemName',
        'batchNumber',
        'category',
        'quantity',
        'expiryDate',
        'supplier',
        'purchaseDate',
        'cost',
        'location',
        'status'
    ];

    protected $casts = [
        'expiryDate' => 'date',
        'purchaseDate' => 'date',
        'quantity' => 'integer',
        'cost' => 'decimal:2',
    ];

    // Calculate expiry status based on current date
    public function getStatusAttribute($value)
    {
        $today = now();
        $expiry = $this->expiryDate;
        $diff = $expiry->diffInDays($today, false);

        if ($diff >= 0) {
            return 'Expired';
        } elseif ($diff >= -30) {
            return 'Expiring Soon';
        } else {
            return 'Good';
        }
    }
}