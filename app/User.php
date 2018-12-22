<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Nicolaslopezj\Searchable\SearchableTrait;
class User extends Authenticatable
{
    use SearchableTrait;
    use Notifiable;
    protected $searchable = [
        'columns' => [
            'name' => 1,
            'email' => 2,

        ]
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
    public function advertpublishers()
    {
        return $this->belongsToMany(Advertpublisher::class);
    }
    public function advertpublisher_tag()
    {
        return $this->hasMany(advertpublisher_tag::class);
    }

}
