<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Station;
class StationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       

        Station::insert([

            [
                'city_id' => 1,
                'name' => 'Damascus Main Bus Terminal',
                'address' => 'Damascus City Center',
            ],

            [
                'city_id' => 2,
                'name' => 'Rural Damascus Bus Terminal',
                'address' => 'Rural Damascus Center',
            ],

            [
                'city_id' => 3,
                'name' => 'Aleppo Main Bus Terminal',
                'address' => 'Aleppo City Center',
            ],

            [
                'city_id' => 4,
                'name' => 'Homs Main Bus Terminal',
                'address' => 'Homs City Center',
            ],

            [
                'city_id' => 5,
                'name' => 'Hama Main Bus Terminal',
                'address' => 'Hama City Center',
            ],

            [
                'city_id' => 6,
                'name' => 'Latakia Main Bus Terminal',
                'address' => 'Latakia City Center',
            ],

            [
                'city_id' => 7,
                'name' => 'Tartus Main Bus Terminal',
                'address' => 'Tartus City Center',
            ],

            [
                'city_id' => 8,
                'name' => 'Idlib Main Bus Terminal',
                'address' => 'Idlib City Center',
            ],

            [
                'city_id' => 9,
                'name' => 'Deir ez-Zor Main Bus Terminal',
                'address' => 'Deir ez-Zor City Center',
            ],

            [
                'city_id' => 10,
                'name' => 'Raqqa Main Bus Terminal',
                'address' => 'Raqqa City Center',
            ],

            [
                'city_id' => 11,
                'name' => 'Hasakah Main Bus Terminal',
                'address' => 'Hasakah City Center',
            ],

            [
                'city_id' => 12,
                'name' => 'Qamishli Main Bus Terminal',
                'address' => 'Qamishli City Center',
            ],

            [
                'city_id' => 13,
                'name' => 'Daraa Main Bus Terminal',
                'address' => 'Daraa City Center',
            ],

            [
                'city_id' => 14,
                'name' => 'As-Suwayda Main Bus Terminal',
                'address' => 'As-Suwayda City Center',
            ],

            [
                'city_id' => 15,
                'name' => 'Quneitra Main Bus Terminal',
                'address' => 'Quneitra City Center',
            ],

        ]);
    }
}