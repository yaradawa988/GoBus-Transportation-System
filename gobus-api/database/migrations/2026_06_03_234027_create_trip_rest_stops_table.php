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
        Schema::create('trip_rest_stops', function (Blueprint $table) {
             $table->id();

            $table->foreignId('trip_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('rest_stop_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->integer('order_no');

            $table->timestamps();

            $table->unique([
                'trip_id',
                'rest_stop_id'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trip_rest_stops');
    }
};
