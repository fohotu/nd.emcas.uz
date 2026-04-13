<?php
namespace App\Actions\Menu;

use App\Models\Menu;
use Illuminate\Support\Str;

class CreateMenuAction
{
    public function execute(array $data): Menu
    {
        
        return Menu::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'parent_id' => (int)$data['parent_id'] ?? null,
            'order' => $data['order'] ?? 0,
            'route' => $data['route'] ?? null,
            'url' => $data['url'] ?? null,
            'sys_name' => $data['sys_name']  ?? Str::slug($data['title']),
        ]);

    }

}
    

