<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Branch;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    public function run()
    {
        Branch::create(['name' => 'Main Branch', 'location' => 'Downtown']);
        Branch::create(['name' => 'West Branch', 'location' => 'West City']);
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
        ]);
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);
        User::create([
            'name' => 'Manager',
            'email' => 'manager@example.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
        ]);
        User::create([
            'name' => 'Branch Manager',
            'email' => 'branchmanager@example.com',
            'password' => Hash::make('password'),
            'role' => 'branch_manager',
            'branch_id' => 1,
        ]);
        User::create([
            'name' => 'Cashier',
            'email' => 'cashier@example.com',
            'password' => Hash::make('password'),
            'role' => 'cashier',
            'branch_id' => 1,
        ]);
    }
}