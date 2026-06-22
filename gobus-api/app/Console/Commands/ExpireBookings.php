<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use App\Notifications\BookingExpiredNotification;
class ExpireBookings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:expire-bookings';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description =
        'Automatically cancel expired unpaid bookings';

    /**
     * Execute the console command.
     */
     public function handle(): int
    {
        $bookings = Booking::with('user')
            ->where(
                'booking_status',
                'pending_payment'
            )
            ->where(
                'expires_at',
                '<',
                now()
            )
            ->get();

        foreach ($bookings as $booking) {

            $booking->update([
                'booking_status' => 'cancelled',
                'payment_status' => 'failed',
                'cancelled_at' => now(),
            ]);

            $booking->user->notify(
                new BookingExpiredNotification(
                    $booking
                )
            );
        }

        $this->info(
            $bookings->count() .
            ' bookings expired.'
        );

        return self::SUCCESS;
    }
}