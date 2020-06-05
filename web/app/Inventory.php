<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Inventory extends Model
{
    /**
     * The attributes that aren't mass assignable.
     * @var array
     */
    protected $guarded = [];

    /**
     * Get the material that owns the inventory.
     */
    public function material()
    {
        return $this->belongsTo('App\Material');
    }
}
