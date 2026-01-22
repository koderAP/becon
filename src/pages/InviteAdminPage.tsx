import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus, RefreshCw, Copy, Check, Users, Key, Upload, Mail } from 'lucide-react';
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

interface BulkResult {
    summary: {
        total: number;
        passesAssigned: number;
        invitesCreated: number;
        skipped: number;
        errors: number;
    };
    details: Array<{
        email: string;
        status: string;
        code?: string;
        currentPass?: string;
        error?: string;
    }>;
}

export default function InviteAdminPage() {
    const [invites, setInvites] = useState<InviteCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const navigate = useNavigate();

    // Create Form State
    const [passType, setPassType] = useState('gold');
    const [count, setCount] = useState(1);
    const [activeTab, setActiveTab] = useState<'create' | 'bulk' | 'list'>('create');
    const [checkingAuth, setCheckingAuth] = useState(true);

    // Bulk Email State
    const [bulkEmails, setBulkEmails] = useState('');
    const [bulkPassType, setBulkPassType] = useState('gold');
    const [bulkProcessing, setBulkProcessing] = useState(false);
    const [bulkResult, setBulkResult] = useState<BulkResult | null>(null);

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

    const handleBulkSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBulkProcessing(true);
        setBulkResult(null);

        // Parse emails - split by comma, newline, space, or semicolon
        const emailList = bulkEmails
            .split(/[\s,;\n]+/)
            .map(e => e.trim())
            .filter(e => e.length > 0);

        if (emailList.length === 0) {
            toast.error('Please enter at least one email');
            setBulkProcessing(false);
            return;
        }

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('adminToken');

            const response = await fetch(`${API_URL}/api/admin/invites/bulk-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ emails: emailList, passType: bulkPassType })
            });

            if (!response.ok) throw new Error('Failed to process bulk invites');

            const data = await response.json();
            setBulkResult(data);
            toast.success(data.message);
            fetchInvites(); // Refresh list
        } catch (error) {
            toast.error('Error processing bulk invites');
        } finally {
            setBulkProcessing(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setBulkEmails(content);
            toast.success(`Loaded ${file.name}`);
        };
        reader.readAsText(file);
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
                            onClick={() => setActiveTab('bulk')}
                            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'bulk'
                                ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                                : 'hover:bg-white/5 text-gray-400'
                                }`}
                        >
                            <Mail size={18} /> Bulk Email
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
                                            <option value="priority">Priority Pass</option>
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

                        {activeTab === 'bulk' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#1A1425] border border-white/5 rounded-2xl p-8"
                            >
                                <h2 className="text-xl font-bold mb-2">Bulk Email Invite</h2>
                                <p className="text-gray-400 text-sm mb-6">Paste emails or upload a file. Existing users get passes directly, new emails get invite codes.</p>

                                <form onSubmit={handleBulkSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Pass Type</label>
                                        <select
                                            value={bulkPassType}
                                            onChange={(e) => setBulkPassType(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-purple-500 outline-none"
                                        >
                                            <option value="gold">Gold Pass</option>
                                            <option value="platinum">Platinum Pass</option>
                                            <option value="priority">Priority Pass</option>
                                            <option value="silver">Silver Pass</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm text-gray-400">Emails (comma, space, or newline separated)</label>
                                            <label className="cursor-pointer text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                                                <Upload size={14} />
                                                Upload File
                                                <input
                                                    type="file"
                                                    accept=".txt,.csv"
                                                    onChange={handleFileUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        <textarea
                                            value={bulkEmails}
                                            onChange={(e) => setBulkEmails(e.target.value)}
                                            placeholder="email1@example.com&#10;email2@example.com&#10;email3@example.com"
                                            rows={8}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 focus:border-purple-500 outline-none resize-y font-mono text-sm"
                                        />
                                        <p className="text-xs text-gray-500">
                                            {bulkEmails.split(/[\s,;\n]+/).filter(e => e.includes('@')).length} valid emails detected
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={bulkProcessing}
                                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        {bulkProcessing ? <RefreshCw className="animate-spin" /> : <Mail />}
                                        Process Emails
                                    </button>
                                </form>

                                {/* Results */}
                                {bulkResult && (
                                    <div className="mt-8 p-6 bg-black/30 rounded-xl border border-white/5">
                                        <h3 className="font-bold mb-4">Results</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                                            <div className="text-center p-3 bg-white/5 rounded-lg">
                                                <div className="text-2xl font-bold">{bulkResult.summary.total}</div>
                                                <div className="text-xs text-gray-400">Total</div>
                                            </div>
                                            <div className="text-center p-3 bg-green-500/10 rounded-lg">
                                                <div className="text-2xl font-bold text-green-400">{bulkResult.summary.passesAssigned}</div>
                                                <div className="text-xs text-gray-400">Passes Assigned</div>
                                            </div>
                                            <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-400">{bulkResult.summary.invitesCreated}</div>
                                                <div className="text-xs text-gray-400">Invites Created</div>
                                            </div>
                                            <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                                                <div className="text-2xl font-bold text-yellow-400">{bulkResult.summary.skipped}</div>
                                                <div className="text-xs text-gray-400">Skipped</div>
                                            </div>
                                            <div className="text-center p-3 bg-red-500/10 rounded-lg">
                                                <div className="text-2xl font-bold text-red-400">{bulkResult.summary.errors}</div>
                                                <div className="text-xs text-gray-400">Errors</div>
                                            </div>
                                        </div>

                                        <details className="text-sm">
                                            <summary className="cursor-pointer text-gray-400 hover:text-white">View Details ({bulkResult.details.length} entries)</summary>
                                            <div className="mt-4 max-h-64 overflow-y-auto space-y-1">
                                                {bulkResult.details.map((d, i) => (
                                                    <div key={i} className="flex items-center justify-between py-1 px-2 rounded bg-white/2 text-xs font-mono">
                                                        <span className="text-gray-300">{d.email}</span>
                                                        <span className={`px-2 py-0.5 rounded ${d.status === 'pass_assigned' ? 'bg-green-500/20 text-green-400' :
                                                            d.status === 'invite_created' ? 'bg-blue-500/20 text-blue-400' :
                                                                d.status === 'already_has_pass' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                    'bg-red-500/20 text-red-400'
                                                            }`}>
                                                            {d.status.replace(/_/g, ' ')}
                                                            {d.code && ` (${d.code})`}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </details>
                                    </div>
                                )}
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
