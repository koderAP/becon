import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Building, Calendar, Edit2, Save, X, Ticket, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

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
}

interface Pass {
    id: string;
    eventName: string;
    passType: string;
    qrCode: string;
    validUntil: string;
}

export const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'events' | 'passes'>('events');
    const [isEditingBio, setIsEditingBio] = useState(false);

    // Mock user data - will be replaced with actual data from Supabase
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
    ];

    const passes: Pass[] = [
        { id: '1', eventName: 'BECon 2026 - All Access', passType: 'General', qrCode: 'QR_CODE_1', validUntil: 'Feb 2, 2026' },
    ];

    const handleSaveBio = () => {
        setUserProfile(editedProfile);
        setIsEditingBio(false);
    };

    const handleCancelEdit = () => {
        setEditedProfile(userProfile);
        setIsEditingBio(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'registered': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'attended': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    return (
        <div className="min-h-screen bg-[#05020a] text-white pt-24 pb-12 px-4 sm:px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar - User Profile Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden"
                        >
                            {/* Gradient background */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-purple-600/20 to-blue-600/20 blur-3xl" />

                            <div className="relative z-10">
                                {/* Avatar */}
                                <div className="flex justify-center mb-4">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold">
                                        {userProfile.name.charAt(0)}
                                    </div>
                                </div>

                                {/* Name */}
                                <h2 className="text-2xl font-bold text-center mb-1">{userProfile.name}</h2>

                                {/* BecID */}
                                <div className="flex items-center justify-center gap-2 mb-6">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider">BECon ID</span>
                                    <span className="text-sm font-mono text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/20">
                                        {userProfile.becId}
                                    </span>
                                </div>

                                {/* Quick Info */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail size={16} className="text-gray-400" />
                                        <span className="text-gray-300">{userProfile.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone size={16} className="text-gray-400" />
                                        <span className="text-gray-300">{userProfile.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Building size={16} className="text-gray-400" />
                                        <span className="text-gray-300">{userProfile.college}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Calendar size={16} className="text-gray-400" />
                                        <span className="text-gray-300">{userProfile.year}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                                <div className="text-2xl font-bold text-purple-400">{registeredEvents.length}</div>
                                <div className="text-xs text-gray-400 mt-1">Events</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
                                <div className="text-2xl font-bold text-blue-400">{passes.length}</div>
                                <div className="text-xs text-gray-400 mt-1">Passes</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Bio Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold">Profile Information</h3>
                                {!isEditingBio ? (
                                    <button
                                        onClick={() => setIsEditingBio(true)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:bg-purple-600/30 transition-colors"
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSaveBio}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/30 transition-colors"
                                        >
                                            <Save size={16} />
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 transition-colors"
                                        >
                                            <X size={16} />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-xs text-gray-400 mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        value={isEditingBio ? editedProfile.name : userProfile.name}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                                        disabled={!isEditingBio}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-2 block">Email (Non-editable)</label>
                                    <input
                                        type="email"
                                        value={userProfile.email}
                                        disabled
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white opacity-50 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-2 block">Phone</label>
                                    <input
                                        type="text"
                                        value={isEditingBio ? editedProfile.phone : userProfile.phone}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                                        disabled={!isEditingBio}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-2 block">College/Organization</label>
                                    <input
                                        type="text"
                                        value={isEditingBio ? editedProfile.college : userProfile.college}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, college: e.target.value })}
                                        disabled={!isEditingBio}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-2 block">Year/Role</label>
                                    <input
                                        type="text"
                                        value={isEditingBio ? editedProfile.year : userProfile.year}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, year: e.target.value })}
                                        disabled={!isEditingBio}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-gray-400 mb-2 block">Bio</label>
                                <textarea
                                    value={isEditingBio ? editedProfile.bio : userProfile.bio}
                                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                                    disabled={!isEditingBio}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                                />
                            </div>
                        </motion.div>

                        {/* Tabs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
                        >
                            {/* Tab Headers */}
                            <div className="flex border-b border-white/10">
                                <button
                                    onClick={() => setActiveTab('events')}
                                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === 'events'
                                            ? 'text-white bg-white/5'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Trophy size={18} />
                                        Registered Events
                                    </div>
                                    {activeTab === 'events' && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                                        />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('passes')}
                                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === 'passes'
                                            ? 'text-white bg-white/5'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Ticket size={18} />
                                        My Passes
                                    </div>
                                    {activeTab === 'passes' && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                                        />
                                    )}
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
                                {activeTab === 'events' ? (
                                    <div className="space-y-4">
                                        {registeredEvents.length > 0 ? (
                                            registeredEvents.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className="font-semibold text-white mb-1">{event.name}</h4>
                                                            <p className="text-sm text-gray-400">{event.date}</p>
                                                        </div>
                                                        <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(event.status)}`}>
                                                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-12">
                                                <Trophy size={48} className="mx-auto text-gray-600 mb-4" />
                                                <p className="text-gray-400 mb-4">No events registered yet</p>
                                                <Link
                                                    to="/events"
                                                    className="inline-block px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors"
                                                >
                                                    Browse Events
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {passes.length > 0 ? (
                                            passes.map((pass) => (
                                                <div
                                                    key={pass.id}
                                                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className="font-semibold text-white mb-1">{pass.eventName}</h4>
                                                            <p className="text-sm text-gray-400">{pass.passType} Pass</p>
                                                            <p className="text-xs text-gray-500 mt-1">Valid until: {pass.validUntil}</p>
                                                        </div>
                                                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                                                            <span className="text-xs text-gray-800">QR</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-12">
                                                <Ticket size={48} className="mx-auto text-gray-600 mb-4" />
                                                <p className="text-gray-400">No passes available yet</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
