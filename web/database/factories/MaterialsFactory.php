<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Materials;
use Faker\Generator as Faker;

$factory->define(Materials::class, function (Faker $faker) {
    $faker->addProvider(new \FakerRestaurant\Provider\en_US\Restaurant($faker));
    return [
        'name' => $faker->foodName(),
        'supplier' => $faker->company,
        'unit' => 'kg',
    ];
});
