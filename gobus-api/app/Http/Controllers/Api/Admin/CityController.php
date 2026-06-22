<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\City;
class CityController extends Controller
{
  /**
     * List Cities
     */
    public function index(Request $request)
    {
        $cities = City::query()

            ->when(
                $request->search,
                fn ($q) =>
                $q->where(
                    'name',
                    'like',
                    '%' . $request->search . '%'
                )
            )

            ->latest()
            ->paginate(
                $request->per_page ?? 10
            );

        return response()->json([
            'status' => true,
            'data' => $cities
        ]);
    }

    /**
     * Store City
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:cities,name',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $city = City::create($validated);

        return response()->json([
            'status' => true,
            'message' => 'City created successfully',
            'data' => $city
        ], 201);
    }

    /**
     * Show City
     */
    public function show($id)
    {
        $city = City::with('stations')
            ->findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $city
        ]);
    }

    /**
     * Update City
     */
    public function update(Request $request, $id)
    {
        $city = City::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:cities,name,' . $city->id,
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $city->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'City updated successfully',
            'data' => $city
        ]);
    }

    /**
     * Delete City
     */
    public function destroy($id)
    {
        $city = City::findOrFail($id);

        if ($city->stations()->count() > 0) {

            return response()->json([
                'status' => false,
                'message' => 'Cannot delete city because it contains stations'
            ], 422);
        }

        $city->delete();

        return response()->json([
            'status' => true,
            'message' => 'City deleted successfully'
        ]);
    }
}