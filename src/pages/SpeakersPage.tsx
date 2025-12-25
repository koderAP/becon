import React from 'react';
import { motion } from 'framer-motion';
import { Speakers } from '../../components/Speakers';
import { Footer } from '../../components/Footer';
import { HeroBackground } from '../../components/HeroBackground';

export const SpeakersPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <HeroBackground />

            <div className="relative z-20 pt-32 pb-20">
                {/* Header */}
                <div className="text-center mb-16 px-4 sm:px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6"
                    >
                        <span className="text-sm text-purple-200 uppercase tracking-widest">Our Guests</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl sm:text-8xl md:text-9xl font-bold mb-6 tracking-tighter"
                    >
                        SPEAKERS
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Meet the visionaries and industry leaders shaping the future of deep tech.
                    </motion.p>
                </div>

                <Speakers showHeader={false} className="bg-transparent !p-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" />
            </div>

            <div className="relative z-50">
                <Footer />
            </div>
        </div>
    );
};
