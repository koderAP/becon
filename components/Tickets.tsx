import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/contexts/AuthContext';
import { toast } from 'sonner';

interface PassFeature {
    name: string;
    included: boolean;
}

import { PASS_CONFIG } from '../src/constants/passes';

const passes = PASS_CONFIG.filter(p => p.id !== 'iitd_student');

import { supabase } from '../src/lib/supabase';
import { useState, useEffect } from 'react';

export const Tickets: React.FC = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const [userPassLevel, setUserPassLevel] = useState(0);

    const getPassLevel = (passId: string) => {
        switch (passId.toLowerCase()) {
            case 'silver': return 1;
            case 'gold': return 2;
            case 'platinum': return 3;
            case 'iitd_student': return 4;
            default: return 0;
        }
    };

    useEffect(() => {
        const fetchUserPass = async () => {
            if (user) {
                const { data } = await supabase
                    .from('user_passes')
                    .select('pass_type')
                    .eq('user_id', user.id)
                    .order('purchased_at', { ascending: false })
                    .limit(1)
                    .single();

                if (data?.pass_type) {
                    setUserPassLevel(getPassLevel(data.pass_type));
                }
            }
        };
        fetchUserPass();
    }, [user]);

    const handleGetPass = (passId: string) => {
        const targetLevel = getPassLevel(passId);
        const isUpgrade = userPassLevel > 0 && userPassLevel < targetLevel;
        navigate(`/checkout?pass=${passId}${isUpgrade ? '&upgrade=true' : ''}`);
    };

    return (
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[#05020a] flex flex-col items-center justify-center relative overflow-hidden" id="tickets">

            {/* Background ambient glow */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div
                    className="mb-16 text-center md:text-left"
                >
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="uppercase tracking-widest text-sm text-gray-400">Registration</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        Secure Your Spot at <span className="text-gray-500">BECon Today!</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {passes.map((pass, index) => (
                        <div
                            key={pass.id}
                            className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-0 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${pass.glow}`}
                        >
                            {/* Inner Gradient Border Effect */}
                            <div className={`absolute inset-0 rounded-3xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${pass.id === 'gold' ? 'border-yellow-500/50' : pass.id === 'platinum' ? 'border-cyan-500/50' : 'border-gray-400/50'}`} />

                            {/* Subtle Background Gradient */}
                            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none bg-gradient-to-br ${pass.id === 'gold' ? 'from-yellow-500 via-transparent to-transparent' : pass.id === 'platinum' ? 'from-cyan-500 via-transparent to-transparent' : 'from-gray-500 via-transparent to-transparent'}`} />

                            {/* Header Section */}
                            <div className="p-8 pb-6 relative z-10">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 text-lg line-through font-medium decoration-red-500/60 decoration-2 mb-1">
                                            ₹{pass.originalPrice}
                                        </span>
                                        <div className="flex items-baseline gap-1">
                                            {pass.price !== 'FREE' && <span className="text-2xl font-bold text-white">₹</span>}
                                            <span className={`text-5xl font-black ${pass.name === 'SILVER PASS' ? 'text-white' : pass.color} tracking-tight`}>
                                                {pass.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Small Floating Image - INCREASED SIZE & TILTED */}
                                    <div className="w-56 h-32 ml-4 -mt-6">
                                        <img src={pass.image} alt={pass.name} className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500" />
                                    </div>
                                </div>

                                <h3 className={`text-2xl font-bold uppercase tracking-wide mt-4 ${pass.name === 'SILVER PASS' ? 'text-gray-200' : pass.color}`}>
                                    {pass.name}
                                </h3>
                            </div>

                            {/* Divider with Glow */}
                            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent">
                                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${pass.id === 'gold' ? 'yellow' : pass.id === 'platinum' ? 'cyan' : 'white'}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`} />
                            </div>

                            {/* Features List */}
                            <div className="p-8 pt-6 flex-1 relative z-10">
                                <ul className="space-y-4">
                                    {pass.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            {feature.included ? (
                                                <div className={`p-0.5 rounded-full ${pass.id === 'gold' ? 'bg-yellow-500/20 text-yellow-400' : pass.id === 'platinum' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-green-500/20 text-green-400'}`}>
                                                    <Check size={12} strokeWidth={4} />
                                                </div>
                                            ) : (
                                                <div className="p-0.5 rounded-full bg-red-500/10 text-red-500/50">
                                                    <X size={12} strokeWidth={4} />
                                                </div>
                                            )}
                                            <span className={`text-sm font-medium tracking-wide ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {feature.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Button */}
                            <div className="p-8 pt-0 mt-auto">
                                <button
                                    onClick={() => handleGetPass(pass.id)}
                                    disabled={loading || (userPassLevel >= getPassLevel(pass.id))} // Disable if loading or already owned/surpassed
                                    className={`w-full py-4 rounded-lg font-bold text-sm tracking-wider uppercase transition-all duration-300 
                                    ${
                                        // Case 1: Already Owned or Higher Tier
                                        userPassLevel >= getPassLevel(pass.id)
                                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5'

                                            // Case 2: Available for Purchase/Upgrade (Gold)
                                            : pass.name === 'GOLD PASS'
                                                ? 'bg-[#cca43b] text-black hover:bg-[#ffe58f] hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]'

                                                // Case 3: Available for Purchase/Upgrade (Platinum)
                                                : pass.name === 'PLATINUM PASS'
                                                    ? 'bg-[#5f7185] text-white hover:bg-[#8ba3bd] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]'

                                                    // Case 4: Available for Purchase (Silver/Free)
                                                    : 'bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                        }`}
                                >
                                    {loading ? '...' :
                                        userPassLevel >= getPassLevel(pass.id) ? 'Owned' :
                                            userPassLevel > 0 ? 'Upgrade' :
                                                'Get Pass'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Accommodation Section */}
                <div
                    className="mt-16"
                >
                    <div className="relative bg-gradient-to-br from-[#1a0b2e] via-[#0f0518] to-[#0a0514] border border-purple-500/20 rounded-3xl p-8 md:p-10 overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            {/* Left - Icon & Text */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" />
                                        <path d="M2 12v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7" />
                                        <path d="M2 9h20v3H2z" />
                                        <path d="M5 9v3m14-3v3" />
                                    </svg>
                                    Accommodation
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                    Need a Place to Stay?
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
                                    We've got you covered! Register for accommodation in Delhi during BECon 2026. Limited slots available - book early!
                                </p>

                                <ul className="flex flex-wrap gap-4 mt-6 text-sm text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        Safe & Secure
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        Accommodation in Delhi
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        Easy Commute
                                    </li>
                                </ul>
                            </div>

                            {/* Right - CTA */}
                            <div className="shrink-0">
                                <a
                                    href="https://forms.gle/gYy2sYG9eQZks9Vx8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-105"
                                >
                                    Register Now
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 17l9.2-9.2M17 17V7H7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};