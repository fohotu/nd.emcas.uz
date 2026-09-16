<?php

namespace App\Http\Requests\Tag;

use Illuminate\Foundation\Http\FormRequest;

class CreateTagRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
        ];
    }

    /**
     * Кастомные сообщения об ошибках (опционально).
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Заголовок обязателен для заполнения.',
            'name.max' => 'Заголовок должен быть не боле 255 символов.',
        ];
    }
}