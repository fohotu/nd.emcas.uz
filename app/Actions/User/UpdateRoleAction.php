<?php

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UpdateRoleAction
{
    public function execute(User $user,array $data): bool
    {
        return $user->update([
            'role' => $data['role'],
        ]);

        
    }

}