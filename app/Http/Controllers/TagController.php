<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tags;
use App\Models\DocumentTags;
use App\Http\Requests\Tag\RemoveTagRequest;
use App\Actions\Tag\RemoveTagAction;


class TagController extends Controller
{
    public function attach(Request $request)
    {
        $data = $request->validate([
            'document_id' => ['required', 'exists:documents,id'],
            'tag_id'      => ['required', 'array'],
            'tag_id.*'    => ['required', 'exists:tags,id'],
        ]);

        foreach ($data['tag_id'] as $tagId) {
            DocumentTags::firstOrCreate([
                'document_id' => $data['document_id'],
                'tag_id'      => $tagId,
            ], [
                'user_id' => auth()->id(),
            ]);
        }

        return response()->json([
            'success' => true,
        ]);
    }


   public function search(Request $request)
   {
        $search = $request->input('input', '');
        return Tags::query()
            ->where('name', 'like', "%{$search}%")
            ->where('user_id',auth()->id())
            ->orderBy('name')
            ->limit(20)
            ->get()
            ->map(fn ($tag) => [
                'value' => $tag->id,
                'label' => $tag->name,
            ]);
    }


    public function store(Request $request, Document $document)
    {

        $validated = $request->validate([
            'tag_ids' => ['required', 'array'],
            'tag_ids.*' => ['required', 'exists:tags,id'],
        ]);

        $document->tags()->syncWithoutDetaching(
            $validated['tag_ids']
        );

        return response()->json([
            'success' => true,
        ]);

    }

    public function remove(RemoveTagRequest $request,RemoveTagAction $action){
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $action->execute($data);

        return response()->json([
            'success' => true,
        ]);
    }

}
