<?php

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class BlockUserAction
{
    public function execute(User $user): bool
    {
        $user->status = !$user->status;
        $user->save();
        return $user->status;
    }

}