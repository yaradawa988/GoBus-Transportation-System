<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Trip;
class TripSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Trip::create([
            'bus_id' => 1,
            'departure_station_id' => 1,
            'arrival_station_id' => 4,

            'departure_time' => now()->addDay(),
            'arrival_time' => now()->addDay()->addHours(5),

            'duration_minutes' => 300,

            'price' => 25,

            'status' => 'scheduled',

            'description' => 'Damascus → Aleppo',
        ]);

        Trip::create([
            'bus_id' => 2,
            'departure_station_id' => 4,
            'arrival_station_id' => 1,

            'departure_time' => now()->addDays(2),
            'arrival_time' => now()->addDays(2)->addHours(5),

            'duration_minutes' => 300,

            'price' => 25,

            'status' => 'scheduled',

            'description' => 'Aleppo → Damascus',
        ]);
    }
}
