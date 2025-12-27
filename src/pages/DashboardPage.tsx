import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    User, Mail, Phone, Building, Calendar, Edit2, Save, X, Ticket, Trophy,
    QrCode, Clock, Sparkles, ArrowRight, CheckCircle, LogOut, Settings, Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

    // Mock user data
    const [userProfile, setUserProfile] = useState<UserProfile>({
        id: '1',
        becId: 'BEC26-A7K9-X4M2',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        college: 'IIT Delhi',
        year: '3rd Year',
        bio: 'Passionate about deep tech and entrepreneurship. Looking forward to BECon 2026!',
    });

    const [editedProfile, setEditedProfile] = useState(userProfile);

    // Mock data
    const registeredEvents: Event[] = [
        { id: '1', name: '100X Hackathon', date: 'Jan 31 - Feb 2, 2026', status: 'confirmed' },
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

    return (
        <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <GlowOrb className="w-96 h-96 bg-purple-600 top-20 -left-48" />
                <GlowOrb className="w-80 h-80 bg-blue-600 bottom-20 right-20" />
                <GlowOrb className="w-64 h-64 bg-pink-600 top-1/2 left-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 md:px-12 lg:px-20">
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
                        </div>
                    </motion.div>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

                        {/* BECon ID Card - Premium Glowing Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-5 relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                            <div className="relative bg-gradient-to-br from-[#1a0a2e] to-[#0a0a1a] rounded-3xl p-6 border border-purple-500/30 overflow-hidden h-full">
                                {/* Card Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
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
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold">
                                            {userProfile.name.charAt(0)}
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
