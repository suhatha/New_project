<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            [
                'name' => 'Super Admin', // ✅ match this exactly with UserSeeder
                'description' => 'Full system access with all permissions. Can manage all users, roles, and system settings.'
            ],
            [
                'name' => 'Admin',
                'description' => 'Administrative access with most system permissions. Can manage users and roles.'
            ],
        ];

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(
                ['name' => $role['name']],
                [
                    'description' => $role['description'],
                    'updated_at' => Carbon::now(),
                    'created_at' => Carbon::now(),
                ]
            );
        }
    }
}
