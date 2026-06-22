<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TripRestStop;
class TripRestStopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         TripRestStop::insert([
            [
                'trip_id' => 1,
                'rest_stop_id' => 1,
                'order_no' => 1,
            ],
            [
                'trip_id' => 1,
                'rest_stop_id' => 2,
                'order_no' => 2,
            ],
        ]);
    }
}
