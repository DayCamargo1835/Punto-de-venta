<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
{
    try {
        // Obtener todos los productos junto con sus relaciones (marca, categoría, proveedor)
        $products = Product::with(['brand', 'category', 'supplier'])->get();

        // Verificar si se encontraron productos
        if ($products->isEmpty()) {
            return response()->json(['message' => 'No se encontraron productos.'], 404);
        }

        return response()->json($products, 200);
    } catch (\Exception $e) {
        // Captura el error y muestra un mensaje detallado
        return response()->json([
            'error' => 'Error al obtener productos',
            'details' => $e->getMessage(),
        ], 500);
    }
}





    // Crear un nuevo producto
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|integer|unique:products,id',
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|integer',
            'brand_id' => 'required|integer',
            'supplier_id' => 'nullable|integer',
        ]);

        try {
            // Crea el producto
            $product = Product::create($validatedData);

            return response()->json([
                'message' => 'Producto creado exitosamente',
                'product' => $product,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al crear el producto',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    // Obtener un producto por su ID
    public function show($id)
    {
        $product = Product::find($id);

        if ($product) {
            return response()->json($product, 200);
        } else {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
    }

    // Actualizar un producto
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|integer',
            'brand_id' => 'required|integer',
            'supplier_id' => 'nullable|integer',
        ]);

        try {
            // Verifica si el producto existe
            $product = Product::findOrFail($id);

            // Actualiza el producto
            $product->update($validatedData);

            return response()->json([
                'message' => 'Producto actualizado exitosamente',
                'product' => $product,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al actualizar el producto',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    // Método para eliminar un producto
public function destroy($id)
{
    try {
        // Buscar el producto por su ID
        $product = Product::findOrFail($id);

        // Eliminar el producto
        $product->delete();

        return response()->json([
            'message' => 'Producto eliminado exitosamente'
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Error al eliminar el producto',
            'details' => $e->getMessage(),
        ], 500);
    }
}

}



