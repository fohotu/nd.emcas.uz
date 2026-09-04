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


    public function treeView()
    {
        return Menu::with('childrenRecursive')
            ->whereNull('parent_id')
            ->orWhere('parent_id',0)
            ->get();
    }


    public function liveSearch($search = '')
    {
        return Menu::query()
            ->when($search, function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->limit(20)
            ->get()
            ->map(function ($menu) {
                return [
                    'value' => $menu->id,
                    'label' => $menu->title,
                ];
            })
            ->values();
    }
    

}
?>