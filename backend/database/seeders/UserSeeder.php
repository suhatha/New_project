<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Optional: Clear users
        DB::table('users')->truncate();

        // Create roles if not already there
        $superAdminRoleId = DB::table('roles')->where('name', 'Super Admin')->value('id');
        if (!$superAdminRoleId) {
            $superAdminRoleId = DB::table('roles')->insertGetId([
                'name' => 'Super Admin',
                'description' => 'Super admin role',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $adminRoleId = DB::table('roles')->where('name', 'Admin')->value('id');
        if (!$adminRoleId) {
            $adminRoleId = DB::table('roles')->insertGetId([
                'name' => 'Admin',
                'description' => 'Admin role',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Insert users
        DB::table('users')->insert([
            [
                'name' => 'Super Admin User',
                'email' => 'superadmin@example.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('password123'),
                'role_id' => $superAdminRoleId,
                'status' => 1,
                'remember_token' => Str::random(10),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('password123'),
                'role_id' => $adminRoleId,
                'status' => 1,
                'remember_token' => Str::random(10),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
