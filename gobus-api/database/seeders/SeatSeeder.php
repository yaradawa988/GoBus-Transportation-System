<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Bus;
use App\Models\Seat;
class SeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       foreach (Bus::all() as $bus) {

            for ($i = 1; $i <= $bus->seat_count; $i++) {

                Seat::create([
                    'bus_id' => $bus->id,
                    'seat_number' => $i,
                    'seat_type' => 'double',
                ]);
            }
        }
    }
}