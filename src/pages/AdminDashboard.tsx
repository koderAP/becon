import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Users, FileText, Calendar, Settings } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ users: 0, forms: 0, events: 10 });
    const navigate = useNavigate();

    useEffect(() => {
        // Check if admin is logged in
        const token = localStorage.getItem('adminToken');
        if (!token) {
            toast.error('Please login first');
            navigate('/admin/login');
            return;
        }

        // TODO: Fetch admin stats from API
        setLoading(false);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        toast.success('Logged out successfully');
        navigate('/admin/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F0C1A] flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0C1A]">
            {/* Header */}
            <div className="bg-[#1A1425] border-b border-[#7A32E0]/20 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                        Admin Dashboard
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard icon={Users} label="Total Users" value={stats.users} color="purple" />
                    <StatCard icon={FileText} label="Forms Created" value={stats.forms} color="blue" />
                    <StatCard icon={Calendar} label="Events" value={stats.events} color="green" />
                </div>

                {/* Quick Actions */}
                <div className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ActionButton
                            icon={FileText}
                            label="Manage Forms"
                            description="View and edit event forms"
                            onClick={() => toast.info('Forms management coming soon')}
                        />
                        <ActionButton
                            icon={Users}
                            label="User Management"
                            description="View registered users"
                            onClick={() => toast.info('User management coming soon')}
                        />
                        <ActionButton
                            icon={Calendar}
                            label="Event Settings"
                            description="Configure event details"
                            onClick={() => toast.info('Event settings coming soon')}
                        />
                        <ActionButton
                            icon={Settings}
                            label="System Settings"
                            description="General system configuration"
                            onClick={() => toast.info('System settings coming soon')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, color }: any) {
    const colors = {
        purple: 'from-[#7A32E0] to-[#6F7EEA]',
        blue: 'from-[#4F46E5] to-[#6366F1]',
        green: 'from-[#10B981] to-[#34D399]',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-xl p-6"
        >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[color as keyof typeof colors]} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-[#BBC5F2]/60 text-sm">{label}</p>
            <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </motion.div>
    );
}

// Action Button Component
function ActionButton({ icon: Icon, label, description, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg p-4 text-left hover:border-[#7A32E0]/40 transition group"
        >
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7A32E0]/20 to-[#6F7EEA]/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#7A32E0]" />
                </div>
                <div>
                    <h3 className="text-white font-medium group-hover:text-[#7A32E0] transition">{label}</h3>
                    <p className="text-[#BBC5F2]/60 text-sm mt-1">{description}</p>
                </div>
            </div>
        </button>
    );
}
