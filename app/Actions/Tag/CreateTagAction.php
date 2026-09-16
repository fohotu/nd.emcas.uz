<?php 
namespace App\Actions\Tag;

use App\Models\Tags;
use App\Models\UploadedFiles;


class CreateTagAction
{
    public function execute(array $data): Tags
    {
       
        $model = Tags::create([
            'name' => $data['name'],
            'user_id' => $data['user_id']
        ]);
        return $model;
    }

}

?>