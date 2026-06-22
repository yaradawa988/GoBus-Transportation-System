<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bus;
use Illuminate\Support\Facades\Storage;
class BusController extends Controller
{
    /**
     * List Buses
     */
    public function index()
    {
        $buses = Bus::latest()->paginate(15);

        return response()->json([
            'status' => true,
            'data' => $buses
        ]);
    }

    /**
     * Create Bus
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'bus_number' => 'required|unique:buses,bus_number',
            'type' => 'required|string|max:100',
            'seat_count' => 'required|integer|min:1',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
            'status' => 'nullable|boolean'
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')
                ->store('buses', 'public');
        }

        $bus = Bus::create([
            'name' => $request->name,
            'bus_number' => $request->bus_number,
            'type' => $request->type,
            'seat_count' => $request->seat_count,
            'image' => $imagePath,
            'description' => $request->description,
            'status' => $request->status ?? true,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Bus created successfully',
            'data' => $bus
        ], 201);
    }

    /**
     * Show Bus
     */
    public function show($id)
    {
        $bus = Bus::with([
            'seats',
            'trips'
        ])->findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $bus
        ]);
    }

    /**
     * Update Bus
     */
    public function update(Request $request, $id)
    {
        $bus = Bus::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'bus_number' => 'required|unique:buses,bus_number,' . $bus->id,
            'type' => 'required|string|max:100',
            'seat_count' => 'required|integer|min:1',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
            'status' => 'nullable|boolean'
        ]);

        if ($request->hasFile('image')) {

            if ($bus->image) {
                Storage::disk('public')->delete($bus->image);
            }

            $bus->image = $request->file('image')
                ->store('buses', 'public');
        }

        $bus->update([
            'name' => $request->name,
            'bus_number' => $request->bus_number,
            'type' => $request->type,
            'seat_count' => $request->seat_count,
            'description' => $request->description,
            'status' => $request->status ?? true,
            'image' => $bus->image,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Bus updated successfully',
            'data' => $bus
        ]);
    }

    /**
     * Delete Bus
     */
    public function destroy($id)
    {
        $bus = Bus::findOrFail($id);

        if ($bus->image) {
            Storage::disk('public')->delete($bus->image);
        }

        $bus->delete();

        return response()->json([
            'status' => true,
            'message' => 'Bus deleted successfully'
        ]);
    }
}