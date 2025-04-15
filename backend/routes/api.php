<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ReporteVentasController;
use App\Http\Controllers\Api\SaleController;
/*
|----------------------------------------------------------------------
| API Routes
|----------------------------------------------------------------------
| Aquí se registran todas las rutas de la API para la aplicación.
| Estas rutas son cargadas por RouteServiceProvider y estarán dentro del grupo "api".
*/

// Autenticación
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Ruta para obtener todos los productos
Route::get('/product', [ProductController::class, 'index']);

// Rutas protegidas por el middleware auth:sanctum
Route::middleware(['auth:sanctum'])->group(function () {

    // 👤 Rutas de usuarios (nuevas)
    Route::get('/users', [AuthController::class, 'index']);
    Route::get('/users/{id}', [AuthController::class, 'show']);
    Route::put('/users/{id}', [AuthController::class, 'update']);
    Route::delete('/users/{id}', [AuthController::class, 'destroy']);

    // Ruta para obtener un producto por su ID
    Route::get('/product/{id}', [ProductController::class, 'show']);

    // Ruta para crear un producto
    Route::post('/product', [ProductController::class, 'store']);

    // Ruta para actualizar un producto
    Route::put('/product/{id}', [ProductController::class, 'update']);

    // Ruta para eliminar un producto<a
    Route::delete('/product/{id}', [ProductController::class, 'destroy']);

    // Rutas para gestion de marcas
    Route::get('/brands', [BrandController::class, 'index']);
    Route::post('/brands', [BrandController::class, 'store']);
    Route::get('/brands/{id}', [BrandController::class, 'show']);
    Route::put('/brands/{id}', [BrandController::class, 'update']);
    Route::delete('/brands/{id}', [BrandController::class, 'destroy']);


    // 📊 Rutas de reportes de ventas
    // Rutas de ventas
    Route::post('/sales', [SaleController::class, 'store']);
    Route::get('/sales/{id}/ticket', [SaleController::class, 'ticket']);
    Route::middleware('auth:sanctum')->post('/sales', [SaleController::class, 'store']);


});

