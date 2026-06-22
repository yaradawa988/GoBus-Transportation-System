<?php

namespace App\Http\Controllers\Api;
use App\Models\Ticket;
use App\Models\Trip;
use App\Models\Booking;
use App\Models\BookingSeat;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Notifications\BookingConfirmedNotification;
use App\Notifications\BookingCancelledNotification;
use App\Notifications\TicketGeneratedNotification;
use App\Services\GenerateTicketService;
use App\Services\ActivityLogger;
class BookingController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'trip_id' => 'required|exists:trips,id',
        'seat_ids' => 'required|array|min:1',
        'seat_ids.*' => 'required|integer|exists:seats,id',
        'payment_method' => 'required|in:cash,card',
    ]);

    try {

        return DB::transaction(function () use ($request) {

            /*
            |---------------------------------
            | 1. LOCK TRIP (Prevent Race Condition)
            |---------------------------------
            */
            $trip = Trip::with('bus.seats')
                ->lockForUpdate()
                ->findOrFail($request->trip_id);

            /*
            |---------------------------------
            | 2. TRIP VALIDATION (STATUS + TIME)
            |---------------------------------
            */
            if (
                $trip->status !== 'scheduled'
                || now()->greaterThanOrEqualTo($trip->departure_time)
            ) {
                return response()->json([
                    'status' => false,
                    'message' => 'This trip is not available for booking.'
                ], 422);
            }

            /*
            |---------------------------------
            | 3. DUPLICATE SEATS CHECK
            |---------------------------------
            */
            if (count($request->seat_ids) !== count(array_unique($request->seat_ids))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Duplicate seats are not allowed.'
                ], 422);
            }

            /*
            |---------------------------------
            | 4. VALIDATE SEATS BELONG TO BUS
            |---------------------------------
            */
            $validSeats = $trip->bus->seats()
                ->whereIn('id', $request->seat_ids)
                ->pluck('id')
                ->toArray();

            if (count($validSeats) !== count($request->seat_ids)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid seats selected.'
                ], 422);
            }

            /*
            |---------------------------------
            | 5. GET RESERVED SEATS (FINAL SOURCE OF TRUTH)
            |---------------------------------
            */
            $reservedSeats = BookingSeat::where('trip_id', $trip->id)
                ->whereHas('booking', function ($q) {
                    $q->whereIn('booking_status', [
                        'pending',
                        'pending_payment',
                        'confirmed'
                    ]);
                })
                ->pluck('seat_id')
                ->toArray();

            /*
            |---------------------------------
            | 6. CONFLICT CHECK
            |---------------------------------
            */
            $conflicts = array_intersect($request->seat_ids, $reservedSeats);

            if (!empty($conflicts)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Some selected seats are already booked.'
                ], 422);
            }

            /*
            |---------------------------------
            | 7. CAPACITY CHECK
            |---------------------------------
            */
            $availableSeats = $trip->bus->seat_count - count($reservedSeats);

            if (count($request->seat_ids) > $availableSeats) {
                return response()->json([
                    'status' => false,
                    'message' => 'Not enough available seats.'
                ], 422);
            }

            if ($availableSeats <= 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'This trip is fully booked.'
                ], 422);
            }

            /*
            |---------------------------------
            | 8. CREATE BOOKING
            |---------------------------------
            */
            $totalPrice = count($request->seat_ids) * $trip->price;

            $booking = Booking::create([
                'user_id' => $request->user()->id,
                'trip_id' => $trip->id,
                'booking_number' => 'BK-' . strtoupper(Str::random(8)),
                'seats_count' => count($request->seat_ids),
                'total_price' => $totalPrice,
                'payment_method' => $request->payment_method,
                'payment_status' => 'pending',
                'booking_status' =>
                    $request->payment_method === 'card'
                        ? 'pending_payment'
                        : 'pending',
                'booked_at' => now(),
                'expires_at' =>
                    $request->payment_method === 'card'
                        ? now()->addMinutes(15)
                        : null,
            ]);

            /*
            |---------------------------------
            | 9. STORE SEATS
            |---------------------------------
            */
            foreach ($request->seat_ids as $seatId) {
                BookingSeat::create([
                    'booking_id' => $booking->id,
                    'trip_id' => $trip->id,
                    'seat_id' => $seatId,
                ]);
            }

            /*
            |---------------------------------
            | 10. LOG
            |---------------------------------
            */
            ActivityLogger::log(
                $request->user()->id,
                'BOOKING_CREATED',
                'Booking #' . $booking->booking_number
            );

            /*
            |---------------------------------
            | 11. RESPONSE
            |---------------------------------
            */
            return response()->json([
                'status' => true,
                'requires_payment' => $request->payment_method === 'card',
                'message' =>
                    $request->payment_method === 'card'
                        ? 'Booking created. Please complete payment.'
                        : 'Booking submitted successfully.',
                'booking' => $booking->load(['trip', 'user', 'seats'])
            ], 201);
        });

    } catch (\Exception $e) {

        return response()->json([
            'status' => false,
            'message' => 'Failed to create booking.',
            'error' => config('app.debug') ? $e->getMessage() : null
        ], 500);
    }
}




