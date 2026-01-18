import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    User, Mail, Phone, Building, Calendar, Edit2, Save, X, Ticket, Trophy,
    QrCode, Clock, Sparkles, ArrowRight, CheckCircle, LogOut, Settings, Bell, Camera, Loader2, Fingerprint
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { generateBeconIdFromUserId } from '../utils/beconId';
import { supabase } from '../lib/supabase';
import { useEventRegistration } from '../hooks/useEventRegistration';
import { apiRequest } from '../lib/api';

// Event name and date mappings (matching frontend event IDs)
const EVENT_NAMES: Record<string, string> = {
    'e-raksha-hackathon': 'e-Raksha Hackathon',
    'moonshot-main': 'Moonshot',
    'innoverse': 'Innoverse',
    'autospark': 'Autospark',
    'blueprint': 'Blueprint',
    'launchpad': 'Launchpad',
    'startup-clinic': 'Startup Clinic',
    'policysphere': 'Policysphere',
    'colab': 'CoLab',
    'strategy-competitions': 'Strategy Competitions',
    'bootcamp': 'Bootcamp',
    'workshops': 'Workshops',
    'grand-moonshot': 'Grand Moonshot',
    'keynotes-panels': 'Keynotes & Panels',
};

const EVENT_DATES: Record<string, string> = {
    'e-raksha-hackathon': 'Jan 30 - Feb 1, 2026',
    'moonshot-main': 'Jan 31, 2026',
    'innoverse': 'Jan 30 - Feb 1, 2026',
    'autospark': 'Jan 30 - Feb 1, 2026',
    'blueprint': 'Feb 1, 2026',
    'launchpad': 'Jan 30 - Feb 1, 2026',
    'startup-clinic': 'Feb 1, 2026',
    'policysphere': 'Feb 2, 2026',
    'colab': 'Jan 31, 2026',
    'strategy-competitions': 'Jan 31, 2026',
    'bootcamp': 'Jan 30 - 31, 2026',
    'workshops': 'Jan 30 - Feb 1, 2026',
    'grand-moonshot': 'Feb 2, 2026',
    'keynotes-panels': 'Jan 30 - Feb 1, 2026',
};

import { createPortal } from 'react-dom';

// ID Card Popup Component
const IDCardModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    user: UserProfile;
}> = ({ isOpen, onClose, user }) => {
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
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="relative w-full max-w-md pointer-events-auto"
                            style={{ perspective: '1000px' }}
                        >
                            {/* Card Glow */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl blur-xl opacity-60" />

                            {/* ID Card */}
                            <div className="relative bg-[#0f0518] rounded-3xl overflow-hidden border-2 border-purple-500/50 shadow-2xl">
                                {/* Header Banner */}
                                <div className="h-24 bg-[#1a0b2e] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-100" />
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-28 h-28 rounded-full border-4 border-[#0f0518] overflow-hidden bg-[#1a0b2e]">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white bg-purple-900">
                                                {user.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="pt-16 pb-8 px-6 text-center bg-[#0f0518]">
                                    <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                                    <p className="text-gray-400 text-sm mb-4">{user.college} • {user.year}</p>

                                    {/* BECon ID */}
                                    <div className="bg-[#1a0b2e] rounded-xl p-4 mb-4 border border-purple-500/20">
                                        <p className="text-xs text-purple-400 uppercase tracking-wider mb-1">BECon ID</p>
                                        <h3 className="text-xl font-mono font-bold tracking-wider text-white">{user.becId}</h3>
                                    </div>

                                    {/* Branded QR Code */}
                                    <div className="relative w-40 h-40 mx-auto mb-4">
                                        {/* Gradient border */}
                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-sm opacity-75" />
                                        {/* QR Container */}
                                        <div className="relative bg-white rounded-xl p-3 w-full h-full flex items-center justify-center">
                                            <QRCode
                                                value={user.id}
                                                size={256}
                                                style={{ height: "100%", maxWidth: "100%", width: "100%" }}
                                                viewBox={`0 0 256 256`}
                                                fgColor="#000000"
                                                level="H"
                                            />
                                            {/* BECon Logo Overlay - smaller for better scanning */}
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="w-7 h-7 bg-white rounded flex items-center justify-center shadow-sm">
                                                    <img
                                                        src="/logo_qr.avif"
                                                        alt="BECon"
                                                        className="w-5 h-5 object-contain"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-purple-400/60 mb-2">Scan to verify entry</p>

                                    {/* Contact Info */}
                                    <div className="text-sm text-gray-400 space-y-2">
                                        <div className="flex items-center justify-center gap-2">
                                            <Mail size={14} />
                                            <span>{user.email}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <Phone size={14} />
                                            <span>{user.phone}</span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2">
                                        <Sparkles size={16} className="text-purple-400" />
                                        <span className="text-sm text-gray-400">BECon 2026 • IIT Delhi</span>
                                    </div>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <X size={20} className="text-white" />
                            </button>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

interface UserProfile {
    id: string;
    becId: string;
    name: string;
    email: string;
    phone: string;
    college: string;
    year: string;
    bio: string;
    avatar?: string;
}

interface Event {
    id: string;
    name: string;
    date: string;
    status: 'registered' | 'confirmed' | 'attended';
    icon?: string;
}

interface Pass {
    id: string;
    eventName: string;
    passType: string;
    qrCode: string;
    validUntil: string;
}

// Countdown component
const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-3">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 border border-purple-500/30 flex items-center justify-center mb-1">
                        <span className="text-2xl font-bold text-white">{String(value).padStart(2, '0')}</span>
                    </div>
                    <span className="text-xs text-gray-500 uppercase">{unit}</span>
                </div>
            ))}
        </div>
    );
};

