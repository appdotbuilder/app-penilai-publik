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
        Schema::create('appraisal_projects', function (Blueprint $table) {
            $table->id();
            $table->string('project_number')->unique()->comment('Project reference number');
            $table->foreignId('contract_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('property_type');
            $table->text('property_address');
            $table->decimal('estimated_value', 15, 2)->nullable();
            $table->date('target_completion');
            $table->enum('status', ['assigned', 'survey_scheduled', 'survey_completed', 'appraisal_in_progress', 'review_pending', 'completed', 'cancelled'])->default('assigned');
            $table->foreignId('lead_appraiser_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('reviewer_id')->nullable()->constrained('users')->onDelete('set null');
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index('project_number');
            $table->index('contract_id');
            $table->index('status');
            $table->index('lead_appraiser_id');
            $table->index('target_completion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appraisal_projects');
    }
};