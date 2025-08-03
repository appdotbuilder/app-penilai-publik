<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProposalRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_id' => 'required|exists:clients,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'property_type' => 'required|string|max:255',
            'property_address' => 'required|string',
            'estimated_value' => 'nullable|numeric|min:0',
            'proposed_fee' => 'required|numeric|min:0',
            'submission_date' => 'required|date',
            'deadline_date' => 'required|date|after:submission_date',
            'status' => 'in:draft,submitted,approved,rejected,expired',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'client_id.required' => 'Klien wajib dipilih.',
            'client_id.exists' => 'Klien tidak ditemukan.',
            'title.required' => 'Judul proposal wajib diisi.',
            'description.required' => 'Deskripsi proposal wajib diisi.',
            'property_type.required' => 'Tipe properti wajib diisi.',
            'property_address.required' => 'Alamat properti wajib diisi.',
            'proposed_fee.required' => 'Biaya proposal wajib diisi.',
            'proposed_fee.numeric' => 'Biaya proposal harus berupa angka.',
            'submission_date.required' => 'Tanggal pengajuan wajib diisi.',
            'deadline_date.required' => 'Tanggal deadline wajib diisi.',
            'deadline_date.after' => 'Tanggal deadline harus setelah tanggal pengajuan.',
        ];
    }
}