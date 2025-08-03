import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Sistem Manajemen Kantor Penilai Publik" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Header */}
                <header className="w-full bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    🏢 APPRAISAL PRO
                                </div>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href="/login"
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            Masuk
                                        </Link>
                                        <Link href="/register">
                                            <Button className="bg-blue-600 hover:bg-blue-700">
                                                Daftar
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            🏗️ Sistem Manajemen<br />
                            <span className="text-blue-600">Kantor Penilai Publik</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Solusi lengkap untuk mengelola operasional kantor penilai publik di Indonesia. 
                            Dari manajemen klien hingga laporan penilaian profesional.
                        </p>
                        {!auth.user && (
                            <div className="flex justify-center space-x-4">
                                <Link href="/register">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                                        🚀 Mulai Sekarang
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                                        📋 Masuk ke Sistem
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Secretariat Module */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Modul Sekretariat
                            </h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Manajemen Data Klien</li>
                                <li>• Proposal Penawaran</li>
                                <li>• Kontrak & Perjanjian</li>
                                <li>• Administrasi Dokumen</li>
                            </ul>
                        </div>

                        {/* Implementation Module */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Modul Implementasi
                            </h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Proyek Penilaian</li>
                                <li>• Penjadwalan Survei</li>
                                <li>• Proses Penilaian</li>
                                <li>• Laporan Penilaian</li>
                            </ul>
                        </div>

                        {/* Role Management */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Manajemen Peran
                            </h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Sekretariat</li>
                                <li>• Asisten Penilai</li>
                                <li>• Penilai & Reviewer</li>
                                <li>• Penanggung Jawab</li>
                            </ul>
                        </div>

                        {/* Workflow Management */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Alur Kerja Otomatis
                            </h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Status Tracking</li>
                                <li>• Notifikasi Real-time</li>
                                <li>• Approval Workflow</li>
                                <li>• Deadline Management</li>
                            </ul>
                        </div>

                        {/* Reporting & Analytics */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Laporan & Analitik
                            </h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Dashboard Komprehensif</li>
                                <li>• Laporan Keuangan</li>
                                <li>• Analisis Kinerja</li>
                                <li>• Export Data</li>
                            </ul>
                        </div>

                        {/* Security & Compliance */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Keamanan & Kepatuhan
                            </h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Akses Berbasis Peran</li>
                                <li>• Audit Trail</li>
                                <li>• Backup Otomatis</li>
                                <li>• Standar Industri</li>
                            </ul>
                        </div>
                    </div>

                    {/* Process Flow */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                            🔄 Alur Kerja Sistem
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">📝</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">1. Proposal</h4>
                                <p className="text-sm text-gray-600">Buat dan kelola proposal penawaran</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">2. Kontrak</h4>
                                <p className="text-sm text-gray-600">Kelola kontrak dan perjanjian</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">🔍</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">3. Survei</h4>
                                <p className="text-sm text-gray-600">Lakukan survei dan penilaian</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">📄</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">4. Laporan</h4>
                                <p className="text-sm text-gray-600">Generate laporan profesional</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    {!auth.user && (
                        <div className="text-center bg-blue-600 rounded-xl p-12 text-white">
                            <h2 className="text-3xl font-bold mb-4">
                                Siap Meningkatkan Efisiensi Kantor Anda?
                            </h2>
                            <p className="text-xl mb-8 opacity-90">
                                Bergabunglah dengan sistem manajemen terdepan untuk kantor penilai publik
                            </p>
                            <div className="flex justify-center space-x-4">
                                <Link href="/register">
                                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                                        🚀 Daftar Gratis
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
                                        📞 Demo Sistem
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-gray-400">
                            © 2024 Appraisal Pro. Sistem Manajemen Kantor Penilai Publik Indonesia.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}