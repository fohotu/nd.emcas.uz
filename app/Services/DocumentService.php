<?php 
namespace App\Services;

use App\Models\Document;
use Illuminate\Pagination\LengthAwarePaginator;

class DocumentService
{
    public function getAllDocuments(int $perPage = 10): LengthAwarePaginator
    {
        return Document::query()
            ->latest()
            ->paginate($perPage);
    }

    public function getDocumentById(int $id): Document
    {
        return Document::findOrFail($id);
    }
}
?>