import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { apiRequest } from '../lib/api';
import { toast } from 'sonner';

interface FormField {
    id: string;
    label: string;
    type: string;
    required: boolean;
    options: string[];
    placeholder: string | null;
    imageUrl?: string | null;
    section?: number;
}

interface Form {
    id: string;
    title: string;
    description: string | null;
    bannerUrl?: string | null;
    requireAuth: boolean;
    fields: FormField[];
}

// Helper function to render formatted text (bold, italic, line breaks)
function renderFormattedText(text: string) {
    const paragraphs = text.split(/\n\n+/);

    return paragraphs.map((paragraph, pIndex) => {
        const lines = paragraph.split(/\n/);

        return (
            <p key={pIndex} className={pIndex > 0 ? "mt-3" : ""}>
                {lines.map((line, lIndex) => {
                    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g);
                    const processed = parts.map((part, partIndex) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                            return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
                        } else if (part.startsWith("*") && part.endsWith("*")) {
                            return <em key={partIndex}>{part.slice(1, -1)}</em>;
                        } else if (part.match(/^https?:\/\//)) {
                            return (
                                <a
                                    key={partIndex}
                                    href={part}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 underline break-all"
                                >
                                    {part}
                                </a>
                            );
                        }
                        return part;
                    });

                    return (
                        <span key={lIndex}>
                            {lIndex > 0 && <br />}
                            {processed}
                        </span>
                    );
                })}
            </p>
        );
    });
}

