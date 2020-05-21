<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserApiTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Create a test user.
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $this->user = factory(User::class)->create();
    }

    /**
     * Return a logged in user.
     *
     * @test
     */
    public function testReturnLoggedInUser()
    {
        $response = $this->actingAs($this->user)->getJson(route('user'));
        $response
            ->assertStatus(200)
            ->assertJson([
               'name' => $this->user->name,
            ]);
    }

    /**
     * Return null if nobody logged in.
     *
     * @test
     */
    public function testReturnNull()
    {
        $response = $this->json('GET', route('user'));
        $response->assertStatus(200);
        $this->assertEquals('', $response->content());
    }
}
