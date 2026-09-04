<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadedFiles extends Model
{
    use HasFactory;

    protected $table = 'uploaded_files';

    public static function getSingle($key,$value)
    {
        return self::where($key,'=',$value)->first();
    }

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class, 'id', 'object_id');
    }


    public static function upload($file)
    {
        if($file){
            $path = $file->store('upload');
            
            if($path){
                
                $model = new self;
                $model->file_link = $path;
                $model->file_name = $file->getClientOriginalName();
                $model->file_extension = $file->getClientOriginalExtension();
                $model->file_type = $file->getClientMimeType();
                $model->object_id = 0;
                $model->object_type = 0; 
                $model->save();
            
            }

        }
    }



}
