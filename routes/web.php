<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\AppraisalProjectController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Client Management (Secretariat Module)
    Route::resource('clients', ClientController::class);
    
    // Proposal Management (Secretariat Module)
    Route::resource('proposals', ProposalController::class);
    
    // Appraisal Project Management (Implementation Module)
    Route::resource('projects', AppraisalProjectController::class);
    
    // Additional routes for specific functionality
    Route::get('/reports', function () {
        return Inertia::render('reports/index');
    })->name('reports.index');
    
    Route::get('/contracts', function () {
        return Inertia::render('contracts/index');
    })->name('contracts.index');
    
    Route::get('/surveys', function () {
        return Inertia::render('surveys/index');
    })->name('surveys.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';