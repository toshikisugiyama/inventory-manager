<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LogoutApiTest extends TestCase
{
    use RefreshDatabase;
    /**
     * create a test user.
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $this->user = factory(User::class)->create();
    }

    /**
     * logout authenticated user.
     *
     * @test
     */
    public function test()
    {
        $response = $this->actingAs($this->user)->postJson(route('logout'));
        $response->assertStatus(200);
        $this->assertGuest();
    }
}
