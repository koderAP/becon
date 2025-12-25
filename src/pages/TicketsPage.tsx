import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../../components/Footer';
import { ArrowUpRight } from 'lucide-react';

const TicketCard = ({
    title,
    description,
    features,
    type = "Early Bird",
    admissionType = "Single admission",
    delay = 0
}: {
    title: string;
    description: string;
    features: string[];
    type?: string;
    admissionType?: string;
    delay?: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="flex flex-col md:flex-row rounded-3xl overflow-hidden bg-[#0a0514] border border-white/5 group hover:border-purple-500/30 transition-colors"
        >
            {/* Left Content */}
            <div className="flex-1 p-8 bg-gradient-to-br from-[#120824] to-[#0a0514]">
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {description}
                </p>

                <div className="space-y-3">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 pl-4 border-l-2 border-purple-500/30 text-sm text-gray-300">
                            {feature}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Action Section */}
            <div className="md:w-[280px] p-8 flex flex-col justify-between relative overflow-hidden">
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-purple-900/10 pointer-events-none" />
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300 mb-2">
                        {type}
                    </span>
                    <p className="text-white font-medium">{admissionType}</p>
                </div>

                <div className="relative z-10 mt-8 md:mt-0">
                    <button className="w-full flex items-center justify-between px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white transition-all group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                        <span className="font-semibold">Register</span>
                        <ArrowUpRight size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

import { HeroBackground } from '../../components/HeroBackground';

export const TicketsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 relative">
            <HeroBackground />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-8 h-[1px] bg-gray-500"></div>
                        <span className="text-gray-400 uppercase tracking-widest text-sm">Registration</span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 max-w-3xl leading-tight"
                    >
                        Secure Your Spot at BECon <span className="text-gray-500">DeepTech Summit Today!</span>
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - 3D Ticket Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[400px] lg:h-[600px] flex items-center justify-center p-8"
                    >
                        {/* Glow effects */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-purple-600/20 rounded-full blur-[80px] mix-blend-screen" />

                        {/* Ticket Placeholder / Image */}
                        {/* Replace src with your actual 3D ticket component or image */}
                        <div className="relative w-full h-full max-w-md mx-auto perspective-1000">
                            {/* Placeholder for the 3D ticket image from reference */}
                            <img
                                src="/ticket-3d-placeholder.png"
                                alt="3D Ticket"
                                className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.3)] animate-float"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerHTML += `
                                        <div class="w-64 h-96 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-[3rem] border border-blue-400/30 flex items-center justify-center backdrop-blur-sm transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                                            <div class="text-center p-8">
                                                <div class="w-16 h-16 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
                                                </div>
                                                <p class="text-blue-200 font-bold text-xl">BECon Ticket</p>
                                            </div>
                                        </div>
                                    `;
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Right Side - Tickets List */}
                    <div className="space-y-6">
                        <TicketCard
                            title="General Admission"
                            description="Access to the main stage, exhibitions, and standard networking sessions throughout the summit."
                            features={[
                                "Entry to keynote sessions",
                                "Access to tech expo floor",
                                "Standard networking lounge",
                                "Summit welcome kit"
                            ]}
                            delay={0.2}
                        />

                        <TicketCard
                            title="Campus Ambassador"
                            description="The initiative recruits motivated students from across campus to promote the event and its goals."
                            features={[
                                "Prize Pool of worth 30k+",
                                "Certificate of Completion of Internship",
                                "Exclusive entry to events",
                                "Merchandise & Goodies",
                                "Letter of Recommendation"
                            ]}
                            delay={0.3}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
