<?php 
namespace App\Actions\Document;

use App\Models\Document;

class CreateDocumentAction
{
    public function execute(array $data): Document
    {
        // Здесь можно добавить проверку прав или специфическую логику
        return Document::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
        ]);
    }
}
?>