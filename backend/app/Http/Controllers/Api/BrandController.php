<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brand;

class BrandController extends Controller
{
    public function index()
{
    try {
        $brands = Brand::all();
        return response()->json($brands);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Error al obtener marcas',
            'details' => $e->getMessage()
        ], 500);
    }
}



    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:100',
    ]);

    try {
        $brand = Brand::create([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Marca creada exitosamente',
            'brand' => $brand,
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Error al crear la marca',
            'details' => $e->getMessage()
        ], 500);
    }
}



    public function show($id)
    {
        $brand = Brand::find($id);
        return $brand ? response()->json($brand) : response()->json(['error' => 'Marca no encontrada'], 404);
    }

    public function update(Request $request, $id)
    {
        $brand = Brand::find($id);
        if (!$brand) return response()->json(['error' => 'Marca no encontrada'], 404);

        $request->validate(['name' => 'required|string|max:255']);
        $brand->update(['name' => $request->name]);

        return response()->json(['message' => 'Marca actualizada con éxito', 'brand' => $brand]);
    }

    public function destroy($id)
    {
        $brand = Brand::find($id);
        if (!$brand) return response()->json(['error' => 'Marca no encontrada'], 404);

        $brand->delete();
        return response()->json(['message' => 'Marca eliminada correctamente']);
    }
}
