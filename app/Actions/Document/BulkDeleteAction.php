<?php

namespace App\Actions\Document;

use App\Models\Document;


class BulkDeleteAction
{
    public function execute(array $data): int
    {
        $deletedCount = 0;
        Document::whereIn('id', $data['ids'])->get()->each(function ($menu) use (&$deletedCount) {
            $menu->delete();
            $deletedCount++;
        });
        return $deletedCount;
    }

}