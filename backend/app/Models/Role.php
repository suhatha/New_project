<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get the permissions for this role
     */
    public function permissions()
    {
        return $this->hasMany(RolePermission::class);
    }

    /**
     * Check if role has a specific permission
     */
    public function hasPermission($moduleName, $action = 'view')
    {
        $permission = $this->permissions()->where('module_name', $moduleName)->first();
        
        if (!$permission) {
            return false;
        }

        switch ($action) {
            case 'view':
                return $permission->can_view;
            case 'create':
                return $permission->can_create;
            case 'update':
                return $permission->can_update;
            case 'delete':
                return $permission->can_delete;
            default:
                return $permission->hasAnyAccess();
        }
    }

    /**
     * Check if role has any access to a module
     */
    public function hasAnyPermission($moduleName)
    {
        $permission = $this->permissions()->where('module_name', $moduleName)->first();
        return $permission ? $permission->hasAnyAccess() : false;
    }

    /**
     * Get all modules this role has access to
     */
    public function getAccessibleModules()
    {
        return $this->permissions()
            ->where(function($query) {
                $query->where('can_view', true)
                      ->orWhere('can_create', true)
                      ->orWhere('can_update', true)
                      ->orWhere('can_delete', true);
            })
            ->pluck('module_name')
            ->toArray();
    }
}
