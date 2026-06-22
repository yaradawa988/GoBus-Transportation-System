<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Trip;
use App\Models\Booking;
use App\Models\Ticket;
use Carbon\Carbon;
class DashboardController extends Controller
{
     public function index()
    {
        $usersCount = User::count();

        $tripsCount = Trip::count();

        $bookingsCount = Booking::count();

        $ticketsCount = Ticket::count();

        $totalRevenue = Booking::where(
            'booking_status',
            'confirmed'
        )->sum('total_price');

        $todayBookings = Booking::whereDate(
            'created_at',
            today()
        )->count();

        $todayRevenue = Booking::whereDate(
            'created_at',
            today()
        )
        ->where('booking_status', 'confirmed')
        ->sum('total_price');

       $upcomingTrips = Trip::with([
    'bus',
    'departureStation',
    'arrivalStation'
])
->where('departure_time','>',now())
->orderBy('departure_time')
->take(5)
->get()
->map(function ($trip) {

    return [
        'id' => $trip->id,
        'bus' => $trip->bus->name,
        'from' => $trip->departureStation->name,
        'to' => $trip->arrivalStation->name,
        'departure_time' => $trip->departure_time,
        'arrival_time' => $trip->arrival_time,
        'price' => $trip->price,
        'status' => $trip->status,
    ];
});

        return response()->json([
            'status' => true,

            'statistics' => [

                'users' => $usersCount,

                'trips' => $tripsCount,

                'bookings' => $bookingsCount,

                'tickets' => $ticketsCount,

                'revenue' => $totalRevenue,

                'today_bookings' => $todayBookings,

                'today_revenue' => $todayRevenue,
            ],

            'upcoming_trips' => $upcomingTrips
        ]);
    }
}