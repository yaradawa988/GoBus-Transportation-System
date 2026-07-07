<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
class CompanyController extends Controller
{
     /**
     * Display active companies
     */
    public function index()
    {
        $companies = Company::where('status', 'true')
            ->orderBy('name')
            ->get();

        return response()->json([
            'status' => true,
            'count'  => $companies->count(),
            'data'   => $companies,
        ]);
    }
}
