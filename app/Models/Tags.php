<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    //
    protected $table = 'tags';

    protected $fillable = [
        'name',
        'user_id'
    ];  

    public function documents()
    {
        return $this->belongsToMany(
            Document::class,
            'document_tags',
            'tag_id',
            'document_id'
        );
    }
}
