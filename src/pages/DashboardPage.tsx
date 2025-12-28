import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    User, Mail, Phone, Building, Calendar, Edit2, Save, X, Ticket, Trophy,
    QrCode, Clock, Sparkles, ArrowRight, CheckCircle, LogOut, Settings, Bell, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { generateBeconIdFromUserId } from '../utils/beconId';

// ID Card Popup Component
const IDCardModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    user: UserProfile;
}> = ({ isOpen, onClose, user }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-md"
                    style={{ perspective: '1000px' }}
                >
                    {/* Card Glow */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl blur-xl opacity-60" />

                    {/* ID Card */}
                    <div className="relative bg-gradient-to-br from-[#1a0a2e] to-[#0a0a1a] rounded-3xl overflow-hidden border-2 border-purple-500/50">
                        {/* Header Banner */}
                        <div className="h-24 bg-gradient-to-r from-purple-600 to-blue-600 relative">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-28 h-28 rounded-full border-4 border-[#1a0a2e] overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                                        {user.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="pt-16 pb-8 px-6 text-center">
                            <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                            <p className="text-gray-400 text-sm mb-4">{user.college} • {user.year}</p>

                            {/* BECon ID */}
                            <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
                                <p className="text-xs text-purple-400 uppercase tracking-wider mb-1">BECon ID</p>
                                <h3 className="text-xl font-mono font-bold tracking-wider text-white">{user.becId}</h3>
                            </div>

                            {/* QR Code */}
                            <div className="bg-white rounded-xl p-4 w-32 h-32 mx-auto mb-4">
                                <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMSAyMSI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTAgMGg3djdIMHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMSAxaDV2NUgxeiIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0yIDJoM3YzSDJ6TTAgOGg3djdIMHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMSA5aDV2NUgxeiIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0yIDEwaDN2M0gyem0xMi04aDd2N2gtN3oiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTUgMWg1djVoLTV6Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTE2IDJoM3YzaC0zek04IDBoMXYxSDh6bTIgMGgxdjFoLTF6bTIgMGgydjJoLTF2MWgtMVYxaDF6bS0yIDJoMXYxaC0xem0tMiAxaDF2MUg4em0yIDBoMXYxaC0xem0yIDFoMXYxaC0xek04IDRoMnYxSDh6bTQgMGgxdjJoLTF6bTEgMWgxdjFoLTF6TTggNmgydjJIOHptMyAwaDF2MWgtMXptMCAxdjFoMVY3aC0xem0yIDBoMXYxaC0xem0tNyAyaDJ2MUg2em0zIDBoMXYxSDl6bTIgMGgxdjFoLTF6bTIgMWgxdjFoLTF6bTEtMWgxdjFoLTF6bTIgMGgxdjFoLTF6bTEgMGgxdjFoLTF6TTggMTBoMXYxSDh6bTIgMGgxdjFoLTF6bTQgMGgxdjFoLTF6TTggMTJoMXYxSDh6bTIgMGgxdjFoLTF6bS00IDFoMXYxSDZ6bTQgMGgxdjFoLTF6bTIgMGgydjFoLTJ6bTQtNWgxdjFoLTF6bTEgMGgxdjFoLTF6bS0yIDJoMnYxaC0xdjFoLTF6bTMgMGgxdjJoLTF6bS0xIDNoMXYxaC0xeiIvPjwvc3ZnPg==')] bg-contain bg-center bg-no-repeat" />
                            </div>

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
            </motion.div>
        )}
    </AnimatePresence>
);

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

// Animated background orb
const GlowOrb: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`absolute rounded-full blur-3xl opacity-30 animate-pulse ${className}`} />
);

