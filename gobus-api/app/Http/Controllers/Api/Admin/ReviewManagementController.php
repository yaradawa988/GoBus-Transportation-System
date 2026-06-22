<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;
class ReviewManagementController extends Controller
{
     /**
     * All Reviews
     */
    public function index(Request $request)
    {
        $query = Review::with([
            'user',
            'trip.bus',
            'trip.departureStation',
            'trip.arrivalStation'
        ]);

        if ($request->filled('trip_id')) {
            $query->where('trip_id', $request->trip_id);
        }

        if ($request->filled('rating')) {
            $query->where('rating', $request->rating);
        }

        $reviews = $query->latest()->paginate(20);

        return response()->json([
            'status' => true,
            'data' => $reviews
        ]);
    }

    /**
     * Delete Review
     */
    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return response()->json([
            'status' => true,
            'message' => 'Review deleted successfully'
        ]);
    }

    /**
     * Average Rating (Analytics)
     */
    public function stats()
    {
        return response()->json([
            'status' => true,
            'average_rating' => round(Review::avg('rating'), 2),
            'total_reviews' => Review::count(),
            'five_star' => Review::where('rating', 5)->count(),
            'one_star' => Review::where('rating', 1)->count(),
        ]);
    }
}