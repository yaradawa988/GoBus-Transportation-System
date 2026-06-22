<?php

namespace App\Http\Controllers\Api;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdateProfileRequest;
class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('gobus')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Account created successfully',
            'token' => $token,
            'user' => $user
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        if (!Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ])) {

            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = User::where('email', $request->email)->first();

        $user->update([
            'last_login_at' => now()
        ]);

        $token = $user->createToken('gobus')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function profile(Request $request)
{
    $user = $request->user();

    if ($user->avatar) {
        $user->avatar = asset('storage/' . $user->avatar);
    }

    return response()->json([
        'success' => true,
        'user' => $user
    ]);
}

    public function updateProfile(UpdateProfileRequest $request)
{
    $user = $request->user();

    $data = [
        'name' => $request->name,
        'phone' => $request->phone,
    ];

    if ($request->filled('password')) {
        $data['password'] = Hash::make($request->password);
    }

    if ($request->hasFile('avatar')) {

        if ($user->avatar) {

            Storage::disk('public')->delete($user->avatar);
        }

        $data['avatar'] = $request
            ->file('avatar')
            ->store('avatars', 'public');
    }

    $user->update($data);

    return response()->json([
        'success' => true,
        'message' => 'Profile updated successfully',
        'user' => [
            ...$user->fresh()->toArray(),
            'avatar' => $user->avatar
                ? asset('storage/' . $user->avatar)
                : null
        ]
    ]);
}
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }
    public function googleLogin(Request $request)
{
    $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'google_id' => 'required'
    ]);

    $user = User::updateOrCreate(
        [
            'email' => $request->email
        ],
        [
            'name' => $request->name,
            'google_id' => $request->google_id,
        ]
    );

    $token = $user->createToken('gobus')->plainTextToken;

    return response()->json([
        'success' => true,
        'token' => $token,
        'user' => $user
    ]);
}
}