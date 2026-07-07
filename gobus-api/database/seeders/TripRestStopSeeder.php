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
         

       
      $routes = [

    [
        'trip_ids' => range(1,4),
        'stops' => [
            [1,1],
            [2,2],
            [7,3],
        ],
    ],

    [
        'trip_ids' => range(5,8),
        'stops' => [
            [7,1],
            [2,2],
            [1,3],
        ],
    ],

    [
        'trip_ids' => range(9,12),
        'stops' => [
            [3,1],
            [5,2],
        ],
    ],

    [
        'trip_ids' => range(13,14),
        'stops' => [
            [5,1],
            [3,2],
        ],
    ],

    [
        'trip_ids' => range(15,16),
        'stops' => [
            [3,1],
            [6,2],
        ],
    ],

    [
        'trip_ids' => range(17,18),
        'stops' => [
            [6,1],
            [3,2],
        ],
    ],

];
foreach ($routes as $route) {

    foreach ($route['trip_ids'] as $tripId) {

        foreach ($route['stops'] as $stop) {

            TripRestStop::create([
                'trip_id'      => $tripId,
                'rest_stop_id' => $stop[0],
                'order_no'     => $stop[1],
            ]);

        }

    }

}
    }
}