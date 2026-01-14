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
                                { name: "Sachin Bansal", role: "Co-founder, Flipkart & CEO, Navi" },
                                { name: "Ritesh Agarwal", role: "Founder & CEO, OYO" },
                                { name: "Raghuram Rajan", role: "Ex-Governor, RBI & Professor, Chicago Booth" },
                                { name: "Nikhil Kamath", role: "Co-founder, Zerodha & True Beacon" },
                                { name: "Anand Chandrasekaran", role: "Partner, General Catalyst" },
                                { name: "Sanjeev Bikhchandani", role: "Founder, Info Edge (Naukri.com)" },
                                { name: "Dara Khosrowshahi", role: "CEO, Uber" },
                                { name: "Deepinder Goyal", role: "Founder & CEO, Zomato" },
                                { name: "Mark Zuckerberg", role: "Founder & CEO, Meta" },
                                { name: "Elie Seidman", role: "Former CEO, Tinder" },
                                { name: "Jack Dorsey", role: "Co-founder, Block & Ex-CEO, Twitter" },
                                { name: "Prashanth Prakash", role: "Founding Partner, Accel India" },
                                { name: "Aman Gupta", role: "Co-founder & CMO, boAt" },
                                { name: "Ashneer Grover", role: "Founder, Third Unicorn (Ex-BharatPe)" },
                                { name: "Kunal Bahl", role: "Co-founder, Snapdeal & Titan Capital" },
                                { name: "Hemant Taneja", role: "CEO & Managing Director, General Catalyst" },
                                { name: "Rohit Bansal", role: "Co-founder & COO, Snapdeal" },
                                { name: "Azhar Iqubal", role: "Co-founder & Chairman, Inshorts" },
                                { name: "Amit Jain", role: "CEO & Co-founder, CarDekho" },
                                { name: "Vijay Shekhar Sharma", role: "Founder & CEO, Paytm" },
                                { name: "Nitin Gadkari", role: "Minister for Road Transport & Highways" },
                                { name: "Tanmay Bhat", role: "Comedian, YouTuber & Investor" },
                                { name: "Bryan Johnson", role: "Founder, Blueprint & Kernel" },
                                { name: "Gaurav Chaudhary", role: "Tech YouTuber (Technical Guruji)" },
                                { name: "Gurudev Ravi Shankar", role: "Founder, The Art of Living" },
                                { name: "BVR Mohan Reddy", role: "Founder Chairman, Cyient" },
                                { name: "Nuseir Yassin", role: "Founder & CEO, Nas Daily" },
                                { name: "Manoj Kohli", role: "Ex-Country Head, Softbank India" },
                                { name: "Radhika Gupta", role: "MD & CEO, Edelweiss Mutual Fund" },
                                { name: "Terry Wu", role: "Neuroscientist & Speaker" },
                                { name: "Prashant Tandon", role: "Co-founder & CEO, Tata 1mg" },
                                { name: "Ruchira Shukla", role: "Head, Synapses (Ex-IFC)" },
                                { name: "Alok Mittal", role: "Co-founder & CEO, Indifi" },
                                { name: "Bill Gates", role: "Co-chair, Bill & Melinda Gates Foundation" },
                                { name: "Kiran Bedi", role: "Former Lt. Governor, Puducherry" },
                                { name: "Prashant Pitti", role: "Co-founder, EaseMyTrip" },
                                { name: "Rajan Anandan", role: "Managing Director, Peak XV Partners" }
                            ].map((speaker, i) => {
                                const imagePath = `/speakers/${speaker.name.replace(/\s+/g, '')}.avif?v=2`;
                                return (
                                    <motion.div key={i} className="group relative" variants={itemVariants}>
                                        <div className="relative aspect-square rounded-[32px] overflow-hidden mb-4 bg-[#111] border border-white/5">
                                            <img
                                                src={imagePath}
                                                alt={speaker.name}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover transition-all duration-500"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=random`;
                                                }}
                                            />

                                            {/* Glow Effect on Hover */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/40 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />


                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xl font-bold text-white mb-1">{speaker.name}</h3>
                                            <p className="text-gray-500 text-sm">{speaker.role}</p>
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
