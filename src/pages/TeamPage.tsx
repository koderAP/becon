import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { PlasmaBackground } from '../../components/PlasmaBackground';

const teamMembers = [
    { id: 1, name: "Anubhav", role: "President", img: "https://picsum.photos/id/64/400/400" },
    { id: 2, name: "Priya", role: "Vice President", img: "https://picsum.photos/id/65/400/400" },
    { id: 3, name: "Rohan", role: "Tech Lead", img: "https://picsum.photos/id/91/400/400" },
    { id: 4, name: "Sneha", role: "Design Lead", img: "https://picsum.photos/id/129/400/400" },
    { id: 5, name: "Arjun", role: "Operations", img: "https://picsum.photos/id/177/400/400" },
    { id: 6, name: "Kavya", role: "Marketing", img: "https://picsum.photos/id/338/400/400" },
    { id: 7, name: "Varun", role: "Sponsorship", img: "https://picsum.photos/id/342/400/400" },
    { id: 8, name: "Ishita", role: "Content", img: "https://picsum.photos/id/399/400/400" },
];

const hosts = [
    { id: 1, img: "https://picsum.photos/id/433/300/400" },
    { id: 2, img: "https://picsum.photos/id/447/300/300" },
    { id: 3, img: "https://picsum.photos/id/453/300/300" },
];

export const TeamPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05020a] text-white">
            {/* Hero Section with Plasma Background */}
            <div className="relative min-h-[60vh] sm:min-h-[70vh] overflow-hidden">
                <PlasmaBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05020a] z-10" />

                <div className="relative z-20 pt-24 sm:pt-32 px-4 sm:px-6 md:px-12 lg:px-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center tracking-tight"
                    >
                        TEAM
                    </motion.h1>
                </div>
            </div>

            {/* Hosts Section */}
            <div className="relative z-20 -mt-32 sm:-mt-40 px-4 sm:px-6 md:px-12 lg:px-20 pb-16 sm:pb-20">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
                    {/* Left - Text */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
                        >
                            <div className="w-8 sm:w-12 h-[2px] bg-white"></div>
                            <span className="text-sm sm:text-base text-gray-300 uppercase tracking-widest">Our Host</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
                        >
                            Meet Our Hosts: <br />
                            The Visionaries <br />
                            Behind <span className="text-gray-500">BECon <br />Tech Summit</span>
                        </motion.h2>

                        <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-xl">
                            The Becon Tech Summit is brought to you by a team of passionate innovators and student leaders. Our hosts are dedicated to shaping the future of technology by bringing together the brightest minds in AI, automation, and digital transformation.
                        </p>

                        <div className="text-3xl sm:text-4xl text-gray-600 italic" style={{ fontFamily: 'cursive' }}>
                            Signature
                        </div>
                    </div>

                    {/* Right - Host Images Grid */}
                    <div className="lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4 h-[400px] sm:h-[500px] lg:h-[550px]">
                        <motion.div
                            className="col-span-1 row-span-2 rounded-3xl overflow-hidden"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <img src={hosts[0].img} className="w-full h-full object-cover" alt="Host 1" />
                        </motion.div>
                        <motion.div
                            className="col-span-1 row-span-1 rounded-3xl overflow-hidden relative"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <img src={hosts[1].img} className="w-full h-full object-cover" alt="Host 2" />
                        </motion.div>
                        <motion.div
                            className="col-span-1 row-span-1 rounded-3xl overflow-hidden relative"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <img src={hosts[2].img} className="w-full h-full object-cover" alt="Host 3" />
                            {/* Register Button */}
                            <button className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-4 py-2 bg-white text-black text-xs sm:text-sm font-bold rounded-full hover:bg-purple-500 hover:text-white transition-all">
                                REGISTER NOW
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* THE TEAM Section */}
            <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-12 lg:mb-16"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">THE TEAM</h2>
                    <p className="text-gray-400 text-sm sm:text-base">The effort behind BECon Tech Summit</p>
                </motion.div>

                {/* Video/Image Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-full max-w-4xl mx-auto aspect-video rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-16 sm:mb-20 lg:mb-24 overflow-hidden"
                >
                    <img
                        src="/edclogo.avif"
                        alt="eDC Logo"
                        className="w-32 sm:w-40 md:w-48 h-auto opacity-60"
                    />
                </motion.div>

                {/* Team Label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10"
                >
                    <div className="w-8 sm:w-12 h-[2px] bg-white"></div>
                    <span className="text-sm sm:text-base text-gray-300 uppercase tracking-widest">Team</span>
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {teamMembers.map((member, i) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group"
                        >
                            {/* Image */}
                            <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden mb-3 sm:mb-4 bg-white/5">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                {/* Social Icons Overlay */}
                                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-purple-500 transition-colors">
                                        <Instagram size={12} className="sm:w-[14px] sm:h-[14px]" />
                                    </div>
                                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-purple-500 transition-colors">
                                        <Linkedin size={12} className="sm:w-[14px] sm:h-[14px]" />
                                    </div>
                                </div>
                            </div>
                            {/* Info */}
                            <h3 className="text-base sm:text-lg font-bold text-white">{member.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-400">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Social Section */}
            <div className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-white/10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 sm:gap-4 mb-6"
                >
                    <div className="w-8 sm:w-12 h-[2px] bg-white"></div>
                    <span className="text-sm sm:text-base text-gray-300 uppercase tracking-widest">Social</span>
                </motion.div>

                <div className="flex gap-3 sm:gap-4">
                    <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <Twitter size={18} className="sm:w-5 sm:h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <Instagram size={18} className="sm:w-5 sm:h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <Linkedin size={18} className="sm:w-5 sm:h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                        <Youtube size={18} className="sm:w-5 sm:h-5" />
                    </a>
                </div>
            </div>

            {/* BECon 2026 Section */}
            <div className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 flex justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="flex items-end justify-center gap-2">
                        <img src="/logo.avif" alt="BECon" className="h-16 sm:h-20 md:h-24 w-auto" />
                        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-500 -mb-1">2026</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
