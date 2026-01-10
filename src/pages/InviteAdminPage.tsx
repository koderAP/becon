import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, RefreshCw, Copy, Check, Users, Key } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface InviteCode {
    id: string;
    code: string;
    pass_type: string;
    is_used: boolean;
    used_by: string | null;
    created_at: string;
    used_at: string | null;
}

export default function InviteAdminPage() {
    const [invites, setInvites] = useState<InviteCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const navigate = useNavigate();

    // Create Form State
    const [passType, setPassType] = useState('gold');
    const [count, setCount] = useState(1);
    const [activeTab, setActiveTab] = useState<'list' | 'create'>('create');
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        checkAuthAndFetch();
    }, []);

    const checkAuthAndFetch = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            toast.error('Admin access required');
            navigate('/admin/login');
            return;
        }
        setCheckingAuth(false);
        fetchInvites();
    };

    const fetchInvites = async () => {
        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('adminToken');

            const response = await fetch(`${API_URL}/api/admin/invites`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch invites');

            const data = await response.json();
            setInvites(data.invites || []);
        } catch (error) {
            toast.error('Error loading invites');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setGenerating(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('adminToken');

            const response = await fetch(`${API_URL}/api/admin/invites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ passType, count })
            });

            if (!response.ok) throw new Error('Failed to generate invites');

            const data = await response.json();
            toast.success(data.message);
            setInvites([...(data.invites || []), ...invites]); // Optimistic update or refetch
            fetchInvites();
            setActiveTab('list'); // Switch to list view
        } catch (error) {
            toast.error('Error generating invites');
        } finally {
            setGenerating(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    };

    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-[#0F0C1A] flex items-center justify-center">
                <RefreshCw className="text-purple-500 animate-spin w-8 h-8" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0C1A] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/20 rounded-xl">
                            <Key className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Invite Manager</h1>
                            <p className="text-gray-400 text-sm">Create and track one-time use pass codes</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Sidebar / Tabs */}
                    <div className="md:col-span-1 space-y-2">
                        <button
                            onClick={() => setActiveTab('create')}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'create'
                                ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                                : 'hover:bg-white/5 text-gray-400'
                                }`}
                        >
                            <Plus size={18} /> Generate New
                        </button>
                        <button
                            onClick={() => setActiveTab('list')}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'list'
                                ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                                : 'hover:bg-white/5 text-gray-400'
                                }`}
                        >
                            <Users size={18} /> View All Codes
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-3">
                        {activeTab === 'create' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#1A1425] border border-white/5 rounded-2xl p-8"
                            >
                                <h2 className="text-xl font-bold mb-6">Generate New Codes</h2>
                                <form onSubmit={handleGenerate} className="space-y-6 max-w-md">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Pass Type</label>
                                        <select
                                            value={passType}
                                            onChange={(e) => setPassType(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-purple-500 outline-none"
                                        >
                                            <option value="gold">Gold Pass</option>
                                            <option value="platinum">Platinum Pass</option>
                                            <option value="silver">Silver Pass</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Quantity</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="100"
                                            value={count}
                                            onChange={(e) => setCount(parseInt(e.target.value))}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-purple-500 outline-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={generating}
                                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        {generating ? <RefreshCw className="animate-spin" /> : <Plus />}
                                        Generate Codes
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 'list' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#1A1425] border border-white/5 rounded-2xl overflow-hidden"
                            >
                                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                    <h2 className="text-xl font-bold">All Invites</h2>
                                    <button onClick={fetchInvites} className="p-2 hover:bg-white/5 rounded-lg text-gray-400">
                                        <RefreshCw size={18} />
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-white/5 text-gray-400 text-xs uppercase">
                                                <th className="p-4">Code</th>
                                                <th className="p-4">Type</th>
                                                <th className="p-4">Status</th>
                                                <th className="p-4">Used By (User ID)</th>
                                                <th className="p-4">Created At</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-white/5">
                                            {loading ? (
                                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading...</td></tr>
                                            ) : invites.length === 0 ? (
                                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No invites found</td></tr>
                                            ) : (
                                                invites.map((invite) => (
                                                    <tr key={invite.id} className="hover:bg-white/2 transition-colors">
                                                        <td className="p-4 font-mono text-purple-300 flex items-center gap-2">
                                                            {invite.code}
                                                            <button
                                                                onClick={() => copyToClipboard(invite.code)}
                                                                className="text-gray-600 hover:text-white"
                                                            >
                                                                <Copy size={12} />
                                                            </button>
                                                        </td>
                                                        <td className="p-4 capitalize">{invite.pass_type}</td>
                                                        <td className="p-4">
                                                            {invite.is_used ? (
                                                                <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-semibold">Used</span>
                                                            ) : (
                                                                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-semibold">Active</span>
                                                            )}
                                                        </td>
                                                        <td className="p-4 text-gray-500 text-xs font-mono">
                                                            {invite.used_by || '-'}
                                                        </td>
                                                        <td className="p-4 text-gray-500 text-xs">
                                                            {new Date(invite.created_at).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
