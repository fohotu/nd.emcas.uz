<?php

namespace App\Http\Requests\Document;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentRequest extends FormRequest
{
    /**
     * Разрешить ли пользователю выполнять этот запрос.
     */
    public function authorize(): bool
    {
        // Здесь можно проверить права (например, есть ли у юзера роль админа)
        return true; 
    }

    /**
     * Правила валидации.
    */

    /*
    
            $table->id();
            $table->text('title')->nullable();
            $table->string('number', 50)->nullable();
            $table->timestamp('reg_date')->nullable();
            $table->foreignId('category_id')
                ->nullable()
                ->constrained('categories')
                ->nullOnDelete();
            $table->foreignId('version_for')
                ->nullable()
                ->constrained('documents')
                ->nullOnDelete();
            $table->string('status', 15)->default('formation');
            $table->string('type', 32)->default('uz');
            $table->timestamp('added')->nullable();
            $table->timestamp('system_date')->nullable();
            $table->text('description')->nullable();
            $table->boolean('let_comment')->default(true);
            $table->string('language', 10)->default('uz');
            $table->string('doc_date', 15)->nullable();
            $table->timestamp('document_date')->nullable();
            $table->timestamps();
    
    */

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'number' => ['required', 'string', 'max:255'],
            'menu_id'=> ['nullable'],
            'category_id'=> ['nullable'],
            'version_for'=> ['nullable'],
            'status'=> ['nullable'],
            'description' => ['nullable', 'string', 'max:1000'],
            'language' => ['required', 'string', 'max:10'],
            'document_date'=> ['nullable'],
            'files' => ['nullable'],
        ];
    }

    /**
     * Кастомные сообщения об ошибках (опционально).
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Заголовок обязателен для заполнения.',
           // 'title.min' => 'Заголовок должен быть не короче 3 символов.',
        ];
    }
}