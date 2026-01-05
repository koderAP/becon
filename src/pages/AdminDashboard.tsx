import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LogOut, Users, FileText, Calendar, Settings, Plus, Edit2, Trash2,
    Eye, EyeOff, Star, Loader2, X, Save, Download, Upload, Image
} from 'lucide-react';
import { toast } from 'sonner';
import { apiRequest, clearAuthToken } from '../lib/api';

interface FormField {
    name: string;
    label: string;
    type: "text" | "email" | "tel" | "url" | "number" | "select" | "textarea";
    required: boolean;
    options?: string[];
}

interface Event {
    id: string;
    name: string;
    description: string | null;
    date: string;
    endDate: string | null;
    location: string | null;
    type: string;
    imageUrl: string | null;
    isFeatured: boolean;
    isPublished: boolean;
    formFields: string;
    _count: { registrations: number };
}

const defaultFormFields: FormField[] = [
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    { name: "college", label: "College/Institution", type: "text", required: true },
    { name: "year", label: "Year of Study", type: "select", required: true, options: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Alumni", "Faculty"] },
];

const eventTypes = ["workshop", "hackathon", "talk", "competition", "networking", "other"];

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState<any>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [showRegistrations, setShowRegistrations] = useState<string | null>(null);
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        endDate: "",
        location: "",
        type: "workshop",
        imageUrl: "",
        isFeatured: false,
        isPublished: true,
        formFields: defaultFormFields,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (retryCount = 0) => {
        try {
            const [adminRes, eventsRes] = await Promise.all([
                apiRequest("/api/admin/me"),
                apiRequest("/api/admin/events"),
            ]);
            setAdmin(adminRes.admin);
            setEvents(eventsRes.events || []);
        } catch (error: any) {
            if (error.message?.includes("authentication") || error.message?.includes("Unauthorized")) {
                if (retryCount < 1) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    return fetchData(retryCount + 1);
                }
                navigate("/admin/login");
            } else {
                toast.error("Failed to load data");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await apiRequest("/api/admin/logout", "POST");
        } catch (error) {
            // Continue with logout even if API fails
        }
        clearAuthToken('admin');
        setAdmin(null);
        navigate("/admin/login");
    };

    const openCreateModal = () => {
        setEditingEvent(null);
        setFormData({
            name: "",
            description: "",
            date: "",
            endDate: "",
            location: "",
            type: "workshop",
            imageUrl: "",
            isFeatured: false,
            isPublished: true,
            formFields: defaultFormFields,
        });
        setShowModal(true);
    };

    const openEditModal = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            name: event.name,
            description: event.description || "",
            date: event.date.slice(0, 16),
            endDate: event.endDate?.slice(0, 16) || "",
            location: event.location || "",
            type: event.type,
            imageUrl: event.imageUrl || "",
            isFeatured: event.isFeatured,
            isPublished: event.isPublished,
            formFields: JSON.parse(event.formFields || "[]"),
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.date) {
            toast.error("Name and date are required");
            return;
        }

        setSaving(true);
        try {
            const payload = {
                ...formData,
                formFields: formData.formFields,
            };

            if (editingEvent) {
                await apiRequest(`/api/admin/events/${editingEvent.id}`, "PUT", payload);
                toast.success("Event updated successfully");
            } else {
                await apiRequest("/api/admin/events", "POST", payload);
                toast.success("Event created successfully");
            }

            setShowModal(false);
            fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to save event");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (eventId: string) => {
        if (!confirm("Are you sure you want to delete this event? All registrations will be lost.")) {
            return;
        }

        try {
            await apiRequest(`/api/admin/events/${eventId}`, "DELETE");
            toast.success("Event deleted");
            fetchData();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete event");
        }
    };

    const viewRegistrations = async (eventId: string) => {
        try {
            const res = await apiRequest(`/api/admin/events/${eventId}/registrations`);
            setRegistrations(res.registrations || []);
            setShowRegistrations(eventId);
        } catch (error: any) {
            toast.error("Failed to load registrations");
        }
    };

    const toggleFormField = (fieldName: string) => {
        const exists = formData.formFields.find(f => f.name === fieldName);
        if (exists) {
            setFormData({
                ...formData,
                formFields: formData.formFields.filter(f => f.name !== fieldName),
            });
        } else {
            const field = defaultFormFields.find(f => f.name === fieldName);
            if (field) {
                setFormData({
                    ...formData,
                    formFields: [...formData.formFields, field],
                });
            }
        }
    };

    const exportCSV = () => {
        if (registrations.length === 0) return;

        const headers = ["Email", "Username", "Registered At"];
        const formDataKeys = Object.keys(registrations[0]?.formData || {});
        headers.push(...formDataKeys);

        const rows = registrations.map(reg => {
            const row = [
                reg.user.email,
                reg.user.username || "",
                new Date(reg.createdAt).toLocaleString()
            ];
            formDataKeys.forEach(key => {
                const val = reg.formData[key];
                row.push(Array.isArray(val) ? val.join("; ") : (val || ""));
            });
            return row;
        });

        const csv = [headers, ...rows]
            .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `event_registrations.csv`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("CSV downloaded!");
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
                                <h1 className="text-white font-bold">Admin Dashboard</h1>
                                <p className="text-[#BBC5F2]/50 text-xs">Welcome, {admin?.name}</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-1 bg-[#0F0C1A] p-1 rounded-lg border border-[#7A32E0]/20">
                            <button className="px-4 py-1.5 bg-[#7A32E0] text-white rounded-md text-sm font-medium">
                                Events
                            </button>
                            <button
                                onClick={() => navigate('/admin/forms')}
                                className="px-4 py-1.5 text-[#BBC5F2] hover:text-white hover:bg-white/5 rounded-md text-sm font-medium transition"
                            >
                                Forms
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Actions Bar */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Events</h2>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg font-medium hover:opacity-90 transition"
                    >
                        <Plus className="w-4 h-4" /> Create Event
                    </button>
                </div>

                {/* Events Grid */}
                {events.length === 0 ? (
                    <div className="text-center py-16 bg-[#1A1425] rounded-2xl border border-[#7A32E0]/20">
                        <Calendar className="w-12 h-12 text-[#7A32E0]/50 mx-auto mb-4" />
                        <p className="text-[#BBC5F2]/70">No events yet. Create your first event!</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-xl p-5"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        {event.isFeatured && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                                        {event.isPublished ? (
                                            <Eye className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <EyeOff className="w-4 h-4 text-red-400" />
                                        )}
                                    </div>
                                    <span className="px-2 py-0.5 bg-[#7A32E0]/20 text-[#B488FF] text-xs rounded-full capitalize">
                                        {event.type}
                                    </span>
                                </div>

                                <h3 className="text-white font-semibold text-lg mb-2">{event.name}</h3>
                                <p className="text-[#BBC5F2]/60 text-sm mb-3 line-clamp-2">
                                    {event.description || "No description"}
                                </p>

                                <div className="text-[#BBC5F2]/50 text-xs mb-4">
                                    <p>{new Date(event.date).toLocaleDateString()} • {event.location || "TBD"}</p>
                                    <p className="mt-1 flex items-center gap-1">
                                        <Users className="w-3 h-3" /> {event._count?.registrations || 0} registrations
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => viewRegistrations(event.id)}
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-[#7A32E0]/30 text-[#B488FF] rounded-lg hover:bg-[#7A32E0]/20 transition text-sm"
                                    >
                                        <Users className="w-3 h-3" /> View
                                    </button>
                                    <button
                                        onClick={() => openEditModal(event)}
                                        className="px-3 py-2 border border-[#7A32E0]/30 text-[#B488FF] rounded-lg hover:bg-[#7A32E0]/20 transition"
                                    >
                                        <Edit2 className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event.id)}
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

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">
                                {editingEvent ? "Edit Event" : "Create Event"}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-[#BBC5F2]/50 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block">Event Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                    placeholder="AI Workshop 2026"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:border-[#7A32E0]"
                                    placeholder="Event description..."
                                />
                            </div>

                            {/* Date & End Date */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-[#BBC5F2] mb-1 block">Start Date *</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-[#BBC5F2] mb-1 block">End Date</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                    />
                                </div>
                            </div>

                            {/* Location & Type */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-[#BBC5F2] mb-1 block">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                        placeholder="IIT Delhi, LHC"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-[#BBC5F2] mb-1 block">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                    >
                                        {eventTypes.map((t) => (
                                            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block flex items-center gap-2">
                                    <Image className="w-4 h-4" /> Event Image URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                    placeholder="https://example.com/image.jpg"
                                />
                                {formData.imageUrl && (
                                    <div className="mt-2 rounded-lg overflow-hidden border border-[#7A32E0]/20">
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-32 object-cover" />
                                    </div>
                                )}
                            </div>

                            {/* Toggles */}
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isFeatured}
                                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                        className="w-4 h-4 accent-[#7A32E0]"
                                    />
                                    <span className="text-[#BBC5F2] text-sm">Featured Event</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isPublished}
                                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                        className="w-4 h-4 accent-[#7A32E0]"
                                    />
                                    <span className="text-[#BBC5F2] text-sm">Published</span>
                                </label>
                            </div>

                            {/* Form Fields */}
                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-2 block">Registration Form Fields</label>
                                <div className="flex flex-wrap gap-2">
                                    {defaultFormFields.map((field) => {
                                        const isSelected = formData.formFields.some(f => f.name === field.name);
                                        return (
                                            <button
                                                key={field.name}
                                                type="button"
                                                onClick={() => toggleFormField(field.name)}
                                                className={`px-3 py-1.5 rounded-full text-sm transition-all ${isSelected
                                                    ? "bg-[#7A32E0] text-white"
                                                    : "bg-[#0F0C1A] text-[#BBC5F2]/70 border border-[#7A32E0]/20"
                                                    }`}
                                            >
                                                {field.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 border border-[#7A32E0]/30 text-[#BBC5F2] rounded-lg hover:bg-[#7A32E0]/10 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save</>}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Registrations Modal */}
            {showRegistrations && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Registrations ({registrations.length})</h3>
                            <button onClick={() => setShowRegistrations(null)} className="text-[#BBC5F2]/50 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {registrations.length === 0 ? (
                            <p className="text-[#BBC5F2]/70 text-center py-8">No registrations yet.</p>
                        ) : (
                            <>
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={exportCSV}
                                        className="flex items-center gap-2 px-4 py-2 border border-[#7A32E0]/30 text-[#B488FF] rounded-lg hover:bg-[#7A32E0]/20 transition"
                                    >
                                        <Download className="w-4 h-4" /> Export CSV
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-[#7A32E0]/20">
                                                <th className="text-left py-3 px-2 text-[#BBC5F2]">Email</th>
                                                <th className="text-left py-3 px-2 text-[#BBC5F2]">Username</th>
                                                <th className="text-left py-3 px-2 text-[#BBC5F2]">Form Data</th>
                                                <th className="text-left py-3 px-2 text-[#BBC5F2]">Registered</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {registrations.map((reg) => (
                                                <tr key={reg.id} className="border-b border-[#7A32E0]/10">
                                                    <td className="py-3 px-2 text-white">{reg.user?.email}</td>
                                                    <td className="py-3 px-2 text-white">{reg.user?.username || "-"}</td>
                                                    <td className="py-3 px-2 text-[#BBC5F2]/70">
                                                        {Object.entries(reg.formData || {}).map(([key, val]) => (
                                                            <span key={key} className="mr-2">
                                                                <span className="text-[#B488FF]">{key}:</span> {String(val)}
                                                            </span>
                                                        ))}
                                                    </td>
                                                    <td className="py-3 px-2 text-[#BBC5F2]/50">
                                                        {new Date(reg.createdAt).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
