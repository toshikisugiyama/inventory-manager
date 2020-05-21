<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginApiTest extends TestCase
{
    use RefreshDatabase;
    /**
     * create a test user
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $this->user = factory(User::class)->create();
    }

    /**
     * authenticate registered user and return it.
     *
     * @test
     */
    public function testAuthenticateRegisteredUserAndReturnIt()
    {
        $data = [
            'email' => $this->user->email,
            'password' => 'password',
        ];
        $response = $this->postJson(route('login'), $data);
        $response
            ->assertStatus(200)
            ->assertJson(['name' => $this->user->name]);
        $this->assertAuthenticatedAs($this->user);
    }
}
