<?php
namespace App\Actions\Menu;

use App\Models\Menu;

class DeleteMenuAction
{
    public function execute(Menu $menu): bool
    {
        return $menu->delete();
    }
}