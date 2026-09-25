<?php
namespace App\Actions\Category;

use App\Models\Category;
use Illuminate\Support\Str;

class CreateCategoryAction
{
    public function execute(array $data): Category
    {
        
        return Category::create([
            'title' => $data['title'] ?? $data['title_uz'],
            'title_uz' => $data['title_uz'] ?? null,
            'title_ru' => $data['title_ru'] ?? null,
            'title_en' => $data['title_en'] ?? null,
            'description' => $data['description'] ?? null,
            'description_uz' => $data['description_uz'] ?? null,
            'description_ru' => $data['description_ru'] ?? null,
            'description_en' => $data['description_en'] ?? null,
            'parent_id' => ($data['parent_id'] ?? null) ?: null,
            'menu_id' => (int)$data['menu_id'],
            'order' => $data['order'] ?? 0,
        ]);

    }

}
    

