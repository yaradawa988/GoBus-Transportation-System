<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Booking;
use App\Models\Trip;


class ReviewController extends Controller
{
     /*
    |--------------------------------------------------------------------------
    | Create Review
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'rating'     => 'required|integer|min:1|max:5',
            'comment'    => 'nullable|string|max:1000',
        ]);

        $booking = Booking::with('trip')
            ->where('id', $request->booking_id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        /*
        |-----------------------------------------
        | Only completed trips
        |-----------------------------------------
        */

        if (
            $booking->booking_status !== 'completed'
        ) {
            return response()->json([
                'status' => false,
                'message' =>
                    'You can only review completed trips.'
            ], 422);
        }

        /*
        |-----------------------------------------
        | Already reviewed
        |-----------------------------------------
        */

        $exists = Review::where(
            'user_id',
            auth()->id()
        )
        ->where(
            'trip_id',
            $booking->trip_id
        )
        ->exists();

        if ($exists) {
            return response()->json([
                'status' => false,
                'message' =>
                    'You already reviewed this trip.'
            ], 422);
        }

        $review = Review::create([
            'user_id' => auth()->id(),
            'trip_id' => $booking->trip_id,
            'rating'  => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'status' => true,
            'message' =>
                'Review submitted successfully.',
            'data' => $review
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Trip Reviews
    |--------------------------------------------------------------------------
    */

    public function tripReviews($tripId)
    {
        $trip = Trip::findOrFail($tripId);

        $reviews = Review::with('user')
            ->where('trip_id', $tripId)
            ->latest()
            ->paginate(10);

        return response()->json([
            'status' => true,

            'average_rating' => round(
                Review::where(
                    'trip_id',
                    $tripId
                )->avg('rating'),
                1
            ),

            'reviews_count' => Review::where(
                'trip_id',
                $tripId
            )->count(),

            'data' => $reviews
        ]);
    }
}
