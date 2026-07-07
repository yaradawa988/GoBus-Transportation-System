<?php

namespace App\Services;
use App\Models\Booking;
use App\Models\Ticket;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Endroid\QrCode\Builder\Builder;
use Illuminate\Support\Facades\Storage;
use Endroid\QrCode\ErrorCorrectionLevel;
class GenerateTicketService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
     public function generate(Booking $booking): Ticket
    {
        if ($booking->ticket) {
    throw new \Exception(
        'Ticket already exists.'
    );
}
        
if (
    $booking->booking_status !== 'confirmed'
) {
    throw new \Exception(
        'Booking not confirmed.'
    );
}
if (
    $booking->payment_method === 'card'
    &&
    $booking->payment_status !== 'paid'
) {
    throw new \Exception(
        'Payment not completed.'
    );
}
        $ticketNumber = 'TKT-' . strtoupper(uniqid());

       $qrData = json_encode([

    'ticket_number' => $ticketNumber,
    'user' => [
        'name' => $booking->user->name,
        'email' => $booking->user->email,
        'phone' => $booking->user->phone,
    ],
    'issued_at' => now(),

]);

       $qrResult = Builder::create()
    ->data($qrData)
    ->size(220)
    ->margin(2)
    ->errorCorrectionLevel(ErrorCorrectionLevel::Low)
    ->build();

        $qrPath = 'qrcodes/' . $ticketNumber . '.png';

        Storage::disk('public')->put(
            $qrPath,
            $qrResult->getString()
        );

        $ticket = Ticket::create([
            'booking_id'    => $booking->id,
            'ticket_number' => $ticketNumber,
            'qr_code'       => $qrPath,
            'issued_at'     => now(),
        ]);

        $pdf = Pdf::loadView(
            'pdf.ticket',
            [
                'booking' => $booking->load(
                     'user',
    'trip.company',
    'trip.bus',
    'trip.departureStation',
    'trip.arrivalStation',
    'seats'
                ),
                'ticket' => $ticket
            ]
        );

        $pdfPath = 'tickets/' . $ticketNumber . '.pdf';

        Storage::disk('public')->put(
            $pdfPath,
            $pdf->output()
        );

        $ticket->update([
            'pdf_path' => $pdfPath
        ]);

        return $ticket->fresh();
    }

}

   
