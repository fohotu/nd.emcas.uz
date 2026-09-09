<?php 
namespace App\Actions\Favorite;

use App\Models\Favorites;



class CreateFavoriteAction
{
    public function execute(array $data): Bool
    {   
        $result = true;
        $model = Favorites::firstOrCreate([
            'user_id' => $data['user_id'],
            'document_id' => $data['document_id'],
        ]);

        if (!$model->wasRecentlyCreated) {
            $model->delete();
            $result = false;
        }

        return $result;

    }

}

?>