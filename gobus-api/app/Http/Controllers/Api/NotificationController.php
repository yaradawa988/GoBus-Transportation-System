<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'status' => true,
            'data' => $request->user()
                ->notifications()
                ->latest()
                ->paginate(20)
        ]);
    }

    public function unread(Request $request)
    {
        return response()->json([
            'status' => true,
            'data' => $request->user()
                ->unreadNotifications
        ]);
    }

    public function markAsRead(Request $request,$id)
    {
        $notification = $request->user()
            ->notifications()
            ->findOrFail($id);

        $notification->markAsRead();

        return response()->json([
            'status' => true,
            'message' => 'Notification marked as read'
        ]);
    }

    public function markAllAsRead(Request $request)
    {
        $request->user()
            ->unreadNotifications
            ->markAsRead();

        return response()->json([
            'status' => true,
            'message' => 'All notifications marked as read'
        ]);
    }
}
