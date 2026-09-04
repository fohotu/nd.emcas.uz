<?php

namespace App\Http\Requests\Document;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDocumentRequest extends FormRequest
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