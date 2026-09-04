<?php

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class BulkDeleteAction
{
    public function execute(array $data): int
    {
        $deletedCount = 0;
        User::whereIn('id', $data['ids'])->get()->each(function ($user) use (&$deletedCount) {
            $user->delete();
            $deletedCount++;
        });
        return $deletedCount;
    }

}