<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UploadedFiles;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function upload(Request $request)
    {   
        $file = $request->file('decision-document');
        $object_id = $request->input('object_id');
        $object_type = $request->input('object_type');
     
        $model = null;
        if($file){
            $path = $file->store('upload','public');
            if($path){
                $model = new UploadedFiles;
                $model->file_link = $path;
                $model->file_name = $file->getClientOriginalName();
                $model->file_extension = $file->getClientOriginalExtension();
                $model->file_type = $file->getClientMimeType();
                $model->object_id = $object_id ?? 0;
                $model->object_type = $object_type ?? 0; 
                $model->save();
            }

        }
        
        return json_encode($model);

    }

    public function remove(Request $request)
    {
        $model = UploadedFiles::getSingle('id',$request->id);
        if($model){
            $storage = Storage::delete($model->file_link);
            if($storage){
                $model->delete();
                return ['message'=>'success'];
            }
        }else{
            return ['message'=>'error'];
        }
    }

    public function download(Request $request)
    {
        $model = UploadedFiles::getSingle('id',$request->id);
        if($model){
            return Storage::download($model->file_link);
            //return Storage::url($model->file_link);
        }else{
            return ['message'=>'error'];
        }
    }

    public function dowloadLink(Request $request)
    {
        $model = UploadedFiles::getSingle('id',$request->id);
        if($model){
           // return Storage::url($model->file_link);
            return asset(Storage::url($model->file_link));
        }else{
            return ['message'=>'error'];
        }
    }
}
