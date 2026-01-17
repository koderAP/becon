
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { X, Users, Store, Handshake, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { apiRequest } from '../src/lib/api';

interface SponsorsProps {
    showHeader?: boolean;
    className?: string;
    isLoading?: boolean;
}

const SkeletonSponsorImage = () => (
    <div className="w-full h-64 md:h-96 bg-white/5 border border-white/5 rounded-3xl animate-pulse" />
);

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    formType: 'investor' | 'stall' | 'sponsor';
    fields: { name: string; label: string; required: boolean; type?: string }[];
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, title, formType, fields }) => {
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await apiRequest('/api/user/interest-form', 'POST', {
                formType,
                formData
            });

            setSubmitted(true);
            toast.success('Thank you! Our team will contact you soon.');

            setTimeout(() => {
                setSubmitted(false);
                setFormData({});
                onClose();
            }, 2000);
        } catch (error: any) {
            toast.error(error.message || 'Failed to submit form. Please try again.');
        } finally {
            setLoading(false);
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
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative bg-[#0a0a15] border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl pointer-events-auto"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-white">{title}</h3>
                                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>

                                {submitted ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-white font-semibold">Thank you!</p>
                                        <p className="text-gray-400 mt-2">Our team will contact you soon.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {fields.map((field) => (
                                            <div key={field.name}>
                                                <label className="block text-sm text-gray-400 mb-1">
                                                    {field.label} {field.required && <span className="text-purple-400">*</span>}
                                                </label>
                                                <input
                                                    type={field.type || 'text'}
                                                    required={field.required}
                                                    value={formData[field.name] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                                    placeholder={field.label}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full mt-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Submit'
                                            )}
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

interface InterestCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
}

const InterestCard: React.FC<InterestCardProps> = ({ icon, title, description, buttonText, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-purple-500/50 transition-all duration-300 group h-full flex flex-col"
    >
        <div className="flex items-start gap-4 flex-1">
            <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400 group-hover:bg-purple-500/30 transition-colors shrink-0">
                {icon}
            </div>
            <div className="flex-1 flex flex-col h-full">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{description}</p>
                <button
                    onClick={onClick}
                    className="inline-flex items-center px-6 py-2.5 bg-white/10 hover:bg-purple-600 border border-white/20 hover:border-purple-500 rounded-full text-sm font-semibold text-white transition-all duration-300 w-fit"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    </motion.div>
);

export const Sponsors: React.FC<SponsorsProps> = ({ showHeader = true, className = "", isLoading = false }) => {
    const [activeModal, setActiveModal] = useState<'investor' | 'stall' | 'sponsor' | null>(null);

    const investorFields = [
        { name: 'fullName', label: 'Full Name', required: true },
        { name: 'organisation', label: 'Organisation Name', required: true },
        { name: 'designation', label: 'Designation', required: true },
        { name: 'email', label: 'Email ID', required: true, type: 'email' },
        { name: 'linkedin', label: 'LinkedIn URL', required: false, type: 'url' },
    ];

    const stallFields = [
        { name: 'companyName', label: 'Company Name', required: true },
        { name: 'sector', label: 'Sector', required: true },
        { name: 'purpose', label: 'Purpose for Stall/Kiosk', required: true },
        { name: 'pocName', label: 'PoC Name', required: true },
        { name: 'email', label: 'Email ID', required: true, type: 'email' },
        { name: 'contact', label: 'Contact Number', required: false, type: 'tel' },
    ];

    const sponsorFields = [
        { name: 'organisation', label: 'Organisation Name', required: true },
        { name: 'website', label: 'Website URL', required: true, type: 'url' },
        { name: 'pocName', label: 'PoC Name', required: true },
        { name: 'designation', label: 'Designation', required: true },
        { name: 'email', label: 'Email ID', required: true, type: 'email' },
        { name: 'contact', label: 'Contact Number', required: true, type: 'tel' },
    ];

    return (
        <div className={`px-4 sm:px-6 md:px-12 lg:px-20 ${showHeader ? 'pt-20 sm:pt-24 pb-16 sm:pb-20' : 'pb-20'} ${className} ${!className.includes('bg-') ? 'bg-[#05020a]' : ''}`}>
            {showHeader && (
                <>
                    <SectionHeading className="mb-6 sm:mb-12">Previous Partners</SectionHeading>
                </>
            )}

            <div className="relative w-full mx-auto">
                {isLoading ? (
                    <SkeletonSponsorImage />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        {/* Image Container */}
                        <div className="relative w-full">
                            <img
                                src="/sponsors/past_sponsors.avif"
                                alt="Past Sponsors of BECon"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-auto"
                            />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Interested in Joining Section */}
            <div className="mt-16 sm:mt-24 lg:mt-32">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-center tracking-tight">
                    Interested in Joining <span className="text-gray-400">BECon 2026?</span>
                </h2>
                <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                    Choose how you'd like to be part of India's biggest entrepreneurship summit
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <InterestCard
                        icon={<Users size={24} />}
                        title="As an Investor / Business Expert"
                        description="Join BECon 2026 as an investor or industry expert to network with fellow investors and startups."
                        buttonText="Contact Us"
                        onClick={() => setActiveModal('investor')}
                    />
                    <InterestCard
                        icon={<Store size={24} />}
                        title="Want to Put a Stall / Kiosk"
                        description="Set up a stall or kiosk at BECon 2026 to showcase your brand directly to a highly engaged audience."
                        buttonText="Register"
                        onClick={() => setActiveModal('stall')}
                    />
                    <InterestCard
                        icon={<Handshake size={24} />}
                        title="As a Partner / Sponsor"
                        description="Partner with BECon 2026 as a sponsor to gain visibility, brand association, and direct access to India's emerging founders."
                        buttonText="Partner With Us"
                        onClick={() => setActiveModal('sponsor')}
                    />
                </div>
            </div>

            {/* Form Modals */}
            <FormModal
                isOpen={activeModal === 'investor'}
                onClose={() => setActiveModal(null)}
                title="Join as Investor / Expert"
                formType="investor"
                fields={investorFields}
            />
            <FormModal
                isOpen={activeModal === 'stall'}
                onClose={() => setActiveModal(null)}
                title="Register for Stall / Kiosk"
                formType="stall"
                fields={stallFields}
            />
            <FormModal
                isOpen={activeModal === 'sponsor'}
                onClose={() => setActiveModal(null)}
                title="Partner / Sponsor with BECon"
                formType="sponsor"
                fields={sponsorFields}
            />
        </div>
    );
};