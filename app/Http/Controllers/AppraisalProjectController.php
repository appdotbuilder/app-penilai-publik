<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAppraisalProjectRequest;
use App\Http\Requests\UpdateAppraisalProjectRequest;
use App\Models\AppraisalProject;
use App\Models\Contract;
use App\Models\User;
use App\Services\NumberGeneratorService;
use Inertia\Inertia;

class AppraisalProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = AppraisalProject::with('contract.client', 'leadAppraiser', 'reviewer')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('projects/index', [
            'projects' => $projects
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $contracts = Contract::with('client')->where('status', 'active')->get();
        $appraisers = User::whereIn('role', ['penilai', 'asisten_penilai'])->where('status', 'active')->get();
        $reviewers = User::where('role', 'reviewer')->where('status', 'active')->get();
        
        return Inertia::render('projects/create', [
            'contracts' => $contracts,
            'appraisers' => $appraisers,
            'reviewers' => $reviewers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAppraisalProjectRequest $request)
    {
        $data = $request->validated();
        $data['project_number'] = NumberGeneratorService::generateProjectNumber();
        
        $project = AppraisalProject::create($data);

        return redirect()->route('projects.show', $project)
            ->with('success', 'Proyek penilaian berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(AppraisalProject $project)
    {
        $project->load('contract.client', 'leadAppraiser', 'reviewer', 'surveys', 'appraisalReport');
        
        return Inertia::render('projects/show', [
            'project' => $project
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AppraisalProject $project)
    {
        $contracts = Contract::with('client')->where('status', 'active')->get();
        $appraisers = User::whereIn('role', ['penilai', 'asisten_penilai'])->where('status', 'active')->get();
        $reviewers = User::where('role', 'reviewer')->where('status', 'active')->get();
        
        return Inertia::render('projects/edit', [
            'project' => $project,
            'contracts' => $contracts,
            'appraisers' => $appraisers,
            'reviewers' => $reviewers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppraisalProjectRequest $request, AppraisalProject $project)
    {
        $project->update($request->validated());

        return redirect()->route('projects.show', $project)
            ->with('success', 'Proyek penilaian berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AppraisalProject $project)
    {
        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Proyek penilaian berhasil dihapus.');
    }


}