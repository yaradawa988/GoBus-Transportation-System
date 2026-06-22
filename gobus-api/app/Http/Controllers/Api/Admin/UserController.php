<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    /**
     * List Users
     */
    public function index(Request $request)
    {
        $users = User::query()

            ->when(
                $request->search,
                fn($q) =>
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
            )

            ->latest()

            ->paginate(
                $request->per_page ?? 10
            );

        return response()->json([
            'status' => true,
            'data' => $users
        ]);
    }

    /**
     * User Details
     */
    public function show($id)
    {
        $user = User::with([
            'bookings',
            'reviews'
        ])->findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $user
        ]);
    }

    /**
     * Activate / Deactivate User
     */
    public function changeStatus($id)
    {
        $user = User::findOrFail($id);

        $user->status = !$user->status;

        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'User status updated',
            'user_status' => $user->status
        ]);
    }

    /**
     * Delete User
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($user->role === 'admin') {

            return response()->json([
                'status' => false,
                'message' => 'Admin cannot be deleted'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'User deleted successfully'
        ]);
    }
}