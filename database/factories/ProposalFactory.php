<?php

namespace Database\Factories;

use App\Models\Client;
use App\Services\NumberGeneratorService;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proposal>
 */
class ProposalFactory extends Factory
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
            'Gudang',
            'Tanah Pertanian'
        ];

        $submissionDate = fake()->dateTimeBetween('-3 months', 'now');
        $deadlineDate = fake()->dateTimeBetween($submissionDate, '+2 months');

        return [
            'proposal_number' => NumberGeneratorService::generateProposalNumber(),
            'client_id' => Client::factory(),
            'title' => 'Penilaian ' . fake()->randomElement($propertyTypes) . ' di ' . fake('id_ID')->city(),
            'description' => fake('id_ID')->paragraphs(3, true),
            'property_type' => fake()->randomElement($propertyTypes),
            'property_address' => fake('id_ID')->address(),
            'estimated_value' => fake()->numberBetween(500000000, 10000000000), // 500M - 10B IDR
            'proposed_fee' => fake()->numberBetween(5000000, 50000000), // 5M - 50M IDR
            'submission_date' => $submissionDate,
            'deadline_date' => $deadlineDate,
            'status' => fake()->randomElement(['draft', 'submitted', 'approved', 'rejected', 'expired']),
            'notes' => fake()->optional()->text(150),
        ];
    }



    /**
     * Indicate that the proposal is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
        ]);
    }

    /**
     * Indicate that the proposal is submitted.
     */
    public function submitted(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'submitted',
        ]);
    }
}