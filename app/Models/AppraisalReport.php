<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\AppraisalReport
 *
 * @property int $id
 * @property int $appraisal_project_id
 * @property string $report_number
 * @property string $title
 * @property string $appraised_value
 * @property string $valuation_method
 * @property string $executive_summary
 * @property array|null $detailed_analysis
 * @property string $status
 * @property int $prepared_by
 * @property int|null $reviewed_by
 * @property string|null $review_date
 * @property string|null $review_comments
 * @property string|null $report_file_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\AppraisalProject $appraisalProject
 * @property-read \App\Models\User $preparedBy
 * @property-read \App\Models\User|null $reviewedBy
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AppraisalReport newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppraisalReport newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppraisalReport query()

 * 
 * @mixin \Eloquent
 */
class AppraisalReport extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'appraisal_project_id',
        'report_number',
        'title',
        'appraised_value',
        'valuation_method',
        'executive_summary',
        'detailed_analysis',
        'status',
        'prepared_by',
        'reviewed_by',
        'review_date',
        'review_comments',
        'report_file_path',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'appraised_value' => 'decimal:2',
        'detailed_analysis' => 'array',
        'review_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the appraisal project that owns the report.
     */
    public function appraisalProject(): BelongsTo
    {
        return $this->belongsTo(AppraisalProject::class);
    }

    /**
     * Get the user who prepared the report.
     */
    public function preparedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'prepared_by');
    }

    /**
     * Get the user who reviewed the report.
     */
    public function reviewedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}