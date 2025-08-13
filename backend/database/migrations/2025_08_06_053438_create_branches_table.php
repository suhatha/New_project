<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->boolean('status')->default(true); // true = active, false = inactive
            $table->timestamps();

            
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
