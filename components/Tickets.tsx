import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Tickets: React.FC = () => {
    return (
        <div className="min-h-screen py-24 px-6 md:px-12 lg:px-20 bg-black flex flex-col justify-center relative overflow-hidden" id="tickets">

            {/* Background ambient glow */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="uppercase tracking-widest text-sm text-gray-400">Registration</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        Secure Your Spot at <span className="text-gray-500">BECon <br /> DeepTech Summit Today!</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: 3D Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center lg:justify-start"
                    >
                        <motion.img
                            src="/becon-ticket-final.png"
                            alt="BECon Ticket"
                            className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-[0_0_50px_rgba(139,92,246,0.3)]"
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* Right Side: Cards */}
                    <div className="space-y-6">

                        {/* General Admission Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-purple-500/50"
                            style={{ background: 'linear-gradient(145deg, rgba(20,10,40,0.9) 0%, rgba(5,5,10,0.95) 100%)' }}
                        >
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500"></div>

                            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-2 text-white">General Admission</h3>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                        Access to the main stage, exhibitions, and standard networking sessions throughout the summit.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                                            Entry to keynote sessions
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                                            Access to tech expo floor
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                                            Standard networking lounge
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                                            Summit welcome kit
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-64 flex flex-col justify-between shrink-0 bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
                                    <div>
                                        <div className="inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold mb-4">
                                            Early Bird
                                        </div>
                                        <div className="text-lg font-medium text-white mb-1">Single admission</div>
                                    </div>

                                    <button className="w-full mt-6 py-3 bg-white text-black hover:bg-gray-200 rounded-xl flex items-center justify-between px-4 transition-all font-semibold text-sm group/btn">
                                        <span>Register</span>
                                        <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Campus Ambassador Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group relative p-8 rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-blue-500/50"
                            style={{ background: 'linear-gradient(145deg, rgba(10,15,40,0.9) 0%, rgba(5,5,10,0.95) 100%)' }}
                        >
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500"></div>

                            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-2 text-white">Campus Ambassador</h3>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                        The initiative recruits motivated students from across campus to promote the event and its goals.
                                    </p>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                                            Prize Pool of worth 30k+
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                                            Certificate of Completion of Internship
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                                            Exclusive entry to events
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                                            Merchandise & Goodies
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                                            Letter of Recommendation
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-64 flex flex-col justify-between shrink-0 bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
                                    <div>
                                        <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold mb-4">
                                            Early Bird
                                        </div>
                                        <div className="text-lg font-medium text-white mb-1">Single admission</div>
                                    </div>

                                    <button className="w-full mt-6 py-3 bg-white text-black hover:bg-gray-200 rounded-xl flex items-center justify-between px-4 transition-all font-semibold text-sm group/btn">
                                        <span>Register</span>
                                        <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
};