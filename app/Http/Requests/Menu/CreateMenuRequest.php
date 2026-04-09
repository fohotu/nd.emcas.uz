<?php

namespace App\Http\Requests\Menu;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateMenuRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'sys_name' => ['nullable', 'string', 'max:255'],
            'parent_id' => ['nullable', 'exists:menus,id'],
            'order' => ['nullable', 'integer', 'min:0'],
            'route' => ['nullable', 'string', 'max:255'],
        ];
    }
}
