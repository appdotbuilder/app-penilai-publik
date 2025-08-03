import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Client {
    id: number;
    name: string;
    pic_name: string;
    email: string;
    phone?: string;
    type: string;
    status: string;
    created_at: string;
    proposals_count?: number;
    contracts_count?: number;
}

interface Props {
    clients: {
        data: Client[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function ClientsIndex({ clients }: Props) {
    const getTypeLabel = (type: string) => {
        const types: Record<string, string> = {
            'corporate': 'Perusahaan',
            'individual': 'Perorangan',
            'government': 'Pemerintah'
        };
        return types[type] || type;
    };

    const getStatusColor = (status: string) => {
        return status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800';
    };

    return (
        <AppShell>
            <Head title="Manajemen Klien" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">👥 Manajemen Klien</h1>
                        <p className="text-gray-600 mt-1">Kelola data klien dan informasi kontak</p>
                    </div>
                    <Link href="/clients/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ Tambah Klien Baru
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">👥</div>
                            <div>
                                <p className="text-sm text-gray-600">Total Klien</p>
                                <p className="text-xl font-bold">{clients.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">🏢</div>
                            <div>
                                <p className="text-sm text-gray-600">Klien Aktif</p>
                                <p className="text-xl font-bold">
                                    {clients.data.filter(c => c.status === 'active').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="flex items-center">
                            <div className="text-2xl mr-3">📊</div>
                            <div>
                                <p className="text-sm text-gray-600">Rata-rata per Halaman</p>
                                <p className="text-xl font-bold">{clients.per_page}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Clients Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Klien
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kontak
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tipe
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Terdaftar
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {clients.data.length > 0 ? clients.data.map((client) => (
                                    <tr key={client.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {client.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    PIC: {client.pic_name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{client.email}</div>
                                            {client.phone && (
                                                <div className="text-sm text-gray-500">{client.phone}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {getTypeLabel(client.type)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                                                {client.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(client.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link 
                                                href={`/clients/${client.id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                👁️ Lihat
                                            </Link>
                                            <Link 
                                                href={`/clients/${client.id}/edit`}
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
                                                <div className="text-4xl mb-4">👥</div>
                                                <p className="text-lg font-medium">Belum ada klien</p>
                                                <p className="text-sm">Tambahkan klien pertama untuk memulai</p>
                                                <Link href="/clients/create" className="mt-4 inline-block">
                                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                                        ➕ Tambah Klien
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
                    {clients.last_page > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                {clients.current_page > 1 && (
                                    <Link
                                        href={`/clients?page=${clients.current_page - 1}`}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {clients.current_page < clients.last_page && (
                                    <Link
                                        href={`/clients?page=${clients.current_page + 1}`}
                                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Menampilkan{' '}
                                        <span className="font-medium">
                                            {(clients.current_page - 1) * clients.per_page + 1}
                                        </span>{' '}
                                        sampai{' '}
                                        <span className="font-medium">
                                            {Math.min(clients.current_page * clients.per_page, clients.total)}
                                        </span>{' '}
                                        dari{' '}
                                        <span className="font-medium">{clients.total}</span> hasil
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