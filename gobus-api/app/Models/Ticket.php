<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'ticket_number',
        'qr_code',
        'pdf_path',
        'issued_at',
    ];

    public function booking()
    {
        return $this->belongsTo(
            Booking::class
        );
    }
    protected $casts = [
    'issued_at' => 'datetime',
];
}