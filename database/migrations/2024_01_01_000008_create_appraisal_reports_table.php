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
        Schema::create('appraisal_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appraisal_project_id')->constrained()->onDelete('cascade');
            $table->string('report_number')->unique();
            $table->string('title');
            $table->decimal('appraised_value', 15, 2);
            $table->string('valuation_method')->comment('Cost, Market, Income approach');
            $table->text('executive_summary');
            $table->json('detailed_analysis')->nullable()->comment('Detailed analysis data');
            $table->enum('status', ['draft', 'review_pending', 'approved', 'rejected', 'finalized'])->default('draft');
            $table->foreignId('prepared_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->date('review_date')->nullable();
            $table->text('review_comments')->nullable();
            $table->string('report_file_path')->nullable();
            $table->timestamps();
            
            $table->index('appraisal_project_id');
            $table->index('report_number');
            $table->index('status');
            $table->index('prepared_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appraisal_reports');
    }
};