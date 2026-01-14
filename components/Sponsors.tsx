
import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';

interface SponsorsProps {
    showHeader?: boolean;
    className?: string;
    isLoading?: boolean;
}

const SkeletonSponsorImage = () => (
    <div className="w-full h-64 md:h-96 bg-white/5 border border-white/5 rounded-3xl animate-pulse" />
);

export const Sponsors: React.FC<SponsorsProps> = ({ showHeader = true, className = "", isLoading = false }) => {
    return (
        <div className={`px-4 sm:px-6 md:px-12 lg:px-20 ${showHeader ? 'pt-20 sm:pt-24 pb-16 sm:pb-20' : 'pb-20'} ${className} ${!className.includes('bg-') ? 'bg-[#05020a]' : ''}`}>
            {showHeader && (
                <>
                    <SectionHeading className="mb-6 sm:mb-12">Previous Partners</SectionHeading>
                </>
            )}

            <div className="relative w-full mx-auto">
                {isLoading ? (
                    <SkeletonSponsorImage />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        {/* Image Container */}
                        <div className="relative w-full">
                            <img
                                src="/sponsors/past_sponsors.avif"
                                alt="Past Sponsors of BECon"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-auto"
                            />
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="mt-16 sm:mt-24 lg:mt-32 text-center">

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10 tracking-tight">
                    Interested in sponsoring <br className="hidden sm:block" />
                    <span className="text-gray-400">BECon 2026?</span>
                </h2>

                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScIdbQoS1t3Jr2vobyhiqpnMeTByvDy2zdVG_fg2HH29oeKqA/viewform?usp=dialog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center px-10 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-bold"
                >
                    Become a Sponsor
                </a>
            </div>
        </div>
    );
};