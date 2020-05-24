<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;
use App\Materials;

class MaterialApiTest extends TestCase
{
    use RefreshDatabase;
    /**
     * create test materials.
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $this->user = factory(User::class)->create();
    }

    /**
     * check material index.
     */
    public function testMaterialIndex()
    {
        factory(Materials::class, 5)->create();
        $response = $this->getJson(route('materials.index'));
        $materials = Materials::get();
        $response
            ->assertOk()
            ->assertJsonCount(5, 'data');
    }

    /**
     * check material store.
     *
     * @return void
     */
    public function testMaterialStore()
    {
        $response = $this
            ->actingAs($this->user)
            ->postJson(route('materials.store'), factory(Materials::class)->make()->toArray());
        $response
            ->assertStatus(201)
            ->assertJsonFragment([
                'id' => 1
            ]);
    }

    /**
     * check material show.
     *
     * @return void
     */
    public function testMaterialShow()
    {
        factory(Materials::class)->create();
        $response = $this->getJson(route('materials.show', ['material' => 1]));
        $response
            ->assertOk()
            ->assertJsonStructure([
                'id', 'name', 'supplier', 'unit', 'created_at', 'updated_at',
            ])
            ->assertJsonFragment([
                'id' => 1,
            ]);
    }

    /**
     * check material update.
     * @return void
     */
    public function testMaterialUpdate()
    {
        factory(Materials::class)->create();
        $old_data = Materials::first()->toArray();
        $response = $this->putJson(route('materials.update', ['material' => 1]), [
            'name' => 'updated name',
            'supplier' => 'updated supplier',
            'unit' => 'updated unit',
        ]);
        $response
            ->assertOk()
            ->assertJsonStructure([
                'id', 'name', 'supplier', 'unit', 'created_at', 'updated_at',
            ])
            ->assertJsonMissingExact($old_data)
            ->assertJsonFragment([
                'id' => 1,
                'name' => 'updated name',
            ]);
    }

    /**
     * check material destroy.
     * @return void
     */
    public function testMaterialDestroy()
    {
        factory(Materials::class)->create();
        $response = $this->deleteJson(route('materials.destroy', ['material' => 1]));
        $response
            ->assertOk()
            ->assertJsonMissing([
                'id' => 1,
            ]);
    }
}
