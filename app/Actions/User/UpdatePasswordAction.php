<?php

namespace App\Actions\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UpdatePasswordAction
{
    public function execute(User $user,array $data): bool
    {
        return $user->update([
            'password' => Hash::make($data['password']),
        ]);

        
    }

}