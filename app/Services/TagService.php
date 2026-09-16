<?php 
namespace App\Services;

use App\Models\Tags;
use Illuminate\Pagination\LengthAwarePaginator;

class TagService
{
    
    public function getAllUserTags(int $user_id,array $filters = [],int $perPage = 11): LengthAwarePaginator
    {


        $model = Tags::with('documents')
        ->where('user_id',$user_id);

        if (!empty($filters['name'])) {
            $model->where('name', 'like', "%{$filters['name']}%");
        }
  

        return $model->latest()->paginate($perPage);
    }

    public function getTagById(int $id): Menu
    {
        return Tags::findOrFail($id);
    }



    

}
?>