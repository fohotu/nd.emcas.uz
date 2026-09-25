<?php
namespace App\Actions\Menu;

use App\Models\Menu;
use Illuminate\Support\Str;

class UpdateMenuAction
{

    public function execute(Menu $menu, array $data): bool
    {
        return $menu->update([
            'title' => $data['title'] ?? $data['title_uz'],
            'title_uz' => $data['title_uz'] ?? null,
            'title_ru' => $data['title_ru'] ?? null,
            'title_en' => $data['title_en'] ?? null,
            'description' => $data['description'] ?? null,
            'description_uz' => $data['description_uz'] ?? null,
            'description_ru' => $data['description_ru'] ?? null,
            'description_en' => $data['description_en'] ?? null,
            'parent_id' => !empty($data['parent_id']) ? (int) $data['parent_id'] : null,
            'order' => $data['order'] ?? 0,
            'route' => $data['route'] ?? null,
            'url' => $data['url'] ?? null,
            'sys_name' => $data['sys_name']  ?? Str::slug($data['title_uz'].'-'.random_int(1,999)),
        ]);
    }

}
    

