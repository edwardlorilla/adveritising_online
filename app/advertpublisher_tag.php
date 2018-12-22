<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class advertpublisher_tag extends Model
{
    protected $table = "advertpublisher_tag";
    use SearchableTrait;

    protected $searchable = [
        'columns' => [
            'advertpublishers.details' => 2,
            'tags.description' => 3,
        ],
        'joins' => [
            'advertpublishers' => ['advertpublisher_tag.advertpublisher_id', 'advertpublishers.id'],
            'tags' => ['advertpublisher_tag.tag_id', 'tags.id'],
        ]
    ];

    public function advertpublisher()
    {
        return $this->belongsTo(Advert::class);
    }
    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }
}
