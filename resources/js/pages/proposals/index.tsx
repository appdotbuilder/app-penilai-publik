import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Proposal {
    id: number;
    proposal_number: string;
    title: string;
    status: string;
    proposed_fee: string;
    submission_date: string;
    deadline_date: string;
    created_at: string;
    client: {
        name: string;
    };
}

interface Props {
    proposals: {
        data: Proposal[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function ProposalsIndex({ proposals }: Props) {
    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            'draft': 'bg-gray-100 text-gray-800',
            'submitted': 'bg-blue-100 text-blue-800',
            'approved': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
            'expired': 'bg-yellow-100 text-yellow-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status: string) => {
        const texts: Record<string, string> = {
            'draft': 'Draft',
            'submitted': 'Diajukan',
            'approved': 'Disetujui',
            'rejected': 'Ditolak',
            'expired': 'Kedaluwarsa',
        };
        return texts[status] || status;
    };

    const formatCurrency = (amount: string) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(parseFloat(amount));
    };

    return (
        <AppShell>
            <Head title="Manajemen Proposal" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📝 Manajemen Proposal</h1>
                        <p className="text-gray-600 mt-1">Kelola proposal penawaran untuk klien</p>
                    </div>
                    <Link href="/proposals/create">
                        <Button className="bg-green-600 hover:bg-green-700">
                            ➕ Buat Proposal Baru
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📝</div>
                            <div>
                                <p className="text-sm text-gray-600">Total Proposal</p>
                                <p className="text-xl font-bold">{proposals.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📋</div>
                            <div>
                                <p className="text-sm text-gray-600">Draft</p>
                                <p className="text-xl font-bold">
                                    {proposals.data.filter(p => p.status === 'draft').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">✅</div>
                            <div>
                                <p className="text-sm text-gray-600">Disetujui</p>
                                <p className="text-xl font-bold">
                                    {proposals.data.filter(p => p.status === 'approved').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">⏰</div>
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-xl font-bold">
                                    {proposals.data.filter(p => p.status === 'submitted').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Proposals Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Proposal
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Klien
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nilai Penawaran
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Deadline
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {proposals.data.length > 0 ? proposals.data.map((proposal) => (
                                    <tr key={proposal.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {proposal.title}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {proposal.proposal_number}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{proposal.client.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {formatCurrency(proposal.proposed_fee)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                                                {getStatusText(proposal.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(proposal.deadline_date).toLocaleDateString('id-ID')}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(proposal.deadline_date) < new Date() ? '⚠️ Terlewat' : '⏰ Mendatang'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link 
                                                href={`/proposals/${proposal.id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                👁️ Lihat
                                            </Link>
                                            <Link 
                                                href={`/proposals/${proposal.id}/edit`}
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
                                                <div className="text-4xl mb-4">📝</div>
                                                <p className="text-lg font-medium">Belum ada proposal</p>
                                                <p className="text-sm">Buat proposal pertama untuk memulai</p>
                                                <Link href="/proposals/create" className="mt-4 inline-block">
                                                    <Button className="bg-green-600 hover:bg-green-700">
                                                        ➕ Buat Proposal
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {proposals.last_page > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Menampilkan{' '}
                                        <span className="font-medium">
                                            {(proposals.current_page - 1) * proposals.per_page + 1}
                                        </span>{' '}
                                        sampai{' '}
                                        <span className="font-medium">
                                            {Math.min(proposals.current_page * proposals.per_page, proposals.total)}
                                        </span>{' '}
                                        dari{' '}
                                        <span className="font-medium">{proposals.total}</span> hasil
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}