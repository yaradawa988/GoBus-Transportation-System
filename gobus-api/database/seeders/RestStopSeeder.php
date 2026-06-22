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
        ]);
    }
}