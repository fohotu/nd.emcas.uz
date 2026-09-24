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

    public function view1(Request $request)
    {
        $file = UploadedFiles::findOrFail($request->id);

       

        $extension = strtolower(
            ltrim($file->file_extension, '.')
        );

        $filePath = storage_path('app/public/' . $file->file_link);

        abort_unless(
            file_exists($filePath),
            404,
            'Файл не найден'
        );

        // PDF
        if ($extension === 'pdf') {
            return response()->file($filePath, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline',
            ]);
        }

        // Изображения
        if (in_array($extension, ['png', 'jpg', 'jpeg', 'webp', 'gif'])) {
            return response()->file($filePath, [
                'Content-Type' => mime_content_type($filePath),
                'Content-Disposition' => 'inline',
            ]);
        }

        // Word / PowerPoint
        if (in_array($extension, ['doc', 'docx', 'ppt', 'pptx'])) {

            $outputDir = storage_path('app/public/viewer');

            if (!is_dir($outputDir)) {
                mkdir($outputDir, 0755, true);
            }

            $pdfName = pathinfo(
                $file->file_name,
                PATHINFO_FILENAME
            ) . '_' . $file->id . '.pdf';

            $pdfPath = $outputDir . '/' . $pdfName;

            $libreOffice = '/Applications/LibreOffice.app/Contents/MacOS/soffice';

            abort_unless(
                file_exists($libreOffice),
                500,
                'LibreOffice не найден'
            );

            exec(
                escapeshellarg($libreOffice)
                . ' --headless'
                . ' --convert-to pdf'
                . ' --outdir ' . escapeshellarg($outputDir)
                . ' ' . escapeshellarg($filePath)
                . ' 2>&1',
                $output,
                $result
            );

            abort_unless(
                $result === 0 && file_exists($pdfPath),
                500,
                implode("\n", $output)
            );

            return response()->file($pdfPath, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline',
            ]);
        }

        abort(
            415,
            'Данный тип файла не поддерживается для просмотра'
        );
    }

    public function view2(Request $request)
{
    $file = UploadedFiles::findOrFail($request->id);

    $extension = strtolower(
        ltrim($file->file_extension ?? '', '.')
    );

    /*
    |--------------------------------------------------------------------------
    | File path
    |--------------------------------------------------------------------------
    */

    $fileLink = str_replace('\\', '', $file->file_link);

    $filePath = storage_path(
        'app/public/' . ltrim($fileLink, '/')
    );

    abort_unless(
        file_exists($filePath),
        404,
        'Файл не найден'
    );

    /*
    |--------------------------------------------------------------------------
    | PDF
    |--------------------------------------------------------------------------
    */

    if ($extension === 'pdf') {
        return response()->file($filePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Images
    |--------------------------------------------------------------------------
    */

    if (in_array($extension, [
        'png',
        'jpg',
        'jpeg',
        'webp',
        'gif',
    ])) {
        return response()->file($filePath, [
            'Content-Type' => mime_content_type($filePath),
            'Content-Disposition' => 'inline',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DOC / DOCX / PPT / PPTX
    |--------------------------------------------------------------------------
    */

    if (in_array($extension, [
        'doc',
        'docx',
        'ppt',
        'pptx',
    ])) {

        $outputDir = storage_path('app/public');

        /*
        |--------------------------------------------------------------------------
        | LibreOffice
        |--------------------------------------------------------------------------
        */

        $libreOffice =
            '/Applications/LibreOffice.app/Contents/MacOS/soffice';

        abort_unless(
            file_exists($libreOffice),
            500,
            'LibreOffice не найден'
        );

        /*
        |--------------------------------------------------------------------------
        | Expected PDF name
        |--------------------------------------------------------------------------
        */

        $baseName = pathinfo(
            $filePath,
            PATHINFO_FILENAME
        );

        $pdfPath = $outputDir . '/' . $baseName . '.pdf';

        /*
        |--------------------------------------------------------------------------
        | Convert
        |--------------------------------------------------------------------------
        */

        $command =
            escapeshellarg($libreOffice)
            . ' --headless'
            . ' --convert-to pdf'
            . ' --outdir '
            . escapeshellarg($outputDir)
            . ' '
            . escapeshellarg($filePath)
            . ' 2>&1';

        exec(
            $command,
            $output,
            $result
        );

        /*
        |--------------------------------------------------------------------------
        | Check conversion
        |--------------------------------------------------------------------------
        */

        if ($result !== 0 || !file_exists($pdfPath)) {
            return response()->json([
                'success' => false,
                'message' => 'Ошибка конвертации файла',
                'result' => $result,
                'output' => $output,
                'source' => $filePath,
                'pdf' => $pdfPath,
            ], 500);
        }

        /*
        |--------------------------------------------------------------------------
        | Return PDF
        |--------------------------------------------------------------------------
        */

        return response()->file($pdfPath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Unsupported
    |--------------------------------------------------------------------------
    */

    return response()->json([
        'success' => false,
        'message' => 'Данный тип файла не поддерживается',
        'extension' => $extension,
    ], 415);
}

    public function view(Request $request)
{
    $file = UploadedFiles::findOrFail($request->id);

    $extension = strtolower(
        ltrim($file->file_extension ?? '', '.')
    );

    /*
    |--------------------------------------------------------------------------
    | File path
    |--------------------------------------------------------------------------
    */

    $fileLink = str_replace('\\', '', $file->file_link);

    $filePath = storage_path(
        'app/public/' . ltrim($fileLink, '/')
    );

    abort_unless(
        file_exists($filePath),
        404,
        'Файл не найден'
    );

    /*
    |--------------------------------------------------------------------------
    | PDF — отдаём напрямую
    |--------------------------------------------------------------------------
    */

    if ($extension === 'pdf') {
        return response()->file($filePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline',
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Все остальные форматы → PDF
    |--------------------------------------------------------------------------
    */

    $outputDir = storage_path('app/public/viewer');

    if (!is_dir($outputDir)) {
        mkdir($outputDir, 0755, true);
    }

    /*
    |--------------------------------------------------------------------------
    | LibreOffice
    |--------------------------------------------------------------------------
    */

    $libreOffice =
        '/Applications/LibreOffice.app/Contents/MacOS/soffice';

    abort_unless(
        file_exists($libreOffice),
        500,
        'LibreOffice не найден'
    );

    /*
    |--------------------------------------------------------------------------
    | PDF filename
    |--------------------------------------------------------------------------
    */

    $baseName = pathinfo(
        $filePath,
        PATHINFO_FILENAME
    );

    $pdfName = $baseName . '.pdf';

    $pdfPath = $outputDir . '/' . $pdfName;

    /*
    |--------------------------------------------------------------------------
    | Если PDF уже существует — используем его
    |--------------------------------------------------------------------------
    */

    if (!file_exists($pdfPath)) {

        /*
        |--------------------------------------------------------------------------
        | Convert
        |--------------------------------------------------------------------------
        */

        $command =
            escapeshellarg($libreOffice)
            . ' --headless'
            . ' --convert-to pdf'
            . ' --outdir '
            . escapeshellarg($outputDir)
            . ' '
            . escapeshellarg($filePath)
            . ' 2>&1';

        exec(
            $command,
            $output,
            $result
        );

        /*
        |--------------------------------------------------------------------------
        | Check conversion
        |--------------------------------------------------------------------------
        */

        if ($result !== 0 || !file_exists($pdfPath)) {
            return response()->json([
                'success' => false,
                'message' => 'Ошибка конвертации файла',
                'result' => $result,
                'output' => $output,
                'source' => $filePath,
                'pdf' => $pdfPath,
            ], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Return PDF
    |--------------------------------------------------------------------------
    */

    return response()->file($pdfPath, [
        'Content-Type' => 'application/pdf',
        'Content-Disposition' => 'inline',
    ]);
}
 
}
