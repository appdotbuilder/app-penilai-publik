<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Proposal;
use App\Models\Contract;
use App\Models\AppraisalProject;
use App\Models\Survey;
use App\Models\AppraisalReport;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        // Get statistics
        $stats = [
            'total_clients' => Client::count(),
            'active_clients' => Client::where('status', 'active')->count(),
            'total_proposals' => Proposal::count(),
            'pending_proposals' => Proposal::where('status', 'submitted')->count(),
            'active_contracts' => Contract::where('status', 'active')->count(),
            'active_projects' => AppraisalProject::whereIn('status', ['assigned', 'survey_scheduled', 'survey_completed', 'appraisal_in_progress'])->count(),
            'pending_surveys' => Survey::where('status', 'scheduled')->count(),
            'pending_reports' => AppraisalReport::where('status', 'review_pending')->count(),
        ];

        // Recent activities
        $recent_proposals = Proposal::with('client')
            ->latest()
            ->take(5)
            ->get();

        $recent_projects = AppraisalProject::with('contract.client', 'leadAppraiser')
            ->latest()
            ->take(5)
            ->get();

        $upcoming_surveys = Survey::with('appraisalProject.contract.client', 'surveyor')
            ->where('status', 'scheduled')
            ->where('scheduled_date', '>=', now())
            ->orderBy('scheduled_date')
            ->take(5)
            ->get();

        // Monthly proposal trends (compatible with SQLite and MySQL)
        $proposal_trends = Proposal::select(
                DB::raw('strftime("%m", created_at) as month'),
                DB::raw('COUNT(*) as count')
            )
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recent_proposals' => $recent_proposals,
            'recent_projects' => $recent_projects,
            'upcoming_surveys' => $upcoming_surveys,
            'proposal_trends' => $proposal_trends,
        ]);
    }
}