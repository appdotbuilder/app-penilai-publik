<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string $role
 * @property string|null $phone
 * @property string $status
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AppraisalProject> $leadAppraisalProjects
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AppraisalProject> $reviewAppraisalProjects
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Survey> $surveys
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AppraisalReport> $preparedReports
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AppraisalReport> $reviewedReports
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the appraisal projects where this user is the lead appraiser.
     */
    public function leadAppraisalProjects(): HasMany
    {
        return $this->hasMany(AppraisalProject::class, 'lead_appraiser_id');
    }

    /**
     * Get the appraisal projects where this user is the reviewer.
     */
    public function reviewAppraisalProjects(): HasMany
    {
        return $this->hasMany(AppraisalProject::class, 'reviewer_id');
    }

    /**
     * Get the surveys assigned to this user.
     */
    public function surveys(): HasMany
    {
        return $this->hasMany(Survey::class, 'surveyor_id');
    }

    /**
     * Get the reports prepared by this user.
     */
    public function preparedReports(): HasMany
    {
        return $this->hasMany(AppraisalReport::class, 'prepared_by');
    }

    /**
     * Get the reports reviewed by this user.
     */
    public function reviewedReports(): HasMany
    {
        return $this->hasMany(AppraisalReport::class, 'reviewed_by');
    }
}