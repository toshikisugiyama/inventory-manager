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
            ->assertJsonCount(5, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id', 'name', 'supplier', 'unit', 'created_at', 'updated_at',
                    ],
                ],
            ]);
    }

    /**
     * check material index if it's no material.
     */
    public function testMaterialIndexReturnEmptyDataArray()
    {
        $response = $this->getJson(route('materials.index'));
        $response
            ->assertOk()
            ->assertJsonCount(0, 'data')
            ->assertJsonStructure([
                'data' => [],
            ]);
    }

    /**
     * check material store.
     *
     * @return void
     */
    public function testMaterialStore()
    {
        factory(Materials::class, 10)->create();
        $data = [
            'name' => 'created test name',
            'supplier' => 'created test supplier',
            'unit' => 'kg',
        ];
        $response = $this->postJson(route('materials.store'), $data);
        $response
            ->assertCreated()
            ->assertJsonFragment($data)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'name', 'supplier', 'unit', 'created_at', 'updated_at', 'id',
                    ],
                ],
            ]);
    }

    /**
     * check material show.
     *
     * @return void
     */
    public function testMaterialShow()
    {
        $test_data = 3;
        $idShowed = 2;
        factory(Materials::class, $test_data)->create();
        $response = $this->getJson(route('materials.show', ['material' => $idShowed]))->dump();
        $response
            ->assertOk()
            ->assertJsonCount(6)
            ->assertJsonFragment([
                'id' => $idShowed,
            ])
            ->assertJsonStructure([
                'id', 'name', 'supplier', 'unit', 'created_at', 'updated_at',
            ]);
    }

    /**
     * check material update.
     * @return void
     */
    public function testMaterialUpdate()
    {
        $test_data = 3;
        $idChanged = 2;
        factory(Materials::class, $test_data)->create();
        $old_data = Materials::find($idChanged)->toArray();
        $data = [
            'name' => 'updated name',
            'supplier' => 'updated supplier',
            'unit' => 'updated unit',
        ];
        $response = $this->putJson(route('materials.update', ['material' => $idChanged]), $data);
        $response
            ->assertOk()
            ->assertJsonCount($test_data, 'data')
            ->assertJsonMissingExact($old_data)
            ->assertJsonFragment(array_merge(['id' => 2], $data))
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id', 'name', 'supplier', 'unit', 'created_at', 'updated_at',
                    ],
                ],
            ]);
    }

    /**
     * check material destroy.
     * @return void
     */
    public function testMaterialDestroy()
    {
        $test_data = 3;
        factory(Materials::class, $test_data)->create();
        $response = $this->deleteJson(route('materials.destroy', ['material' => 2]));
        $response
            ->assertOk()
            ->assertJsonCount($test_data-1, 'data')
            ->assertJsonMissingExact(['id' => 2])
            ->assertJsonFragment(['id' => 1])
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id', 'name', 'supplier', 'unit', 'created_at', 'updated_at',
                    ]
                ]
            ]
        );
    }
}
