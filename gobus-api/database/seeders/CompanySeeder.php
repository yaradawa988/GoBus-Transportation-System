<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Company;
class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {Company::insert([

[
    'name'=>'GoBus',
    'phone'=>'0999000001',
    'email'=>'info@gobus.sy',
    'description'=>'Premium Bus Company',
    'logo'=>'company_logos/gobus.png',
    'status'=>true,
],

[
    'name'=>'Al Hassan',
    'phone'=>'0999000002',
    'email'=>'info@alhassan.sy',
    'description'=>'Al Hassan Transport',
    'logo'=>'company_logos/alhassan.jpg',
    'status'=>true,
],

[
    'name'=>'Al Ameer',
    'phone'=>'0999000003',
    'email'=>'info@alameer.sy',
    'description'=>'Al Ameer Transport',
    'logo'=>'company_logos/alameer.jpg',
    'status'=>true,
],

[
    'name'=>'Al Qadmous',
    'phone'=>'0999000004',
    'email'=>'info@alqadmous.sy',
    'description'=>'Al Qadmous Transport',
    'logo'=>'company_logos/alqadmous.jpg',
    'status'=>true,
],

]);

    }
}