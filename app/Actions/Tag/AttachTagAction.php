<?php 
namespace App\Actions\Tag;

use App\Models\DocumentTag;



class AttachTagAction
{
    public function execute(array $data): DocumentTag
    {

        $model = DocumentTag::create([
            'document_id' => $data['document_id'],
            'tag_id'      => $data['tag_id'],
            'user_id'     => $data['user_id'],
        ]);

        return $model;
   
    }

}

?>