<?php

use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Controllers
|--------------------------------------------------------------------------
*/

// Auth
use App\Http\Controllers\Api\AuthController;

// Public
use App\Http\Controllers\Api\TripController;
use App\Http\Controllers\Api\StationPublicController;
// User Booking
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\ReviewController;

// Admin
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\CityController;
use App\Http\Controllers\Api\Admin\StationController;
use App\Http\Controllers\Api\Admin\BusController;
use App\Http\Controllers\Api\Admin\TripsController;
use App\Http\Controllers\Api\Admin\BookingManagementController;
use App\Http\Controllers\Api\Admin\ReviewManagementController;
use App\Http\Controllers\Api\Admin\ActivityLogController;
use App\Http\Controllers\Api\NotificationController;


/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/google-login', [AuthController::class, 'googleLogin']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/profile/update', [AuthController::class, 'updateProfile']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

/*
|--------------------------------------------------------------------------
| PUBLIC TRIPS ROUTES
|--------------------------------------------------------------------------
*/
Route::prefix('trips')->group(function () {

    Route::get('/search', [TripController::class, 'search']);
    Route::get('/{id}', [TripController::class, 'show']);
     Route::get('/', [TripController::class, 'index']);
});

Route::get(
    '/stations',
    [StationPublicController::class,'index']
);
/*
|--------------------------------------------------------------------------
| USER BOOKINGS ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')
    ->prefix('bookings')
    ->group(function () {

        Route::post('/', [BookingController::class, 'store']);
        Route::get('/my', [BookingController::class, 'myBookings']);
        Route::get('/{id}', [BookingController::class, 'show']);
        Route::post('/{id}/cancel', [BookingController::class, 'cancel']);
        Route::post(
    '/{id}/pay',
    [BookingController::class,'pay']
);
    });

/*
|--------------------------------------------------------------------------
| TICKETS ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/bookings/{booking}/ticket', [TicketController::class, 'generate']);
    Route::get('/tickets/{ticket}', [TicketController::class, 'show']);
    Route::get('/tickets/{ticket}/download', [TicketController::class, 'download']);
});

Route::get('/tickets/verify/{ticketNumber}', [TicketController::class, 'verify']);
Route::middleware('auth:sanctum')
    ->prefix('notifications')
    ->group(function () {

        Route::get('/', [
            NotificationController::class,
            'index'
        ]);

        Route::get('/unread', [
            NotificationController::class,
            'unread'
        ]);

        Route::post('/mark-all-read', [
            NotificationController::class,
            'markAllAsRead'
        ]);

        Route::post('/{id}/read', [
            NotificationController::class,
            'markAsRead'
        ]);

    });

    Route::middleware('auth:sanctum')
    ->group(function () {

    Route::post(
        '/reviews',
        [ReviewController::class, 'store']
    );
});

Route::get(
    '/trips/{trip}/reviews',
    [ReviewController::class, 'tripReviews']
);
/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/
Route::prefix('admin')
    ->middleware(['auth:sanctum', 'admin'])
    ->group(function () {

        /*
        | Dashboard
        */
        Route::get('/dashboard', [DashboardController::class, 'index']);

        /*
        | Users Management
        */
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/users/{id}', [UserController::class, 'show']);
        Route::patch('/users/{id}/status', [UserController::class, 'changeStatus']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);

        /*
        | Cities CRUD
        */
        Route::get('/cities', [CityController::class, 'index']);
        Route::post('/cities', [CityController::class, 'store']);
        Route::get('/cities/{id}', [CityController::class, 'show']);
        Route::put('/cities/{id}', [CityController::class, 'update']);
        Route::delete('/cities/{id}', [CityController::class, 'destroy']);

        /*
        | Stations CRUD
        */
        Route::get('/stations', [StationController::class, 'index']);
        Route::post('/stations', [StationController::class, 'store']);
        Route::get('/stations/{id}', [StationController::class, 'show']);
        Route::put('/stations/{id}', [StationController::class, 'update']);
        Route::delete('/stations/{id}', [StationController::class, 'destroy']);

        /*
        | Buses CRUD
        */
        Route::get('/buses', [BusController::class, 'index']);
        Route::post('/buses', [BusController::class, 'store']);
        Route::get('/buses/{id}', [BusController::class, 'show']);
        Route::put('/buses/{id}', [BusController::class, 'update']);
        Route::delete('/buses/{id}', [BusController::class, 'destroy']);

        /*
        | Trips CRUD
        */
        Route::get('/trips', [TripsController::class, 'index']);
        Route::post('/trips', [TripsController::class, 'store']);
        Route::get('/trips/{id}', [TripsController::class, 'show']);
        Route::put('/trips/{id}', [TripsController::class, 'update']);
        Route::delete('/trips/{id}', [TripsController::class, 'destroy']);

        /*
        | Bookings Management
        */
        Route::get('/bookings', [BookingManagementController::class, 'index']);
        Route::get('/bookings/{id}', [BookingManagementController::class, 'show']);
        Route::post('/bookings/{id}/confirm', [BookingManagementController::class, 'confirm']);
        Route::post('/bookings/{id}/cancel', [BookingManagementController::class, 'cancel']);
        Route::get('/bookings/{id}/ticket', [BookingManagementController::class, 'ticket']);
        Route::get('/bookings/statistics', [BookingManagementController::class, 'statistics']);

        /*
        | Reviews Management
        */
        Route::get('/reviews', [ReviewManagementController::class, 'index']);
        Route::get('/reviews/stats', [ReviewManagementController::class, 'stats']);
        Route::delete('/reviews/{id}', [ReviewManagementController::class, 'destroy']);

        /*
        | Activity Logs
        */
        Route::get('/logs', [ActivityLogController::class, 'index']);
        Route::get('/logs/user/{userId}', [ActivityLogController::class, 'byUser']);
        Route::delete('/logs/{id}', [ActivityLogController::class, 'destroy']);
    });