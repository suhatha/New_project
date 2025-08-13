<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // This method will run when you execute `php artisan migrate`
    public function up(): void
    {
        Schema::dropIfExists('role_permissions');
    }

    // This method will run when you rollback (`php artisan migrate:rollback`)
    public function down(): void
    {
        Schema::create('role_permissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('role_id');
            $table->string('module_name');
            $table->string('display_name');
            $table->text('description')->nullable();
            $table->boolean('can_view')->default(false);
            $table->boolean('can_add')->default(false);
            $table->boolean('can_edit')->default(false);
            $table->boolean('can_delete')->default(false);
            $table->timestamps();

            // If you had a foreign key on role_id
            // $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
        });
    }
};
