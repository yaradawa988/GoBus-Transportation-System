<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Bus;
class BusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bus::insert([
            [
                'name' => 'VIP Bus 01',
                'bus_number' => 'BUS-001',
                'type' => 'VIP',
                'seat_count' => 40,
                'status' => true,
            ],
            [
                'name' => 'Economy Bus 01',
                'bus_number' => 'BUS-002',
                'type' => 'Economy',
                'seat_count' => 50,
                'status' => true,
            ],
        ]);
    }
}
