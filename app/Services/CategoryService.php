<?php 
namespace App\Services;

use App\Models\Category;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryService
{
    
    public function getAllCategory(array $filters = [],int $perPage = 25): LengthAwarePaginator
    {

        $model = Category::query()
        ->with(['parent','menu']);

        if(!empty($filters['title'])) {
            $model->where('title', 'like', "%{$filters['title']}%");
        }

        if(!empty($filters['description'])){
            $model->where('description', 'like', "%{$filters['description']}%");
        }
        
        return $model->latest()->paginate($perPage);
        
    }

    public function getCategoryById(int $id): Category
    {
        return Category::findOrFail($id);
    }

    public function treeView()
    {
        return Category::with('childrenRecursive')
            ->whereNull('parent_id')
            ->orWhere('parent_id',0)
            ->get();
    }

    public function getCategoryByMenu(int $menuId)
    {
        return Category::where('menu_id', $menuId)->get();
    }

    

    public function liveSearch(array $search)
    {
        return Category::with('parent')
            ->when(!empty($search['title']), function ($query) use ($search) {
                $query->where('title', 'like', "%{$search['title']}%");
            })
            ->when(!empty($search['menu']), function ($query) use ($search) {
                $query->where('menu_id', $search['menu']);
            })
            ->limit(20)
            ->get()
            ->map(fn ($category) => [
                'value' => $category->id,
                'label' => $category->title,
        ]);
    }

    

}
?>