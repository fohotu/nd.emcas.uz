<?php 
namespace App\Actions\Favorite;

use App\Models\Favorites;



class RemoveFavoriteAction
{
    
    public function execute(array $data): bool
    {
        $model = Favorites::where([
            'user_id' => $data['user_id'],
            'document_id' => $data['document_id'],
        ])->first();

        return $model ? $model->delete() : false;
    }

}

?>