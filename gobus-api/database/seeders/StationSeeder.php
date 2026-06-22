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
                'name' => 'Damascus Main Station',
                'address' => 'Damascus Center',
            ],
            [
                'city_id' => 2,
                'name' => 'Homs Station',
                'address' => 'Homs Center',
            ],
            [
                'city_id' => 3,
                'name' => 'Hama Station',
                'address' => 'Hama Center',
            ],
            [
                'city_id' => 4,
                'name' => 'Aleppo Station',
                'address' => 'Aleppo Center',
            ],
        ]);
    }
}
