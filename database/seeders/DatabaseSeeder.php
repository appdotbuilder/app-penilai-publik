<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Client;
use App\Models\Proposal;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@appraisal.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'status' => 'active',
        ]);

        // Create role-based users
        $roles = [
            'sekretariat' => 'Sekretariat User',
            'asisten_penilai' => 'Asisten Penilai',
            'penilai' => 'Penilai Utama',
            'reviewer' => 'Reviewer',
            'penanggung_jawab' => 'Penanggung Jawab',
            'keuangan' => 'Staff Keuangan',
        ];

        foreach ($roles as $role => $name) {
            User::factory()->create([
                'name' => $name,
                'email' => $role . '@appraisal.com',
                'password' => Hash::make('password'),
                'role' => $role,
                'status' => 'active',
            ]);
        }

        // Create additional users
        User::factory(10)->create([
            'role' => 'penilai',
            'status' => 'active',
        ]);

        User::factory(5)->create([
            'role' => 'asisten_penilai',
            'status' => 'active',
        ]);

        User::factory(3)->create([
            'role' => 'reviewer',
            'status' => 'active',
        ]);

        // Create clients with proposals
        $corporateClients = Client::factory(15)->corporate()->active()->create();
        $governmentClients = Client::factory(5)->government()->active()->create();
        $individualClients = Client::factory(10)->create(['type' => 'individual', 'status' => 'active']);

        // Create proposals for clients
        foreach ($corporateClients as $client) {
            Proposal::factory(random_int(1, 3))->create(['client_id' => $client->id]);
        }

        foreach ($governmentClients as $client) {
            Proposal::factory(random_int(1, 2))->create(['client_id' => $client->id]);
        }

        foreach ($individualClients as $client) {
            if (random_int(1, 100) <= 70) { // 70% chance of having a proposal
                Proposal::factory()->create(['client_id' => $client->id]);
            }
        }

        // Create some inactive clients
        Client::factory(5)->create(['status' => 'inactive']);
    }
}