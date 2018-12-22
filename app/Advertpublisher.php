<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;
class Advertpublisher extends Model
{
    use SearchableTrait;
   protected $fillable = ['details'];
   protected $searchable = [
       'columns' => [
           'details' => 1
       ]
   ];
   public function tags()
   {
       return $this->belongsToMany(Tag::class);
   }
    public function adverts()
    {
        return $this->hasMany(Advert::class);
    }
}
