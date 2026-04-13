<?php

namespace App\Actions\Category;

use App\Models\Category;


class BulkDeleteAction
{
    public function execute(array $data): int
    {
        $deletedCount = 0;
        Category::whereIn('id', $data['ids'])->get()->each(function ($menu) use (&$deletedCount) {
            $menu->delete();
            $deletedCount++;
        });
        return $deletedCount;
    }

}