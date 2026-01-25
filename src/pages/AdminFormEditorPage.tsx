import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Plus, Trash2, GripVertical, Save, Loader2, Eye, Settings,
    BarChart3, X, Download, Edit2, Image, Upload, HelpCircle, Layers,
} from 'lucide-react';
import { apiRequest } from '../lib/api';
import { toast } from 'sonner';
import RichTextEditor from '../components/RichTextEditor';
import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor,
    useSensor, useSensors, DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, sortableKeyboardCoordinates,
    useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface FormField {
    id: string;
    label: string;
    type: string;
    required: boolean;
    options: string[];
    placeholder: string | null;
    imageUrl: string | null;
    section: number;
    order: number;
}

interface Form {
    id: string;
    title: string;
    description: string | null;
    bannerUrl: string | null;
    isPublished: boolean;
    requireAuth: boolean;
    fields: FormField[];
    _count: { responses: number };
}

interface Response {
    id: string;
    data: Record<string, any>;
    createdAt: string;
}

const fieldTypes = [
    { value: "text", label: "Short Text" },
    { value: "textarea", label: "Long Text" },
    { value: "email", label: "Email" },
    { value: "tel", label: "Phone" },
    { value: "url", label: "URL / Link" },
    { value: "number", label: "Number" },
    { value: "date", label: "Date" },
    { value: "select", label: "Dropdown" },
    { value: "radio", label: "Radio Buttons" },
    { value: "checkbox", label: "Checkboxes" },
    { value: "file", label: "File Upload" },
];

