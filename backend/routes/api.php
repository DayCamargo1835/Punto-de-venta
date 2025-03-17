<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí se registran todas las rutas de la API para la aplicación.
| Estas rutas son cargadas por RouteServiceProvider y estarán dentro del grupo "api".
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Autenticación
Route::post('/register', [App\Http\Controllers\Api\AuthController::class, 'register']);
Route::post('/login', [App\Http\Controllers\Api\AuthController::class, 'login']);

// Productos (Rutas protegidas)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/products', [App\Http\Controllers\Api\ProductController::class, 'index']);
    Route::post('/products', [App\Http\Controllers\Api\ProductController::class, 'store']);
    Route::put('/products/{id}', [App\Http\Controllers\Api\ProductController::class, 'update']);
    Route::delete('/products/{id}', [App\Http\Controllers\Api\ProductController::class, 'destroy']);
});

