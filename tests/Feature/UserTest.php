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
}