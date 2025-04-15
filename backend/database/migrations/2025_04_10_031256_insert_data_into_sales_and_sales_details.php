<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class InsertDataIntoSalesAndSalesDetails extends Migration
{
    /**
     * Ejecutar la migración.
     *
     * @return void
     */
    public function up()
    {
        // Insertar datos en la tabla sales
        DB::table('sales')->insert([
            'user_id' => 4,  // Asumiendo que el user_id es 1
            'total' => 100.50,  // Total de la venta
            'date' => now(),  // Fecha actual
        ]);

        // Obtener el último sale_id insertado
        $sale_id = DB::getPdo()->lastInsertId();

        // Insertar detalles de la venta en la tabla sales_details
        DB::table('sales_details')->insert([
            ['sale_id' => $sale_id, 'product_id' => 3664, 'quantity' => 2, 'unit_price' => 28.00, 'subtotal' => 50.00],
            ['sale_id' => $sale_id, 'product_id' => 4263, 'quantity' => 1, 'unit_price' => 36.00, 'subtotal' => 50.00],
        ]);
    }

    /**
     * Deshacer la migración.
     *
     * @return void
     */
    public function down()
    {
        // Eliminar los datos insertados en caso de rollback
        DB::table('sales_details')->where('sale_id', '=', DB::getPdo()->lastInsertId())->delete();
        DB::table('sales')->where('id', '=', DB::getPdo()->lastInsertId())->delete();
    }
}

