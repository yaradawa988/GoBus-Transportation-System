<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Notifications\BookingConfirmedNotification;
use App\Notifications\BookingCancelledNotification;
use App\Notifications\TicketGeneratedNotification;
use App\Services\GenerateTicketService;
use Illuminate\Support\Facades\DB;
use App\Services\ActivityLogger;
class BookingManagementController extends Controller
{
     /**
     * All Bookings
     */
   public function index(Request $request)
{
    $query = Booking::with([
        'user',
        'trip.bus',
        'ticket'
    ]);

    if ($request->filled('status')) {
        $query->where(
            'booking_status',
            $request->status
        );
    }

    if ($request->filled('booking_number')) {
        $query->where(
            'booking_number',
            'like',
            '%' . $request->booking_number . '%'
        );
    }

    $bookings = $query
        ->latest()
        ->paginate(20);

    return response()->json([
        'status' => true,
        'data' => $bookings
    ]);
}

    /**
     * Confirm Booking
     */
  public function confirm(
    $id,
    GenerateTicketService $ticketService
)
{
    $booking = Booking::with([
        'user',
        'ticket'
    ])->findOrFail($id);

    
    if (
        $booking->booking_status === 'confirmed'
    ) {
        return response()->json([
            'status' => false,
            'message' => 'Booking already confirmed'
        ],422);
    }

    if (
        $booking->booking_status === 'cancelled'
    ) {
        return response()->json([
            'status' => false,
            'message' => 'Cancelled booking cannot be confirmed'
        ],422);
    }

    if (
    $booking->payment_method === 'card'
    &&
    $booking->payment_status !== 'paid'
) {

    return response()->json([
        'status' => false,
        'message' =>
            'Card booking must be paid before confirmation.'
    ],422);
}
    DB::transaction(function () use (
        $booking,
        $ticketService
    ) {

        $booking->update([
            'booking_status' => 'confirmed'
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

    ActivityLogger::log(
        auth()->id(),
        'ADMIN_CONFIRMED_BOOKING',
        'Booking #' . $booking->booking_number
    );

    return response()->json([
        'status' => true,
        'message' => 'Booking confirmed successfully'
    ]);
}

   public function cancel($id)
{
    $booking = Booking::with('user')
        ->findOrFail($id);

    if (
        $booking->booking_status === 'cancelled'
    ) {
        return response()->json([
            'status' => false,
            'message' => 'Booking already cancelled'
        ],422);
    }

    if (
        $booking->booking_status === 'completed'
    ) {
        return response()->json([
            'status' => false,
            'message' =>
                'Completed booking cannot be cancelled'
        ],422);
    }

    DB::transaction(function () use ($booking) {

        $booking->update([
            'booking_status' => 'cancelled',
            'cancelled_at' => now()
        ]);

        $booking->user->notify(
            new BookingCancelledNotification(
                $booking
            )
        );
    });

    return response()->json([
        'status' => true,
        'message' => 'Booking cancelled successfully'
    ]);
}

    /**
     * Booking Ticket
     */
  public function ticket($id)
{
    $booking = Booking::with('ticket')
        ->findOrFail($id);

    if (!$booking->ticket) {

        return response()->json([
            'status' => false,
            'message' =>
                'Ticket has not been generated yet'
        ],404);
    }

    return response()->json([
        'status' => true,
        'ticket' => $booking->ticket
    ]);
}
    public function show($id)
{
    $booking = Booking::with([
        'user',
        'trip.bus',
        'trip.departureStation',
        'trip.arrivalStation',
        'trip.stations',
        'trip.restStops',
        'seats',
        'ticket'
    ])->findOrFail($id);

    return response()->json([
        'status' => true,
        'data' => $booking
    ]);
}


public function statistics()
{
    return response()->json([

        'total_bookings' =>
            Booking::count(),

        'confirmed_bookings' =>
            Booking::where(
                'booking_status',
                'confirmed'
            )->count(),

        'cancelled_bookings' =>
            Booking::where(
                'booking_status',
                'cancelled'
            )->count(),

        'pending_bookings' =>
            Booking::where(
                'booking_status',
                'pending'
            )->count(),

        'revenue' =>
            Booking::where(
                'payment_status',
                'paid'
            )->sum('total_price'),
    ]);
}
}