<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
    
    public function messages()
    {
        return $this->hasMany(Message::class);
    }


}
