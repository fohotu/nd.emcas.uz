<?php 
namespace App\Services;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class UserService
{
    public function getAllUsers(int $perPage = 10): LengthAwarePaginator
    {
        return User::query()
            ->latest()
            ->paginate($perPage);
    }

    public function getUserById(int $id): User
    {
        return User::findOrFail($id);
    }

    public function updateUser($id, array $data)
    {
        $user = User::findOrFail($id);

        $user->update([
            'login' => $data['login'] ?? $user->login,
            'password' => isset($data['password']) ? bcrypt($data['password']) : $user->password,
            'role' => $data['role'] ?? $user->role,
        ]);

        return $user;
    }


   public function toggleBlockUser(User $user): bool
    {
        $user->status = !$user->status;
        $user->save();

        return $user->status;
    }
}
?>