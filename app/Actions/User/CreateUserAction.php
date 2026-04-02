<?php 
namespace App\Actions\User;

use App\Models\User;

class CreateUserAction
{
    public function execute(array $data): User
    {
        
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role' => $data['role'] ?? 'user',
        ]);

    }
}
?>