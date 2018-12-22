<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;
class Tag extends Model
{
    use SearchableTrait;
    protected $fillable = ['description'];
    protected $searchable = [
        'columns' => [
            'description' => 1
        ]
    ];
    public function advertpublishers()
    {
        return $this->belongsToMany(Advertpublisher::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function advertpublisher_tag()
    {
        return $this->hasMany(advertpublisher_tag::class);
    }
   /* public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }*/
}