import { PASS_CONFIG as GLOBAL_PASS_CONFIG } from '../constants/passes';

// Convert array to object for backward compatibility with existing code structure or refactor usage
const PASS_CONFIG = GLOBAL_PASS_CONFIG.reduce((acc, pass) => ({
    ...acc,
    [pass.id]: {
        name: pass.name,
        price: pass.price === 'FREE' ? 0 : pass.price,
        originalPrice: pass.originalPrice,
        color: pass.color,
        bgGradient: pass.id === 'iitd_student' ? 'from-rose-600 to-pink-800' :
            pass.id === 'platinum' ? 'from-cyan-600 to-purple-800' :
                pass.id === 'gold' ? 'from-yellow-600 to-yellow-800' :
                    'from-gray-600 to-gray-800', // Default/Silver
        borderColor: pass.id === 'iitd_student' ? 'border-rose-500/50' :
            pass.id === 'platinum' ? 'border-cyan-500/50' :
                pass.id === 'gold' ? 'border-yellow-500/50' :
                    'border-gray-400/50',
        image: pass.image,
    }
}), {} as Record<string, any>);


// Your Pass Card Component
const YourPassCard: React.FC<{ user?: any; userId?: string }> = ({ user, userId }) => {
    const [userPass, setUserPass] = useState<{ pass_type: string; purchased_at: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPass = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('user_passes')
                    .select('pass_type, purchased_at')
                    .eq('user_id', userId)
                    .order('purchased_at', { ascending: false })
                    .limit(1)
                    .single();

                if (data && !error) {
                    setUserPass(data);
                }
            } catch (err) {
                console.warn('No pass found');
            } finally {
                setLoading(false);
            }
        };

        fetchPass();
    }, [userId]);


    // Robust check for IIT Delhi SSO or Domain
    const isIITD = user?.app_metadata?.provider === 'azure' ||
        user?.email?.endsWith('iitd.ac.in') ||
        user?.email?.endsWith('.iitd.ac.in') ||
        (user?.user_metadata?.mail && (user.user_metadata.mail.endsWith('iitd.ac.in') || user.user_metadata.mail.includes('@iitd.ac.in'))) ||
        (user?.user_metadata?.preferred_username && user.user_metadata.preferred_username.includes('iitd.ac.in'));

    const currentPassType = userPass?.pass_type as keyof typeof PASS_CONFIG | null;
    const currentConfig = currentPassType ? PASS_CONFIG[currentPassType] : null;
    const getUpgradeOptions = () => {
        // If already have IITD pass, no upgrades possible
        if (currentPassType === 'iitd_student') return [];

        if (isIITD) {
            return [{ type: 'iitd_student', price: 0, label: 'Get IITD Pass (Free)' }];
        }

        if (!currentPassType) return [
            { type: 'silver', price: 0, label: 'Claim Free' },
            { type: 'gold', price: 199, label: '₹199' },
            { type: 'platinum', price: 399, label: '₹399' },
        ];

        const options = [];
        if (currentPassType === 'silver') {
            options.push({ type: 'gold', price: 199, label: 'Upgrade ₹199' });
            options.push({ type: 'platinum', price: 399, label: 'Upgrade ₹399' });
        } else if (currentPassType === 'gold') {
            options.push({ type: 'platinum', price: 200, label: 'Upgrade ₹200' });
        }
        return options;
    };

    const upgradeOptions = getUpgradeOptions();
    // Only show upgrade section if there are options and user has a pass (if no pass, we show the "No Pass" section instead)
    const canUpgrade = !!currentPassType && upgradeOptions.length > 0;

    if (loading) {
        return (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-500" />
                <p className="text-gray-400 mt-2">Loading your pass...</p>
            </div>
        );
    }

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-xl flex items-center gap-2">
                        <Ticket size={24} className="text-purple-400" />
                        Your BECon Pass
                    </h3>
                    {userPass && (
                        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Active
                        </span>
                    )}
                </div>

                {userPass && currentConfig ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Current Pass Display */}
                        <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${currentConfig.bgGradient} border ${currentConfig.borderColor}`}>
                            <div className="flex items-center gap-4">
                                <img
                                    src={currentConfig.image}
                                    alt={currentConfig.name}
                                    className="w-24 h-24 object-contain drop-shadow-lg"
                                />
                                <div>
                                    <h4 className={`text-2xl font-bold ${currentConfig.color}`}>
                                        {currentConfig.name}
                                    </h4>
                                    <p className="text-sm text-white/70 mt-1">
                                        Purchased {new Date(userPass.purchased_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-xs text-white/50 mt-2">
                                        Valid for BECon 2026 • Jan 30 - Feb 1
                                    </p>
                                </div>
                            </div>
                            <div className="absolute top-3 right-3">
                                <CheckCircle className="text-white/80" size={24} />
                            </div>
                        </div>

                        {/* Upgrade Options */}
                        {canUpgrade && (
                            <div className="flex flex-col justify-center">
                                <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Upgrade Your Pass</h4>
                                <div className="space-y-3">
                                    {upgradeOptions.map(option => (
                                        <button
                                            key={option.type}
                                            onClick={() => navigate(`/checkout?pass=${option.type}&upgrade=true`)}
                                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${option.type === 'platinum'
                                                ? 'bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-cyan-500/30 hover:border-cyan-500/60'
                                                : 'bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-yellow-500/30 hover:border-yellow-500/60'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={PASS_CONFIG[option.type as keyof typeof PASS_CONFIG].image}
                                                    alt={option.type}
                                                    className="w-10 h-10 object-contain"
                                                />
                                                <span className={`font-semibold ${PASS_CONFIG[option.type as keyof typeof PASS_CONFIG].color}`}>
                                                    {PASS_CONFIG[option.type as keyof typeof PASS_CONFIG].name}
                                                </span>
                                            </div>
                                            <span className="text-sm font-bold text-white">{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* No Pass - Coming Soon */
                    <div className="py-4">
                        <p className="text-gray-400 text-center mb-6">Choose your pass to get started</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(PASS_CONFIG).filter(([type]) => {
                                // Robust check for IIT Delhi SSO or Domain
                                const isIITD = user?.app_metadata?.provider === 'azure' ||
                                    user?.email?.endsWith('iitd.ac.in') ||
                                    user?.email?.endsWith('.iitd.ac.in') ||
                                    (user?.user_metadata?.mail && (user.user_metadata.mail.endsWith('iitd.ac.in') || user.user_metadata.mail.includes('@iitd.ac.in'))) ||
                                    (user?.user_metadata?.preferred_username && user.user_metadata.preferred_username.includes('iitd.ac.in'));

                                if (isIITD) {
                                    return type === 'iitd_student';
                                } else {
                                    return type !== 'iitd_student';
                                }
                            }).map(([type, config]: [string, any]) => (
                                <button
                                    key={type}
                                    onClick={() => navigate(`/checkout?pass=${type}`)}
                                    className={`p-6 rounded-2xl bg-gradient-to-br ${config.bgGradient}/40 border-2 ${config.borderColor}/50 text-center hover:scale-[1.02] transition-transform`}
                                >
                                    <img src={config.image} alt={config.name} className="w-24 h-24 mx-auto mb-4 object-contain" />
                                    <h4 className={`font-bold text-xl ${config.color}`}>{config.name}</h4>
                                    <div className="mt-2 flex items-center justify-center gap-2">
                                        <span className="text-gray-400 line-through text-sm">₹{config.originalPrice}</span>
                                        <span className="text-white text-lg font-bold">
                                            {config.price === 0 ? 'FREE' : `₹${config.price}`}
                                        </span>
                                    </div>
                                    <div className="mt-4 py-2 px-4 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                                        Get Pass
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'events' | 'passes'>('events');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showIDCard, setShowIDCard] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [savingProfile, setSavingProfile] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const { user, loading, signOut } = useAuth();
    const navigate = useNavigate();

    // Handle avatar upload to Supabase storage
    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image too large. Please use an image under 5MB.');
            return;
        }

        setUploadingAvatar(true);

        try {
            // Convert to AVIF
            const convertToAvif = async (inputFile: File): Promise<Blob> => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext('2d');
                            if (ctx) {
                                ctx.drawImage(img, 0, 0);
                                canvas.toBlob((blob) => {
                                    resolve(blob || inputFile);
                                }, 'image/avif', 0.85);
                            } else {
                                resolve(inputFile);
                            }
                        };
                        img.onerror = () => resolve(inputFile);
                        img.src = event.target?.result as string;
                    };
                    reader.onerror = () => resolve(inputFile);
                    reader.readAsDataURL(inputFile);
                });
            };

            const avifBlob = await convertToAvif(file);
            const fileExt = 'avif';
            const fileName = `${user.id}/avatar.${fileExt}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, avifBlob, {
                    contentType: 'image/avif',
                    upsert: true
                });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            const avatarUrl = urlData.publicUrl + '?t=' + Date.now(); // Cache bust

            // Update user metadata (for immediate display)
            const { error: updateError } = await supabase.auth.updateUser({
                data: { avatar_url: avatarUrl }
            });

            if (updateError) throw updateError;

            // ALSO update the database so it persists across Google re-logins
            await supabase
                .from('user_profiles')
                .update({ avatar_url: avatarUrl })
                .eq('id', user.id);

            setAvatarPreview(avatarUrl);
            setUserProfile(prev => ({ ...prev, avatar: avatarUrl }));
            setEditedProfile(prev => ({ ...prev, avatar: avatarUrl }));
            toast.success('Avatar updated successfully!');
        } catch (error: any) {
            console.error('Avatar upload error:', error);
            if (error.message?.includes('Bucket not found')) {
                toast.error('Avatar storage not configured yet. Please contact admin.');
            } else {
                toast.error('Failed to upload avatar. Try again.');
            }
        } finally {
            setUploadingAvatar(false);
        }
    };

    // Initialize user profile from Supabase
    const [userProfile, setUserProfile] = useState<UserProfile>({
        id: '',
        becId: '',
        name: '',
        email: '',
        phone: '',
        college: '',
        year: '',
        bio: '',
    });

    const [editedProfile, setEditedProfile] = useState(userProfile);

    // Fetch user data from Supabase
    useEffect(() => {
        // Wait for auth to finish loading before checking user
        if (loading) return;

        if (!user) {
            toast.error('Please login to access dashboard');
            navigate('/login');
            return;
        }

        // Extract data from Supabase user
        const metadata = user.user_metadata || {};
        const beconId = generateBeconIdFromUserId(user.id);

        const profile: UserProfile = {
            id: user.id,
            becId: beconId,
            name: metadata.full_name || user.email?.split('@')[0] || 'User',
            // Try to find the best email: 'mail' claim > 'preferred_username' (if email-like) > user.email
            email: metadata.mail || (metadata.preferred_username && metadata.preferred_username.includes('@') ? metadata.preferred_username : user.email) || '',
            phone: metadata.phone || '',
            college: metadata.college || '',
            year: metadata.year || '2024',
            bio: metadata.bio || `Excited to be part of BECon 2026!`,
            avatar: metadata.avatar_url,
        };

        setUserProfile(profile);
        setEditedProfile(profile);

        // Sync with backend to trigger profile creation & welcome email
        // Also fetch custom avatar from database (not overwritten by Google)
        const syncProfile = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.access_token) {
                    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                    const response = await fetch(`${API_URL}/api/user/profile`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${session.access_token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.success && data.profile) {
                            // Prioritize database avatar over Google avatar
                            const dbAvatar = data.profile.avatar_url;
                            if (dbAvatar) {
                                setUserProfile(prev => ({ ...prev, avatar: dbAvatar }));
                                setEditedProfile(prev => ({ ...prev, avatar: dbAvatar }));
                            }
                        }
                    }
                }
            } catch (error) {
                console.warn('Profile sync failed (non-critical):', error);
            }
        };
        syncProfile();
    }, [user, loading, navigate]);

    // Use event registration hook for actual data
    const { registrations, registrationCount } = useEventRegistration();
    const [dynamicEventsMap, setDynamicEventsMap] = useState<Record<string, { name: string, date: string }>>({});

    useEffect(() => {
        const fetchDynamicNames = async () => {
            try {
                const res = await apiRequest('/api/events/public');
                if (res.events) {
                    const map: Record<string, { name: string, date: string }> = {};
                    res.events.forEach((e: any) => {
                        map[e.id] = { name: e.name, date: e.date };
                    });
                    setDynamicEventsMap(map);
                }
            } catch (err) {
                console.error("Failed to load event details", err);
            }
        };
        fetchDynamicNames();
    }, []);

    // Map registrations to the Event interface expected by the component
    const registeredEvents: Event[] = registrations.map(reg => {
        const dynamic = dynamicEventsMap[reg.event_id];
        const dateStr = dynamic?.date
            ? new Date(dynamic.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : (EVENT_DATES[reg.event_id] || 'Jan 30 - Feb 1, 2026');

        return {
            id: reg.event_id,
            name: dynamic?.name || EVENT_NAMES[reg.event_id] || reg.event_id,
            date: dateStr,
            status: reg.status as 'registered' | 'confirmed' | 'attended',
        };
    });

    const passes: Pass[] = [];

    const eventDate = new Date('2026-01-31T09:00:00');

    const handleSave = async () => {
        if (!user) return;

        setSavingProfile(true);
        try {
            // Update Supabase user metadata
            const { error } = await supabase.auth.updateUser({
                data: {
                    full_name: editedProfile.name,
                    phone: editedProfile.phone,
                    college: editedProfile.college,
                    year: editedProfile.year,
                    bio: editedProfile.bio,
                }
            });

            if (error) throw error;

            setUserProfile(editedProfile);
            setIsEditingProfile(false);
            toast.success('Profile updated successfully!');
        } catch (error: any) {
            console.error('Profile update error:', error);
            toast.error('Failed to save profile. Try again.');
        } finally {
            setSavingProfile(false);
        }
    };

    const handleCancel = () => {
        setEditedProfile(userProfile);
        setIsEditingProfile(false);
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            confirmed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            registered: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            attended: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        };
        return styles[status as keyof typeof styles] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.clear();
            sessionStorage.clear();
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            window.location.href = '/login';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#030014] flex items-center justify-center">
                <div className="text-white text-xl">Loading your dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden font-sans selection:bg-purple-500/30">
            {/* Background cleaned - removed Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]" />          {/* ID Card Modal */}
            <IDCardModal isOpen={showIDCard} onClose={() => setShowIDCard(false)} user={userProfile} />

            <div className="relative z-10 pt-32 pb-12 px-4 sm:px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{userProfile.name.split(' ')[0]}</span>
                            </h1>
                            <p className="text-gray-400">Manage your BECon 2026 experience</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <Bell size={20} className="text-gray-400" />
                            </button>
                            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <Settings size={20} className="text-gray-400" />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                                <LogOut size={18} />
                                <span className="text-sm font-medium">Logout</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">


                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-5 relative group cursor-pointer"
                            onClick={() => setShowIDCard(true)}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative bg-gradient-to-br from-[#1a0a2e] to-[#0a0a1a] rounded-3xl p-6 border border-purple-500/30 overflow-hidden h-full group-hover:border-purple-500/50 transition-colors">
                                {/* Card Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                                </div>

                                {/* Click Hint */}
                                <div className="absolute top-3 right-3 text-xs text-purple-400/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to view ID card
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <p className="text-xs text-purple-400 uppercase tracking-wider mb-1">BECon ID</p>
                                            <h3 className="text-2xl font-mono font-bold tracking-wide">{userProfile.becId}</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                            <Fingerprint className="text-white" size={24} />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 mb-6">
                                        {/* Avatar with upload option */}
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold overflow-hidden">
                                                {userProfile.avatar ? (
                                                    <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    userProfile.name.charAt(0)
                                                )}
                                            </div>
                                            <label
                                                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-purple-600 border-2 border-[#1a0a2e] flex items-center justify-center cursor-pointer hover:bg-purple-500 transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Camera size={12} className="text-white" />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleAvatarChange}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold">{userProfile.name}</h4>
                                            <p className="text-sm text-gray-400">{userProfile.college} • {userProfile.year}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Mail size={14} />
                                            <span className="truncate">{userProfile.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Countdown Widget */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Clock size={18} className="text-purple-400" />
                                <h3 className="font-semibold">Event Starts In</h3>
                            </div>
                            <CountdownTimer targetDate={eventDate} />
                            <p className="text-sm text-gray-500 mt-4">January 30, 2026 • IIT Delhi</p>
                        </motion.div>

                        {/* Quick Stats - Events Only */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-3"
                        >
                            <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border border-purple-500/20 rounded-2xl p-5 flex items-center justify-between h-full">
                                <div>
                                    <p className="text-3xl font-bold">{registeredEvents.length}</p>
                                    <p className="text-sm text-gray-400">Events Registered</p>
                                </div>
                                <Trophy className="text-purple-400" size={32} />
                            </div>
                        </motion.div>

                        {/* Your Pass Card - Full Width with Upgrade Options */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-12 relative group"
                        >
                            <YourPassCard user={user} userId={user?.id} />
                        </motion.div>

                        {/* Registered Events */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="lg:col-span-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Trophy size={18} className="text-purple-400" />
                                    My Registered Events
                                </h3>
                                <Link to="/events" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
                                    View All <ArrowRight size={14} />
                                </Link>
                            </div>

                            {registeredEvents.length > 0 ? (
                                <div className="space-y-3">
                                    {registeredEvents.map((event, index) => (
                                        <Link to={`/events?event=${event.id}`} key={event.id}>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group cursor-pointer"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center">
                                                        <Trophy size={20} className="text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold group-hover:text-purple-400 transition-colors">{event.name}</h4>
                                                        <p className="text-sm text-gray-500">{event.date}</p>
                                                    </div>
                                                </div>
                                                <span className={`text-xs px-3 py-1 rounded-full border ${getStatusBadge(event.status)}`}>
                                                    {event.status === 'confirmed' && <CheckCircle size={12} className="inline mr-1" />}
                                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                </span>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Trophy size={48} className="mx-auto text-gray-600 mb-4" />
                                    <p className="text-gray-400 mb-2">Event registration coming soon!</p>
                                    <p className="text-gray-500 text-sm mb-4">Check back later to register for BECon 2026 events</p>
                                    <Link
                                        to="/events"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors"
                                    >
                                        Explore Events <ArrowRight size={16} />
                                    </Link>
                                </div>
                            )}
                        </motion.div>

                        {/* Edit Profile Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="lg:col-span-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <User size={18} className="text-purple-400" />
                                    Profile Information
                                </h3>
                                {!isEditingProfile ? (
                                    <button
                                        onClick={() => setIsEditingProfile(true)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:bg-purple-600/30 transition-colors text-sm"
                                    >
                                        <Edit2 size={14} />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            disabled={savingProfile}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30 transition-colors text-sm disabled:opacity-50"
                                        >
                                            {savingProfile ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                            {savingProfile ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 transition-colors text-sm"
                                        >
                                            <X size={14} />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        value={isEditingProfile ? editedProfile.name : userProfile.name}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                                        disabled={!isEditingProfile}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Email</label>
                                    <input
                                        type="email"
                                        value={userProfile.email}
                                        disabled
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white opacity-50 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Phone</label>
                                    <input
                                        type="text"
                                        value={isEditingProfile ? editedProfile.phone : userProfile.phone}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                                        disabled={!isEditingProfile}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">College/Organization</label>
                                    <input
                                        type="text"
                                        value={isEditingProfile ? editedProfile.college : userProfile.college}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, college: e.target.value })}
                                        disabled={!isEditingProfile}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-2 block">Year/Role</label>
                                    <input
                                        type="text"
                                        value={isEditingProfile ? editedProfile.year : userProfile.year}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, year: e.target.value })}
                                        disabled={!isEditingProfile}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div className="md:col-span-2 lg:col-span-1">
                                    <label className="text-xs text-gray-500 mb-2 block">Bio</label>
                                    <textarea
                                        value={isEditingProfile ? editedProfile.bio : userProfile.bio}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                                        disabled={!isEditingProfile}
                                        rows={1}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
