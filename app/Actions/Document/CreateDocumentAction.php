<?php 
namespace App\Actions\Document;

use App\Models\Document;
use App\Models\UploadedFiles;


class CreateDocumentAction
{
    public function execute(array $data): Document
    {
        // Здесь можно добавить проверку прав или специфическую логику
        $model = Document::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'number' => $data['number'],
            'category_id' => $data['category_id'] ?? null,
            'menu_id' => $data['menu_id'] ?? null,
            'version_for' => $data['version_for'] ?? null,
            'status' => $data['status'] ?? 'active',
            'language' => $data['language'],
            'document_date' => $data['document_date'] ?? null,
        ]);
        if($model){
            if(isset($data['files']) && is_array($data['files'])){
                $fileIds = [];
                foreach($data['files'] as $file){
                    $fileIds[] = $file["id"];
                }
                if(!empty($fileIds)){
                    UploadedFiles::whereIn('id',$fileIds)->update(['object_id'=>$model->id,'object_type'=>'document']);
                }
            }
        }
        return $model;
    }

}

?>