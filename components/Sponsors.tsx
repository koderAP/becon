import React from 'react';
import { motion } from 'framer-motion';
import { Sponsor } from '../types';

const sponsors: Sponsor[] = [
    { id: 1, name: "Airchains", tier: "Partner", logo: "/sponsors/Airchains- Primary-Dark 2.svg" },
    { id: 2, name: "AWS", tier: "Partner", logo: "/sponsors/Amazon_Web_Services_Logo.svg" },
    { id: 3, name: "DPIIT", tier: "Partner", logo: "/sponsors/DPIIT-header 3.svg" },
    { id: 4, name: "Dailyhunt", tier: "Partner", logo: "/sponsors/Dailyhunt-Logo 2.svg" },
    { id: 5, name: "Dainik Jagran", tier: "Partner", logo: "/sponsors/Dainik_Jagran_newspaper_logo.jpg" },
    { id: 6, name: "General Catalyst", tier: "Partner", logo: "/sponsors/General_Catalyst_Logo.svg" },
    { id: 7, name: "HSBC", tier: "Partner", logo: "/sponsors/Hsbc-logo.svg" },
    { id: 8, name: "IvyCap Ventures", tier: "Partner", logo: "/sponsors/IvyCap Ventures_idc9rjKJG__0.svg" },
    { id: 9, name: "LIC", tier: "Partner", logo: "/sponsors/LIC_Logo.svg" },
    { id: 10, name: "MG Motor", tier: "Partner", logo: "/sponsors/MG_Motor_2021_logo.svg" },
    { id: 11, name: "ONDC", tier: "Partner", logo: "/sponsors/ONDC_logo 2.svg" },
    { id: 12, name: "Paytm", tier: "Partner", logo: "/sponsors/Paytm_Logo_(standalone).svg" },
    { id: 13, name: "SBI", tier: "Partner", logo: "/sponsors/SBI-logo.svg" },
    { id: 14, name: "Partner", tier: "Partner", logo: "/sponsors/Screenshot_2025-01-29_at_7.29.24_PM-removebg-preview 2.svg" },
    { id: 15, name: "Worldcoin", tier: "Partner", logo: "/sponsors/Worldcoin_Logo.avif" },
    { id: 16, name: "ABV", tier: "Partner", logo: "/sponsors/abv_logo.svg" },
    { id: 17, name: "IAN", tier: "Partner", logo: "/sponsors/ian_logo.svg" },
    { id: 18, name: "Partner", tier: "Partner", logo: "/sponsors/image 15947.svg" },
    { id: 19, name: "Partner", tier: "Partner", logo: "/sponsors/image 15948.svg" },
    { id: 20, name: "Partner", tier: "Partner", logo: "/sponsors/image 15950.svg" },
    { id: 21, name: "Partner", tier: "Partner", logo: "/sponsors/image 15952.svg" },
    { id: 22, name: "Partner", tier: "Partner", logo: "/sponsors/image 15972.svg" },
    { id: 23, name: "Partner", tier: "Partner", logo: "/sponsors/image 15973.svg" },
    { id: 24, name: "Partner", tier: "Partner", logo: "/sponsors/image 15974.svg" },
    { id: 25, name: "Partner", tier: "Partner", logo: "/sponsors/image 15975.svg" },
    { id: 26, name: "Partner", tier: "Partner", logo: "/sponsors/image-removebg-preview-21 1.svg" },
    { id: 27, name: "Inc42", tier: "Partner", logo: "/sponsors/inc42-seeklogo-2.svg" },
    { id: 28, name: "Introbot", tier: "Partner", logo: "/sponsors/introbot_logo.svg" },
    { id: 29, name: "OYO", tier: "Partner", logo: "/sponsors/oyo-rooms-seeklogo.svg" },
    { id: 30, name: "Samsung", tier: "Partner", logo: "/sponsors/samsung-seeklogo.svg" },
    { id: 31, name: "Titan Capital", tier: "Partner", logo: "/sponsors/titancapital_logo.svg" },
    { id: 32, name: "Wadhwani", tier: "Partner", logo: "/sponsors/wadvani.svg" },
    { id: 33, name: "WestBridge", tier: "Partner", logo: "/sponsors/westbridge_logo.svg" },
    { id: 34, name: "YourStory", tier: "Partner", logo: "/sponsors/yourstory-seeklogo.svg" },
];

