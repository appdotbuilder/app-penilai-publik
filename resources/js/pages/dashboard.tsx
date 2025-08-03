import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Stats {
    total_clients: number;
    active_clients: number;
    total_proposals: number;
    pending_proposals: number;
    active_contracts: number;
    active_projects: number;
    pending_surveys: number;
    pending_reports: number;
}

interface Proposal {
    id: number;
    proposal_number: string;
    title: string;
    status: string;
    client: {
        name: string;
    };
    created_at: string;
}

interface Project {
    id: number;
    project_number: string;
    title: string;
    status: string;
    contract: {
        client: {
            name: string;
        };
    };
    lead_appraiser?: {
        name: string;
    };
    target_completion: string;
}

interface Survey {
    id: number;
    scheduled_date: string;
    scheduled_time?: string;
    appraisal_project: {
        title: string;
        contract: {
            client: {
                name: string;
            };
        };
    };
    surveyor: {
        name: string;
    };
}

interface Props {
    stats: Stats;
    recent_proposals: Proposal[];
    recent_projects: Project[];
    upcoming_surveys: Survey[];
    proposal_trends: Array<{
        month: number;
        count: number;
    }>;
    [key: string]: unknown;
}

export default function Dashboard({ 
    stats, 
    recent_proposals, 
    recent_projects, 
    upcoming_surveys 
}: Props) {
    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            'draft': 'bg-gray-100 text-gray-800',
            'submitted': 'bg-blue-100 text-blue-800',
            'approved': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
            'active': 'bg-green-100 text-green-800',
            'assigned': 'bg-blue-100 text-blue-800',
            'survey_scheduled': 'bg-yellow-100 text-yellow-800',
            'survey_completed': 'bg-purple-100 text-purple-800',
            'appraisal_in_progress': 'bg-orange-100 text-orange-800',
            'completed': 'bg-green-100 text-green-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatStatusText = (status: string) => {
        const statusMap: Record<string, string> = {
            'draft': 'Draft',
            'submitted': 'Diajukan',
            'approved': 'Disetujui',
            'rejected': 'Ditolak',
            'active': 'Aktif',
            'assigned': 'Ditugaskan',
            'survey_scheduled': 'Survei Dijadwalkan',
            'survey_completed': 'Survei Selesai',
            'appraisal_in_progress': 'Penilaian Berlangsung',
            'completed': 'Selesai',
        };
        return statusMap[status] || status;
    };

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        📊 Dashboard Kantor Penilai Publik
                    </h1>
                    <p className="text-gray-600">
                        Ringkasan aktivitas dan status terkini sistem manajemen
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">👥</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Klien</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_clients}</p>
                                <p className="text-sm text-green-600">{stats.active_clients} aktif</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📝</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Proposal</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total_proposals}</p>
                                <p className="text-sm text-blue-600">{stats.pending_proposals} pending</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📋</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Kontrak Aktif</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.active_contracts}</p>
                                <p className="text-sm text-green-600">Berjalan</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">🔍</div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Proyek Aktif</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.active_projects}</p>
                                <p className="text-sm text-orange-600">Dalam proses</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">⚡ Aksi Cepat</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/clients/create">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                👤 Tambah Klien
                            </Button>
                        </Link>
                        <Link href="/proposals/create">
                            <Button className="w-full bg-green-600 hover:bg-green-700">
                                📝 Buat Proposal
                            </Button>
                        </Link>
                        <Link href="/projects/create">
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                🔍 Proyek Baru
                            </Button>
                        </Link>
                        <Link href="/reports">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700">
                                📊 Lihat Laporan
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Proposals */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">📝 Proposal Terbaru</h2>
                            <Link 
                                href="/proposals" 
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Lihat Semua →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recent_proposals.length > 0 ? recent_proposals.map((proposal) => (
                                <div key={proposal.id} className="flex justify-between items-center p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{proposal.title}</p>
                                        <p className="text-sm text-gray-600">{proposal.client.name}</p>
                                        <p className="text-xs text-gray-500">{proposal.proposal_number}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                                        {formatStatusText(proposal.status)}
                                    </span>
                                </div>
                            )) : (
                                <p className="text-gray-500 text-center py-4">Belum ada proposal</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Projects */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">🔍 Proyek Terbaru</h2>
                            <Link 
                                href="/projects" 
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Lihat Semua →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recent_projects.length > 0 ? recent_projects.map((project) => (
                                <div key={project.id} className="flex justify-between items-center p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{project.title}</p>
                                        <p className="text-sm text-gray-600">{project.contract.client.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {project.lead_appraiser ? `Penilai: ${project.lead_appraiser.name}` : 'Belum ditugaskan'}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                        {formatStatusText(project.status)}
                                    </span>
                                </div>
                            )) : (
                                <p className="text-gray-500 text-center py-4">Belum ada proyek</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Upcoming Surveys */}
                {upcoming_surveys.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow-sm border mt-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">📅 Survei Mendatang</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {upcoming_surveys.map((survey) => (
                                <div key={survey.id} className="p-4 border rounded-lg">
                                    <p className="font-medium text-gray-900">{survey.appraisal_project.title}</p>
                                    <p className="text-sm text-gray-600">{survey.appraisal_project.contract.client.name}</p>
                                    <p className="text-sm text-blue-600">
                                        📅 {new Date(survey.scheduled_date).toLocaleDateString('id-ID')}
                                        {survey.scheduled_time && ` ${survey.scheduled_time}`}
                                    </p>
                                    <p className="text-xs text-gray-500">Surveyor: {survey.surveyor.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Alert Section */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">⏰</div>
                            <div>
                                <h3 className="font-semibold text-yellow-800">Perlu Perhatian</h3>
                                <p className="text-sm text-yellow-700">
                                    {stats.pending_surveys} survei menunggu jadwal
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📋</div>
                            <div>
                                <h3 className="font-semibold text-blue-800">Review Diperlukan</h3>
                                <p className="text-sm text-blue-700">
                                    {stats.pending_reports} laporan menunggu review
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}