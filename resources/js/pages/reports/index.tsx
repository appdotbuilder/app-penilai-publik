import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

export default function ReportsIndex() {
    return (
        <AppShell>
            <Head title="Laporan & Analitik" />
            
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">📊 Laporan & Analitik</h1>
                    <p className="text-gray-600 mt-1">Dashboard analitik dan laporan komprehensif</p>
                </div>

                {/* Report Categories */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-4">📈</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Laporan Keuangan</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Analisis pendapatan, biaya operasional, dan profitabilitas
                        </p>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                            💰 Lihat Laporan Keuangan
                        </Button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-4">📋</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Laporan Operasional</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Status proyek, produktivitas tim, dan kinerja operasional
                        </p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            ⚡ Lihat Laporan Operasional
                        </Button>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                        <div className="text-3xl mb-4">👥</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Laporan Klien</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Analisis kepuasan klien, retensi, dan akuisisi
                        </p>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            🤝 Lihat Laporan Klien
                        </Button>
                    </div>
                </div>

                {/* Quick Stats Dashboard */}
                <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">📊 Dashboard Ringkas</h2>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl mb-2">💼</div>
                            <div className="text-2xl font-bold text-gray-900">0</div>
                            <div className="text-sm text-gray-600">Proyek Bulan Ini</div>
                        </div>
                        
                        <div className="text-center">
                            <div className="text-3xl mb-2">💰</div>
                            <div className="text-2xl font-bold text-green-600">Rp 0</div>
                            <div className="text-sm text-gray-600">Pendapatan Bulan Ini</div>
                        </div>
                        
                        <div className="text-center">
                            <div className="text-3xl mb-2">📈</div>
                            <div className="text-2xl font-bold text-blue-600">0%</div>
                            <div className="text-sm text-gray-600">Tingkat Penyelesaian</div>
                        </div>
                        
                        <div className="text-center">
                            <div className="text-3xl mb-2">⭐</div>
                            <div className="text-2xl font-bold text-yellow-600">0.0</div>
                            <div className="text-sm text-gray-600">Rating Kepuasan</div>
                        </div>
                    </div>
                </div>

                {/* Export Options */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">📥 Export Data</h2>
                    <p className="text-gray-600 mb-6">
                        Export data dalam berbagai format untuk analisis lebih lanjut
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                        <Button variant="outline" className="flex items-center justify-center">
                            📊 Export Excel
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center">
                            📄 Export PDF
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center">
                            📋 Export CSV
                        </Button>
                    </div>
                </div>

                {/* Coming Soon Features */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="text-center">
                        <div className="text-4xl mb-4">🚀</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Fitur Akan Datang</h3>
                        <p className="text-gray-600 mb-4">
                            Laporan real-time, analytics mendalam, dan dashboard interaktif sedang dalam pengembangan
                        </p>
                        <div className="flex justify-center space-x-4 text-sm text-gray-500">
                            <span>🔄 Real-time Analytics</span>
                            <span>📈 Trend Analysis</span>
                            <span>🎯 Predictive Insights</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}