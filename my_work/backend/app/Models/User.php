<?php
namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
class User extends Authenticatable implements JWTSubject
{
    protected $fillable = ['name', 'email', 'password', 'role', 'branch_id'];
    protected $hidden = ['password', 'remember_token'];
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [
            'role' => $this->role,
            'branch_id' => $this->branch_id,
        ];
    }
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }
}