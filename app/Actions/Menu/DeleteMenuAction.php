<?php
namespace App\Actions\Menu;

use App\Models\Menus;

class DeleteMenuAction
{
    public function execute(Menus $menu): bool
    {
        return $menu->delete();
    }
}