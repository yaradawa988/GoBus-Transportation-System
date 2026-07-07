<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Company extends Model
{
    use HasFactory;

    protected $fillable = [

        'name',

        'logo',

        'phone',

        'email',

        'description',

        'status',

    ];

    protected $appends = [
        'logo_url'
    ];

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }
 public function buses()
{
    return $this->hasMany(Bus::class);
}
    public function getLogoUrlAttribute()
    {
        return $this->logo
            ? asset('storage/'.$this->logo)
            : null;
    }
}