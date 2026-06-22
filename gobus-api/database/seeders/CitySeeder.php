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
                'name' => 'Aleppo',
                'latitude' => 36.2021,
                'longitude' => 37.1343,
            ],
        ]);
    }
}
