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

interface Pass {
    id: string;
    name: string;
    originalPrice: number;
    price: number | 'FREE';
    image: string;
    color: string;
    glow: string;
    features: PassFeature[];
}

const passes: Pass[] = [
    {
        id: 'silver',
        name: 'SILVER PASS',
        originalPrice: 99,
        price: 'FREE',
        image: '/passes/silver.png',
        color: 'text-gray-200',
        glow: 'group-hover:border-gray-400/50 group-hover:shadow-[0_0_30px_rgba(200,200,200,0.2)]',
        features: [
            { name: 'Startup Expo', included: true },
            { name: 'Tech Showcase', included: true },
            { name: 'Autospark', included: true },
            { name: 'LHC Speaker Sessions', included: true },
            { name: 'Seminar+Dogra Speaker Sessions', included: false },
            { name: 'Moonshot Finale', included: false },
            { name: 'Blueprint Finale', included: false },
            { name: 'Influencer Conclave', included: false },
            { name: 'Incubator Summit', included: false },
            { name: 'Startup Clinic', included: false },
            { name: 'Policysphere', included: false },
        ]
    },
    {
        id: 'gold',
        name: 'GOLD PASS',
        originalPrice: 499,
        price: 199,
        image: '/passes/gold.png',
        color: 'text-yellow-400',
        glow: 'group-hover:border-yellow-500/50 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]',
        features: [
            { name: 'Startup Expo', included: true },
            { name: 'Tech Showcase', included: true },
            { name: 'Autospark', included: true },
            { name: 'LHC Speaker Sessions', included: true },
            { name: 'Seminar+Dogra Speaker Sessions', included: true },
            { name: 'Moonshot Finale', included: true },
            { name: 'Blueprint Finale', included: true },
            { name: 'Influencer Conclave', included: false },
            { name: 'Incubator Summit', included: false },
            { name: 'Startup Clinic', included: false },
            { name: 'Policysphere', included: false },
        ]
    },
    {
        id: 'platinum',
        name: 'PLATINUM PASS',
        originalPrice: 999,
        price: 399,
        image: '/passes/platinum.png',
        color: 'text-cyan-400',
        glow: 'group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]',
        features: [
            { name: 'Startup Expo', included: true },
            { name: 'Tech Showcase', included: true },
            { name: 'Autospark', included: true },
            { name: 'LHC Speaker Sessions', included: true },
            { name: 'Seminar+Dogra Speaker Sessions', included: true },
            { name: 'Moonshot Finale', included: true },
            { name: 'Blueprint Finale', included: true },
            { name: 'Influencer Conclave', included: true },
            { name: 'Incubator Summit', included: true },
            { name: 'Startup Clinic', included: true },
            { name: 'Policysphere', included: false },
        ]
    }
];

export const Tickets: React.FC = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    const handleGetPass = (passId: string) => {
        // Temporarily disabled - Coming Soon
        toast.info('Pass registration coming soon! Stay tuned.', {
            duration: 3000,
        });
    };

    return (
        <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-[#05020a] flex flex-col items-center justify-center relative overflow-hidden" id="tickets">

            {/* Background ambient glow */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center md:text-left"
                >
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="uppercase tracking-widest text-sm text-gray-400">Registration</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        Secure Your Spot at <span className="text-gray-500">BECon Today!</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {passes.map((pass, index) => (
                        <motion.div
                            key={pass.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
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
                                    className={`w-full py-4 rounded-lg font-bold text-sm tracking-wider uppercase transition-all duration-300 
                                    ${pass.name === 'GOLD PASS'
                                            ? 'bg-[#cca43b] text-black hover:bg-[#ffe58f] hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]'
                                            : pass.name === 'PLATINUM PASS'
                                                ? 'bg-[#5f7185] text-white hover:bg-[#8ba3bd] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                                                : 'bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                        }`}
                                >
                                    Get Pass
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};