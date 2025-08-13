<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceBay extends Model
{
    use HasFactory;

    protected $fillable = [
        'bay',
        'location',
        'type',
        'available',
        'created_at',
        'updated_at',   
    ];
}