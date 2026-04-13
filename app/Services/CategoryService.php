<?php 
namespace App\Services;

use App\Models\Category;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryService
{
    
    public function getAllCategory(array $filters = [],int $perPage = 11): LengthAwarePaginator
    {
        $model = Category::query();

        if (!empty($filters['title'])) {
            $model->where('title', 'like', "%{$filters['title']}%");
        }
        if (!empty($filters['description'])) {
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

}
?>