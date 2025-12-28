import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FileText, Plus, Edit2, Trash2, Eye, EyeOff, Loader2, Copy,
    ExternalLink, BarChart3, ArrowLeft,
} from 'lucide-react';
import { toast } from 'sonner';
import { apiRequest } from '../lib/api';

interface Form {
    id: string;
    title: string;
    description: string | null;
    isPublished: boolean;
    requireAuth: boolean;
    createdAt: string;
    _count: { fields: number; responses: number };
}

export default function AdminFormsPage() {
    const [loading, setLoading] = useState(true);
    const [forms, setForms] = useState<Form[]>([]);
    const [showCreate, setShowCreate] = useState(false);
    const [creating, setCreating] = useState(false);
    const [newForm, setNewForm] = useState({ title: '', description: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const res = await apiRequest('/api/forms/admin/all');
            setForms(res.forms || []);
        } catch (error: any) {
            if (error.message?.includes('authentication')) {
                navigate('/admin/login');
            } else {
                toast.error('Failed to load forms');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newForm.title) {
            toast.error('Title is required');
            return;
        }

        setCreating(true);
        try {
            const res = await apiRequest('/api/forms/admin', 'POST', newForm);
            toast.success('Form created!');
            setShowCreate(false);
            setNewForm({ title: '', description: '' });
            // Navigate to edit
            navigate(`/admin/forms/${res.form.id}`);
        } catch (error: any) {
            toast.error(error.message || 'Failed to create form');
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this form? All responses will be lost.')) return;

        try {
            await apiRequest(`/api/forms/admin/${id}`, 'DELETE');
            toast.success('Form deleted');
            fetchForms();
        } catch {
            toast.error('Failed to delete form');
        }
    };

    const copyLink = (id: string) => {
        navigator.clipboard.writeText(`${window.location.origin}/forms/${id}`);
        toast.success('Link copied!');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F0C1A] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#7A32E0] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0C1A]">
            {/* Header */}
            <header className="border-b border-[#7A32E0]/20 bg-[#1A1425]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="flex items-center gap-1 text-[#BBC5F2] hover:text-white transition">
                            <ArrowLeft className="w-4 h-4" /> Dashboard
                        </Link>
                        <h1 className="text-white font-bold text-xl">BECon Forms</h1>
                    </div>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg font-medium hover:opacity-90 transition"
                    >
                        <Plus className="w-4 h-4" /> New Form
                    </button>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {forms.length === 0 ? (
                    <div className="text-center py-16 bg-[#1A1425] rounded-2xl border border-[#7A32E0]/20">
                        <FileText className="w-12 h-12 text-[#7A32E0]/50 mx-auto mb-4" />
                        <p className="text-[#BBC5F2]/70 mb-4">No forms yet. Create your first form!</p>
                        <button
                            onClick={() => setShowCreate(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg font-medium hover:opacity-90 transition mx-auto"
                        >
                            <Plus className="w-4 h-4" /> Create Form
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {forms.map((form) => (
                            <motion.div
                                key={form.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-xl p-5"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    {form.isPublished ? (
                                        <span className="flex items-center gap-1 text-green-400 text-xs">
                                            <Eye className="w-3 h-3" /> Published
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-[#BBC5F2]/50 text-xs">
                                            <EyeOff className="w-3 h-3" /> Draft
                                        </span>
                                    )}
                                    <span className="text-[#BBC5F2]/50 text-xs">
                                        {form._count?.fields || 0} fields
                                    </span>
                                </div>

                                <h3 className="text-white font-semibold text-lg mb-2">{form.title}</h3>
                                <p className="text-[#BBC5F2]/60 text-sm mb-4 line-clamp-2">
                                    {form.description || 'No description'}
                                </p>

                                <div className="flex items-center gap-2 text-[#BBC5F2]/50 text-xs mb-4">
                                    <BarChart3 className="w-3 h-3" />
                                    {form._count?.responses || 0} responses
                                </div>

                                <div className="flex gap-2">
                                    <Link to={`/admin/forms/${form.id}`} className="flex-1">
                                        <button className="w-full flex items-center justify-center gap-1 px-3 py-2 border border-[#7A32E0]/30 text-[#B488FF] rounded-lg hover:bg-[#7A32E0]/20 transition text-sm">
                                            <Edit2 className="w-3 h-3" /> Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => copyLink(form.id)}
                                        className="px-3 py-2 border border-[#7A32E0]/30 text-[#B488FF] rounded-lg hover:bg-[#7A32E0]/20 transition"
                                    >
                                        <Copy className="w-3 h-3" />
                                    </button>
                                    {form.isPublished && (
                                        <Link to={`/forms/${form.id}`} target="_blank">
                                            <button className="px-3 py-2 border border-[#7A32E0]/30 text-[#B488FF] rounded-lg hover:bg-[#7A32E0]/20 transition">
                                                <ExternalLink className="w-3 h-3" />
                                            </button>
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => handleDelete(form.id)}
                                        className="px-3 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* Create Modal */}
            {showCreate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-2xl p-6 w-full max-w-md"
                    >
                        <h3 className="text-xl font-bold text-white mb-4">Create New Form</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block">Title *</label>
                                <input
                                    type="text"
                                    value={newForm.title}
                                    onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                    placeholder="Registration Form"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block">Description</label>
                                <textarea
                                    value={newForm.description}
                                    onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                                    rows={3}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:border-[#7A32E0]"
                                    placeholder="Optional description..."
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setShowCreate(false)}
                                    className="flex-1 px-4 py-3 border border-[#7A32E0]/30 text-[#BBC5F2] rounded-lg hover:bg-[#7A32E0]/10 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreate}
                                    disabled={creating}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
                                >
                                    {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
