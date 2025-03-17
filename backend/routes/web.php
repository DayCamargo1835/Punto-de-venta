<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


// Mostrar formulario de login
Route::get('login', [AuthController::class, 'showLoginForm'])->name('login');

// Enviar formulario de login
Route::post('login', [AuthController::class, 'login']);

// Mostrar formulario de registro
Route::get('register', [AuthController::class, 'showRegisterForm'])->name('register');

// Enviar formulario de registro
Route::post('register', [AuthController::class, 'register']);
