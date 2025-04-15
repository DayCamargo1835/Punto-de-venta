<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'id','name', 'description', 'price', 'stock', 'category_id', 'brand_id', 'supplier_id'
    ];

    // Relación con la marca
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    // Relación con la categoría
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    // Relación con el proveedor
    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }
}
