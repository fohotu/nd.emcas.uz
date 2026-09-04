<?php 
namespace App\Services;

use App\Models\Document;
use Illuminate\Pagination\LengthAwarePaginator;

class DocumentService
{
    public function getAllDocuments(array $filters = [],int $perPage = 10): LengthAwarePaginator
    {

       
       //$model = Document::query();
        $model = Document::with('category.menu','files','versions');
        if (!empty($filters['title'])) {
            $model->where('title', 'like', "%{$filters['title']}%");
        }

        if (!empty($filters['number'])) {
            $model->where('number', 'like', "%{$filters['number']}%");
        }

        if (!empty($filters['category_id'])) {
            $model->where('category_id',$filters['category_id']);
        }

        if (!empty($filters['menu_id'])) {
            $model->where('menu_id',$filters['menu_id']);
        }

        if (!empty($filters['status'])) {
            $model->where('status',$filters['status']);
        }

        if (!empty($filters['description'])) {
            $model->where('description', 'like', "%{$filters['description']}%");
        }

        if (!empty($filters['date'])) {
            $model->whereDate('document_date', $filters['date']);
        }

        return $model->latest()->paginate($perPage);

    }

    public function getDocumentById(int $id): Document
    {
        return Document::findOrFail($id);
    }

    public function getDocumentByCategory(int $categoryId): LengthAwarePaginator
    {
        return Document::where('category_id', $categoryId)->latest()->paginate(10);
    }

    public function getDocumentByMenu(int $menuId): LengthAwarePaginator
    {
        return Document::where('menu_id', $menuId)->latest()->paginate(10);
    }
    
}
?>