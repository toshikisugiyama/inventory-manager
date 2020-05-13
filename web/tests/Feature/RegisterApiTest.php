<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;

class RegisterApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * create a new user and check if it is returned.
     *
     * @test
     */
    public function testCreateNewUserAndReturnIt()
    {
         $data = [
             'name' => 'testuser',
             'email' => 'test@example.com',
             'password' => 'p@ssw0rd',
             'password_confirmation' => 'p@ssw0rd',
         ];
         $response = $this->json('POST', route('register'), $data);
         $user = User::first();
         $this->assertEquals($data['name'], $user->name);
         $response
            ->assertStatus(201)
            ->assertJson(['name' => $user->name]);
    }
}
