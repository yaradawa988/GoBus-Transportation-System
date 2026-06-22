<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Station;
class StationPublicController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => true,
            'data' => Station::select(
                'id',
                'name'
            )
            ->orderBy('name')
            ->get()
        ]);
    }
}
