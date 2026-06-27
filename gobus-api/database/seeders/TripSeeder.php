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
      

        $trips = [

            [
                'bus_id'=>1,
                'departure_station_id'=>1,
                'arrival_station_id'=>3,
                'departure_time'=>now()->addDay()->setTime(8,0),
                'arrival_time'=>now()->addDay()->setTime(13,0),
                'duration_minutes'=>300,
                'price'=>35,
                'status'=>'scheduled',
                'description'=>'Damascus → Aleppo',
            ],

            [
                'bus_id'=>2,
                'departure_station_id'=>3,
                'arrival_station_id'=>1,
                'departure_time'=>now()->addDay()->setTime(15,0),
                'arrival_time'=>now()->addDay()->setTime(20,0),
                'duration_minutes'=>300,
                'price'=>35,
                'status'=>'scheduled',
                'description'=>'Aleppo → Damascus',
            ],

            [
                'bus_id'=>3,
                'departure_station_id'=>1,
                'arrival_station_id'=>6,
                'departure_time'=>now()->addDays(2)->setTime(9,0),
                'arrival_time'=>now()->addDays(2)->setTime(13,0),
                'duration_minutes'=>240,
                'price'=>20,
                'status'=>'scheduled',
                'description'=>'Damascus → Latakia',
            ],

            [
                'bus_id'=>4,
                'departure_station_id'=>6,
                'arrival_station_id'=>1,
                'departure_time'=>now()->addDays(2)->setTime(15,0),
                'arrival_time'=>now()->addDays(2)->setTime(19,0),
                'duration_minutes'=>240,
                'price'=>20,
                'status'=>'scheduled',
                'description'=>'Latakia → Damascus',
            ],

            [
                'bus_id'=>1,
                'departure_station_id'=>4,
                'arrival_station_id'=>3,
                'departure_time'=>now()->addDays(3)->setTime(8,30),
                'arrival_time'=>now()->addDays(3)->setTime(11,30),
                'duration_minutes'=>180,
                'price'=>15,
                'status'=>'scheduled',
                'description'=>'Homs → Aleppo',
            ],

            [
                'bus_id'=>2,
                'departure_station_id'=>3,
                'arrival_station_id'=>4,
                'departure_time'=>now()->addDays(3)->setTime(16,0),
                'arrival_time'=>now()->addDays(3)->setTime(19,0),
                'duration_minutes'=>180,
                'price'=>15,
                'status'=>'scheduled',
                'description'=>'Aleppo → Homs',
            ],

            [
                'bus_id'=>3,
                'departure_station_id'=>5,
                'arrival_station_id'=>7,
                'departure_time'=>now()->addDays(4)->setTime(10,0),
                'arrival_time'=>now()->addDays(4)->setTime(12,30),
                'duration_minutes'=>150,
                'price'=>12,
                'status'=>'scheduled',
                'description'=>'Hama → Tartus',
            ],

            [
                'bus_id'=>4,
                'departure_station_id'=>7,
                'arrival_station_id'=>5,
                'departure_time'=>now()->addDays(4)->setTime(15,0),
                'arrival_time'=>now()->addDays(4)->setTime(17,30),
                'duration_minutes'=>150,
                'price'=>12,
                'status'=>'scheduled',
                'description'=>'Tartus → Hama',
            ],

            [
                'bus_id'=>2,
                'departure_station_id'=>13,
                'arrival_station_id'=>1,
                'departure_time'=>now()->addDays(5)->setTime(7,0),
                'arrival_time'=>now()->addDays(5)->setTime(9,0),
                'duration_minutes'=>120,
                'price'=>10,
                'status'=>'scheduled',
                'description'=>'Daraa → Damascus',
            ],

            [
                'bus_id'=>1,
                'departure_station_id'=>1,
                'arrival_station_id'=>13,
                'departure_time'=>now()->addDays(35)->setTime(17,0),
                'arrival_time'=>now()->addDays(35)->setTime(19,0),
                'duration_minutes'=>120,
                'price'=>10,
                'status'=>'scheduled',
                'description'=>'Damascus → Daraa',
            ],

        ];

        Trip::insert($trips);
    }
}
