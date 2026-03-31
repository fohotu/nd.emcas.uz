<?php

namespace Tests\Feature;

use App\Models\Document;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DocumentTest extends TestCase
{
    use RefreshDatabase; // Очищает базу перед каждым тестом

    /** @test */
    public function test_user_can_create_a_document()
    {
        // 1. Создаем пользователя и авторизуем его
        $user = User::factory()->create();
        $this->actingAs($user);

        // 2. Отправляем запрос на создание документа
        $response = $this->post(route('documents.store'), [
            'title' => 'Test Document',
            'description' => 'Test Description',
        ]);

        // 3. Проверяем, что в базе появилась запись
        $this->assertDatabaseHas('documents', [
            'title' => 'Test Document'
        ]);

        // 4. Проверяем редирект назад
        $response->assertStatus(302);
    }

    /** @test */
    public function test_user_can_delete_a_document()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        // Создаем документ в базе
        $document = Document::factory()->create();

        // Удаляем его через маршрут
        $response = $this->delete(route('documents.destroy', $document->id));

        // Проверяем, что записи больше нет
        $this->assertDatabaseMissing('documents', ['id' => $document->id]);
        $response->assertStatus(302);
    }
}