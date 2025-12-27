import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function AdminLogin() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Login failed');

            // Store admin token
            localStorage.setItem('adminToken', data.token);
            toast.success('Admin login successful!');

            // Redirect to admin dashboard
            setTimeout(() => navigate('/admin/dashboard'), 100);
        } catch (error: any) {
            toast.error(error.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F0C1A] flex items-center justify-center px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7A32E0]/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6F7EEA]/20 rounded-full blur-[150px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md"
            >
                <div className="bg-[#1A1425] border border-[#7A32E0]/20 rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#7A32E0] to-[#6F7EEA] flex items-center justify-center">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                            Admin Portal
                        </h1>
                        <p className="text-[#BBC5F2]/60 text-sm mt-2">
                            BECon'26 Event Management
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-[#BBC5F2] flex items-center gap-2">
                                <Mail className="w-3 h-3" /> Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white placeholder-[#BBC5F2]/30 focus:outline-none focus:border-[#7A32E0] transition-all"
                                placeholder="admin@becon.in"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-[#BBC5F2] flex items-center gap-2">
                                <Lock className="w-3 h-3" /> Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="w-full bg-[#0F0C1A] border border-[#7A32E0]/20 rounded-lg px-4 py-3 text-white placeholder-[#BBC5F2]/30 focus:outline-none focus:border-[#7A32E0] transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#7A32E0] to-[#6F7EEA] hover:from-[#6F7EEA] hover:to-[#7A32E0] text-white py-3 rounded-lg font-medium transition-all duration-300 mt-6 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-[#BBC5F2]/40 text-xs mt-6">
                        This is a restricted area. Unauthorized access is prohibited.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
