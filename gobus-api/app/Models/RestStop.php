<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class RestStop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'latitude',
        'longitude',
    ];

    public function trips()
    {
        return $this->belongsToMany(
            Trip::class,
            'trip_rest_stops'
        );
    }
    public function tripRestStops()
{
    return $this->hasMany(
        TripRestStop::class
    );
}
}