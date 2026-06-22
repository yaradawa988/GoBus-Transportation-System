<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Trip;
use App\Models\TripStation;
use App\Models\TripRestStop;
use App\Models\Booking;
use App\Notifications\TripCancelledNotification;
use App\Notifications\TripCompletedNotification;
use Illuminate\Support\Facades\DB;
class TripsController extends Controller
{
     /**
     * List Trips
     */
    public function index()
    {
        $trips = Trip::with([
            'bus',
            'departureStation',
            'arrivalStation'
        ])
        ->latest()
        ->paginate(15);

        return response()->json([
            'status' => true,
            'data' => $trips
        ]);
    }

    /**
     * Create Trip
     */
    public function store(Request $request)
    {
        $request->validate([
            'bus_id' => 'required|exists:buses,id',
            'departure_station_id' => 'required|exists:stations,id',
            'arrival_station_id' => 'required|exists:stations,id',

            'departure_time' => 'required|date',
            'arrival_time' => 'required|date',

            'duration_minutes' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',

            'description' => 'nullable|string',

            'stations' => 'nullable|array',
            'rest_stops' => 'nullable|array',
        ]);

        $trip = Trip::create([
            'bus_id' => $request->bus_id,
            'departure_station_id' => $request->departure_station_id,
            'arrival_station_id' => $request->arrival_station_id,
            'departure_time' => $request->departure_time,
            'arrival_time' => $request->arrival_time,
            'duration_minutes' => $request->duration_minutes,
            'price' => $request->price,
            'status' => 'scheduled',
            'description' => $request->description,
        ]);

        /*
        Intermediate Stations
        */

        if ($request->filled('stations')) {

            foreach ($request->stations as $index => $stationId) {

                TripStation::create([
                    'trip_id' => $trip->id,
                    'station_id' => $stationId,
                    'order_no' => $index + 1
                ]);
            }
        }

        /*
        Rest Stops
        */

        if ($request->filled('rest_stops')) {

            foreach ($request->rest_stops as $index => $stopId) {

                TripRestStop::create([
                    'trip_id' => $trip->id,
                    'rest_stop_id' => $stopId,
                    'order_no' => $index + 1
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Trip created successfully',
            'data' => $trip
        ], 201);
    }

    /**
     * Show Trip
     */
    public function show($id)
    {
        $trip = Trip::with([
            'bus',
            'departureStation',
            'arrivalStation',
            'tripStations.station',
            'tripRestStops.restStop'
        ])->findOrFail($id);

$totalSeats = $trip->bus->seat_count;

$availableSeats =
    $totalSeats -
    count($bookedSeats);

        return response()->json([
            'status' => true,
            'data' => $trip
        ]);
    }

    /**
     * Update Trip
     */
    public function update(Request $request, $id)
    {
        $trip = Trip::findOrFail($id);

        $request->validate([
            'bus_id' => 'required|exists:buses,id',
            'departure_station_id' => 'required|exists:stations,id',
            'arrival_station_id' => 'required|exists:stations,id',

            'departure_time' => 'required|date',
            'arrival_time' => 'required|date',

            'duration_minutes' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',

            'description' => 'nullable|string',

            'stations' => 'nullable|array',
            'rest_stops' => 'nullable|array',
        ]);

        $trip->update([
            'bus_id' => $request->bus_id,
            'departure_station_id' => $request->departure_station_id,
            'arrival_station_id' => $request->arrival_station_id,
            'departure_time' => $request->departure_time,
            'arrival_time' => $request->arrival_time,
            'duration_minutes' => $request->duration_minutes,
            'price' => $request->price,
            'description' => $request->description,
        ]);

        /*
        Reset stations
        */

        TripStation::where(
            'trip_id',
            $trip->id
        )->delete();

        if ($request->filled('stations')) {

            foreach ($request->stations as $index => $stationId) {

                TripStation::create([
                    'trip_id' => $trip->id,
                    'station_id' => $stationId,
                    'order_no' => $index + 1
                ]);
            }
        }

        /*
        Reset Rest Stops
        */

        TripRestStop::where(
            'trip_id',
            $trip->id
        )->delete();

        if ($request->filled('rest_stops')) {

            foreach ($request->rest_stops as $index => $stopId) {

                TripRestStop::create([
                    'trip_id' => $trip->id,
                    'rest_stop_id' => $stopId,
                    'order_no' => $index + 1
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Trip updated successfully'
        ]);
    }

    /**
     * Delete Trip
     */
   public function destroy($id)
{
    $trip = Trip::with('bookings.user')
        ->findOrFail($id);

    DB::transaction(function () use ($trip) {

        $trip->update([
            'status' => 'cancelled'
        ]);

        foreach ($trip->bookings as $booking) {

            if (
                in_array(
                    $booking->booking_status,
                    [
                        'pending_payment',
                        'pending',
                        'confirmed'
                    ]
                )
            ) {

                $booking->update([
                    'booking_status' => 'cancelled',
                    'cancelled_at' => now()
                ]);

                $booking->user->notify(
                    new TripCancelledNotification(
                        $trip,
                        $booking
                    )
                );
            }
        }
    });

    return response()->json([
        'status' => true,
        'message' => 'Trip cancelled successfully'
    ]);
}}