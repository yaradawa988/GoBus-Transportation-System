<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Booking extends Model
{
     use HasFactory;

    protected $fillable = [
        'user_id',
        'trip_id',
        'booking_number',
        'seats_count',
        'total_price',
        'payment_method',
        'payment_status',
        'booking_status',
        'booked_at',
        'cancelled_at',
        'expires_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

   public function seats()
{
    return $this->belongsToMany(
        Seat::class,
        'booking_seats'
    )
    ->withPivot('trip_id')
    ->withTimestamps();
}

    public function ticket()
    {
        return $this->hasOne(Ticket::class);
    }
    protected $casts = [
    'cancelled_at' => 'datetime',
    'booked_at'=> 'datetime',
    'expires_at'=> 'datetime',
];
public function bookingSeats()
{
    return $this->hasMany(
        BookingSeat::class
    );
}
}
