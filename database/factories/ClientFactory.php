<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companies = [
            'PT. Maju Bersama Indonesia',
            'CV. Sejahtera Abadi',
            'PT. Berkah Properti Nusantara',
            'PT. Prima Investment Group',
            'CV. Harmoni Development',
            'PT. Sukses Mandiri',
            'PT. Gemilang Konstruksi',
            'CV. Bahagia Sentosa',
            'PT. Jaya Makmur',
            'PT. Indah Permai Group'
        ];

        return [
            'name' => fake()->randomElement($companies),
            'pic_name' => fake('id_ID')->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake('id_ID')->phoneNumber(),
            'address' => fake('id_ID')->address(),
            'type' => fake()->randomElement(['corporate', 'individual', 'government']),
            'status' => fake()->randomElement(['active', 'inactive']),
            'notes' => fake()->optional()->text(200),
        ];
    }

    /**
     * Indicate that the client is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the client is a corporate client.
     */
    public function corporate(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'corporate',
        ]);
    }

    /**
     * Indicate that the client is a government client.
     */
    public function government(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'government',
            'name' => 'Dinas ' . fake()->randomElement([
                'Perumahan dan Kawasan Permukiman',
                'Pekerjaan Umum dan Penataan Ruang',
                'Perhubungan',
                'Pendidikan',
                'Kesehatan',
                'Sosial',
                'Koperasi dan UKM',
                'Perindustrian dan Perdagangan'
            ]) . ' ' . fake('id_ID')->city(),
        ]);
    }
}