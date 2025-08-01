<?php
namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    protected $fillable = [
        'name', 
        'email', 
        'password', 
        'role_id', 
        'status'
    ];
    
    protected $hidden = ['password', 'remember_token'];
    
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    
    public function getJWTCustomClaims()
    {
        return [
            'role' => $this->role->name ?? null,
        ];
    }
    
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    

}