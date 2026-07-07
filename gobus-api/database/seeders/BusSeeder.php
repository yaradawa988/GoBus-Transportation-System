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

            // ========================
            // GoBus (company_id = 1)
            // ========================

            [
                'company_id' => 1,
                'name' => 'GoBus VIP 01',
                'bus_number' => 'GB-001',
                'type' => 'VIP',
                'seat_count' => 40,
                'status' => true,
            ],

            [
                'company_id' => 1,
                'name' => 'GoBus VIP 02',
                'bus_number' => 'GB-002',
                'type' => 'VIP',
                'seat_count' => 36,
                'status' => true,
            ],

            [
                'company_id' => 1,
                'name' => 'GoBus Economy 01',
                'bus_number' => 'GB-003',
                'type' => 'Economy',
                'seat_count' => 50,
                'status' => true,
            ],

            // ========================
            // Al Hassan (company_id = 2)
            // ========================

            [
                'company_id' => 2,
                'name' => 'Al Hassan VIP',
                'bus_number' => 'HS-001',
                'type' => 'VIP',
                'seat_count' => 38,
                'status' => true,
            ],

            [
                'company_id' => 2,
                'name' => 'Al Hassan Economy',
                'bus_number' => 'HS-002',
                'type' => 'Economy',
                'seat_count' => 48,
                'status' => true,
            ],

            // ========================
            // Al Ameer (company_id = 3)
            // ========================

            [
                'company_id' => 3,
                'name' => 'Al Ameer VIP',
                'bus_number' => 'AM-001',
                'type' => 'VIP',
                'seat_count' => 34,
                'status' => true,
            ],

            [
                'company_id' => 3,
                'name' => 'Al Ameer Economy',
                'bus_number' => 'AM-002',
                'type' => 'Economy',
                'seat_count' => 46,
                'status' => true,
            ],

            // ========================
            // Al Qadmous (company_id = 4)
            // ========================

            [
                'company_id' => 4,
                'name' => 'Al Qadmous VIP',
                'bus_number' => 'QD-001',
                'type' => 'VIP',
                'seat_count' => 32,
                'status' => true,
            ],

            [
                'company_id' => 4,
                'name' => 'Al Qadmous Economy',
                'bus_number' => 'QD-002',
                'type' => 'Economy',
                'seat_count' => 50,
                'status' => true,
            ],

            [
                'company_id' => 4,
                'name' => 'Al Qadmous Economy 02',
                'bus_number' => 'QD-003',
                'type' => 'Economy',
                'seat_count' => 45,
                'status' => true,
            ],

        ]);
    }
}