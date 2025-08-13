<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RolePermission extends Model
{
    use HasFactory;

    protected $fillable = [
        'role_id',
        'module_name',
        'display_name',
        'description',
        'can_view',
        'can_create',
        'can_update',
        'can_delete'
    ];

    protected $casts = [
        'can_view' => 'boolean',
        'can_create' => 'boolean',
        'can_update' => 'boolean',
        'can_delete' => 'boolean'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
        
    }

    public function hasAnyAccess()
    {
        return $this->can_view || $this->can_create || $this->can_update || $this->can_delete;
    }

    public function getAccessLevel()
    {
        $permissions = [];
        if ($this->can_view) $permissions[] = 'View';
        if ($this->can_create) $permissions[] = 'Create';
        if ($this->can_update) $permissions[] = 'Update';
        if ($this->can_delete) $permissions[] = 'Delete';
        
        return empty($permissions) ? 'No Access' : implode(', ', $permissions);
    }
}
