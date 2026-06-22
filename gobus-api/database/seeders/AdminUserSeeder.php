<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(

            [
                'email' => 'admin@gobus.com'
            ],

            [
                'name' => 'GoBus Admin',

                'phone' => '0999999999',

                'password' => Hash::make('admin123'),

                'role' => 'admin',

                'status' => true,
            ]
        );
    }
}
