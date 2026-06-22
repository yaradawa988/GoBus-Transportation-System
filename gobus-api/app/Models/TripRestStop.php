<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class TripRestStop extends Model
{
    use HasFactory;

    protected $fillable = [
        'trip_id',
        'rest_stop_id',
        'order_no',
    ];

    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    public function restStop()
    {
        return $this->belongsTo(RestStop::class);
    }
}