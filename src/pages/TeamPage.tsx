import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Footer } from '../../components/Footer';
import { PageHeader } from '../../components/PageHeader';

const teamMembers = [
    { id: 1, name: "Anubhav", role: "President", img: "https://picsum.photos/id/64/400/400" },
    { id: 2, name: "Priya", role: "Vice President", img: "https://picsum.photos/id/91/400/400" },
    { id: 3, name: "Rahul", role: "Tech Head", img: "https://picsum.photos/id/177/400/400" },
    { id: 4, name: "Sneha", role: "Design Lead", img: "https://picsum.photos/id/338/400/400" },
    { id: 5, name: "Vikram", role: "Events Head", img: "https://picsum.photos/id/342/400/400" },
    { id: 6, name: "Aditi", role: "PR Head", img: "https://picsum.photos/id/447/400/400" },
    { id: 7, name: "Karan", role: "Sponsorship Lead", img: "https://picsum.photos/id/531/400/400" },
    { id: 8, name: "Neha", role: "Marketing Lead", img: "https://picsum.photos/id/619/400/400" },
];

const hosts = [
    { id: 1, img: "https://picsum.photos/id/433/300/400" },
    { id: 2, img: "https://picsum.photos/id/447/300/300" },
    { id: 3, img: "https://picsum.photos/id/453/300/300" },
];

export const TeamPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <PageHeader
                title="TEAM"
                badge="Meet the Crew"
                description="The passionate individuals behind BECon 2026."
            />

            <div className="relative z-20 py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">

                {/* Full Team Photo Section */}
                <div className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-full aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
                            alt="Full Team"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute bottom-6 left-6 z-20 text-left">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">The Force Behind BECon</h2>
                            <p className="text-gray-300 text-lg">A team of dedicated innovators and leaders.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Core Team Section */}
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="text-lg text-gray-300 uppercase tracking-widest">Core Team</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                            >
                                <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-white/5">
                                    {/* Placeholder for Core Member Image */}
                                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                                        Photo
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">Team Member Name</h3>
                                <p className="text-purple-400 font-medium mb-4">Core Team Role</p>

                                <div className="flex gap-4">
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                                    <span className="text-gray-500 text-sm ml-auto font-mono">+91 98765 43210</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Cordis Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="text-lg text-gray-300 uppercase tracking-widest">Cordis & Executives</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="group bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors text-center"
                            >
                                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 bg-white/5 mx-auto">
                                    {/* Placeholder for Member Image */}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">Member Name</h3>
                                <p className="text-gray-400 text-sm mb-3">Position</p>
                                <div className="flex justify-center gap-3">
                                    <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={16} /></a>
                                    <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={16} /></a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="relative z-50">
                <Footer />
            </div>
        </div>
    );
};