export default function PublicFormPage() {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState<Form | null>(null);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);

    useEffect(() => {
        if (id) fetchForm();
    }, [id]);

    const getSections = () => {
        if (!form) return [0];
        const sections = [...new Set(form.fields.map(f => f.section || 0))].sort((a, b) => a - b);
        return sections.length > 0 ? sections : [0];
    };

    const getCurrentSectionFields = () => {
        if (!form) return [];
        const sections = getSections();
        const sectionNum = sections[currentSection] ?? 0;
        return form.fields.filter(f => (f.section || 0) === sectionNum);
    };

    const validateCurrentSection = () => {
        const fields = getCurrentSectionFields();
        for (const field of fields) {
            if (field.required) {
                const value = formData[field.id];
                if (!value || (Array.isArray(value) && value.length === 0) || value === "") {
                    toast.error(`"${field.label}" is required`);
                    return false;
                }
            }
        }
        return true;
    };

    const handleNextSection = () => {
        if (validateCurrentSection()) {
            setCurrentSection(prev => Math.min(prev + 1, getSections().length - 1));
        }
    };

    const handlePrevSection = () => {
        setCurrentSection(prev => Math.max(prev - 1, 0));
    };

    const fetchForm = async () => {
        try {
            const res = await apiRequest(`/api/forms/${id}`);
            setForm(res.form);
            const initial: Record<string, any> = {};
            res.form.fields.forEach((field: FormField) => {
                initial[field.id] = field.type === "checkbox" ? [] : "";
            });
            setFormData(initial);
        } catch {
            // Form not found or not published
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (fieldId: string, value: any, type: string) => {
        if (type === "checkbox") {
            const current = formData[fieldId] || [];
            if (current.includes(value)) {
                setFormData({ ...formData, [fieldId]: current.filter((v: string) => v !== value) });
            } else {
                setFormData({ ...formData, [fieldId]: [...current, value] });
            }
        } else {
            setFormData({ ...formData, [fieldId]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateCurrentSection()) return;

        setSubmitting(true);
        try {
            await apiRequest(`/api/forms/${id}/submit`, "POST", { data: formData });
            setSubmitted(true);
        } catch (error: any) {
            toast.error(error.message || "Failed to submit");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F0C1A] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#7A32E0] animate-spin" />
            </div>
        );
    }

    if (!form) {
        return (
            <div className="min-h-screen bg-[#0F0C1A] flex items-center justify-center">
                <div className="text-center">
                    <FileText className="w-16 h-16 text-[#7A32E0]/30 mx-auto mb-4" />
                    <h1 className="text-2xl text-white mb-2">Form not found</h1>
                    <p className="text-[#BBC5F2]/70 mb-6">This form may not exist or is not published.</p>
                    <Link to="/">
                        <button className="px-6 py-3 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg font-medium">
                            Go Home
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#0F0C1A] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-3">Thank You!</h1>
                    <p className="text-[#BBC5F2]/70 mb-6">Your response has been submitted successfully.</p>
                    <Link to="/">
                        <button className="px-6 py-3 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg font-medium">
                            Back to BECon
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0C1A]">
            {/* Header */}
            <header className="border-b border-[#7A32E0]/20 bg-[#0F0C1A]/90 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/logo1.avif"
                            alt="BECon 2026"
                            className="h-10 md:h-12 w-auto object-contain"
                            loading="eager"
                        />
                    </Link>
                    <span className="text-[#BBC5F2]/50 text-sm">BECon Forms</span>
                </div>
            </header>

            {/* Form */}
            <main className="max-w-3xl mx-auto px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-2xl overflow-hidden"
                >
                    {/* Banner/Image */}
                    {form.bannerUrl && (
                        <div className="w-full">
                            <img
                                src={form.bannerUrl}
                                alt={form.title}
                                className="w-full h-auto"
                            />
                        </div>
                    )}

                    {/* Header */}
                    <div className="p-6 border-b border-[#7A32E0]/20 bg-gradient-to-r from-[#7A32E0]/10 to-[#6F7EEA]/10">
                        <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {form.title}
                        </h1>
                        {form.description && (
                            <div className="text-[#BBC5F2]/70">
                                {renderFormattedText(form.description)}
                            </div>
                        )}
                    </div>

                    {/* Fields */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Section indicator */}
                        {getSections().length > 1 && (
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex gap-1">
                                    {getSections().map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-2 rounded-full transition-all ${i === currentSection
                                                ? "w-8 bg-[#7A32E0]"
                                                : i < currentSection
                                                    ? "w-2 bg-[#7A32E0]/50"
                                                    : "w-2 bg-[#7A32E0]/20"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-[#BBC5F2]/50 text-sm">
                                    Page {currentSection + 1} of {getSections().length}
                                </span>
                            </div>
                        )}

                        {getCurrentSectionFields().map((field) => (
                            <div key={field.id}>
                                {/* Field Image */}
                                {field.imageUrl && (
                                    <div className="mb-3 rounded-lg overflow-hidden">
                                        <img
                                            src={field.imageUrl}
                                            alt=""
                                            className="w-full h-auto max-h-64 object-contain bg-[#0F0C1A]"
                                        />
                                    </div>
                                )}

                                <label className="text-sm font-medium text-[#BBC5F2] mb-2 block">
                                    {field.label} {field.required && <span className="text-red-400">*</span>}
                                </label>

                                {field.type === "text" && (
                                    <input
                                        type="text"
                                        value={formData[field.id] || ""}
                                        onChange={(e) => handleChange(field.id, e.target.value, field.type)}
                                        placeholder={field.placeholder || ""}
                                        className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white placeholder-[#BBC5F2]/30 focus:outline-none focus:border-[#7A32E0]"
                                    />
                                )}

                                {field.type === "email" && (
                                    <input
                                        type="email"
                                        value={formData[field.id] || ""}
                                        onChange={(e) => handleChange(field.id, e.target.value, field.type)}
                                        placeholder={field.placeholder || "email@example.com"}
                                        className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white placeholder-[#BBC5F2]/30 focus:outline-none focus:border-[#7A32E0]"
                                    />
                                )}

                                {field.type === "tel" && (
                                    <input
                                        type="tel"
                                        value={formData[field.id] || ""}
                                        onChange={(e) => handleChange(field.id, e.target.value, field.type)}
                                        placeholder={field.placeholder || "9876543210"}
                                        className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white placeholder-[#BBC5F2]/30 focus:outline-none focus:border-[#7A32E0]"
                                    />
                                )}

                                {field.type === "number" && (
                                    <input
                                        type="number"
                                        value={formData[field.id] || ""}
                                        onChange={(e) => handleChange(field.id, e.target.value, field.type)}
                                        placeholder={field.placeholder || "0"}
                                        className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white placeholder-[#BBC5F2]/30 focus:outline-none focus:border-[#7A32E0]"
                                    />
                                )}

                                {field.type === "url" && (
                                    <input
                                        type="url"
                                        value={formData[field.id] || ""}
                                        onChange={(e) => handleChange(field.id, e.target.value, field.type)}
                                        placeholder={field.placeholder || "https://example.com"}
                                        className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white placeholder-[#BBC5F2]/30 focus:outline-none focus:border-[#7A32E0]"
                                    />
                                )}

                                {field.type === "date" && (
                                    <input
                                        type="date"
                                        value={formData[field.id] || ""}
                                        onChange={(e) => handleChange(field.id, e.target.value, field.type)}
                                        className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                    />
                                )}

                                {field.type === "textarea" && (
                                    <textarea
                                        value={formData[field.id] || ""}
                                        onChange={(e) => handleChange(field.id, e.target.value, field.type)}
                                        placeholder={field.placeholder || ""}
                                        rows={4}
                                        className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white placeholder-[#BBC5F2]/30 focus:outline-none focus:border-[#7A32E0] resize-none"
                                    />
                                )}

                                {field.type === "select" && (
                                    <select
                                        value={formData[field.id] || ""}
                                        onChange={(e) => handleChange(field.id, e.target.value, field.type)}
                                        className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7A32E0]"
                                    >
                                        <option value="">Select...</option>
                                        {(field.options || []).map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                )}

                                {field.type === "radio" && (
                                    <div className="space-y-2">
                                        {(field.options || []).map((opt) => (
                                            <label key={opt} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={field.id}
                                                    value={opt}
                                                    checked={formData[field.id] === opt}
                                                    onChange={(e) => handleChange(field.id, e.target.value, field.type)}
                                                    className="w-4 h-4 accent-[#7A32E0]"
                                                />
                                                <span className="text-white">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {field.type === "checkbox" && (
                                    <div className="space-y-2">
                                        {(field.options || []).map((opt) => (
                                            <label key={opt} className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    value={opt}
                                                    checked={(formData[field.id] || []).includes(opt)}
                                                    onChange={(e) => handleChange(field.id, e.target.value, field.type)}
                                                    className="w-4 h-4 accent-[#7A32E0]"
                                                />
                                                <span className="text-white">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {field.type === "file" && (
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id={`file-${field.id}`}
                                                className="hidden"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    // limit 5MB
                                                    if (file.size > 5 * 1024 * 1024) {
                                                        toast.error("File size must be less than 5MB");
                                                        return;
                                                    }

                                                    const toastId = toast.loading("Uploading file...");
                                                    try {
                                                        // Upload to Supabase
                                                        const { createClient } = await import('@supabase/supabase-js');
                                                        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
                                                        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
                                                        const supabase = createClient(supabaseUrl, supabaseKey);

                                                        const fileExt = file.name.split('.').pop();
                                                        const fileName = `${field.id}_${Date.now()}.${fileExt}`;
                                                        const filePath = `${form.id}/${fileName}`;

                                                        const { error: uploadError } = await supabase.storage
                                                            .from('form_uploads')
                                                            .upload(filePath, file);

                                                        if (uploadError) throw uploadError;

                                                        const { data: { publicUrl } } = supabase.storage
                                                            .from('form_uploads')
                                                            .getPublicUrl(filePath);

                                                        setFormData({ ...formData, [field.id]: publicUrl });
                                                        toast.success("File uploaded successfully", { id: toastId });
                                                    } catch (error: any) {
                                                        console.error("Upload error:", error);
                                                        toast.error("Failed to upload file", { id: toastId });
                                                    }
                                                }}
                                            />
                                            {formData[field.id] ? (
                                                <div className="flex items-center gap-3 p-3 bg-[#7A32E0]/10 border border-[#7A32E0]/30 rounded-lg">
                                                    <span className="text-white text-sm truncate max-w-[200px]">
                                                        {formData[field.id].split('/').pop()}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, [field.id]: "" })}
                                                        className="text-red-400 hover:text-red-300 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                    <a
                                                        href={formData[field.id]}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#B488FF] hover:text-white text-sm ml-auto"
                                                    >
                                                        View
                                                    </a>
                                                </div>
                                            ) : (
                                                <label
                                                    htmlFor={`file-${field.id}`}
                                                    className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-[#7A32E0]/30 rounded-lg cursor-pointer hover:bg-[#7A32E0]/5 transition-colors"
                                                >
                                                    <span className="text-[#BBC5F2]">Click to upload file</span>
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Navigation Buttons */}
                        <div className="flex gap-3">
                            {getSections().length > 1 && currentSection > 0 && (
                                <button
                                    type="button"
                                    onClick={handlePrevSection}
                                    className="flex-1 flex items-center justify-center gap-1 px-4 py-4 border border-[#7A32E0]/30 text-[#B488FF] rounded-lg hover:bg-[#7A32E0]/10 transition"
                                >
                                    <ChevronLeft className="w-5 h-5" /> Previous
                                </button>
                            )}

                            {getSections().length > 1 && currentSection < getSections().length - 1 ? (
                                <button
                                    type="button"
                                    onClick={handleNextSection}
                                    className="flex-1 flex items-center justify-center gap-1 px-4 py-4 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg font-medium"
                                >
                                    Next <ChevronRight className="w-5 h-5" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] text-white rounded-lg text-lg font-medium disabled:opacity-50"
                                >
                                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit"}
                                </button>
                            )}
                        </div>
                    </form>
                </motion.div>

                <p className="text-center text-[#BBC5F2]/40 text-sm mt-6">
                    Powered by BECon Forms
                </p>
            </main>
        </div>
    );
}
