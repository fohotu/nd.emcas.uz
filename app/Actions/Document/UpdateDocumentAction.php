<?php

namespace App\Actions\Document;

use App\Models\Document;

class UpdateDocumentAction
{
    public function execute(Document $document, array $data): bool
    {
        return $document->update([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
        ]);
    }
}