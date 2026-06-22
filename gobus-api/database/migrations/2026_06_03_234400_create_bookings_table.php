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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('trip_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('booking_number')->unique();

            $table->integer('seats_count');

            $table->decimal('total_price', 10, 2);

            $table->enum('payment_method', [
                'cash',
                'card'
            ]);
            $table->enum('payment_status',[
    'pending',
    'paid',
    'failed',
    'refunded'
])->default('pending');
          $table->enum('booking_status',[
    'pending_payment',
    'pending',
    'confirmed',
    'modified',
    'cancelled',
    'completed'
])->default('pending_payment');

           
            $table->timestamp('booked_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamp('expires_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
