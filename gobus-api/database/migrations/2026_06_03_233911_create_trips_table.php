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
        Schema::create('trips', function (Blueprint $table) {
            $table->id();

            $table->foreignId('bus_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('departure_station_id')
                ->constrained('stations')
                ->cascadeOnDelete();

            $table->foreignId('arrival_station_id')
                ->constrained('stations')
                ->cascadeOnDelete();

          

            $table->dateTime('departure_time');

            $table->dateTime('arrival_time');

            $table->integer('duration_minutes');

            $table->decimal('price', 10, 2);

            $table->enum('status', [
                'scheduled',
                'completed',
                'cancelled'
            ])->default('scheduled');

            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
