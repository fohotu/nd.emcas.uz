<?php 
namespace App\Http\Controllers;

use App\Actions\Document\CreateDocumentAction;
use App\Actions\Document\UpdateDocumentAction;
use App\Actions\Document\DeleteDocumentAction;
use App\Actions\Document\BulkDeleteAction;
use App\Services\DocumentService;
use App\Services\CategoryService;
use App\Services\MenuService;
use App\Models\Document;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Document\StoreDocumentRequest;
use App\Http\Requests\Document\UpdateDocumentRequest;
use App\Http\Requests\Document\BulkDeleteRequest;

class DocumentController extends Controller
{
    public function index(DocumentService $service,CategoryService $categoryService,MenuService $menuService, Request $request)
    {

        $query = $request->only(['number','title','date','category_id','menu_id','status']);
        $filter['categories'] = $categoryService->getAllCategory();
        $filter['menus'] = $menuService->getAllMenu();

        return Inertia::render('Documents/Index', [
            'documents' => $service->getAllDocuments($query),
            'filter' => $filter,
            'query' => $query,
        ]);

    }

    public function store(StoreDocumentRequest $request, CreateDocumentAction $action)
    {
        $action->execute($request->validated());
        return redirect()->back()->with('message', 'Документ успешно создан!');
    }

    public function update(UpdateDocumentRequest $request, Document $document, UpdateDocumentAction $action)
    {        
        $action->execute($document, $request->validated());
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


    public function liveSearch(Request $request)
    {
        
        $result = [];
        if(isset($request->q)){
            $q = $request->q;
            $result = Document::where('title','like','%'.$q.'%')
            ->orWhere('number','like','%'.$q.'%')      
            ->limit(10)
            ->get();   
        }
        return $result;

    }


    public function bulkDelete(BulkDeleteRequest $request, BulkDeleteAction $action)
    {
        $action->execute($request->validated());
        return redirect()->back()->with('success', 'Документы удалены.');
    }


    public function view(CategoryService $service,DocumentService $documentService,$id,$category_id = null) {
        $category = $service->getCategoryByMenu($id);
        $menu = Menu::findOrFail($id);
        if($category_id){
            $documents = $documentService->getDocumentByCategory($category_id);
        }else{
            $documents = $documentService->getDocumentByMenu($id);
        }

        return Inertia::render('Documents/View', [
            'category' => $category,
            'menu_item' => $menu,
            'selectedCategoryId' => $category_id,
            'documents' => $documents,
        ]);
    }



    public function show(Document $document)
    {
        $document->load([
            'files',
            'category',
            'menu',
        ]);
        return Inertia::render('Documents/Show', [
            'document' => $document
        ]);
    }
}

?>