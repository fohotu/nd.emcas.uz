<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    
    public function forum()
    {
        return $this->belongsTo(Forum::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function answerFor()
    {
        return $this->belongsTo(Message::class, 'parent_message_id');
    }

    public function answers()
    {
        return $this->hasMany(Message::class, 'parent_message_id');
    }

}
