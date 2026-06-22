<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Station;
use App\Models\City;
class StationController extends Controller
{
    /**
     * List Stations
     */
    public function index()
    {
        $stations = Station::with('city')
            ->latest()
            ->paginate(15);

        return response()->json([
            'status' => true,
            'data' => $stations
        ]);
    }

    /**
     * Create Station
     */
    public function store(Request $request)
    {
        $request->validate([
            'city_id' => 'required|exists:cities,id',
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $station = Station::create([
            'city_id' => $request->city_id,
            'name' => $request->name,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Station created successfully',
            'data' => $station
        ], 201);
    }

    /**
     * Show Station
     */
    public function show($id)
    {
        $station = Station::with([
            'city',
            'departureTrips',
            'arrivalTrips'
        ])->findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $station
        ]);
    }

    /**
     * Update Station
     */
    public function update(Request $request, $id)
    {
        $station = Station::findOrFail($id);

        $request->validate([
            'city_id' => 'required|exists:cities,id',
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $station->update([
            'city_id' => $request->city_id,
            'name' => $request->name,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Station updated successfully',
            'data' => $station
        ]);
    }

    /**
     * Delete Station
     */
    public function destroy($id)
    {
        $station = Station::findOrFail($id);

        $station->delete();

        return response()->json([
            'status' => true,
            'message' => 'Station deleted successfully'
        ]);
    }
}