public function pay(
   $id,
    Request $request,
    GenerateTicketService $ticketService
)
{
    $booking = Booking::with('ticket')
        ->where(
            'user_id',
            $request->user()->id
        )
        ->findOrFail($id);

    if (
        $booking->payment_method !== 'card'
    ) {
        return response()->json([
            'status' => false,
            'message' => 'This booking does not require card payment.'
        ],422);
    }

    if (
        $booking->payment_status === 'paid'
    ) {
        return response()->json([
            'status' => false,
            'message' => 'Booking already paid.'
        ],422);
    }

    DB::transaction(function () use (
        $booking,
        $ticketService
    ) {

        $booking->update([
            'payment_status' => 'paid',
            'booking_status' => 'confirmed',
        ]);

      if (!$booking->ticket) {

    $ticket = $ticketService->generate(
        $booking
    );

    $booking->user->notify(
        new TicketGeneratedNotification(
            $ticket
        )
    );
}
$booking->user->notify(
    new BookingConfirmedNotification(
        $booking
    )
);
    });

    return response()->json([
        'status' => true,
        'message' => 'Payment completed successfully.',
        'booking' => $booking->fresh([
            'ticket'
        ])
    ]);
}

  public function myBookings(Request $request)
{
    $type = $request->get(
        'type',
        'current'
    );

    $query = Booking::with([
        'trip.bus',
        'trip.departureStation',
        'trip.arrivalStation',
        'seats',
        'ticket'
    ])
    ->where(
        'user_id',
        $request->user()->id
    );

    if ($type === 'history') {

        $query->whereIn(
            'booking_status',
            [
                'completed',
                'cancelled'
            ]
        );

    } else {

        $query->whereIn(
            'booking_status',
            [
                'pending',
                'pending_payment',
                'confirmed'
            ]
        );
    }

    $bookings = $query
        ->latest()
        ->get()
        ->map(function ($booking) {

            $booking->can_view_ticket =
                $booking->ticket
                && $booking->booking_status
                    !== 'cancelled';

            $booking->can_download_ticket =
                $booking->ticket
                && $booking->booking_status
                    !== 'cancelled';

            $booking->ticket_message = match (
                $booking->booking_status
            ) {

                'cancelled' =>
                    'This booking was cancelled. The ticket is no longer valid.',

                'completed' =>
                    'Trip completed. This ticket is kept for your records.',

                default => null,
            };

            return $booking;
        });

    return response()->json([
        'status' => true,
        'data' => $bookings
    ]);
}

     /**
     * Cancel Booking
     */
    public function cancel($id, Request $request)
    {
        $booking = Booking::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        if ($booking->booking_status === 'cancelled') {
            return response()->json([
                'status' => false,
                'message' => 'Booking already cancelled'
            ], 422);
        }

        if ($booking->booking_status === 'completed') {
            return response()->json([
                'status' => false,
                'message' => 'Completed booking cannot be cancelled'
            ], 422);
        }

        try {
            DB::transaction(function () use ($booking, $request) {
                
                $booking->update([
                    'booking_status' => 'cancelled',
                    'cancelled_at' => now(),
                ]);

                
                BookingSeat::where('booking_id', $booking->id)->delete();

                
                $request->user()->notify(new BookingCancelledNotification($booking));
            });

            ActivityLogger::log(
                $request->user()->id,
                'BOOKING_CANCELLED',
                'Booking #' . $booking->booking_number
            );

            return response()->json([
                'status' => true,
                'message' => 'Booking cancelled successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while cancelling the booking.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

public function show(
    $id,
    Request $request
)
{
    $booking = Booking::with([
        'trip.bus',
        'trip.departureStation',
        'trip.arrivalStation',
        'seats',
        'ticket'
    ])
    ->where(
        'user_id',
        $request->user()->id
    )
    ->findOrFail($id);

    return response()->json([
        'status' => true,
        'data' => $booking
    ]);
}
}
