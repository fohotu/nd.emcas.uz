<?php 
namespace App\Actions\Tag;

use App\Models\DocumentTags;



class RemoveTagAction
{
    public function execute(array $data): bool
    {

        $result = DocumentTags::where('document_id' , $data['document_id'])
        ->where('tag_id',$data['tag_id'])
        ->where('user_id',$data['user_id'])
        ->delete();

        return $result;
   
    }

}

?>