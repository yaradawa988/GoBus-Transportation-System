<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RestStop;
class RestStopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       

        RestStop::insert([

            [
                'name' => 'Al Nabk Rest Stop',
            ],

            [
                'name' => 'Maaret Al Numan Rest Stop',
            ],

            [
                'name' => 'Homs Rest Stop',
            ],

            [
                'name' => 'Hama Rest Stop',
            ],

            [
                'name' => 'Jableh Rest Stop',
            ],

            [
                'name' => 'Tartus Rest Stop',
            ],

            [
                'name' => 'Khanaser Rest Stop',
            ],

            [
                'name' => 'Al Qaryatayn Rest Stop',
            ],

            [
                'name' => 'Daraa Highway Rest Stop',
            ],

            [
                'name' => 'Salamiyah Rest Stop',
            ],

        ]);
    }
}