<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class tag_user extends Model{
    protected $table = 'tag_user';


    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
