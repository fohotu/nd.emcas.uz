<?php 
namespace App\Http\Controllers;

use App\Actions\Document\CreateDocumentAction;
use App\Actions\Document\UpdateDocumentAction;
use App\Actions\Document\DeleteDocumentAction;
use App\Services\DocumentService;
use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Document\StoreDocumentRequest;

class DocumentController extends Controller
{
    public function index(DocumentService $service)
    {
        return Inertia::render('Documents/Index', [
            'documents' => $service->getAllDocuments()
        ]);
    }

    public function store(StoreDocumentRequest $request, CreateDocumentAction $action)
    {
        
        $action->execute($request->validated());
        return redirect()->back()->with('message', 'Документ успешно создан!');
    }

    public function update(Request $request, Document $document, UpdateDocumentAction $action)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $action->execute($document, $validated);
        return redirect()->back();
    }

    public function edit(Document $document)
    {
        return Inertia::render('Documents/Edit', [
            'document' => $document
        ]);
    }

    public function destroy(Document $document, DeleteDocumentAction $action)
    {
        $action->execute($document);
        return redirect()->back();
    }
}

?>