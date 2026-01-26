import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link as LinkIcon, Plus, Trash2, Edit2, Copy, Check, ExternalLink, BarChart3, X, Loader2, LogOut, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { apiRequest, clearAuthToken } from '../lib/api';

interface TrackingLink {
    id: string;
    slug: string;
    name: string;
    destination_url: string;
    platform: 'android' | 'ios' | 'both';
    is_active: boolean;
    created_at: string;
    stats: {
        clicks: number;
        installs: number;
        firstOpens: number;
    };
}

export default function AdminLinks() {
    const [loading, setLoading] = useState(true);
    const [links, setLinks] = useState<TrackingLink[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingLink, setEditingLink] = useState<TrackingLink | null>(null);
    const [saving, setSaving] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        destinationUrl: '',
        platform: 'both' as 'android' | 'ios' | 'both',
        isActive: true,
    });

    const baseUrl = 'https://becon.edciitd.com';

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const res = await apiRequest('/api/admin/links');
            setLinks(res.links || []);
        } catch (error: any) {
            if (error.message?.includes('Unauthorized')) {
                navigate('/admin/login');
            } else {
                toast.error('Failed to load links');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await apiRequest('/api/admin/logout', 'POST');
        } catch { }
        clearAuthToken('admin');
        navigate('/admin/login');
    };

    const openCreateModal = () => {
        setEditingLink(null);
        setFormData({
            name: '',
            slug: '',
            destinationUrl: '',
            platform: 'both',
            isActive: true,
        });
        setShowModal(true);
    };

    const openEditModal = (link: TrackingLink) => {
        setEditingLink(link);
        setFormData({
            name: link.name,
            slug: link.slug,
            destinationUrl: link.destination_url,
            platform: link.platform,
            isActive: link.is_active,
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.slug || !formData.destinationUrl) {
            toast.error('Name, slug, and destination URL are required');
            return;
        }

        setSaving(true);
        try {
            if (editingLink) {
                await apiRequest(`/api/admin/links/${editingLink.id}`, 'PUT', formData);
                toast.success('Link updated');
            } else {
                await apiRequest('/api/admin/links', 'POST', formData);
                toast.success('Link created');
            }
            setShowModal(false);
            fetchLinks();
        } catch (error: any) {
            toast.error(error.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this link? This cannot be undone.')) return;
        try {
            await apiRequest(`/api/admin/links/${id}`, 'DELETE');
            toast.success('Link deleted');
            setLinks(links.filter(l => l.id !== id));
        } catch {
            toast.error('Failed to delete');
        }
    };

    const handleToggleActive = async (link: TrackingLink) => {
        try {
            await apiRequest(`/api/admin/links/${link.id}`, 'PUT', {
                isActive: !link.is_active
            });
            setLinks(links.map(l =>
                l.id === link.id ? { ...l, is_active: !l.is_active } : l
            ));
            toast.success(link.is_active ? 'Link disabled' : 'Link enabled');
        } catch {
            toast.error('Failed to update');
        }
    };

    const copyToClipboard = (link: TrackingLink) => {
        const url = `${baseUrl}/go/${link.slug}`;
        navigator.clipboard.writeText(url);
        setCopiedId(link.id);
        toast.success('Link copied!');
        setTimeout(() => setCopiedId(null), 2000);
    };

    const generateSlug = (name: string) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
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
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <a href="/">
                                <img src="/logo1.avif" alt="BECon 2026" className="h-10 md:h-12 w-auto object-contain" />
                            </a>
                            <div>
                                <h1 className="text-white font-bold">Link Management</h1>
                                <p className="text-[#BBC5F2]/50 text-xs">Track app downloads</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-1 bg-[#0F0C1A] p-1 rounded-lg border border-[#7A32E0]/20">
                            <button
                                onClick={() => navigate('/admin')}
                                className="px-4 py-1.5 text-[#BBC5F2] hover:text-white hover:bg-white/5 rounded-md text-sm font-medium transition"
                            >
                                Events
                            </button>
                            <button
                                onClick={() => navigate('/admin/forms')}
                                className="px-4 py-1.5 text-[#BBC5F2] hover:text-white hover:bg-white/5 rounded-md text-sm font-medium transition"
                            >
                                Forms
                            </button>
                            <button className="px-4 py-1.5 bg-[#7A32E0] text-white rounded-md text-sm font-medium">
                                Links
                            </button>
                        </nav>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Actions Bar */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Tracking Links</h2>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg font-medium hover:opacity-90 transition"
                    >
                        <Plus className="w-4 h-4" /> Create Link
                    </button>
                </div>

                {/* Links Table */}
                {links.length === 0 ? (
                    <div className="text-center py-16 bg-[#1A1425] rounded-2xl border border-[#7A32E0]/20">
                        <LinkIcon className="w-12 h-12 text-[#7A32E0]/50 mx-auto mb-4" />
                        <p className="text-[#BBC5F2]/70">No tracking links yet. Create your first link!</p>
                    </div>
                ) : (
                    <div className="bg-[#1A1425] rounded-2xl border border-[#7A32E0]/20 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-[#0F0C1A]">
                                <tr>
                                    <th className="text-left text-[#BBC5F2]/70 text-sm font-medium px-6 py-4">Name</th>
                                    <th className="text-left text-[#BBC5F2]/70 text-sm font-medium px-6 py-4 hidden md:table-cell">Link</th>
                                    <th className="text-center text-[#BBC5F2]/70 text-sm font-medium px-4 py-4">Clicks</th>

                                    <th className="text-center text-[#BBC5F2]/70 text-sm font-medium px-4 py-4">Status</th>
                                    <th className="text-right text-[#BBC5F2]/70 text-sm font-medium px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {links.map((link) => (
                                    <tr key={link.id} className="border-t border-[#7A32E0]/10 hover:bg-[#7A32E0]/5 transition">
                                        <td className="px-6 py-4">
                                            <div className="text-white font-medium">{link.name}</div>
                                            <div className="text-[#BBC5F2]/50 text-xs mt-1">{link.platform}</div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <div className="flex items-center gap-2">
                                                <code className="text-[#B488FF] text-sm bg-[#0F0C1A] px-2 py-1 rounded">
                                                    /go/{link.slug}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(link)}
                                                    className="text-[#BBC5F2]/50 hover:text-white transition"
                                                >
                                                    {copiedId === link.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="text-white font-bold text-lg">{link.stats.clicks}</span>
                                        </td>

                                        <td className="px-4 py-4 text-center">
                                            <button
                                                onClick={() => handleToggleActive(link)}
                                                className={`p-2 rounded-lg transition ${link.is_active ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`}
                                            >
                                                {link.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => window.open(`${baseUrl}/go/${link.slug}`, '_blank')}
                                                    className="p-2 text-[#BBC5F2]/50 hover:text-white transition"
                                                    title="Open Link"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(link satisfies TrackingLink)}
                                                    className="p-2 text-[#B488FF] hover:bg-[#7A32E0]/20 rounded-lg transition"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(link.id)}
                                                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-2xl p-6 w-full max-w-md relative shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">
                                {editingLink ? 'Edit Link' : 'Create Tracking Link'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-[#BBC5F2]/50 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block">Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        setFormData({
                                            ...formData,
                                            name,
                                            slug: editingLink ? formData.slug : generateSlug(name)
                                        });
                                    }}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                    placeholder="Instagram Campaign Jan"
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block">Slug *</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#BBC5F2]/50 text-sm">/go/</span>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                                        className="flex-1 bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                        placeholder="instagram-jan"
                                    />
                                </div>
                            </div>

                            {/* Destination URL */}
                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block">Destination URL *</label>
                                <input
                                    type="url"
                                    value={formData.destinationUrl}
                                    onChange={(e) => setFormData({ ...formData, destinationUrl: e.target.value })}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                    placeholder="https://play.google.com/store/apps/..."
                                />
                            </div>

                            {/* Platform */}
                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block">Platform</label>
                                <select
                                    value={formData.platform}
                                    onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                >
                                    <option value="both">Both (Android & iOS)</option>
                                    <option value="android">Android Only</option>
                                    <option value="ios">iOS Only</option>
                                </select>
                            </div>

                            {/* Active Toggle */}
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-5 h-5 rounded border-[#7A32E0]/20 bg-[#0F0C1A] text-[#7A32E0] focus:ring-[#7A32E0]"
                                />
                                <span className="text-[#BBC5F2]">Link is active</span>
                            </label>

                            {/* Save Button */}
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="w-full mt-4 py-3 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : editingLink ? 'Update Link' : 'Create Link'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
