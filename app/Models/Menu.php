<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
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
        return $this->hasMany(Menu::class, 'parent_id');
    }


    public function childrenRecursive()
    {
        return $this->children()->with('childrenRecursive');
    }
}
