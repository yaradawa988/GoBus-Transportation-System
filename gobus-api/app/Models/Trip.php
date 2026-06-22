<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Trip extends Model
{
   use HasFactory;

    protected $fillable = [
        'bus_id',
        'departure_station_id',
        'arrival_station_id',
        'departure_time',
        'arrival_time',
        'duration_minutes',
        'price',
        'status',
        'description',
    ];

    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }

    public function departureStation()
    {
        return $this->belongsTo(
            Station::class,
            'departure_station_id'
        );
    }

    public function arrivalStation()
    {
        return $this->belongsTo(
            Station::class,
            'arrival_station_id'
        );
    }

   public function stations()
{
    return $this->belongsToMany(
        Station::class,
        'trip_stations'
    )->withPivot('order_no')
     ->withTimestamps();
}

   public function restStops()
{
    return $this->belongsToMany(
        RestStop::class,
        'trip_rest_stops'
    )->withPivot('order_no')
     ->withTimestamps();
}
public function bookingSeats()
{
    return $this->hasMany(
        BookingSeat::class
    );
}

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function tripStations()
{
    return $this->hasMany(
        TripStation::class
    )->orderBy('order_no');
}

public function tripRestStops()
{
    return $this->hasMany(
        TripRestStop::class
    )->orderBy('order_no');
}

protected $casts = [
    //'trip_date' => 'date',
    'departure_time' => 'datetime',
    'arrival_time' => 'datetime',
];
protected $appends = [
    'average_rating',
    'reviews_count'
];

public function getAverageRatingAttribute()
{
    return round(
        $this->reviews()->avg('rating') ?? 0,
        1
    );
}

public function getReviewsCountAttribute()
{
    return $this->reviews()->count();
}
}
