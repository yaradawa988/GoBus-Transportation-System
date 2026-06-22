<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Station extends Model
{
     use HasFactory;

    protected $fillable = [
        'city_id',
        'name',
        'address',
        'latitude',
        'longitude',
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function departureTrips()
    {
        return $this->hasMany(
            Trip::class,
            'departure_station_id'
        );
    }

    public function arrivalTrips()
    {
        return $this->hasMany(
            Trip::class,
            'arrival_station_id'
        );
    }
    public function tripStations()
{
    return $this->hasMany(
        TripStation::class
    );
}
}