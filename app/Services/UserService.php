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

    public function getUserById(int $id): Document
    {
        return User::findOrFail($id);
    }
}
?>