<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('roles', function (Blueprint $table) {
            $table->id(); // role_id
            $table->string('name')->unique(); // role name like 'admin', 'manager'
            $table->text('description')->nullable(); // role description
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('roles');
    }
}; 