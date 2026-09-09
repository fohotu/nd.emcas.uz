<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TagController extends Controller
{
    public function attach(Request $request)
    {

    //dd($request->all());
        $data = $request->validate([
            'document_id' => ['required', 'exists:documents,id'],
            'tag_id'      => ['required', 'exists:tags,id'],
        ]);

        DocumentTag::create([
            'document_id' => $data['document_id'],
            'tag_id'      => $data['tag_id'],
            'user_id'     => auth()->id(),
        ]);

        return response()->json([
            'success' => true,
        ]);
    }
}
