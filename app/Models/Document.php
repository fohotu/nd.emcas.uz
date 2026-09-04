<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Document extends Model
{
    
    use HasFactory, Notifiable;
    protected $guarded = []; 


    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'menu_id');
    }

    public function files()
    {
        return $this->hasMany(UploadedFiles::class,'object_id','id');
    }


    // Родитель
    public function versions()
    {
        return $this->belongsTo(Document::class, 'version_for');
    }

    /*    

        // Родитель
        public function parent()
        {
            return $this->belongsTo(Category::class, 'parent_id');
        }

        // Дочерние элементы
        public function children()
        {
            return $this->hasMany(Category::class, 'parent_id');
        }
    
        
    */

    
}
