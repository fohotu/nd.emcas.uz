<?php
namespace App\Actions\Menu;

use App\Models\Menu;
use Illuminate\Support\Str;

class CreateMenuAction
{
    public function execute(array $data): Menu
    {
        
        return Menu::create([
            'title' => $data['title'] ?? $data['title_uz'],
            'title_uz' => $data['title_uz'],
            'title_ru' => $data['title_ru'],
            'title_en' => $data['title_en'],
            'description' => $data['description'] ?? null,
            'description_uz' => $data['description_uz'] ?? null,
            'description_ru' => $data['description_ru'] ?? null,
            'description_en' => $data['description_en'] ?? null,
            'parent_id' => ($data['parent_id'] ?? null) ?: null,
            'order' => $data['order'] ?? 0,
            'route' => $data['route'] ?? null,
            'url' => $data['url'] ?? null,
            'sys_name' => $data['sys_name']  ?? Str::slug($data['title']),
        ]);

    }

}
    

