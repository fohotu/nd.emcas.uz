<?php 
namespace App\Services;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class UserService
{
    
    public function getAllUsers(array $filters = [],int $perPage = 11): LengthAwarePaginator
    {
        $model = User::query();

        if (!empty($filters['name'])) {
            $model->where('name', 'like', "%{$filters['name']}%");
        }

        if (!empty($filters['email'])) {
            $model->where('email', 'like', "%{$filters['email']}%");
        }

        if (!empty($filters['role'])) {
            $model->where('role', $filters['role']);
        }

        return $model->latest()->paginate($perPage);
    }

    public function getUserById(int $id): User
    {
        return User::findOrFail($id);
    }

}
?>