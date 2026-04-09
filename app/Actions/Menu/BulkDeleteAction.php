<?php

namespace App\Actions\Menu;

use App\Models\Menu;
use Illuminate\Support\Facades\Hash;

class BulkDeleteAction
{
    public function execute(array $data): int
    {
        $deletedCount = 0;
        Menu::whereIn('id', $data['ids'])->get()->each(function ($menu) use (&$deletedCount) {
            $menu->delete();
            $deletedCount++;
        });
        return $deletedCount;
    }

}