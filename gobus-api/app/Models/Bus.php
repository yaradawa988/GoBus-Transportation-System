<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Bus extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'bus_number',
        'type',
        'seat_count',
        'image',
        'status',
        'description'
    ];

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
    protected $appends = [
    'image_url'
];

public function getImageUrlAttribute()
{
    return $this->image
        ? asset('storage/' . $this->image)
        : null;
}
}