// Sortable Field Item Component
function SortableFieldItem({
    field, onEdit, onDelete
}: {
    field: FormField;
    onEdit: (field: FormField) => void;
    onDelete: (id: string) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-xl p-4 flex items-center gap-4 mb-2">
            <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing touch-none">
                <GripVertical className="w-5 h-5 text-[#BBC5F2]/30 hover:text-[#BBC5F2]/60" />
            </button>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{field.label}</span>
                    {field.required && <span className="text-red-400 text-xs">*required</span>}
                    {field.imageUrl && <Image className="w-4 h-4 text-[#B488FF]" />}
                </div>
                <p className="text-[#BBC5F2]/50 text-sm capitalize">{field.type}</p>
            </div>
            <button onClick={() => onEdit(field)} className="p-2 text-[#B488FF] hover:bg-[#7A32E0]/10 rounded-lg">
                <Edit2 className="w-4 h-4" />
            </button>
            <button onClick={() => onDelete(field.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}

export default function AdminFormEditorPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState<Form | null>(null);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"fields" | "responses" | "settings" | "help">("fields");
    const [responses, setResponses] = useState<Response[]>([]);
    const [showAddField, setShowAddField] = useState(false);
    const [editingField, setEditingField] = useState<FormField | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingFieldImage, setUploadingFieldImage] = useState(false);
    const [newField, setNewField] = useState({
        label: "", type: "text", required: false, placeholder: "", options: [""], imageUrl: "", section: 0,
    });

    const getSections = () => {
        if (!form) return [0];
        const sections = [...new Set(form.fields.map(f => f.section || 0))].sort((a, b) => a - b);
        return sections.length > 0 ? sections : [0];
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id || !form) return;

        const oldIndex = form.fields.findIndex(f => f.id === active.id);
        const newIndex = form.fields.findIndex(f => f.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return;

        const reorderedFields = arrayMove(form.fields, oldIndex, newIndex);
        setForm({ ...form, fields: reorderedFields });

        try {
            const fieldOrders = reorderedFields.map((f, index) => ({ id: f.id, order: index }));
            await apiRequest(`/api/forms/admin/${id}/fields/reorder`, "PUT", { fieldOrders });
            toast.success("Field order updated!");
        } catch {
            toast.error("Failed to save field order");
            fetchForm();
        }
    };

    useEffect(() => {
        if (id) fetchForm();
    }, [id]);

    const handleImageUpload = async (file: File) => {
        if (!form) return;
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image too large. Please use an image under 2MB.");
            return;
        }
        setUploadingImage(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setForm({ ...form, bannerUrl: reader.result as string });
            toast.success("Image loaded!");
            setUploadingImage(false);
        };
        reader.onerror = () => {
            toast.error("Failed to read file");
            setUploadingImage(false);
        };
    };

    const handleFieldImageUpload = async (file: File) => {
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image too large. Please use an image under 2MB.");
            return;
        }
        setUploadingFieldImage(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setNewField({ ...newField, imageUrl: reader.result as string });
            toast.success("Image loaded!");
            setUploadingFieldImage(false);
        };
        reader.onerror = () => {
            toast.error("Failed to read file");
            setUploadingFieldImage(false);
        };
    };

    const fetchForm = async () => {
        try {
            const res = await apiRequest(`/api/forms/admin/${id}`);
            setForm(res.form);
        } catch (error: any) {
            if (error.message?.includes("authentication")) {
                navigate("/admin/login");
            } else {
                toast.error("Failed to load form");
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchResponses = async () => {
        try {
            const res = await apiRequest(`/api/forms/admin/${id}/responses`);
            setResponses(res.responses);
        } catch {
            toast.error("Failed to load responses");
        }
    };

    const handleSaveSettings = async () => {
        if (!form) return;
        setSaving(true);
        try {
            await apiRequest(`/api/forms/admin/${id}`, "PUT", {
                title: form.title,
                description: form.description || null,
                bannerUrl: form.bannerUrl || null,
                isPublished: form.isPublished,
                requireAuth: form.requireAuth,
            });
            toast.success("Form saved");
        } catch (error: any) {
            toast.error(error.message || "Failed to save");
        } finally {
            setSaving(false);
        }
    };

    const handleAddField = async () => {
        if (!newField.label) {
            toast.error("Label is required");
            return;
        }
        try {
            const payload = {
                label: newField.label,
                type: newField.type,
                required: newField.required,
                placeholder: newField.placeholder || null,
                imageUrl: newField.imageUrl || null,
                section: newField.section || 0,
                options: ["select", "radio", "checkbox"].includes(newField.type)
                    ? newField.options.filter(o => o.trim())
                    : undefined,
            };
            const res = await apiRequest(`/api/forms/admin/${id}/fields`, "POST", payload);
            setForm(f => f ? { ...f, fields: [...f.fields, res.field] } : null);
            setShowAddField(false);
            setNewField({ label: "", type: "text", required: false, placeholder: "", options: [""], imageUrl: "", section: 0 });
            toast.success("Field added");
        } catch {
            toast.error("Failed to add field");
        }
    };

    const handleDeleteField = async (fieldId: string) => {
        try {
            await apiRequest(`/api/forms/admin/${id}/fields/${fieldId}`, "DELETE");
            setForm(f => f ? { ...f, fields: f.fields.filter(field => field.id !== fieldId) } : null);
            toast.success("Field deleted");
        } catch {
            toast.error("Failed to delete field");
        }
    };

    const handleEditField = (field: FormField) => {
        setEditingField(field);
        setNewField({
            label: field.label,
            type: field.type,
            required: field.required,
            placeholder: field.placeholder || "",
            options: (field.options || []).length > 0 ? field.options : [""],
            imageUrl: field.imageUrl || "",
            section: field.section || 0,
        });
        setShowAddField(true);
    };

    const handleUpdateField = async () => {
        if (!editingField || !newField.label) {
            toast.error("Label is required");
            return;
        }
        try {
            const payload = {
                label: newField.label,
                type: newField.type,
                required: newField.required,
                placeholder: newField.placeholder || null,
                imageUrl: newField.imageUrl || null,
                section: newField.section || 0,
                options: ["select", "radio", "checkbox"].includes(newField.type)
                    ? newField.options.filter(o => o.trim())
                    : [],
            };
            const res = await apiRequest(`/api/forms/admin/${id}/fields/${editingField.id}`, "PUT", payload);
            setForm(f => f ? { ...f, fields: f.fields.map(field => field.id === editingField.id ? res.field : field) } : null);
            setShowAddField(false);
            setEditingField(null);
            setNewField({ label: "", type: "text", required: false, placeholder: "", options: [""], imageUrl: "", section: 0 });
            toast.success("Field updated");
        } catch {
            toast.error("Failed to update field");
        }
    };

    const addOption = () => setNewField(f => ({ ...f, options: [...f.options, ""] }));
    const updateOption = (index: number, value: string) => {
        setNewField(f => {
            const opts = [...f.options];
            opts[index] = value;
            return { ...f, options: opts };
        });
    };
    const removeOption = (index: number) => setNewField(f => ({ ...f, options: (f.options || []).filter((_, i) => i !== index) }));

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F0C1A] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#7A32E0] animate-spin" />
            </div>
        );
    }

    if (!form) {
        return (
            <div className="min-h-screen bg-[#0F0C1A] flex items-center justify-center text-white">
                Form not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0C1A]">
            {/* Header */}
            <header className="border-b border-[#7A32E0]/20 bg-[#1A1425]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/forms" className="flex items-center gap-1 text-[#BBC5F2] hover:text-white transition">
                            <ArrowLeft className="w-4 h-4" /> Back
                        </Link>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="bg-transparent border-none text-white text-xl font-bold focus:outline-none"
                            placeholder="Form Title"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        {form.isPublished && (
                            <Link to={`/forms/${id}`} target="_blank" className="flex items-center gap-2 px-3 py-2 text-[#BBC5F2] hover:text-white transition">
                                <Eye className="w-4 h-4" /> Preview
                            </Link>
                        )}
                        <button
                            onClick={handleSaveSettings}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg font-medium disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Save</>}
                        </button>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="border-b border-[#7A32E0]/20 bg-[#1A1425]/50">
                <div className="max-w-7xl mx-auto px-6 flex gap-6">
                    {[
                        { id: "fields", label: "Fields", icon: GripVertical },
                        { id: "responses", label: `Responses (${form._count.responses})`, icon: BarChart3 },
                        { id: "settings", label: "Settings", icon: Settings },
                        { id: "help", label: "Help", icon: HelpCircle },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id as any);
                                if (tab.id === "responses") fetchResponses();
                            }}
                            className={`flex items-center gap-2 py-3 px-1 border-b-2 transition-colors ${activeTab === tab.id
                                ? "border-[#7A32E0] text-white"
                                : "border-transparent text-[#BBC5F2]/60 hover:text-white"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                {activeTab === "fields" && (
                    <div className="space-y-4">
                        {getSections().length > 1 && (
                            <div className="bg-[#7A32E0]/10 border border-[#7A32E0]/30 rounded-lg p-3 flex items-center gap-2">
                                <Layers className="w-4 h-4 text-[#B488FF]" />
                                <span className="text-[#BBC5F2] text-sm">
                                    This form has {getSections().length} sections/pages.
                                </span>
                            </div>
                        )}

                        {form.fields.length === 0 ? (
                            <div className="text-center py-12 bg-[#1A1425] rounded-2xl border border-[#7A32E0]/20">
                                <p className="text-[#BBC5F2]/70 mb-4">No fields yet. Add your first field!</p>
                            </div>
                        ) : (
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={form.fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                                    {getSections().map(sectionNum => (
                                        <div key={sectionNum}>
                                            {getSections().length > 1 && (
                                                <div className="text-[#B488FF] text-sm font-medium mb-2 flex items-center gap-2">
                                                    <Layers className="w-4 h-4" />
                                                    Section {sectionNum + 1}
                                                </div>
                                            )}
                                            {form.fields
                                                .filter(f => (f.section || 0) === sectionNum)
                                                .map((field) => (
                                                    <SortableFieldItem
                                                        key={field.id}
                                                        field={field}
                                                        onEdit={handleEditField}
                                                        onDelete={handleDeleteField}
                                                    />
                                                ))}
                                        </div>
                                    ))}
                                </SortableContext>
                            </DndContext>
                        )}

                        <button
                            onClick={() => setShowAddField(true)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-[#7A32E0]/30 text-[#B488FF] rounded-xl hover:bg-[#7A32E0]/10 transition"
                        >
                            <Plus className="w-4 h-4" /> Add Field
                        </button>
                    </div>
                )}

                {activeTab === "responses" && (
                    <div>
                        {responses.length === 0 ? (
                            <div className="text-center py-12 bg-[#1A1425] rounded-2xl border border-[#7A32E0]/20">
                                <p className="text-[#BBC5F2]/70">No responses yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => {
                                            const headers = ["Submitted At", ...form.fields.map(f => f.label)];
                                            const rows = responses.map(resp => {
                                                const row = [new Date(resp.createdAt).toLocaleString()];
                                                form.fields.forEach(field => {
                                                    const val = resp.data[field.id];
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
                                            a.download = `${form.title.replace(/\s+/g, "_")}_responses.csv`;
                                            a.click();
                                            URL.revokeObjectURL(url);
                                            toast.success("CSV downloaded!");
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 border border-[#7A32E0]/30 text-[#B488FF] rounded-lg hover:bg-[#7A32E0]/20 transition"
                                    >
                                        <Download className="w-4 h-4" /> Export CSV
                                    </button>
                                </div>
                                {responses.map((resp) => (
                                    <div key={resp.id} className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-xl p-4">
                                        <div className="text-[#BBC5F2]/50 text-xs mb-3">
                                            {new Date(resp.createdAt).toLocaleString()}
                                        </div>
                                        <div className="grid gap-2">
                                            {form.fields.map((field) => (
                                                <div key={field.id} className="flex gap-2">
                                                    <span className="text-[#B488FF] text-sm">{field.label}:</span>
                                                    <span className="text-white text-sm">
                                                        {Array.isArray(resp.data[field.id])
                                                            ? resp.data[field.id].join(", ")
                                                            : (
                                                                (() => {
                                                                    const val = String(resp.data[field.id] || "-");
                                                                    return val.trim().startsWith('http') ? (
                                                                        <a
                                                                            href={val}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-400 hover:text-blue-300 underline break-all"
                                                                        >
                                                                            View Link
                                                                        </a>
                                                                    ) : val;
                                                                })()
                                                            )
                                                        }
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-2xl p-6 space-y-6">
                        <div>
                            <label className="text-sm text-[#BBC5F2] mb-1 block">Form Description</label>
                            <RichTextEditor
                                value={form.description || ""}
                                onChange={(val) => setForm({ ...form, description: val })}
                                preventDrag
                            />
                        </div>

                        <div>
                            <label className="text-sm text-[#BBC5F2] mb-1 block flex items-center gap-2">
                                <Image className="w-4 h-4" /> Form Image (Banner)
                            </label>
                            <div className="mb-3">
                                <label className="flex items-center gap-2 px-4 py-3 bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg cursor-pointer hover:border-[#7A32E0]/50 transition-colors">
                                    <Upload className="w-5 h-5 text-[#7A32E0]" />
                                    <span className="text-[#BBC5F2]">{uploadingImage ? "Uploading..." : "Upload Image"}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        disabled={uploadingImage}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleImageUpload(file);
                                        }}
                                    />
                                </label>
                            </div>
                            <input
                                type="url"
                                value={form.bannerUrl || ""}
                                onChange={(e) => setForm({ ...form, bannerUrl: e.target.value })}
                                className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white"
                                placeholder="Or paste image URL..."
                            />
                            {form.bannerUrl && (
                                <div className="mt-3">
                                    <div className="rounded-lg overflow-hidden border border-[#7A32E0]/20">
                                        <img src={form.bannerUrl} alt="Preview" className="w-full h-auto" />
                                    </div>
                                    <button
                                        onClick={() => setForm({ ...form, bannerUrl: null })}
                                        className="mt-2 text-red-400 text-sm hover:text-red-300 flex items-center gap-1"
                                    >
                                        <X className="w-4 h-4" /> Remove Image
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.isPublished}
                                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                                    className="w-4 h-4 accent-[#7A32E0]"
                                />
                                <span className="text-[#BBC5F2]">Published (visible to public)</span>
                            </label>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.requireAuth}
                                    onChange={(e) => setForm({ ...form, requireAuth: e.target.checked })}
                                    className="w-4 h-4 accent-[#7A32E0]"
                                />
                                <span className="text-[#BBC5F2]">Require login to submit</span>
                            </label>
                        </div>

                        <div className="pt-4">
                            <p className="text-[#BBC5F2]/50 text-sm">
                                Public URL: <code className="text-[#B488FF]">/forms/{id}</code>
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === "help" && (
                    <div className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-2xl p-6 space-y-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-[#B488FF]" /> Form Builder Help
                        </h2>
                        <div className="space-y-3">
                            <h3 className="text-[#B488FF] font-medium">📄 Multi-Page Forms</h3>
                            <div className="bg-[#0F0C1A] rounded-lg p-4 text-sm">
                                <ul className="text-[#BBC5F2]/80 space-y-1 ml-4 list-disc">
                                    <li>Set different section numbers for fields to create pages</li>
                                    <li>Section 0 = Page 1, Section 1 = Page 2, etc.</li>
                                    <li>Users will see Next/Previous buttons</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-[#B488FF] font-medium">📋 Field Types</h3>
                            <div className="bg-[#0F0C1A] rounded-lg p-4 text-sm">
                                <div className="grid grid-cols-2 gap-2 text-[#BBC5F2]/80">
                                    <div><strong>Short Text</strong> - Single line</div>
                                    <div><strong>Long Text</strong> - Multi-line</div>
                                    <div><strong>Email</strong> - Email input</div>
                                    <div><strong>Phone</strong> - Phone number</div>
                                    <div><strong>Dropdown</strong> - Select one</div>
                                    <div><strong>Radio</strong> - Single choice</div>
                                    <div><strong>Checkbox</strong> - Multiple choices</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Add/Edit Field Modal */}
            {showAddField && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm overflow-y-auto py-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-2xl p-6 w-full max-w-lg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">
                                {editingField ? "Edit Field" : "Add Field"}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddField(false);
                                    setEditingField(null);
                                    setNewField({ label: "", type: "text", required: false, placeholder: "", options: [""], imageUrl: "", section: 0 });
                                }}
                                className="text-[#BBC5F2]/50 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block">Label *</label>
                                <input
                                    type="text"
                                    value={newField.label}
                                    onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block">Type</label>
                                <select
                                    value={newField.type}
                                    onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white"
                                >
                                    {fieldTypes.map((t) => (
                                        <option key={t.value} value={t.value}>{t.label}</option>
                                    ))}
                                </select>
                            </div>

                            {["select", "radio", "checkbox"].includes(newField.type) && (
                                <div>
                                    <label className="text-sm text-[#BBC5F2] mb-1 block">Options</label>
                                    <div className="space-y-2">
                                        {(newField.options || []).map((opt, i) => (
                                            <div key={i} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={opt}
                                                    onChange={(e) => updateOption(i, e.target.value)}
                                                    className="flex-1 bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-2 text-white text-sm"
                                                    placeholder={`Option ${i + 1}`}
                                                />
                                                <button onClick={() => removeOption(i)} className="text-red-400 hover:text-red-300 px-2">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        <button onClick={addOption} className="text-[#B488FF] text-sm flex items-center gap-1">
                                            <Plus className="w-3 h-3" /> Add Option
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block">Placeholder</label>
                                <input
                                    type="text"
                                    value={newField.placeholder}
                                    onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white"
                                    placeholder="Enter your name..."
                                />
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={newField.required}
                                    onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                                    className="w-4 h-4 accent-[#7A32E0]"
                                />
                                <span className="text-[#BBC5F2]">Required field</span>
                            </label>

                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block flex items-center gap-2">
                                    <Layers className="w-4 h-4" /> Section (Page)
                                </label>
                                <select
                                    value={newField.section}
                                    onChange={(e) => setNewField({ ...newField, section: parseInt(e.target.value) })}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white"
                                >
                                    {[0, 1, 2, 3, 4, 5].map(num => (
                                        <option key={num} value={num}>
                                            Section {num + 1} {num === 0 ? "(First Page)" : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm text-[#BBC5F2] mb-1 block flex items-center gap-2">
                                    <Image className="w-4 h-4" /> Field Image (optional)
                                </label>
                                <div className="mb-2">
                                    <label className="flex items-center gap-2 px-3 py-2 bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg cursor-pointer hover:border-[#7A32E0]/50 transition-colors text-sm">
                                        <Upload className="w-4 h-4 text-[#7A32E0]" />
                                        <span className="text-[#BBC5F2]">{uploadingFieldImage ? "Uploading..." : "Upload Image"}</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            disabled={uploadingFieldImage}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleFieldImageUpload(file);
                                            }}
                                        />
                                    </label>
                                </div>
                                <input
                                    type="url"
                                    value={newField.imageUrl}
                                    onChange={(e) => setNewField({ ...newField, imageUrl: e.target.value })}
                                    className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-2 text-white text-sm"
                                    placeholder="Or paste image URL..."
                                />
                                {newField.imageUrl && (
                                    <div className="mt-2">
                                        <img src={newField.imageUrl} alt="Preview" className="max-h-32 rounded border border-[#7A32E0]/20" />
                                        <button
                                            onClick={() => setNewField({ ...newField, imageUrl: "" })}
                                            className="text-red-400 text-xs hover:text-red-300 flex items-center gap-1 mt-1"
                                        >
                                            <X className="w-3 h-3" /> Remove
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        setShowAddField(false);
                                        setEditingField(null);
                                        setNewField({ label: "", type: "text", required: false, placeholder: "", options: [""], imageUrl: "", section: 0 });
                                    }}
                                    className="flex-1 px-4 py-3 border border-[#7A32E0]/30 text-[#BBC5F2] rounded-lg hover:bg-[#7A32E0]/10 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={editingField ? handleUpdateField : handleAddField}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg font-medium"
                                >
                                    {editingField ? "Update Field" : "Add Field"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
