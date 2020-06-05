<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Materials;
use App\Inventory;

class InventoryApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * check inventory index.
     *
     * @return void
     */
    public function testInventoryIndexReturnInventoryData(): void
    {
        factory(Materials::class, 9)->create();
        factory(Inventory::class, 3)->create();
        $response = $this->getJson(route('inventories.index'));
        $response
            ->assertOk()
            ->assertJsonCount(3)
            ->assertJsonStructure([
                '*' => [
                    'id', 'lot_code', 'material_id', 'amount', 'dead_line', 'created_at', 'updated_at',
                ],
            ]);
    }

    /**
     * check inventory index if it's no material.
     *
     * @return void
     */
    public function testInventoryIndexReturnEmptyDataArray(): void
    {
        $response = $this->getJson(route('inventories.index'));
        $response
            ->assertOk()
            ->assertJsonCount(0)
            ->assertJsonStructure([]);
    }

    /**
     * check inventory store.
     *
     * @return void
     */
    public function testInventoryStore(): void
    {
        factory(Materials::class, 9)->create();
        factory(Inventory::class, 10)->create();
        $data = [
            'lot_code' => 'aaa',
            'material_id' => '1',
            'amount' => '1',
            'dead_line' => date('Y-m-d'),
        ];
        $response = $this->postJson(route('inventories.store'), $data);
        $response
            ->assertCreated()
            ->assertJsonFragment($data)
            ->assertJsonStructure([
                '*' => [
                    'id', 'lot_code', 'material_id', 'amount', 'dead_line', 'created_at', 'updated_at',
                ]
            ]);
    }

    /**
     * check inventory show.
     *
     * @return void
     */
    public function testInventoryShow()
    {
        $test_data = 3;
        $idShowed = 2;
        factory(Materials::class, 9)->create();
        factory(Inventory::class, $test_data)->create();
        $response = $this->getJson(route('inventories.show', ['inventory' => $idShowed]));
        $response
            ->assertOk()
            ->assertJsonCount(7)
            ->assertJsonFragment([
                'id' => $idShowed,
            ])
            ->assertJsonStructure([
                'id', 'lot_code', 'material_id', 'amount', 'dead_line', 'created_at', 'updated_at',
            ]);
    }

    /**
     * check inventory update.
     *
     * @return void
     */
    public function testInventoryUpdate()
    {
        $test_data = 3;
        $idChanged = 2;
        factory(Materials::class, 9)->create();
        factory(Inventory::class, $test_data)->create();
        $old_data = Inventory::find($idChanged)->toArray();
        $data = [
            'lot_code' => 'updated',
            'amount' => '1',
            'dead_line' => date('Y-m-d'),
        ];
        $response = $this->putJson(route('inventories.update', ['inventory' => $idChanged]), $data);
        $response
            ->assertOk()
            ->assertJsonCount($test_data)
            ->assertJsonMissingExact($old_data)
            ->assertJsonFragment(array_merge(['id' => 2], $data))
            ->assertJsonStructure([
                '*' => [
                    'id', 'lot_code', 'material_id', 'amount', 'dead_line', 'created_at', 'updated_at',
                ]
            ]);
    }

    /**
     * check inventory destroy.
     */
    public function testInventoryDestroy()
    {
        $test_data = 3;
        factory(Materials::class, 9)->create();
        factory(Inventory::class, $test_data)->create();
        $response = $this->deleteJson(route('inventories.destroy', ['inventory' => 2]))->dump();
        $response
            ->assertOk()
            ->assertJsonCount($test_data-1)
            ->assertJsonMissingExact(['id' => 2])
            ->assertJsonFragment(['id' => 1])
            ->assertJsonStructure([
                '*' => [
                    'id', 'lot_code', 'material_id', 'amount', 'dead_line', 'created_at', 'updated_at',
                ]
            ]);
    }
}
