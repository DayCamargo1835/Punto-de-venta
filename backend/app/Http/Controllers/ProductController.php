<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Supplier;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(function ($request, $next) {
            if (auth()->user()->rol_id !== 1) {
                return redirect('/dashboard')->with('error', 'Acceso denegado.');
            }
            return $next($request);
        });
    }

    public function index()
    {
        return view('products.index');
    }
}
