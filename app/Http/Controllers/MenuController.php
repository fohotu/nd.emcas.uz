<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\MenuService;
use App\Models\Menu;
use App\Actions\Menu\CreateMenuAction;
use App\Actions\Menu\UpdateMenuAction;
use App\Actions\Menu\DeleteMenuAction;
use App\Actions\Menu\BulkDeleteAction;
use App\Http\Requests\Menu\CreateMenuRequest;
use App\Http\Requests\Menu\BulkDeleteRequest;
use App\Http\Requests\Menu\UpdateMenuRequest;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(MenuService $service, Request $request)
    {    

        $query = $request->only(['title','description']);
        $menu = $service->getAllMenu($query);
        
        /*
        $treeMenu = Menu::with('childrenRecursive')
        ->whereNull('parent_id')
        ->orWhere('parent_id',0)
        ->get();
        */

        $treeMenu = $service->treeView();

        return Inertia::render('Menu/Index', [
            'menu' => $menu->withQueryString(),
            'query' => $query,
            'treeMenu' => $treeMenu,
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
    public function store(CreateMenuRequest $request, CreateMenuAction $action)
    {
       
        $action->execute($request->validated());
        return redirect()->route('menu.index')
            ->with('success', 'Menu created successfully');

         
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



    public function update(Menu $menu,UpdateMenuRequest $request, UpdateMenuAction $action)
    {
        $action->execute($menu,$request->validated());
        return redirect()->back()->with('success', 'Menu updated');
    }


    public function destroy(Menu $menu, DeleteMenuAction $action)
    {
        $action->execute($menu); 
        return response()->json([
            'message' => 'Menu deleted successfully'
        ]);
    }

    public function bulkDelete(BulkDeleteRequest $request, BulkDeleteAction $action)
    {
        $action->execute($request->validated());
        return redirect()->back()->with('success', 'Меню удалены.');
    }
}
