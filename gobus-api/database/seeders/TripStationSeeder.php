<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TripStation;
class TripStationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TripStation::insert([
            [
                'trip_id' => 1,
                'station_id' => 1,
                'order_no' => 1,
            ],
            [
                'trip_id' => 1,
                'station_id' => 2,
                'order_no' => 2,
            ],
            [
                'trip_id' => 1,
                'station_id' => 3,
                'order_no' => 3,
            ],
            [
                'trip_id' => 1,
                'station_id' => 4,
                'order_no' => 4,
            ],
        ]);
    }
}
