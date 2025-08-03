<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\Proposal
 *
 * @property int $id
 * @property string $proposal_number
 * @property int $client_id
 * @property string $title
 * @property string $description
 * @property string $property_type
 * @property string $property_address
 * @property string|null $estimated_value
 * @property string $proposed_fee
 * @property string $submission_date
 * @property string $deadline_date
 * @property string $status
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Client $client
 * @property-read \App\Models\Contract|null $contract
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Proposal query()
 * @method static \Database\Factories\ProposalFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Proposal extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'proposal_number',
        'client_id',
        'title',
        'description',
        'property_type',
        'property_address',
        'estimated_value',
        'proposed_fee',
        'submission_date',
        'deadline_date',
        'status',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'estimated_value' => 'decimal:2',
        'proposed_fee' => 'decimal:2',
        'submission_date' => 'date',
        'deadline_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the client that owns the proposal.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Get the contract associated with the proposal.
     */
    public function contract(): HasOne
    {
        return $this->hasOne(Contract::class);
    }
}