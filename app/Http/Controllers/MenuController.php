<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\MenuService;
use App\Actions\Menu\CreateMenuAction;
use App\Actions\Menu\BulkDeleteAction;
use App\Http\Requests\Menu\CreateMenuRequest;
use App\Http\Requests\Menu\BulkDeleteRequest;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(MenuService $service, Request $request)
    {    

        $query = $request->only(['title','description']);
        $menu = $service->getAllMenu($query);

        return Inertia::render('Menu/Index', [
            'menu' => $menu->withQueryString(),
            'query' => $query
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

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function bulkDelete(BulkDeleteRequest $request, BulkDeleteAction $action)
    {
        $action->execute($request->validated());
        return redirect()->back()->with('success', 'Меню удалены.');
    }
}
