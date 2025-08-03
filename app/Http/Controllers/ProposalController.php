<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProposalRequest;
use App\Http\Requests\UpdateProposalRequest;
use App\Models\Proposal;
use App\Models\Client;
use App\Services\NumberGeneratorService;
use Inertia\Inertia;

class ProposalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $proposals = Proposal::with('client')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('proposals/index', [
            'proposals' => $proposals
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clients = Client::active()->orderBy('name')->get();
        
        return Inertia::render('proposals/create', [
            'clients' => $clients
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProposalRequest $request)
    {
        $data = $request->validated();
        $data['proposal_number'] = NumberGeneratorService::generateProposalNumber();
        
        $proposal = Proposal::create($data);

        return redirect()->route('proposals.show', $proposal)
            ->with('success', 'Proposal berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Proposal $proposal)
    {
        $proposal->load('client', 'contract');
        
        return Inertia::render('proposals/show', [
            'proposal' => $proposal
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Proposal $proposal)
    {
        $clients = Client::active()->orderBy('name')->get();
        
        return Inertia::render('proposals/edit', [
            'proposal' => $proposal,
            'clients' => $clients
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProposalRequest $request, Proposal $proposal)
    {
        $proposal->update($request->validated());

        return redirect()->route('proposals.show', $proposal)
            ->with('success', 'Proposal berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Proposal $proposal)
    {
        $proposal->delete();

        return redirect()->route('proposals.index')
            ->with('success', 'Proposal berhasil dihapus.');
    }


}