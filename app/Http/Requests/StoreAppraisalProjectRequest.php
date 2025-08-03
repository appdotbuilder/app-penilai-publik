<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAppraisalProjectRequest extends FormRequest
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
            'contract_id' => 'required|exists:contracts,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'property_type' => 'required|string|max:255',
            'property_address' => 'required|string',
            'estimated_value' => 'nullable|numeric|min:0',
            'target_completion' => 'required|date|after:today',
            'status' => 'in:assigned,survey_scheduled,survey_completed,appraisal_in_progress,review_pending,completed,cancelled',
            'lead_appraiser_id' => 'required|exists:users,id',
            'reviewer_id' => 'nullable|exists:users,id',
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
            'contract_id.required' => 'Kontrak wajib dipilih.',
            'contract_id.exists' => 'Kontrak tidak ditemukan.',
            'title.required' => 'Judul proyek wajib diisi.',
            'description.required' => 'Deskripsi proyek wajib diisi.',
            'property_type.required' => 'Tipe properti wajib diisi.',
            'property_address.required' => 'Alamat properti wajib diisi.',
            'target_completion.required' => 'Target penyelesaian wajib diisi.',
            'target_completion.after' => 'Target penyelesaian harus setelah hari ini.',
            'lead_appraiser_id.required' => 'Penilai utama wajib dipilih.',
            'lead_appraiser_id.exists' => 'Penilai utama tidak ditemukan.',
        ];
    }
}