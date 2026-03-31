<?php

namespace App\Actions\Document;

use App\Models\Document;

class DeleteDocumentAction
{
    public function execute(Document $document): bool
    {
        return $document->delete();
    }
}