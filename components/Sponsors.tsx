import React from 'react';
import { motion } from 'framer-motion';
import { Sponsor } from '../types';

const sponsors: Sponsor[] = [
    { id: 1, name: "Google Cloud", tier: "Platinum", logo: "Google Cloud" },
    { id: 2, name: "Microsoft", tier: "Platinum", logo: "Microsoft" },
    { id: 3, name: "OpenAI", tier: "Gold", logo: "OpenAI" },
    { id: 4, name: "NVIDIA", tier: "Gold", logo: "NVIDIA" },
    { id: 5, name: "Intel", tier: "Silver", logo: "Intel" },
    { id: 6, name: "IBM Research", tier: "Silver", logo: "IBM" },
    { id: 7, name: "Sequoia", tier: "Partner", logo: "Sequoia" },
    { id: 8, name: "Y Combinator", tier: "Partner", logo: "YC" },
];

export const Sponsors: React.FC = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 px-6 md:px-20 bg-[#05020a]">
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
            >
                <div className="w-12 h-[2px] bg-white"></div>
                <span className="text-lg text-gray-300 uppercase tracking-widest">Our Partners</span>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-bold leading-tight mb-16"
            >
                Powering the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Deep Tech Revolution</span>
            </motion.h1>

            {/* Platinum Tier */}
            <div className="mb-20">
                <h3 className="text-2xl font-light text-center mb-10 text-gray-400 uppercase tracking-[0.2em]">Platinum Sponsors</h3>
                <div className="flex flex-wrap justify-center gap-10">
                    {sponsors.filter(s => s.tier === 'Platinum').map((s) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-80 h-40 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group"
                        >
                            <span className="text-2xl font-bold text-gray-300 group-hover:text-white group-hover:scale-105 transition-all">{s.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Gold Tier */}
            <div className="mb-20">
                <h3 className="text-xl font-light text-center mb-10 text-gray-500 uppercase tracking-[0.2em]">Gold Sponsors</h3>
                <div className="flex flex-wrap justify-center gap-8">
                    {sponsors.filter(s => s.tier === 'Gold').map((s) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-64 h-32 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300 cursor-pointer group"
                        >
                            <span className="text-xl font-bold text-gray-400 group-hover:text-white transition-colors">{s.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Silver Tier */}
            <div>
                 <h3 className="text-lg font-light text-center mb-10 text-gray-600 uppercase tracking-[0.2em]">Silver & Partners</h3>
                 <div className="flex flex-wrap justify-center gap-6">
                    {sponsors.filter(s => s.tier === 'Silver' || s.tier === 'Partner').map((s) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-48 h-24 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                        >
                            <span className="text-lg font-medium text-gray-500 group-hover:text-white transition-colors">{s.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
            
             <div className="mt-32 text-center">
                 <p className="text-gray-400 mb-6">Interested in sponsoring BECon 2026?</p>
                 <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all uppercase tracking-wider text-sm font-bold">
                     Become a Sponsor
                 </button>
             </div>
        </div>
    );
};