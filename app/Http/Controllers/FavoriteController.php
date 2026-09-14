<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Actions\Favorite\CreateFavoriteAction;
use App\Actions\Favorite\RemoveFavoriteAction;
use App\Services\DocumentService;
use App\Models\Document;
use App\Http\Requests\Favorite\StoreFavoriteRequest;
use App\Http\Requests\Favorite\RemoveFavoriteRequest;
use Inertia\Inertia;

class FavoriteController extends Controller
{

    public function store(StoreFavoriteRequest $request, CreateFavoriteAction $action)
    {   

        $data = $request->validated();
        $data['user_id'] = auth()->id(); // Добавляем ID текущего пользователя
        $favorite = $action->execute($data);
        return response()->json([
            'success' => true,
            'favorite' => $favorite,
        ]);

    }

    public function store1(Request $request)
    {

        $request->validate([
            'document_id' => ['required', 'exists:documents,id'],
        ]);

        $favorite = Favorite::create([
            'user_id' => auth()->id(),
            'document_id' => $request->document_id,
        ]);

        return response()->json([
            'success' => true,
            'favorite' => $favorite,
        ]);

    }

    public function index(Request $request,DocumentService $service)
    {
        $query = $request->only(['number','title','date','category_id','menu_id','status']);
        $favorites = $request->user()->favorites()->pluck('document_id');
        $documents = $service->getFavorites($favorites,$query);
        
       
       return Inertia::render('Favorites/Index',[
        'documents'=>$documents
        ]);
    }

    public function remove(RemoveFavoriteRequest $request, RemoveFavoriteAction $action)
    {   

        $data = $request->validated();
        $data['user_id'] = $request->user()->id; // Добавляем ID текущего пользователя
        $result = $action->execute($data);
        return response()->json([
            'success' => $result,
        ]);

    }

}
