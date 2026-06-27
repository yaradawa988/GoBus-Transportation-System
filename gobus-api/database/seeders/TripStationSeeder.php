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
       

        $routes = [

            // Trip 1
            [1,1,1],
            [1,4,2],
            [1,5,3],
            [1,3,4],

            // Trip2
            [2,3,1],
            [2,5,2],
            [2,4,3],
            [2,1,4],

            // Trip3
            [3,1,1],
            [3,4,2],
            [3,6,3],

            // Trip4
            [4,6,1],
            [4,4,2],
            [4,1,3],

            // Trip5
            [5,4,1],
            [5,5,2],
            [5,3,3],

            // Trip6
            [6,3,1],
            [6,5,2],
            [6,4,3],

            // Trip7
            [7,5,1],
            [7,6,2],
            [7,7,3],

            // Trip8
            [8,7,1],
            [8,6,2],
            [8,5,3],

            // Trip9
            [9,13,1],
            [9,1,2],

            // Trip10
            [10,1,1],
            [10,13,2],
        ];

        foreach($routes as $route){

            TripStation::create([
                'trip_id'=>$route[0],
                'station_id'=>$route[1],
                'order_no'=>$route[2]
            ]);

        }

    }
}