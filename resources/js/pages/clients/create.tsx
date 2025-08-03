import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

export default function CreateClient() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        pic_name: '',
        email: '',
        phone: '',
        address: '',
        type: 'corporate',
        status: 'active',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/clients');
    };

    return (
        <AppShell>
            <Head title="Tambah Klien Baru" />
            
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">➕ Tambah Klien Baru</h1>
                    <p className="text-gray-600 mt-1">Masukkan informasi klien untuk mendaftarkan ke sistem</p>
                </div>

                <div className="max-w-2xl">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
                        {/* Company Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                🏢 Nama Perusahaan/Organisasi *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="PT. Contoh Perusahaan"
                                required
                            />
                            <InputError message={errors.name} className="mt-1" />
                        </div>

                        {/* PIC Name */}
                        <div>
                            <label htmlFor="pic_name" className="block text-sm font-medium text-gray-700 mb-1">
                                👤 Nama Person in Charge (PIC) *
                            </label>
                            <input
                                type="text"
                                id="pic_name"
                                value={data.pic_name}
                                onChange={(e) => setData('pic_name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="John Doe"
                                required
                            />
                            <InputError message={errors.pic_name} className="mt-1" />
                        </div>

                        {/* Contact Information */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    📧 Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="contact@example.com"
                                    required
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    📞 Nomor Telepon
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="+62 xxx xxxx xxxx"
                                />
                                <InputError message={errors.phone} className="mt-1" />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                📍 Alamat Lengkap *
                            </label>
                            <textarea
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Jl. Contoh No. 123, Jakarta"
                                required
                            />
                            <InputError message={errors.address} className="mt-1" />
                        </div>

                        {/* Client Type */}
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                                🏷️ Tipe Klien *
                            </label>
                            <select
                                id="type"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="corporate">🏢 Perusahaan</option>
                                <option value="individual">👤 Perorangan</option>
                                <option value="government">🏛️ Pemerintah</option>
                            </select>
                            <InputError message={errors.type} className="mt-1" />
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                ⚡ Status
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="active">✅ Aktif</option>
                                <option value="inactive">❌ Tidak Aktif</option>
                            </select>
                            <InputError message={errors.status} className="mt-1" />
                        </div>

                        {/* Notes */}
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                📝 Catatan Tambahan
                            </label>
                            <textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Catatan khusus tentang klien ini..."
                            />
                            <InputError message={errors.notes} className="mt-1" />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-3 pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                ❌ Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {processing ? '⏳ Menyimpan...' : '💾 Simpan Klien'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}