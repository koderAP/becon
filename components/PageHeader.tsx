import React from 'react';
import { motion } from 'framer-motion';
import { HeroBackground } from './HeroBackground';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    badge?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, description, badge }) => {
    return (
        <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center bg-[#05020a]">
            {/* Background confined to header */}
            <div className="absolute inset-0 w-full h-full">
                <HeroBackground />
            </div>

            {/* Content */}
            <div className="relative z-30 px-4 sm:px-6 md:px-12 lg:px-20 text-center max-w-5xl mx-auto mt-16">
                {badge && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6"
                    >
                        <span className="text-sm text-purple-200 uppercase tracking-widest">{badge}</span>
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-6"
                >
                    {title}
                </motion.h1>

                {(subtitle || description) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-2xl mx-auto space-y-4"
                    >
                        {subtitle && <h2 className="text-xl sm:text-2xl text-purple-200 font-light">{subtitle}</h2>}
                        {description && <p className="text-gray-400 text-base sm:text-lg leading-relaxed">{description}</p>}
                    </motion.div>
                )}
            </div>

            {/* Bottom Fade to Black Body */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05020a] to-transparent z-20 pointer-events-none" />
        </div>
    );
};
