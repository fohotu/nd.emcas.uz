<?php

namespace App\Actions\Document;

use App\Models\Document;
use App\Models\UploadedFiles;

class UpdateDocumentAction
{
    public function execute(Document $document, array $data): bool
    {

        $model =  $document->update([
            'title' => $data['title'] ?? $data['title_uz'],
            'title_uz' => $data['title_uz'] ?? null,
            'title_ru' => $data['title_ru'] ?? null,
            'title_en' => $data['title_en'] ?? null,
            'description' => $data['description'] ?? null,
            'description_uz' => $data['description_uz'] ?? null,
            'description_ru' => $data['description_ru'] ?? null,
            'description_en' => $data['description_en'] ?? null,

            'number' => $data['number'],
            'category_id' => $data['category_id'] ?? null,
            'menu_id' => $data['menu_id'] ?? null,
            'version_for' => $data['version_for'] ?? null,
            'status' => $data['status'] ?? 'active',
            'language' => $data['language'],
            'document_date' => $data['document_date'] ? : null,
        ]);

         if($model){
            if(isset($data['files']) && is_array($data['files'])){
                $fileIds = [];
                foreach($data['files'] as $file){
                    $fileIds[] = $file["id"];
                }
                if(!empty($fileIds)){
                    UploadedFiles::whereIn('id',$fileIds)->update(['object_id'=>$document->id,'object_type'=>'document']);
                }
            }
        }
        return $model;


       
    }
}