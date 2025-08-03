<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Survey
 *
 * @property int $id
 * @property int $appraisal_project_id
 * @property string $scheduled_date
 * @property string|null $scheduled_time
 * @property string|null $completed_date
 * @property string|null $findings
 * @property array|null $photos
 * @property string $status
 * @property int $surveyor_id
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\AppraisalProject $appraisalProject
 * @property-read \App\Models\User $surveyor
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Survey newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Survey newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Survey query()

 * 
 * @mixin \Eloquent
 */
class Survey extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'appraisal_project_id',
        'scheduled_date',
        'scheduled_time',
        'completed_date',
        'findings',
        'photos',
        'status',
        'surveyor_id',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'scheduled_date' => 'date',
        'completed_date' => 'date',
        'photos' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the appraisal project that owns the survey.
     */
    public function appraisalProject(): BelongsTo
    {
        return $this->belongsTo(AppraisalProject::class);
    }

    /**
     * Get the surveyor assigned to the survey.
     */
    public function surveyor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'surveyor_id');
    }
}