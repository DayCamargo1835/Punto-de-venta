<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; // ← ESTA LÍNEA
use App\Models\Product;
use App\Models\Sale;
use App\Models\SalesDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1'
        ]);

        DB::beginTransaction();

        try {
            $total = 0;
            $details = [];

            foreach ($request->products as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Producto '{$product->name}' no tiene stock suficiente.");
                }

                $subtotal = $product->price * $item['quantity'];
                $total += $subtotal;

                // Preparar detalle
                $details[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'subtotal' => $subtotal
                ];

                // Descontar stock
                $product->stock -= $item['quantity'];
                $product->save();
            }

            // Crear venta
            $sale = Sale::create([
                'user_id' => $request->user_id,
                'total' => $total
            ]);

            // Crear detalles
            foreach ($details as $detail) {
                $detail['sale_id'] = $sale->id;
                SalesDetail::create($detail);
            }

            DB::commit();
            return response()->json(['message' => 'Venta realizada con éxito', 'sale_id' => $sale->id], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function ticket($id)
    {
        $sale = Sale::with('user', 'details.product')->findOrFail($id);
        return response()->json($sale);
    }
}
