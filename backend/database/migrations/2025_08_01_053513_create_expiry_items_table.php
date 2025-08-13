<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpiryItemsTable extends Migration
{
    public function up()
    {
        Schema::create('expiry_items', function (Blueprint $table) {
            $table->id();
            $table->string('itemName');
            $table->string('batchNumber')->nullable();
            $table->string('category')->nullable();
            $table->integer('quantity')->default(0);
            $table->date('expiryDate');
            $table->string('supplier')->nullable();
            $table->date('purchaseDate')->nullable();
            $table->decimal('cost', 10, 2)->nullable();
            $table->string('location')->nullable();
            $table->string('status')->default('Good'); // Good, Expiring Soon, Expired
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('expiry_items');
    }
}
