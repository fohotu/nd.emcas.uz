<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentTags extends Model
{
    protected $fillable = [
        'user_id',
        'document_id',
        'tag_id',
    ];

    protected $table = 'document_tags';
}
