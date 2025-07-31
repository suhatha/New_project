<?php
// Simple test script to check login functionality
// Run this from the backend directory: php test-login.php

require_once 'vendor/autoload.php';

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;

echo "=== IMSS AutoSuite Login Test ===\n\n";

try {
    // Test 1: Check if database is connected
    echo "1. Testing database connection...\n";
    DB::connection()->getPdo();
    echo "✅ Database connection successful\n\n";

    // Test 2: Check if roles exist
    echo "2. Checking roles...\n";
    $roles = Role::all();
    echo "Found " . $roles->count() . " roles:\n";
    foreach ($roles as $role) {
        echo "  - {$role->name} (ID: {$role->id})\n";
    }
    echo "\n";

    // Test 3: Check if users exist
    echo "3. Checking users...\n";
    $users = User::with('role')->get();
    echo "Found " . $users->count() . " users:\n";
    foreach ($users as $user) {
        $roleName = $user->role ? $user->role->name : 'No role';
        echo "  - {$user->name} ({$user->email}) - Role: {$roleName}\n";
    }
    echo "\n";

    // Test 4: Test login with seeded credentials
    echo "4. Testing login with seeded credentials...\n";
    
    $testEmails = [
        'superadmin@example.com',
        'admin@example.com'
    ];
    
    foreach ($testEmails as $email) {
        $user = User::where('email', $email)->first();
        if ($user) {
            echo "Testing login for: {$email}\n";
            
            // Test password verification
            if (Hash::check('password123', $user->password)) {
                echo "  ✅ Password verification successful\n";
                echo "  User ID: {$user->id}\n";
                echo "  Role: " . ($user->role ? $user->role->name : 'No role') . "\n";
            } else {
                echo "  ❌ Password verification failed\n";
            }
            echo "\n";
        } else {
            echo "❌ User not found: {$email}\n\n";
        }
    }

    // Test 5: Check JWT configuration
    echo "5. Checking JWT configuration...\n";
    $jwtSecret = config('jwt.secret');
    if ($jwtSecret) {
        echo "✅ JWT secret is configured\n";
    } else {
        echo "❌ JWT secret is not configured\n";
    }
    echo "\n";

    echo "=== Test Complete ===\n";
    echo "If all tests pass, try logging in with:\n";
    echo "Email: superadmin@example.com\n";
    echo "Password: password123\n\n";

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
} 