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
       

        /*
        trip ids

        1-4   Damascus -> Aleppo
        5-8   Aleppo -> Damascus

        9-12  Damascus -> Latakia
        13-14 Latakia -> Damascus

        15-16 Damascus -> Tartus
        17-18 Tartus -> Damascus

        19    Damascus -> Homs
        20    Homs -> Damascus
        */

        $routes = [

    [
        'trip_ids' => range(1,4),
        'stations' => [
            [1,1],
            [4,2],
            [5,3],
            [3,4],
        ],
    ],

    [
        'trip_ids' => range(5,8),
        'stations' => [
            [3,1],
            [5,2],
            [4,3],
            [1,4],
        ],
    ],

    [
        'trip_ids' => range(9,12),
        'stations' => [
            [1,1],
            [4,2],
            [6,3],
        ],
    ],

    [
        'trip_ids' => range(13,14),
        'stations' => [
            [6,1],
            [4,2],
            [1,3],
        ],
    ],

    [
        'trip_ids' => range(15,16),
        'stations' => [
            [1,1],
            [4,2],
            [5,3],
            [7,4],
        ],
    ],

    [
        'trip_ids' => range(17,18),
        'stations' => [
            [7,1],
            [5,2],
            [4,3],
            [1,4],
        ],
    ],

    [
        'trip_ids' => [19],
        'stations' => [
            [1,1],
            [4,2],
        ],
    ],

    [
        'trip_ids' => [20],
        'stations' => [
            [4,1],
            [1,2],
        ],
    ],

];

       foreach ($routes as $route) {

    foreach ($route['trip_ids'] as $tripId) {

        foreach ($route['stations'] as $station) {

            TripStation::create([
                'trip_id'    => $tripId,
                'station_id' => $station[0],
                'order_no'   => $station[1],
            ]);

        }

    }

}

    }
}