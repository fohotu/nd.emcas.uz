<?php 
namespace App\Actions\Tag;

use App\Models\DocumentTags;
use App\Models\Tags;



class RemoveTagAction
{
    public function execute(array $data): bool
    {
        $tag = Tags::find($data['tag_id']);

        if (!$tag) {
            return false;
        }

        $tag->delete();

        DocumentTags::where('tag_id', $data['tag_id'])
            ->where('user_id', $data['user_id'])
            ->delete();

        return true;

   
    }

}

?>