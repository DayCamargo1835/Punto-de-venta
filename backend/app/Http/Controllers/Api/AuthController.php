<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    // REGISTRO DE USUARIOS
    public function register(Request $request)
    {
        // Validar datos
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'rol_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Crear usuario con contraseña encriptada
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rol_id' => $request->rol_id,
        ]);

        // Generar token para el usuario
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    // INICIO DE SESIÓN
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401)
                             ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
                             ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
                             ->header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization')
                             ->header('Access-Control-Allow-Credentials', 'true');
        }

        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'rol_id' => $user->rol_id
            ],
            'token' => $token
        ], 200)
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
        ->header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization')
        ->header('Access-Control-Allow-Credentials', 'true');
    }

    // PERFIL DEL USUARIO AUTENTICADO
    public function userProfile(Request $request)
    {
        return response()->json($request->user());
    }

    // CERRAR SESIÓN
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Sesión cerrada correctamente'], 200);
    }
}

