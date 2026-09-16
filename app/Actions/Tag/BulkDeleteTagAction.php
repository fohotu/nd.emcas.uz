<?php 
namespace App\Actions\Tag;

use App\Models\DocumentTags;
use App\Models\Tags;



class BulkDeleteTagAction
{
    
    public function execute(array $data): bool
    {

        $tagIds = Tags::whereIn('id', $data['ids'])
            ->where('user_id', $data['user_id'])
            ->pluck('id');

        Tags::whereIn('id', $tagIds)->delete();

        DocumentTags::whereIn('tag_id', $tagIds)
            ->where('user_id', $data['user_id'])
            ->delete();

        return true;
    }

}

?>