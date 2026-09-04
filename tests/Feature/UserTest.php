<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;


class UserTest extends TestCase
{
    
    use RefreshDatabase;
    
    public function test_example(): void
    {

        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_create_user(): void
    {
        $response = $this->post('/users', [
            'name' => 'Test CreateUserAdmin',
            'email' => 'test@createuser1.com',
            'password' => 'password',
            'role' => 'admin'
        ]);
        $response->assertStatus(201);
    }

        public function test_update_user(): void
        {
            $user = User::factory()->create();
            $response = $this->put("/users/{$user->id}", [
                'name' => 'Test UpdateUserAdmin',
                'email' => 'test12345@updateuser1.com',
            ]);
            
            $response->assertRedirect();
            
            $this->assertDatabaseHas('users', [
                'id' => $user->id,
                'name' => 'Test UpdateUserAdmin',
                'email' => 'test12345@updateuser1.com',
            ]);
        }

}