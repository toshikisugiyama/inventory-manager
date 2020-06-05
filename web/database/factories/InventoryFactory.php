<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Inventory;
use Faker\Generator as Faker;

$factory->define(Inventory::class, function (Faker $faker) {
    return [
        'lot_code' => $faker->word,
        'material_id' => $faker->randomDigitNot(0),
        'amount' => $faker->numberBetween($min = 0, $max = 9999),
        'dead_line' => $faker->dateTime(),
    ];
});
