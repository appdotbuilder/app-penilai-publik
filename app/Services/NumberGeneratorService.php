<?php

namespace App\Services;

use App\Models\Proposal;
use App\Models\AppraisalProject;

class NumberGeneratorService
{
    /**
     * Generate a unique proposal number.
     */
    public static function generateProposalNumber(): string
    {
        $year = date('Y');
        $month = date('m');
        $count = Proposal::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->count() + 1;
        
        return sprintf('PROP-%s-%s-%04d', $year, $month, $count);
    }

    /**
     * Generate a unique project number.
     */
    public static function generateProjectNumber(): string
    {
        $year = date('Y');
        $month = date('m');
        $count = AppraisalProject::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->count() + 1;
        
        return sprintf('PROJ-%s-%s-%04d', $year, $month, $count);
    }
}