interface SponsorsProps {
    showHeader?: boolean;
    className?: string;
    isLoading?: boolean;
}

const SkeletonSponsorGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 mx-auto">
        {Array.from({ length: 12 }).map((_, i) => (
            <div
                key={i}
                className="h-24 sm:h-28 lg:h-32 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center animate-pulse"
            >
                <div className="w-2/3 h-12 bg-white/10 rounded-lg" />
            </div>
        ))}
    </div>
);

// Staggered animation variants for smooth flow entrance
const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.1
        }
    }
};

const gridItemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.3
        }
    }
};

const chunkArray = (arr: Sponsor[], chunks: number) => {
    const result = [];
    const len = arr.length;
    const size = Math.ceil(len / chunks);
    for (let i = 0; i < len; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

const InfiniteMarqueeRow: React.FC<{ sponsors: Sponsor[], direction: 'left' | 'right', speed?: number }> = ({ sponsors, direction = 'left', speed = 20 }) => {
    return (
        <div className="flex overflow-hidden relative w-full mb-4">
            <div
                className={`flex gap-4 shrink-0 ${direction === 'left' ? 'animate-sponsor-left' : 'animate-sponsor-right'}`}
                style={{ willChange: 'transform' }}
            >
                {/* Triple the list for seamless infinite scroll */}
                {[...sponsors, ...sponsors, ...sponsors].map((s, i) => (
                    <div
                        key={`${s.id}-${i}`}
                        className="w-24 h-16 bg-white border border-white/20 rounded-lg flex items-center justify-center shrink-0"
                        style={{ transform: 'translateZ(0)' }}
                    >
                        <img
                            src={s.logo}
                            alt={s.name}
                            loading="lazy"
                            className="w-full h-full object-contain p-2"
                        />
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes sponsor-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                @keyframes sponsor-right {
                    0% { transform: translateX(-33.33%); }
                    100% { transform: translateX(0); }
                }
                .animate-sponsor-left {
                    animation: sponsor-left ${speed}s linear infinite;
                }
                .animate-sponsor-right {
                    animation: sponsor-right ${speed}s linear infinite;
                }
            `}</style>
        </div>
    );
};

export const Sponsors: React.FC<SponsorsProps> = ({ showHeader = true, className = "", isLoading = false }) => {
    const sponsorChunks = chunkArray(sponsors, 3);

    return (
        <div className={`px-4 sm:px-6 md:px-12 lg:px-20 ${showHeader ? 'pt-20 sm:pt-24 pb-16 sm:pb-20' : 'pb-20'} ${className} ${!className.includes('bg-') ? 'bg-[#05020a]' : ''}`}>
            {showHeader && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
                    >
                        <div className="w-8 sm:w-12 h-[2px] bg-white"></div>
                        <span className="text-sm sm:text-lg text-gray-300 uppercase tracking-widest">Previous Partners</span>
                    </motion.div>

                </>
            )}

            {/* Mobile Marquee View (Hidden on md and up) */}
            <div className="block md:hidden mb-12 relative">
                {/* Fade gradients for smooth edge disappearance */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#05020a] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#05020a] to-transparent z-10" />

                <InfiniteMarqueeRow sponsors={sponsorChunks[0]} direction="left" speed={25} />
                <InfiniteMarqueeRow sponsors={sponsorChunks[1]} direction="right" speed={30} />
                <InfiniteMarqueeRow sponsors={sponsorChunks[2]} direction="left" speed={22} />
            </div>

            {/* Desktop Unified Sponsors Grid (Hidden on sm and down using md:block) */}
            <div className="hidden md:block mb-12 sm:mb-16 lg:mb-20">
                {isLoading ? (
                    <SkeletonSponsorGrid />
                ) : (
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 mx-auto"
                        variants={gridContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {sponsors.map((s) => (
                            <motion.div
                                key={s.id}
                                variants={gridItemVariants}
                                className="h-24 sm:h-28 lg:h-32 bg-white border border-white/20 rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer group p-4"
                            >
                                <img
                                    src={s.logo}
                                    alt={s.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-contain filter transition-all duration-300 opacity-80 group-hover:opacity-100"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
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