export const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'events' | 'passes'>('events');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showIDCard, setShowIDCard] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const { user, loading, signOut } = useAuth();
    const navigate = useNavigate();

    // Handle avatar upload
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setAvatarPreview(result);
                setUserProfile(prev => ({ ...prev, avatar: result }));
            };
            reader.readAsDataURL(file);
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
            email: user.email || '',
            phone: metadata.phone || '',
            college: metadata.college || '',
            year: metadata.year || '2024',
            bio: metadata.bio || `Excited to be part of BECon 2026!`,
            avatar: metadata.avatar_url,
        };

        setUserProfile(profile);
        setEditedProfile(profile);
    }, [user, loading, navigate]);

    // Mock data
    const registeredEvents: Event[] = [
        { id: '1', name: 'e-Raksha Hackathon', date: 'Jan 31 - Feb 2, 2026', status: 'confirmed' },
        { id: '2', name: 'Moonshot Pitching', date: 'Feb 1, 2026', status: 'registered' },
        { id: '3', name: 'Deep Tech Workshop', date: 'Feb 2, 2026', status: 'registered' },
    ];

    const passes: Pass[] = [
        { id: '1', eventName: 'BECon 2026', passType: 'All Access', qrCode: 'QR_CODE_1', validUntil: 'Feb 2, 2026' },
    ];

    const eventDate = new Date('2026-01-31T09:00:00');

    const handleSave = () => {
        setUserProfile(editedProfile);
        setIsEditingProfile(false);
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
        await signOut();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#030014] flex items-center justify-center">
                <div className="text-white text-xl">Loading your dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <GlowOrb className="w-96 h-96 bg-purple-600 top-20 -left-48" />
                <GlowOrb className="w-80 h-80 bg-blue-600 bottom-20 right-20" />
                <GlowOrb className="w-64 h-64 bg-pink-600 top-1/2 left-1/2 -translate-x-1/2" />
            </div>

            {/* ID Card Modal */}
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

                        {/* BECon ID Card - Premium Glowing Card (Clickable) */}
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
                                            <Sparkles className="text-white" size={24} />
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
                            <p className="text-sm text-gray-500 mt-4">January 31, 2026 • IIT Delhi</p>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-3 grid grid-rows-2 gap-4"
                        >
                            <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border border-purple-500/20 rounded-2xl p-5 flex items-center justify-between">
                                <div>
                                    <p className="text-3xl font-bold">{registeredEvents.length}</p>
                                    <p className="text-sm text-gray-400">Events Registered</p>
                                </div>
                                <Trophy className="text-purple-400" size={32} />
                            </div>
                            <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-500/20 rounded-2xl p-5 flex items-center justify-between">
                                <div>
                                    <p className="text-3xl font-bold">{passes.length}</p>
                                    <p className="text-sm text-gray-400">Active Passes</p>
                                </div>
                                <Ticket className="text-blue-400" size={32} />
                            </div>
                        </motion.div>

                        {/* My Pass - Visual QR Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <QrCode size={18} className="text-blue-400" />
                                    My Pass
                                </h3>
                                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    Active
                                </span>
                            </div>

                            {passes.length > 0 ? (
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2">
                                        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMSAyMSI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTAgMGg3djdIMHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMSAxaDV2NUgxeiIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0yIDJoM3YzSDJ6TTAgOGg3djdIMHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMSA5aDV2NUgxeiIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0yIDEwaDN2M0gyem0xMi04aDd2N2gtN3oiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTUgMWg1djVoLTV6Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTE2IDJoM3YzaC0zek04IDBoMXYxSDh6bTIgMGgxdjFoLTF6bTIgMGgydjJoLTF2MWgtMVYxaDF6bS0yIDJoMXYxaC0xem0tMiAxaDF2MUg4em0yIDBoMXYxaC0xem0yIDFoMXYxaC0xek04IDRoMnYxSDh6bTQgMGgxdjJoLTF6bTEgMWgxdjFoLTF6TTggNmgydjJIOHptMyAwaDF2MWgtMXptMCAxdjFoMVY3aC0xem0yIDBoMXYxaC0xem0tNyAyaDJ2MUg2em0zIDBoMXYxSDl6bTIgMGgxdjFoLTF6bTIgMWgxdjFoLTF6bTEtMWgxdjFoLTF6bTIgMGgxdjFoLTF6bTEgMGgxdjFoLTF6TTggMTBoMXYxSDh6bTIgMGgxdjFoLTF6bTQgMGgxdjFoLTF6TTggMTJoMXYxSDh6bTIgMGgxdjFoLTF6bS00IDFoMXYxSDZ6bTQgMGgxdjFoLTF6bTIgMGgydjFoLTJ6bTQtNWgxdjFoLTF6bTEgMGgxdjFoLTF6bS0yIDJoMnYxaC0xdjFoLTF6bTMgMGgxdjJoLTF6bS0xIDNoMXYxaC0xeiIvPjwvc3ZnPg==')] bg-contain bg-center bg-no-repeat" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg">{passes[0].eventName}</h4>
                                        <p className="text-sm text-purple-400">{passes[0].passType} Pass</p>
                                        <p className="text-xs text-gray-500 mt-2">Valid until {passes[0].validUntil}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <Ticket size={40} className="mx-auto text-gray-600 mb-3" />
                                    <p className="text-gray-400 text-sm">No passes yet</p>
                                </div>
                            )}
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
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + index * 0.1 }}
                                            className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group"
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
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Trophy size={48} className="mx-auto text-gray-600 mb-4" />
                                    <p className="text-gray-400 mb-4">No events registered yet</p>
                                    <Link
                                        to="/events"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors"
                                    >
                                        Browse Events <ArrowRight size={16} />
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
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30 transition-colors text-sm"
                                        >
                                            <Save size={14} />
                                            Save
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
