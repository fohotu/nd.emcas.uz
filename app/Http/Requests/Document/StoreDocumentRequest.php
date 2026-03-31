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
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255', 'min:3'],
            'description' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Кастомные сообщения об ошибках (опционально).
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Заголовок обязателен для заполнения.',
            'title.min' => 'Заголовок должен быть не короче 3 символов.',
        ];
    }
}