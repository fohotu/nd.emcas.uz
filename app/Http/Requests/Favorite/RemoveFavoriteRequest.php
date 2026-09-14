<?php

namespace App\Http\Requests\Favorite;

use Illuminate\Foundation\Http\FormRequest;

class RemoveFavoriteRequest extends FormRequest
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
           'document_id' => ['required', 'exists:documents,id'],
        ];
    }

    /**
     * Кастомные сообщения об ошибках (опционально).
     */
    public function messages(): array
    {
        return [
            'document_id.required' => 'ID документа обязателен для заполнения.',
            'document_id.exists' => 'Документ с указанным ID не существует.',
        ];
    }
}