<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Actions\Favorite\CreateFavoriteAction;
use App\Http\Requests\Favorite\StoreFavoriteRequest;

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
}
