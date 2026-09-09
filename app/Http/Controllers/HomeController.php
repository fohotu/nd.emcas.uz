<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\DocumentService;
use App\Services\CategoryService;
use App\Services\MenuService;
use App\Models\Document;
use App\Models\Menu;


class HomeController extends Controller
{

    public function index1(){
       return Inertia::render('Home/Index');
    }

    public function index(DocumentService $service,CategoryService $categoryService,MenuService $menuService, Request $request)
    {

        $query = $request->only(['number','title','date','category_id','menu_id','status','description','number_d','title_d','date_d','date_i','start','end']);
        $filter['categories'] = $categoryService->getAllCategory();
        $filter['menus'] = $menuService->treeView();
        $favoriteIds = $request->user()
        ->favorites()
        ->pluck('document_id');
        //dd($filter['menus']);

        return Inertia::render('Home/Index',[
            'documents' => $service->getAllDocuments($query),
            'favoriteIds' => $favoriteIds,
            'filter' => $filter,
            'query' => $query,
        ]);


    }

}

?>