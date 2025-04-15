<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // 👈 importante para DB::table
use Illuminate\Support\Facades\Validator;
use App\Models\Sales;

class ReporteVentasController extends Controller
{
    // Total general de ventas (sin filtro de fechas)
    public function totalGeneral()
    {
        try {
            $total = DB::table('sales')->sum('total');

            return response()->json([
                'total' => $total
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener el total de ventas',
                'mensaje' => $e->getMessage(),
            ], 500);
        }
    }

    // Ganancia semanal actual
    public function gananciaSemanalActual()
    {
        try {
            $inicioSemana = now()->startOfWeek();
            $finSemana = now()->endOfWeek();

            $totalSemana = DB::table('sales')
                ->whereBetween('date', [$inicioSemana, $finSemana])
                ->sum('total');

            return response()->json([
                'ganancia_semanal' => $totalSemana,
                'desde' => $inicioSemana->toDateString(),
                'hasta' => $finSemana->toDateString()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al calcular la ganancia semanal',
                'mensaje' => $e->getMessage(),
            ], 500);
        }
    }
}
