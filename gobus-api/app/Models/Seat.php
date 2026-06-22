<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Seat extends Model
{
    use HasFactory;

    protected $fillable = [
        'bus_id',
        'seat_number',
        'seat_type',
    ];

    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }

    public function bookingSeats()
    {
        return $this->hasMany(
            BookingSeat::class
        );
        
    }
    public function bookings()
{
    return $this->belongsToMany(
        Booking::class,
        'booking_seats'
    );
}
}