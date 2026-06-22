<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\BookingSeat;
class TripController extends Controller
{
   public function search(Request $request)
{
    $request->validate([
        'departure_station_id' =>
            'required|exists:stations,id',

        'arrival_station_id' =>
            'required|exists:stations,id',

        'date' => 'required|date',
    ]);

    $trips = Trip::with([
            'bus',
            'departureStation',
            'arrivalStation',
            'stations',
            'restStops'
        ])
        ->withAvg(
            'reviews',
            'rating'
        )
        ->withCount(
            'reviews'
        )

        // مسار الرحلة
        ->where(
            'departure_station_id',
            $request->departure_station_id
        )
        ->where(
            'arrival_station_id',
            $request->arrival_station_id
        )

        // نفس التاريخ
        ->whereDate(
            'departure_time',
            $request->date
        )

        // الرحلات غير المنتهية فقط
        ->where(
            'departure_time',
            '>',
            now()
        )

        // الرحلات المتاحة فقط
        ->where(
            'status',
            'scheduled'
        )

        ->get()

        ->map(function ($trip) {

            $totalSeats =
                $trip->bus->seat_count;

            $bookedSeats =
                BookingSeat::where(
                    'trip_id',
                    $trip->id
                )
                ->whereHas(
                    'booking',
                    function ($q) {

                        $q->whereNotIn(
                            'booking_status',
                            [
                                'cancelled'
                            ]
                        );

                    }
                )
                ->count();

            $availableSeats =
                $totalSeats -
                $bookedSeats;

            return [

                'id' => $trip->id,

                'bus' =>
                    $trip->bus->name,

                'bus_number' =>
                    $trip->bus->bus_number,

                'from' =>
                    $trip
                    ->departureStation
                    ->name,

                'to' =>
                    $trip
                    ->arrivalStation
                    ->name,

                'departure_time' =>
                    $trip
                    ->departure_time,

                'arrival_time' =>
                    $trip
                    ->arrival_time,

                'duration_minutes' =>
                    $trip
                    ->duration_minutes,

                'price' =>
                    $trip->price,

                'status' =>
                    $trip->status,

                'average_rating' =>
                    round(
                        $trip->reviews_avg_rating ?? 0,
                        1
                    ),

                'reviews_count' =>
                    $trip->reviews_count,

                'available_seats' =>
                    $availableSeats,

                'total_seats' =>
                    $totalSeats,
            ];
        })

        // استبعاد الرحلات الممتلئة
        ->filter(function ($trip) {
            return
                $trip['available_seats']
                > 0;
        })

        ->values();

    return response()->json([
        'status' => true,
        'count' => $trips->count(),
        'data' => $trips
    ]);
}

    /**
     * Show single trip details (for booking page)
     */
   public function show($id)
{
    $trip = Trip::with([
        'bus.seats',
        'departureStation',
        'arrivalStation',
        'stations',
        'restStops'
    ])
    ->withAvg('reviews', 'rating')
    ->withCount('reviews')
    ->findOrFail($id);

  $bookedSeats = BookingSeat::where(
        'trip_id',
        $trip->id
    )
    ->whereHas('booking', function ($q) {
        $q->whereNotIn(
            'booking_status',
            ['cancelled']
        );
    })
    ->pluck('seat_id')
    ->toArray();

    $totalSeats =
        $trip->bus->seat_count;

    $availableSeats =
        $totalSeats -
        count($bookedSeats);

    return response()->json([
        'status' => true,

        'trip' => array_merge(
            $trip->toArray(),
            [
                'average_rating' => round(
                    $trip->reviews_avg_rating ?? 0,
                    1
                ),

                'reviews_count' =>
                    $trip->reviews_count,
            ]
        ),

        'booked_seats' =>
            $bookedSeats,

        'available_seats' =>
            $availableSeats,

        'total_seats' =>
            $totalSeats
    ]);
}
  public function index()
{
    $trips = Trip::with([
        'bus',
        'departureStation',
        'arrivalStation'
    ])
    ->withAvg(
        'reviews',
        'rating'
    )
    ->withCount(
        'reviews'
    )
    ->latest()
    ->get()
    ->map(function ($trip) {

        $totalSeats =
            $trip->bus->seat_count;

      $bookedSeats = BookingSeat::where(
        'trip_id',
        $trip->id
    )
    ->whereHas('booking', function ($q) {
        $q->whereNotIn(
            'booking_status',
            ['cancelled']
        );
    })
    ->count();

        return [

            'id' => $trip->id,

            'bus' =>
                $trip->bus->name,

            'from' =>
                $trip->departureStation->name,

            'to' =>
                $trip->arrivalStation->name,

            'departure_time' =>
                $trip->departure_time,

            'arrival_time' =>
                $trip->arrival_time,

            'duration_minutes' =>
                $trip->duration_minutes,

            'price' =>
                $trip->price,

            'average_rating' =>
                round(
                    $trip->reviews_avg_rating ?? 0,
                    1
                ),

            'reviews_count' =>
                $trip->reviews_count,

            'available_seats' =>
                $totalSeats - $bookedSeats,
        ];
    });

    return response()->json([
        'status' => true,
        'data' => $trips
    ]);
}
}
