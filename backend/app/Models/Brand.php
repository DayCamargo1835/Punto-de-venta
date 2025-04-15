<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    // Si la tabla no es el plural del nombre del modelo, puedes especificarlo aquí
    // protected $table = 'brands'; // Si tu tabla tiene un nombre diferente

    // Si la tabla tiene claves primarias no estándar o si necesitas configurar los campos rellenables
    protected $fillable = ['name']; // Asegúrate de que estos son los campos correctos de la tabla 'brands'
}
