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

            /*
            =====================================
            Trip 1
            Damascus -> Aleppo
            =====================================
            */

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

            [
                'trip_id' => 1,
                'rest_stop_id' => 7,
                'order_no' => 3,
            ],

            /*
            =====================================
            Trip 2
            Aleppo -> Damascus
            =====================================
            */

            [
                'trip_id' => 2,
                'rest_stop_id' => 7,
                'order_no' => 1,
            ],

            [
                'trip_id' => 2,
                'rest_stop_id' => 2,
                'order_no' => 2,
            ],

            [
                'trip_id' => 2,
                'rest_stop_id' => 1,
                'order_no' => 3,
            ],

            /*
            =====================================
            Trip 3
            Damascus -> Latakia
            =====================================
            */

            [
                'trip_id' => 3,
                'rest_stop_id' => 3,
                'order_no' => 1,
            ],

            [
                'trip_id' => 3,
                'rest_stop_id' => 5,
                'order_no' => 2,
            ],

            /*
            =====================================
            Trip 4
            Latakia -> Damascus
            =====================================
            */

            [
                'trip_id' => 4,
                'rest_stop_id' => 5,
                'order_no' => 1,
            ],

            [
                'trip_id' => 4,
                'rest_stop_id' => 3,
                'order_no' => 2,
            ],

            /*
            =====================================
            Trip 5
            Homs -> Aleppo
            =====================================
            */

            [
                'trip_id' => 5,
                'rest_stop_id' => 4,
                'order_no' => 1,
            ],

            [
                'trip_id' => 5,
                'rest_stop_id' => 7,
                'order_no' => 2,
            ],

            /*
            =====================================
            Trip 6
            Aleppo -> Homs
            =====================================
            */

            [
                'trip_id' => 6,
                'rest_stop_id' => 7,
                'order_no' => 1,
            ],

            [
                'trip_id' => 6,
                'rest_stop_id' => 4,
                'order_no' => 2,
            ],

            /*
            =====================================
            Trip 7
            Hama -> Tartus
            =====================================
            */

            [
                'trip_id' => 7,
                'rest_stop_id' => 4,
                'order_no' => 1,
            ],

            [
                'trip_id' => 7,
                'rest_stop_id' => 6,
                'order_no' => 2,
            ],

            /*
            =====================================
            Trip 8
            Tartus -> Hama
            =====================================
            */

            [
                'trip_id' => 8,
                'rest_stop_id' => 6,
                'order_no' => 1,
            ],

            [
                'trip_id' => 8,
                'rest_stop_id' => 4,
                'order_no' => 2,
            ],

            /*
            =====================================
            Trip 9
            Daraa -> Damascus
            =====================================
            */

            [
                'trip_id' => 9,
                'rest_stop_id' => 9,
                'order_no' => 1,
            ],

            /*
            =====================================
            Trip 10
            Damascus -> Daraa
            =====================================
            */

            [
                'trip_id' => 10,
                'rest_stop_id' => 9,
                'order_no' => 1,
            ],

        ]);
    }
}