<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_bays', function (Blueprint $table) {
                $table->id();
                $table->string('bay');
                $table->string('location');
                $table->string('type')->nullable();     // type of bay, e.g. Repair, Inspection
                $table->boolean('available')->default(true);  // true = available, false = occupied
                $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_bays');
    }
};
