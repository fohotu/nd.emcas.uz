<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CategoryService;
use App\Services\MenuService;
use App\Models\Category;
use App\Http\Requests\Category\CreateCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Requests\Category\BulkDeleteRequest;
use App\Actions\Category\CreateCategoryAction;
use App\Actions\Category\UpdateCategoryAction;
use App\Actions\Category\DeleteCategoryAction;
use App\Actions\Category\BulkDeleteAction;
use Inertia\Inertia;

class CategoryController extends Controller
{
    
    /**
     * Display a listing of the resource.
    */

    public function index(CategoryService $service,MenuService $menuService, Request $request)
    {    

        $query = $request->only(['title','description']);
        $category = $service->getAllCategory($query);
        $treeCategory = $service->treeView(); 
        $menu = $menuService->getAllMenu();

        return Inertia::render('Category/Index', [
            'category' => $category->withQueryString(),
            'query' => $query,
            'treeCategory' => $treeCategory,
            'menu' => $menu,
        ]);


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(CreateCategoryRequest $request, CreateCategoryAction $action)
    {
        $action->execute($request->validated());
        return redirect()->route('category.index')
            ->with('success', 'Category created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Category $category,UpdateCategoryRequest $request, UpdateCategoryAction $action)
    {
        $action->execute($category,$request->validated());
        return redirect()->back()->with('success', 'Category updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category, DeleteCategoryAction $action)
    {
        $action->execute($category); 
        return response()->json([
            'message' => 'Category deleted successfully'
        ]);
    }


    public function bulkDelete(BulkDeleteRequest $request, BulkDeleteAction $action)
    {
        $action->execute($request->validated());
        return redirect()->back()->with('success', 'Меню удалены.');
    }
}
