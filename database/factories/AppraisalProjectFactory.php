<?php

namespace Database\Factories;

use App\Models\Contract;
use App\Models\User;
use App\Services\NumberGeneratorService;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AppraisalProject>
 */
class AppraisalProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $propertyTypes = [
            'Rumah Tinggal',
            'Apartemen',
            'Ruko',
            'Gedung Perkantoran',
            'Pabrik',
            'Tanah Kosong',
            'Mall/Pusat Perbelanjaan',
            'Hotel',
            'Gudang'
        ];

        return [
            'project_number' => NumberGeneratorService::generateProjectNumber(),
            'contract_id' => Contract::factory(),
            'title' => 'Proyek Penilaian ' . fake()->randomElement($propertyTypes) . ' ' . fake('id_ID')->city(),
            'description' => fake('id_ID')->paragraphs(2, true),
            'property_type' => fake()->randomElement($propertyTypes),
            'property_address' => fake('id_ID')->address(),
            'estimated_value' => fake()->numberBetween(500000000, 10000000000),
            'target_completion' => fake()->dateTimeBetween('now', '+3 months'),
            'status' => fake()->randomElement([
                'assigned',
                'survey_scheduled',
                'survey_completed',
                'appraisal_in_progress',
                'review_pending',
                'completed',
                'cancelled'
            ]),
            'lead_appraiser_id' => User::factory()->state(['role' => 'penilai']),
            'reviewer_id' => User::factory()->state(['role' => 'reviewer']),
            'notes' => fake()->optional()->text(200),
        ];
    }



    /**
     * Indicate that the project is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => fake()->randomElement(['assigned', 'survey_scheduled', 'survey_completed', 'appraisal_in_progress']),
        ]);
    }
}