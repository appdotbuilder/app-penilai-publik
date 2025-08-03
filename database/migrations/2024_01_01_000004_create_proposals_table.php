<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->string('proposal_number')->unique()->comment('Proposal reference number');
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('Proposal title');
            $table->text('description');
            $table->string('property_type')->comment('Type of property to be appraised');
            $table->text('property_address');
            $table->decimal('estimated_value', 15, 2)->nullable();
            $table->decimal('proposed_fee', 12, 2);
            $table->date('submission_date');
            $table->date('deadline_date');
            $table->enum('status', ['draft', 'submitted', 'approved', 'rejected', 'expired'])->default('draft');
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index('proposal_number');
            $table->index('client_id');
            $table->index('status');
            $table->index('submission_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};