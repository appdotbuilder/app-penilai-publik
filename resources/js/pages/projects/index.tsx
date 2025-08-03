import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Project {
    id: number;
    project_number: string;
    title: string;
    status: string;
    target_completion: string;
    created_at: string;
    contract: {
        client: {
            name: string;
        };
    };
    lead_appraiser?: {
        name: string;
    };
    reviewer?: {
        name: string;
    };
}

interface Props {
    projects: {
        data: Project[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function ProjectsIndex({ projects }: Props) {
    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            'assigned': 'bg-blue-100 text-blue-800',
            'survey_scheduled': 'bg-yellow-100 text-yellow-800',
            'survey_completed': 'bg-purple-100 text-purple-800',
            'appraisal_in_progress': 'bg-orange-100 text-orange-800',
            'review_pending': 'bg-indigo-100 text-indigo-800',
            'completed': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status: string) => {
        const texts: Record<string, string> = {
            'assigned': 'Ditugaskan',
            'survey_scheduled': 'Survei Dijadwalkan',
            'survey_completed': 'Survei Selesai',
            'appraisal_in_progress': 'Penilaian Berlangsung',
            'review_pending': 'Menunggu Review',
            'completed': 'Selesai',
            'cancelled': 'Dibatalkan',
        };
        return texts[status] || status;
    };

    return (
        <AppShell>
            <Head title="Proyek Penilaian" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🔍 Proyek Penilaian</h1>
                        <p className="text-gray-600 mt-1">Kelola proyek penilaian dan implementasi</p>
                    </div>
                    <Link href="/projects/create">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                            ➕ Proyek Baru
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">🔍</div>
                            <div>
                                <p className="text-sm text-gray-600">Total Proyek</p>
                                <p className="text-xl font-bold">{projects.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">⚡</div>
                            <div>
                                <p className="text-sm text-gray-600">Aktif</p>
                                <p className="text-xl font-bold">
                                    {projects.data.filter(p => 
                                        ['assigned', 'survey_scheduled', 'survey_completed', 'appraisal_in_progress'].includes(p.status)
                                    ).length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">✅</div>
                            <div>
                                <p className="text-sm text-gray-600">Selesai</p>
                                <p className="text-xl font-bold">
                                    {projects.data.filter(p => p.status === 'completed').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📋</div>
                            <div>
                                <p className="text-sm text-gray-600">Review</p>
                                <p className="text-xl font-bold">
                                    {projects.data.filter(p => p.status === 'review_pending').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Proyek
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Klien
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tim
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Target
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {projects.data.length > 0 ? projects.data.map((project) => (
                                    <tr key={project.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {project.title}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {project.project_number}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{project.contract.client.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {project.lead_appraiser ? (
                                                    <>👤 {project.lead_appraiser.name}</>
                                                ) : (
                                                    <span className="text-gray-500">Belum ditugaskan</span>
                                                )}
                                            </div>
                                            {project.reviewer && (
                                                <div className="text-xs text-gray-500">
                                                    📝 {project.reviewer.name}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                                {getStatusText(project.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(project.target_completion).toLocaleDateString('id-ID')}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(project.target_completion) < new Date() ? '⚠️ Terlewat' : '⏰ Mendatang'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link 
                                                href={`/projects/${project.id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                👁️ Lihat
                                            </Link>
                                            <Link 
                                                href={`/projects/${project.id}/edit`}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                ✏️ Edit
                                            </Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="text-gray-500">
                                                <div className="text-4xl mb-4">🔍</div>
                                                <p className="text-lg font-medium">Belum ada proyek</p>
                                                <p className="text-sm">Buat proyek pertama untuk memulai</p>
                                                <Link href="/projects/create" className="mt-4 inline-block">
                                                    <Button className="bg-purple-600 hover:bg-purple-700">
                                                        ➕ Buat Proyek
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}