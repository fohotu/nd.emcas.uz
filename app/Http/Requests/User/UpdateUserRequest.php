<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
            "name" => "required|string|max:255",
            "email" => [
                "required",
                "email",
                "max:255",
                Rule::unique('users', 'email')->ignore($this->user),
            ],
           //"email" => "required|email|max:255|unique:users,email",
         //  "password" => "required|string|min:6",
         //  "role" => "required|string|max:15|in:user,admin,manager",
        ];
    }
}
