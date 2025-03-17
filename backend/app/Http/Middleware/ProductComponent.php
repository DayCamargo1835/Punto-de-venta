<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Livewire\WithPagination;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Supplier;

class ProductComponent extends Component
{
    use WithPagination;

    public $search = '';
    public $product_id, $name, $description, $price, $stock, $category_id, $brand_id, $supplier_id;
    public $isModalOpen = false;

    protected $rules = [
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric',
        'stock' => 'required|integer',
        'category_id' => 'required|integer',
        'brand_id' => 'required|integer',
        'supplier_id' => 'required|integer',
    ];

    public function render()
    {
        return view('livewire.products', [
            'products' => Product::where('name', 'like', "%{$this->search}%")
                ->orWhere('id', 'like', "%{$this->search}%")
                ->paginate(10),
            'categories' => Category::all(),
            'brands' => Brand::all(),
            'suppliers' => Supplier::all(),
        ]);
    }

    public function create()
    {
        $this->reset();
        $this->isModalOpen = true;
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        $this->product_id = $id;
        $this->name = $product->name;
        $this->description = $product->description;
        $this->price = $product->price;
        $this->stock = $product->stock;
        $this->category_id = $product->category_id;
        $this->brand_id = $product->brand_id;
        $this->supplier_id = $product->supplier_id;
        $this->isModalOpen = true;
    }

    public function save()
    {
        $this->validate();

        Product::updateOrCreate(['id' => $this->product_id], [
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'stock' => $this->stock,
            'category_id' => $this->category_id,
            'brand_id' => $this->brand_id,
            'supplier_id' => $this->supplier_id,
        ]);

        session()->flash('message', $this->product_id ? 'Producto actualizado' : 'Producto agregado');
        $this->isModalOpen = false;
    }

    public function delete($id)
    {
        Product::findOrFail($id)->delete();
        session()->flash('message', 'Producto eliminado');
    }
}
