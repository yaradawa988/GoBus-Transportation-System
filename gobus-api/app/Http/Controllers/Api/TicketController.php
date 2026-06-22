<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Ticket;
use App\Services\GenerateTicketService;
use Illuminate\Support\Facades\Storage;

class TicketController extends Controller
{
    //
public function generate(
    Booking $booking,
    GenerateTicketService $service
    
)
{
    /*
    |-----------------------------------------
    | Authorization
    |-----------------------------------------
    */

    if (
        auth()->id() !== $booking->user_id
        &&
        auth()->user()->role !== 'admin'
    ) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized.'
        ], 403);
    }

    /*
    |-----------------------------------------
    | Already Exists
    |-----------------------------------------
    */

    if ($booking->ticket) {

        return response()->json([
            'success' => false,
            'message' => 'Ticket already exists.'
        ], 422);
    }

    /*
    |-----------------------------------------
    | Cancelled Booking
    |-----------------------------------------
    */

    if (
        $booking->booking_status === 'cancelled'
    ) {

        return response()->json([
            'success' => false,
            'message' => 'Cancelled booking cannot generate ticket.'
        ], 422);
    }

    /*
    |-----------------------------------------
    | Completed Trip
    |-----------------------------------------
    */

    if (
        $booking->booking_status === 'completed'
    ) {

        return response()->json([
            'success' => false,
            'message' => 'Trip already completed.'
        ], 422);
    }

    /*
    |-----------------------------------------
    | Must Be Confirmed
    |-----------------------------------------
    */

    if (
        $booking->booking_status !== 'confirmed'
    ) {

        return response()->json([
            'success' => false,
            'message' => 'Booking is not confirmed yet.'
        ], 422);
    }

    /*
    |-----------------------------------------
    | Card Payment Validation
    |-----------------------------------------
    */

    if (
        $booking->payment_method === 'card'
        &&
        $booking->payment_status !== 'paid'
    ) {

        return response()->json([
            'success' => false,
            'message' => 'Payment not completed.'
        ], 422);
    }

    $ticket = $service->generate(
        $booking
    );

    return response()->json([
        'success' => true,
        'message' => 'Ticket generated successfully.',
        'data' => $ticket
    ]);
}

    public function show(Ticket $ticket)
    {
        if(
    auth()->id() !== $ticket->booking->user_id
    &&
    auth()->user()->role !== 'admin'
){
    abort(403);
}
        $ticket->load([
            'booking.user',
            'booking.trip.bus',
            'booking.trip.departureStation',
            'booking.trip.arrivalStation',
            'booking.seats'
        ]);

        return response()->json([
            'success' => true,
            'data' => $ticket
        ]);
    }

    public function download(Ticket $ticket)
    {
        if(auth()->id() !== $ticket->booking->user_id){
    abort(403);
}
        if (
            !$ticket->pdf_path ||
            !Storage::disk('public')->exists($ticket->pdf_path)
        ) {
            return response()->json([
                'success' => false,
                'message' => 'PDF not found'
            ], 404);
        }

        return Storage::disk('public')
            ->download(
                $ticket->pdf_path,
                basename($ticket->pdf_path)
            );
    }

   public function verify(string $token)
{
    $ticket = Ticket::with([
        'booking.user',
        'booking.trip.departureStation',
        'booking.trip.arrivalStation',
        'booking.seats'
    ])
    ->where('ticket_number', $token)
    ->first();

    if (!$ticket) {
        return response()->json([
            'valid' => false,
            'message' => 'Invalid ticket'
        ], 404);
    }

    $status = 'valid';

    if ($ticket->booking->booking_status === 'cancelled') {
        $status = 'cancelled';
    }

    if ($ticket->booking->booking_status === 'completed') {
        $status = 'used';
    }

    return response()->json([
        'valid' => true,
        'status' => $status,
        'ticket' => $ticket,
    ]);
}
}
