<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ActivityLog;
class ActivityLogController extends Controller
{
     /**
     * All Logs
     */
    public function index(Request $request)
    {
        $logs = ActivityLog::with('user')
            ->latest()
            ->paginate(30);

        return response()->json([
            'status' => true,
            'data' => $logs
        ]);
    }

    /**
     * Filter by user
     */
    public function byUser($userId)
    {
        $logs = ActivityLog::with('user')
            ->where('user_id', $userId)
            ->latest()
            ->get();

        return response()->json([
            'status' => true,
            'data' => $logs
        ]);
    }

    /**
     * Delete log (optional admin cleanup)
     */
    public function destroy($id)
    {
        ActivityLog::findOrFail($id)->delete();

        return response()->json([
            'status' => true,
            'message' => 'Log deleted successfully'
        ]);
    }
}