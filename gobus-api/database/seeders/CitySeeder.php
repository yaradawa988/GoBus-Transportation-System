<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\City;
class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      

        City::insert([

            [
                'name' => 'Damascus',
                'latitude' => 33.5138,
                'longitude' => 36.2765,
            ],

            [
                'name' => 'Rural Damascus',
                'latitude' => 33.5000,
                'longitude' => 36.3000,
            ],

            [
                'name' => 'Aleppo',
                'latitude' => 36.2021,
                'longitude' => 37.1343,
            ],

            [
                'name' => 'Homs',
                'latitude' => 34.7324,
                'longitude' => 36.7137,
            ],

            [
                'name' => 'Hama',
                'latitude' => 35.1318,
                'longitude' => 36.7578,
            ],

            [
                'name' => 'Latakia',
                'latitude' => 35.5317,
                'longitude' => 35.7900,
            ],

            [
                'name' => 'Tartus',
                'latitude' => 34.8890,
                'longitude' => 35.8866,
            ],

            [
                'name' => 'Idlib',
                'latitude' => 35.9306,
                'longitude' => 36.6339,
            ],

            [
                'name' => 'Deir ez-Zor',
                'latitude' => 35.3333,
                'longitude' => 40.1500,
            ],

            [
                'name' => 'Raqqa',
                'latitude' => 35.9500,
                'longitude' => 39.0167,
            ],

            [
                'name' => 'Hasakah',
                'latitude' => 36.5000,
                'longitude' => 40.7500,
            ],

            [
                'name' => 'Qamishli',
                'latitude' => 37.0521,
                'longitude' => 41.2222,
            ],

            [
                'name' => 'Daraa',
                'latitude' => 32.6189,
                'longitude' => 36.1021,
            ],

            [
                'name' => 'As-Suwayda',
                'latitude' => 32.7093,
                'longitude' => 36.5662,
            ],

            [
                'name' => 'Quneitra',
                'latitude' => 33.1258,
                'longitude' => 35.8246,
            ],

        ]);
    }
}