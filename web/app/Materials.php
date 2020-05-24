<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Materials extends Model
{
    /**
     * The attributes that aren't mass assignable.
     * @var array
     */
    protected $guarded = [];

    /**
     * Get the user that owns the material.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
