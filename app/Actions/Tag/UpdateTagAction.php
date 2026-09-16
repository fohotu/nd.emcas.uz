<?php 
namespace App\Actions\Tag;

use App\Models\Tags;
use App\Models\UploadedFiles;


class UpdateTagAction
{
    public function execute(Tags $tag,array $data): bool
    {
       
        return $tag->update([
            'name' => $data['name']
        ]);

    }

}

?>