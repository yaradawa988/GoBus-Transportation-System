<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
    public function rules()
    {
        return [
            'name' => [
                'required',
                'string',
                'min:3',
                'max:50',
                'regex:/^[A-Za-z\s]+$/'
            ],

            'email' => [
                'required',
                'email:rfc,dns',
                'unique:users,email'
            ],

            'phone' => [
                'required',
                'regex:/^09\d{8}$/'
            ],

            'password' => [
                'required',
                'confirmed',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*#?&]/'
            ],
        ];
    }

    public function messages()
    {
        return [

            'name.required' => 'Full name is required.',
            'name.min' => 'Name must be at least 3 characters.',
            'name.regex' => 'Name must contain letters only.',

            'email.required' => 'Email is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'This email is already registered.',

            'phone.required' => 'Phone number is required.',
            'phone.regex' => 'Phone must be a valid Syrian mobile number.',

            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.confirmed' => 'Passwords do not match.',
            'password.regex' => 'Password must contain uppercase, lowercase, number and special character.',
        ];
    }
}
