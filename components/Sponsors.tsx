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
        <div className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#05020a]">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
                <div className="w-8 sm:w-12 h-[2px] bg-white"></div>
                <span className="text-sm sm:text-lg text-gray-300 uppercase tracking-widest">Our Partners</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-10 sm:mb-12 lg:mb-16"
            >
                Powering the <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Deep Tech Revolution</span>
            </motion.h1>

            {/* Platinum Tier */}
            <div className="mb-12 sm:mb-16 lg:mb-20">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-center mb-6 sm:mb-8 lg:mb-10 text-gray-400 uppercase tracking-[0.15em] sm:tracking-[0.2em]">Platinum Sponsors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 max-w-4xl mx-auto">
                    {sponsors.filter(s => s.tier === 'Platinum').map((s) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="h-28 sm:h-32 lg:h-40 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group"
                        >
                            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-300 group-hover:text-white group-hover:scale-105 transition-all">{s.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Gold Tier */}
            <div className="mb-12 sm:mb-16 lg:mb-20">
                <h3 className="text-base sm:text-lg lg:text-xl font-light text-center mb-6 sm:mb-8 lg:mb-10 text-gray-500 uppercase tracking-[0.15em] sm:tracking-[0.2em]">Gold Sponsors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-3xl mx-auto">
                    {sponsors.filter(s => s.tier === 'Gold').map((s) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="h-24 sm:h-28 lg:h-32 bg-white/5 border border-white/5 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300 cursor-pointer group"
                        >
                            <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-400 group-hover:text-white transition-colors">{s.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Silver & Partners Tier */}
            <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-light text-center mb-6 sm:mb-8 lg:mb-10 text-gray-600 uppercase tracking-[0.15em] sm:tracking-[0.2em]">Silver & Partners</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
                    {sponsors.filter(s => s.tier === 'Silver' || s.tier === 'Partner').map((s) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="h-20 sm:h-22 lg:h-24 bg-white/5 border border-white/5 rounded-md sm:rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                        >
                            <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-500 group-hover:text-white transition-colors">{s.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-16 sm:mt-24 lg:mt-32 text-center">
                <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Interested in sponsoring BECon 2026?</p>
                <button className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all uppercase tracking-wider text-xs sm:text-sm font-bold">
                    Become a Sponsor
                </button>
            </div>
        </div>
    );
};