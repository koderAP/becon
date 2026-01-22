import React from 'react';
import { motion } from 'framer-motion';
import { Speakers } from '../../components/Speakers';
import { Footer } from '../../components/Footer';
import { PageHeader } from '../../components/PageHeader';
import { Instagram, Linkedin } from 'lucide-react';

import attendeesData from '../data/speakers_2026.json';

// Staggered animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4
        }
    }
};

const SkeletonSpeakerCard = () => (
    <div className="group relative animate-pulse">
        <div className="relative aspect-square rounded-[32px] overflow-hidden mb-4 bg-white/5 border border-white/5">
            <div className="w-full h-full bg-white/5" />
        </div>
        <div className="text-left space-y-2">
            <div className="h-6 w-32 bg-white/10 rounded" />
            <div className="h-4 w-24 bg-white/10 rounded" />
        </div>
    </div>
);

export const SpeakersPage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <PageHeader
                title="SPEAKERS"
                badge="2026 Lineup"
                description="Meet the visionaries, industry leaders, and pioneers joining us for BECon 2026."
            />

            <div className="relative z-20 py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="border-t border-white/10 pt-20">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="text-lg text-gray-300 uppercase tracking-widest">Confirmed 2026 Speakers</span>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <SkeletonSpeakerCard key={i} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {attendeesData.map((speaker, i) => (
                                <motion.div key={speaker.id || i} className="group relative" variants={itemVariants}>
                                    <div className="relative aspect-square rounded-[32px] overflow-hidden mb-4 bg-[#111] border border-white/5">
                                        <img
                                            src={speaker.img}
                                            alt={speaker.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=random`;
                                            }}
                                        />

                                        {/* Glow Effect on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/40 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                        {/* LinkedIn Link if available */}
                                        {speaker.linkedin && (
                                            <a
                                                href={speaker.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-600"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Linkedin size={16} />
                                            </a>
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold text-white mb-1">{speaker.name}</h3>
                                        <p className="text-gray-500 text-sm line-clamp-2">{speaker.designation}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="relative z-50">
                <Footer />
            </div>
        </div >
    );
};
