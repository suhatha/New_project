<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Technician extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'specialization',
        'status',
        'created_at',
        'updated_at',
        
    ];
}
