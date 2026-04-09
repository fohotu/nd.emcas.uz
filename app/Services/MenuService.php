<?php 
namespace App\Services;

use App\Models\Menu;
use Illuminate\Pagination\LengthAwarePaginator;

class MenuService
{
    
    public function getAllMenu(array $filters = [],int $perPage = 11): LengthAwarePaginator
    {
        $model = Menu::query();

        if (!empty($filters['title'])) {
            $model->where('title', 'like', "%{$filters['title']}%");
        }
        if (!empty($filters['description'])) {
            $model->where('description', 'like', "%{$filters['description']}%");
        }

        return $model->latest()->paginate($perPage);
    }

    public function getMenuById(int $id): Menu
    {
        return Menu::findOrFail($id);
    }

}
?>