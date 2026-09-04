<?php

namespace App\Actions\User;

use App\Models\User;

class UpdateUserAction
{
    public function execute(User $user, array $data): bool
    {
        return $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);
    }
}