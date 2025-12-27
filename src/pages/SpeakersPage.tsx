import React from 'react';
import { motion } from 'framer-motion';
import { Speakers } from '../../components/Speakers';
import { Footer } from '../../components/Footer';
import { PageHeader } from '../../components/PageHeader';
import { Instagram, Linkedin } from 'lucide-react';

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
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <PageHeader
                title="SPEAKERS"
                badge="Our Guests"
                description="Meet the visionaries and industry leaders shaping the future of deep tech."
            />

            <div className="relative z-20 py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="mb-20 text-center">
                    <span className="px-6 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-semibold uppercase tracking-wider mb-8 inline-block">
                        Coming Soon
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">Becon 2026 Lineup</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        We are curating an exceptional lineup of visionaries for this year. Stay tuned for the announcement.
                    </p>
                </div>

                <div className="border-t border-white/10 pt-20">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="text-lg text-gray-300 uppercase tracking-widest">Previous Speakers</span>
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
                            {[
                                "Sachin Bansal", "Ritesh Agarwal", "Raghuram Rajan", "Nikhil Kamath", "Anand Chandrasekaran",
                                "Sanjeev Bikhchandani", "Dara Khosrowshahi", "Deepinder Goyal", "Mark Zuckerberg", "Elie Seidman",
                                "Jack Dorsey", "Prashanth Prakash", "Aman Gupta", "Ashneer Grover", "Kunal Bahl",
                                "Hemant Taneja", "Rohit Bansal", "Azhar Iqubal", "Amit Jain", "Vijay Shekhar Sharma",
                                "Nitin Gadkari", "Tanmay Bhat", "Bryan Johnson", "Gaurav Chaudhary", "Gurudev Ravi Shankar",
                                "BVR Mohan Reddy", "Nuseir Yassin", "Manoj Kohli", "Radhika Gupta", "Terry Wu",
                                "Prashant Tandon", "Ruchira Shukla", "Alok Mittal", "Bill Gates", "Kiran Bedi",
                                "Prashant Pitti", "Rajan Anandan"
                            ].map((name, i) => {
                                const imagePath = `/speakers/${name.replace(/\s+/g, '')}.png`;
                                return (
                                    <motion.div key={i} className="group relative" variants={itemVariants}>
                                        <div className="relative aspect-square rounded-[32px] overflow-hidden mb-4 bg-[#111] border border-white/5">
                                            <img
                                                src={imagePath}
                                                alt={name}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
                                                }}
                                            />

                                            {/* Glow Effect on Hover */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/40 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                            {/* Social Icons Overlay - Bottom Right */}
                                            <div className="absolute bottom-5 right-5 flex gap-3 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 group-hover:text-[#0077b5] transition-colors duration-300 shadow-lg cursor-pointer">
                                                    <Linkedin size={20} />
                                                </div>
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 group-hover:text-[#E1306C] transition-colors duration-300 shadow-lg cursor-pointer">
                                                    <Instagram size={20} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
                                            <p className="text-gray-500 text-sm">Industry Leader</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
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
