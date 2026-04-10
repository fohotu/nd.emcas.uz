<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menus extends Model
{
    
    protected $fillable = [
        'title',
        'description',
        'parent_id',
        'order',
        'route',
        'sys_name',
        'url',
    ];  
    protected $table = 'menus';

    public function children()
    {
        return $this->hasMany(Menus::class, 'parent_id');
    }


    public function childrenRecursive()
    {
        return $this->children()->with('childrenRecursive');
    }
}
