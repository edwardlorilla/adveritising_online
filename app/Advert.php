<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;
class Advert extends Model
{
    use SearchableTrait;
    protected $fillable = ['advertpublisher_id', 'details'];
    protected $searchable = [
        'columns' => [
            'adverts.details' => 1,
            'advertpublishers.details' => 2
        ],
        'joins' =>[
            'advertpublishers' => ['adverts.advertpublisher_id', 'advertpublishers.id']
        ]
    ];
    public function advertpublisher()
    {
        return $this->belongsTo(Advertpublisher::class);
    }
}
