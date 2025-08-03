<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\AppraisalProject
 *
 * @property int $id
 * @property string $project_number
 * @property int $contract_id
 * @property string $title
 * @property string $description
 * @property string $property_type
 * @property string $property_address
 * @property string|null $estimated_value
 * @property string $target_completion
 * @property string $status
 * @property int|null $lead_appraiser_id
 * @property int|null $reviewer_id
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Contract $contract
 * @property-read \App\Models\User|null $leadAppraiser
 * @property-read \App\Models\User|null $reviewer
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Survey> $surveys
 * @property-read \App\Models\AppraisalReport|null $appraisalReport
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AppraisalProject newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppraisalProject newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppraisalProject query()
 * @method static \Database\Factories\AppraisalProjectFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class AppraisalProject extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'project_number',
        'contract_id',
        'title',
        'description',
        'property_type',
        'property_address',
        'estimated_value',
        'target_completion',
        'status',
        'lead_appraiser_id',
        'reviewer_id',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'estimated_value' => 'decimal:2',
        'target_completion' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the contract that owns the appraisal project.
     */
    public function contract(): BelongsTo
    {
        return $this->belongsTo(Contract::class);
    }

    /**
     * Get the lead appraiser assigned to the project.
     */
    public function leadAppraiser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'lead_appraiser_id');
    }

    /**
     * Get the reviewer assigned to the project.
     */
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    /**
     * Get the surveys for the appraisal project.
     */
    public function surveys(): HasMany
    {
        return $this->hasMany(Survey::class);
    }

    /**
     * Get the appraisal report for the project.
     */
    public function appraisalReport(): HasOne
    {
        return $this->hasOne(AppraisalReport::class);
    }
}