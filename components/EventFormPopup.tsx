
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { apiRequest } from '../src/lib/api';
import { useAuth } from '../src/contexts/AuthContext';

interface EventFormPopupProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: string;
    formId: string;
    title: string;
    onSuccess: (data: any, formId: string) => void;
}

interface FormField {
    id: string;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    placeholder?: string;
    imageUrl?: string;
}

export const EventFormPopup: React.FC<EventFormPopupProps> = ({ isOpen, onClose, eventId, formId, title, onSuccess }) => {
    const { user } = useAuth();
    const [fields, setFields] = useState<FormField[]>([]);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [bannerUrl, setBannerUrl] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);

    // Fetch form definition
    useEffect(() => {
        if (isOpen && formId) {
            fetchForm();
        }
    }, [isOpen, formId]);

    const fetchForm = async () => {
        setLoading(true);
        try {
            const res = await apiRequest(`/api/forms/${formId}`);
            setFields(res.form.fields || []);
            setBannerUrl(res.form.bannerUrl);
            setDescription(res.form.description);
        } catch (error) {
            console.error('Failed to load form:', error);
            toast.error('Failed to load form details');
            onClose();
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // 1. Submit form response
            await apiRequest(`/api/forms/${formId}/submit`, 'POST', {
                data: formData,
                userId: user?.id
            });

            // 2. DIRECTLY register for the event - no callback reliance
            const token = (await import('../src/lib/supabase')).supabase.auth.getSession()
                .then(res => res.data.session?.access_token);

            const accessToken = await token;

            await apiRequest('/api/events/register', 'POST', {
                eventId: eventId,
                formData: formData
            }, accessToken);

            setSubmitted(true);
            toast.success('Registration successful!');
            onSuccess(formData, formId); // Notify parent to refresh state

            setTimeout(() => {
                setSubmitted(false);
                setFormData({});
                onClose();
            }, 2000);
        } catch (error: any) {
            console.error('Registration error:', error);
            // If it's "already registered", still show success
            if (error.message?.includes('Already registered') || error.message?.includes('409')) {
                setSubmitted(true);
                toast.info('You are already registered for this event');
                setTimeout(() => {
                    setSubmitted(false);
                    setFormData({});
                    onClose();
                }, 2000);
            } else {
                toast.error(error.message || 'Failed to complete registration');
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[10000] overflow-y-auto pointer-events-none">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative bg-[#0a0a15] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl pointer-events-auto overflow-hidden"
                            >
                                {/* Banner */}
                                {bannerUrl && (
                                    <div className="h-32 w-full overflow-hidden">
                                        <img src={bannerUrl} alt={title} className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className="p-6 sm:p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{title}</h3>
                                            {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
                                        </div>
                                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                            <X size={24} />
                                        </button>
                                    </div>

                                    {loading ? (
                                        <div className="py-12 flex justify-center">
                                            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                                        </div>
                                    ) : submitted ? (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <CheckCircle className="w-8 h-8 text-green-500" />
                                            </div>
                                            <p className="text-white font-semibold text-lg">You're In!</p>
                                            <p className="text-gray-400 mt-2">Registration confirmed successfully.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {fields.map((field) => (
                                                <div key={field.id}>
                                                    <label className="block text-sm text-gray-300 mb-1.5 font-medium">
                                                        {field.label} {field.required && <span className="text-purple-400">*</span>}
                                                    </label>
                                                    {field.type === 'textarea' ? (
                                                        <textarea
                                                            required={field.required}
                                                            value={formData[field.id] || ''}
                                                            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors min-h-[100px] resize-y"
                                                            placeholder={field.placeholder}
                                                        />
                                                    ) : field.type === 'select' ? (
                                                        <select
                                                            required={field.required}
                                                            value={formData[field.id] || ''}
                                                            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors appearance-none"
                                                        >
                                                            <option value="" disabled>Select an option</option>
                                                            {field.options?.map((opt) => (
                                                                <option key={opt} value={opt} className="bg-[#0a0a15]">{opt}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            type={field.type}
                                                            required={field.required}
                                                            value={formData[field.id] || ''}
                                                            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                                            placeholder={field.placeholder}
                                                        />
                                                    )}
                                                </div>
                                            ))}

                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full mt-6 py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
                                            >
                                                {submitting ? (
                                                    <>
                                                        <Loader2 size={18} className="animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    'Complete Registration'
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};
