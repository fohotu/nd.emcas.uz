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

    public function updateUser($id, array $data)
    {
        $user = User::findOrFail($id);

        $user->update([
            'name' => $data['name'] ?? $user->name,
            'email' => isset($data['email']) ?? $user->email,
        ]);

        return $user;
    }


   public function toggleBlockUser(User $user): bool
   {
        $user->status = !$user->status;
        $user->save();

        return $user->status;
    }


    public function bulkDeleteUsers(array $ids): int
    {
       // return User::whereIn('id', $ids)->delete();
       $deletedCount = 0;
        User::whereIn('id', $ids)->get()->each(function ($user) use (&$deletedCount) {
            $user->delete();
            $deletedCount++;
        });
        return $deletedCount;
    }
}
?>