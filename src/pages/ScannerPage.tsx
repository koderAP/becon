import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowLeft, Loader2, User, Ticket, QrCode } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ScanResult {
    message: string;
    passType: string;
    user: {
        full_name: string;
        college: string;
        becon_id: string;
        email: string;
    };
    checkInTime?: string;
}

const ScannerPage: React.FC = () => {
    const navigate = useNavigate();
    const [scanning, setScanning] = useState(true);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastScannedId, setLastScannedId] = useState<string | null>(null);

    const handleScan = async (scannedCodes: { rawValue: string }[]) => {
        if (!scanning || loading || scannedCodes.length === 0) return;

        const rawValue = scannedCodes[0].rawValue;

        // Prevent rapid duplicate scans
        if (rawValue === lastScannedId) return;

        setLoading(true);
        setScanning(false); // Pause scanning
        setLastScannedId(rawValue);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            // Get admin token
            // TODO: Ideally use a better auth hook for admin, but reusing logic from other admin pages
            const adminToken = document.cookie.split('; ').find(row => row.startsWith('adminToken='))?.split('=')[1]
                || localStorage.getItem('adminToken');

            if (!adminToken) {
                toast.error("Unauthorized. Please login as admin.");
                navigate('/admin/login');
                return;
            }

            const response = await fetch(`${API_URL}/api/admin/scan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                },
                body: JSON.stringify({ userId: rawValue }),
            });

            const data = await response.json();

            if (response.ok) {
                setResult(data);
                setError(null);
                toast.success('Check-in Successful!');
            } else {
                // If 409, it means already checked in, which returns user data too
                if (response.status === 409) {
                    setResult(data); // Display user info even if already checked in
                    setError("Already Checked In!");
                    toast.warning('User already checked in.');
                } else {
                    setError(data.message || 'Scan failed');
                    setResult(null);
                    toast.error(data.message || 'Scan failed');
                }
            }
        } catch (err) {
            console.error(err);
            setError('Connection error');
            toast.error('Connection error');
        } finally {
            setLoading(false);
        }
    };

    const resetScan = () => {
        setResult(null);
        setError(null);
        setLastScannedId(null);
        setScanning(true);
    };

    return (
        <div className="min-h-screen bg-[#05020a] text-white p-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />

            <div className="max-w-md mx-auto relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/admin/dashboard" className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex items-center gap-2">
                        <QrCode className="text-purple-400" />
                        <h1 className="text-xl font-bold">Details Scanner</h1>
                    </div>
                    <div className="w-10" />
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative min-h-[400px]">
                    {scanning ? (
                        <div className="relative h-[400px]">
                            <Scanner
                                onScan={handleScan}
                                styles={{
                                    container: { height: '100%', width: '100%' },
                                }}
                                components={{
                                    onOff: true,
                                    torch: true,
                                    zoom: false,
                                    finder: true,
                                }}
                            />
                            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                                <span className="inline-block px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-sm font-medium border border-white/10">
                                    Align QR code within frame
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
                            {loading ? (
                                <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                            ) : result ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full"
                                >
                                    {error ? (
                                        <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6 border border-yellow-500/50">
                                            <XCircle className="w-10 h-10 text-yellow-500" />
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 border border-emerald-500/50">
                                            <CheckCircle className="w-10 h-10 text-emerald-500" />
                                        </div>
                                    )}

                                    <h2 className={`text-2xl font-bold mb-1 ${error ? 'text-yellow-400' : 'text-emerald-400'}`}>
                                        {error ? 'Already Checked In' : 'Access Granted'}
                                    </h2>

                                    {result.checkInTime && (
                                        <p className="text-xs text-gray-500 mb-6">
                                            Checked in at: {new Date(result.checkInTime).toLocaleTimeString()}
                                        </p>
                                    )}

                                    {!result.checkInTime && !error && (
                                        <p className="text-sm text-gray-400 mb-6">Welcome to BECon 2026</p>
                                    )}

                                    {/* PROMINENT PASS TYPE BANNER */}
                                    <div className={`rounded-2xl p-6 mb-6 text-center border-2 ${result.passType === 'platinum'
                                            ? 'bg-gradient-to-br from-cyan-900/50 to-purple-900/50 border-cyan-500/60'
                                            : result.passType === 'gold'
                                                ? 'bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-500/60'
                                                : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-500/60'
                                        }`}>
                                        <img
                                            src={`/passes/${result.passType}.png`}
                                            alt={`${result.passType} Pass`}
                                            className="w-24 h-24 mx-auto mb-3 object-contain drop-shadow-lg"
                                        />
                                        <h3 className={`text-2xl font-bold uppercase tracking-wider ${result.passType === 'platinum' ? 'text-cyan-400'
                                                : result.passType === 'gold' ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}>
                                            {result.passType} Pass
                                        </h3>
                                        <p className="text-xs text-white/60 mt-1">Access Level</p>
                                    </div>

                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-left space-y-4 mb-8">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-lg font-bold">
                                                {result.user.full_name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg leading-tight">{result.user.full_name}</h3>
                                                <p className="text-sm text-gray-400">{result.user.college}</p>
                                                <p className="text-xs text-purple-400 mt-1 font-mono">{result.user.becon_id}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={resetScan}
                                        className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                                    >
                                        <QrCode size={18} />
                                        Scan Next
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6 border border-red-500/50">
                                        <XCircle className="w-10 h-10 text-red-500" />
                                    </div>
                                    <h2 className="text-xl font-bold text-red-400 mb-2">Scan Failed</h2>
                                    <p className="text-gray-400 mb-8 max-w-[200px] mx-auto">{error || "Could not verify pass details."}</p>
                                    <button
                                        onClick={resetScan}
                                        className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScannerPage;
