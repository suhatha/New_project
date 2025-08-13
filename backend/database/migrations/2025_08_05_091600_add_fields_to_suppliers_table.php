<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToSuppliersTable extends Migration
{
    public function up()
    {
        Schema::table('suppliers', function (Blueprint $table) {
            $table->string('supplier_name')->after('id');
            $table->string('address')->nullable()->after('supplier_name');
            $table->string('contact')->nullable()->after('address');
            $table->decimal('opening_balance', 10, 2)->default(0)->after('contact');
        });
    }

    public function down()
    {
        Schema::table('suppliers', function (Blueprint $table) {
            $table->dropColumn(['supplier_name', 'address', 'contact', 'opening_balance']);
        });
    }
}
