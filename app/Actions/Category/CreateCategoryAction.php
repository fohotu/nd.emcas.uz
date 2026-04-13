<?php
namespace App\Actions\Category;

use App\Models\Category;
use Illuminate\Support\Str;

class CreateCategoryAction
{
    public function execute(array $data): Category
    {
        
        return Category::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'parent_id' => ($data['parent_id'] ?? null) ?: null,
            'menu_id' => (int)$data['menu_id'],
            'order' => $data['order'] ?? 0,
        ]);

    }

}
    

