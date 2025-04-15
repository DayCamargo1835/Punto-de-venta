<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesDetail extends Model
{
    public $timestamps = false;
    protected $fillable = ['sale_id', 'product_id', 'quantity', 'unit_price', 'subtotal'];

    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
