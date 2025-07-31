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
                'name' => 'super_admin',
                'description' => 'Full system access with all permissions. Can manage all users, roles, and system settings.'
            ],
            [
                'name' => 'admin',
                'description' => 'Administrative access with most system permissions. Can manage users and roles.'
            ],
            [
                'name' => 'manager',
                'description' => 'Branch or department manager with limited administrative access.'
            ],
            [
                'name' => 'cashier',
                'description' => 'Cashier with access to sales and payment functions.'
            ],
            [
                'name' => 'technician',
                'description' => 'Service technician with access to service and repair functions.'
            ],
        ];

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(
                ['name' => $role['name']], // unique by name
                [
                    'description' => $role['description'],
                    'updated_at' => Carbon::now(),
                    'created_at' => Carbon::now(),
                ]
            );
        }
    }
}
