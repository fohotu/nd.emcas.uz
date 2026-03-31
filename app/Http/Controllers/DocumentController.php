<?php 
namespace App\Http\Controllers;

use App\Actions\CreateDocumentAction;
use App\Services\DocumentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index(DocumentService $service)
    {
        return Inertia::render('Documents/Index', [
            'documents' => $service->getAllDocuments()
        ]);
    }

    public function store(Request $request, CreateDocumentAction $action)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $action->execute($validated);

        return redirect()->back()->with('message', 'Документ успешно создан!');
    }
}

?>