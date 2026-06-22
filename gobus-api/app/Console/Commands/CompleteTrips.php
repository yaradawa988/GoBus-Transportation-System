<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Trip;
use App\Models\Booking;
use App\Notifications\TripCompletedNotification;
class CompleteTrips extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
   // protected $signature = 'app:complete-trips';
    protected $signature = 'trips:complete';
    /**
     * The console command description.
     *
     * @var string
     */
    //protected $description = 'Command description';

    protected $description =
        'Mark confirmed bookings as completed when trip is completed';

    /**
     * Execute the console command.
     */
    public function handle()
    {
      $trips = Trip::where(
            'status',
            'completed'
        )->get();

        foreach ($trips as $trip) {

            $bookings = Booking::with('user')
                ->where(
                    'trip_id',
                    $trip->id
                )
                ->where(
                    'booking_status',
                    'confirmed'
                )
                ->get();

            foreach ($bookings as $booking) {

                $booking->update([
                    'booking_status' => 'completed'
                ]);

                $booking->user->notify(
                    new TripCompletedNotification(
                        $booking
                    )
                );
            }
        }

        $this->info(
            'Completed bookings updated successfully.'
        );

        return Command::SUCCESS;
    }
}