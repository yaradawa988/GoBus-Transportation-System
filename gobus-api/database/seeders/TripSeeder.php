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
      

    
        $routes = [

            /*
            ==========================================================
            Damascus -> Aleppo
            مرتان يومياً (07:00 و 14:00)
            ==========================================================
            */

            [
                'from'=>1,
                'to'=>3,
                'duration'=>300,
                'description'=>'Damascus → Aleppo',

                'departures'=>[

                    [
                        'time'=>'07:00',
                        'companies'=>[
                            ['company'=>1,'bus'=>1,'price'=>35000],
                            ['company'=>2,'bus'=>4,'price'=>36000],
                            ['company'=>3,'bus'=>6,'price'=>33000],
                            ['company'=>4,'bus'=>8,'price'=>34000],
                        ]
                    ],

                    [
                        'time'=>'14:00',
                        'companies'=>[
                            ['company'=>1,'bus'=>2,'price'=>35500],
                            ['company'=>2,'bus'=>5,'price'=>36500],
                            ['company'=>3,'bus'=>7,'price'=>33500],
                            ['company'=>4,'bus'=>9,'price'=>34500],
                        ]
                    ],

                ]
            ],

            /*
            ==========================================================
            Aleppo -> Damascus
            مرتان يومياً
            ==========================================================
            */

            [
                'from'=>3,
                'to'=>1,
                'duration'=>300,
                'description'=>'Aleppo → Damascus',

                'departures'=>[

                    [
                        'time'=>'08:00',
                        'companies'=>[
                            ['company'=>1,'bus'=>2,'price'=>35000],
                            ['company'=>2,'bus'=>5,'price'=>36000],
                            ['company'=>3,'bus'=>7,'price'=>33000],
                            ['company'=>4,'bus'=>9,'price'=>34000],
                        ]
                    ],

                    [
                        'time'=>'16:00',
                        'companies'=>[
                            ['company'=>1,'bus'=>1,'price'=>35500],
                            ['company'=>2,'bus'=>4,'price'=>36500],
                            ['company'=>3,'bus'=>6,'price'=>33500],
                            ['company'=>4,'bus'=>8,'price'=>34500],
                        ]
                    ],

                ]
            ],

            /*
            ==========================================================
            Damascus -> Latakia
            ==========================================================
            */

            [
                'from'=>1,
                'to'=>6,
                'duration'=>240,
                'description'=>'Damascus → Latakia',

                'departures'=>[
                    [
                        'time'=>'07:30',
                        'companies'=>[
                            ['company'=>1,'bus'=>3,'price'=>28000],
                            ['company'=>2,'bus'=>4,'price'=>29000],
                            ['company'=>3,'bus'=>6,'price'=>30000],
                            ['company'=>4,'bus'=>10,'price'=>27000],
                        ]
                    ]
                ]
            ],

            /*
            ==========================================================
            Latakia -> Damascus
            ==========================================================
            */

            [
                'from'=>6,
                'to'=>1,
                'duration'=>240,
                'description'=>'Latakia → Damascus',

                'departures'=>[
                    [
                        'time'=>'14:00',
                        'companies'=>[
                            ['company'=>1,'bus'=>2,'price'=>28000],
                            ['company'=>4,'bus'=>8,'price'=>27500],
                        ]
                    ]
                ]
            ],

            /*
            ==========================================================
            Damascus -> Tartus
            ==========================================================
            */

            [
                'from'=>1,
                'to'=>7,
                'duration'=>270,
                'description'=>'Damascus → Tartus',

                'departures'=>[
                    [
                        'time'=>'08:30',
                        'companies'=>[
                            ['company'=>2,'bus'=>5,'price'=>32000],
                            ['company'=>3,'bus'=>7,'price'=>30000],
                        ]
                    ]
                ]
            ],

            /*
            ==========================================================
            Tartus -> Damascus
            ==========================================================
            */

            [
                'from'=>7,
                'to'=>1,
                'duration'=>270,
                'description'=>'Tartus → Damascus',

                'departures'=>[
                    [
                        'time'=>'15:00',
                        'companies'=>[
                            ['company'=>1,'bus'=>1,'price'=>31000],
                            ['company'=>4,'bus'=>9,'price'=>33000],
                        ]
                    ]
                ]
            ],

            /*
            ==========================================================
            Damascus -> Homs
            ==========================================================
            */

            [
                'from'=>1,
                'to'=>4,
                'duration'=>150,
                'description'=>'Damascus → Homs',

                'departures'=>[
                    [
                        'time'=>'08:00',
                        'companies'=>[
                            ['company'=>2,'bus'=>4,'price'=>18000],
                        ]
                    ]
                ]
            ],

            /*
            ==========================================================
            Homs -> Damascus
            ==========================================================
            */

            [
                'from'=>4,
                'to'=>1,
                'duration'=>150,
                'description'=>'Homs → Damascus',

                'departures'=>[
                    [
                        'time'=>'17:00',
                        'companies'=>[
                            ['company'=>3,'bus'=>6,'price'=>18000],
                        ]
                    ]
                ]
            ],

        ];

        $day = 1;

        foreach ($routes as $route) {

            foreach ($route['departures'] as $departureGroup) {

                foreach ($departureGroup['companies'] as $trip) {

                    $departure = now()
                        ->addDays($day)
                        ->setTimeFromTimeString($departureGroup['time']);

                    $arrival = (clone $departure)
                        ->addMinutes($route['duration']);

                    Trip::create([

                        'company_id'=>$trip['company'],

                        'bus_id'=>$trip['bus'],

                        'departure_station_id'=>$route['from'],

                        'arrival_station_id'=>$route['to'],

                        'departure_time'=>$departure,

                        'arrival_time'=>$arrival,

                        'duration_minutes'=>$route['duration'],

                        'price'=>$trip['price'],

                        'status'=>'scheduled',

                        'description'=>$route['description'],

                    ]);
                }

                $day++;
            }
        }
    }
}