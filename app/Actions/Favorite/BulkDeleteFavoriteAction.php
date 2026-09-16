<?php 
namespace App\Actions\Favorite;

use App\Models\Favorites;
use App\Models\Tags;



class BulkDeleteFavoriteAction
{
    
    public function execute(array $data): bool
    {
        Favorites::whereIn('document_id', $data['ids'])
            ->where('user_id', $data['user_id'])
            ->delete();
        return true;
    }

}

?>