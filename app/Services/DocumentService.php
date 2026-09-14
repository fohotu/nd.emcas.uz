<?php 
namespace App\Services;

use App\Models\Document;
use Illuminate\Pagination\LengthAwarePaginator;

class DocumentService
{
    public function getAllDocuments(array $filters = [],int $perPage = 10): LengthAwarePaginator
    {
     
        $model = Document::with('category.menu','files','versions','tags');
        /*
        |--------------------------------------------------------------------------
        | NUMBER
        |--------------------------------------------------------------------------
        */

        if (!empty($filters['number'])) {
            $numberD = filter_var(
                $filters['number_d'] ?? false,
                FILTER_VALIDATE_BOOLEAN
            );

            if ($numberD) {
                $model->where(
                    'number',
                    $filters['number']
                );
            } else {
                $model->where(
                    'number',
                    'like',
                    '%' . $filters['number'] . '%'
                );
            }
        }

        /*
        |--------------------------------------------------------------------------
        | TITLE
        |--------------------------------------------------------------------------
        */

        if (!empty($filters['title'])) {

            $titleD = filter_var(
                $filters['title_d'] ?? false,
                FILTER_VALIDATE_BOOLEAN
            );

            if ($titleD) {
                $model->where(
                    'title',
                    $filters['title']
                );
            } else {
                $model->where(
                    'title',
                    'like',
                    '%' . $filters['title'] . '%'
                );
            }
            
        }

        /*

            if (!empty($filters['title'])) {
                $model->where('title', 'like', "%{$filters['title']}%");
            }

            if (!empty($filters['number'])) {
                $model->where('number', 'like', "%{$filters['number']}%");
            }

        */

        if(!empty($filters['category_id'])) {
            $model->where('category_id',$filters['category_id']);
        }

        if(!empty($filters['menu_id'])) {
            $model->where('menu_id',$filters['menu_id']);
        }

        if (!empty($filters['status'])) {
            $model->where('status',$filters['status']);
        }

        if (!empty($filters['description'])) {
            $model->where('description', 'like', "%{$filters['description']}%");
        }

        /*
        
            if(!empty($filters['date'])) {
                $model->whereDate('document_date', $filters['date']);
            }

        */
        /*
        |--------------------------------------------------------------------------
        | DATE FILTER
        |--------------------------------------------------------------------------
        */

        $dateD = filter_var(
            $filters['date_d'] ?? false,
            FILTER_VALIDATE_BOOLEAN
        );

        $dateI = filter_var(
            $filters['date_i'] ?? false,
            FILTER_VALIDATE_BOOLEAN
        );

        if ($dateD && !empty($filters['start'])) {
            $model->whereDate(
                'document_date',
                $filters['start']
            );
        }

        if ($dateI) {

            if (!empty($filters['start'])) {
                $model->whereDate(
                    'document_date',
                    '>=',
                    $filters['start']
                );
            }

            if (!empty($filters['end'])) {
                $model->whereDate(
                    'document_date',
                    '<=',
                    $filters['end']
                );
            }

        }

        return $model->latest()->paginate($perPage);

    }

    public function getDocumentById(int $id): Document
    {
        return Document::findOrFail($id);
    }

    public function getDocumentByCategory(int $categoryId): LengthAwarePaginator
    {
        return Document::with('tags')->where('category_id', $categoryId)->latest()->paginate(10);
    }

    public function getDocumentByMenu(int $menuId): LengthAwarePaginator
    {
        return Document::with('tags')->where('menu_id', $menuId)->latest()->paginate(10);
    }


    public function getFavorites($favorites,array $filters = [])
    {
        
        $model = Document::with('tags')
        ->whereIn(
            'id',
            $favorites
        );



         if (!empty($filters['number'])) {
            $numberD = filter_var(
                $filters['number_d'] ?? false,
                FILTER_VALIDATE_BOOLEAN
            );

            if ($numberD) {
                $model->where(
                    'number',
                    $filters['number']
                );
            } else {
                $model->where(
                    'number',
                    'like',
                    '%' . $filters['number'] . '%'
                );
            }
        }

        /*
        |--------------------------------------------------------------------------
        | TITLE
        |--------------------------------------------------------------------------
        */

        if (!empty($filters['title'])) {

            $titleD = filter_var(
                $filters['title_d'] ?? false,
                FILTER_VALIDATE_BOOLEAN
            );

            if ($titleD) {
                $model->where(
                    'title',
                    $filters['title']
                );
            } else {
                $model->where(
                    'title',
                    'like',
                    '%' . $filters['title'] . '%'
                );
            }
            
        }


        if(!empty($filters['category_id'])) {
            $model->where('category_id',$filters['category_id']);
        }

        if(!empty($filters['menu_id'])) {
            $model->where('menu_id',$filters['menu_id']);
        }

        if (!empty($filters['status'])) {
            $model->where('status',$filters['status']);
        }

        if (!empty($filters['description'])) {
            $model->where('description', 'like', "%{$filters['description']}%");
        }

    
        /*
        |--------------------------------------------------------------------------
        | DATE FILTER
        |--------------------------------------------------------------------------
        */

        $dateD = filter_var(
            $filters['date_d'] ?? false,
            FILTER_VALIDATE_BOOLEAN
        );

        $dateI = filter_var(
            $filters['date_i'] ?? false,
            FILTER_VALIDATE_BOOLEAN
        );

        if ($dateD && !empty($filters['start'])) {
            $model->whereDate(
                'document_date',
                $filters['start']
            );
        }

        if ($dateI) {

            if (!empty($filters['start'])) {
                $model->whereDate(
                    'document_date',
                    '>=',
                    $filters['start']
                );
            }

            if (!empty($filters['end'])) {
                $model->whereDate(
                    'document_date',
                    '<=',
                    $filters['end']
                );
            }

        }
        
        
        $model=$model->paginate(10);
        return $model;

    }
    

}
?>