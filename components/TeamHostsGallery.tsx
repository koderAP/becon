import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Linkedin, Phone, User } from 'lucide-react';

export interface HostMember {
    id: number;
    name: string;
    role: string;
    img: string;
    bio?: string;
    linkedin?: string;
    phone?: string;
}

interface TeamHostsGalleryProps {
    hosts: HostMember[];
    title?: string;
    subtitle?: string;
    description?: string;
    isLoading?: boolean;
}

const SkeletonCollage = () => (
    <div className="grid grid-cols-2 gap-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-white/10 rounded-2xl border border-white/5" />
        ))}
    </div>
);

export const TeamHostsGallery: React.FC<TeamHostsGalleryProps> = ({
    hosts,
    title = "Meet Our Hosts: The Visionaries Behind BECon Tech Summit",
    subtitle = "Our Hosts",
    description = "The BECon Tech Summit is brought to you by a team of passionate innovators and student leaders. Our hosts are dedicated to shaping the future of technology by bringing together the brightest minds in AI, automation, and digital transformation.",
    isLoading = false,
}) => {
    const [selectedHost, setSelectedHost] = useState<HostMember | null>(null);

    return (
        <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-1"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="text-lg text-gray-300 uppercase tracking-widest">{subtitle}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                        Meet Our Hosts: The Visionaries Behind <span className="text-purple-400">BECon'26</span>
                    </h1>

                    <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                        {description}
                    </p>
                </motion.div>

                {/* Right: Static Grid Layout */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-2"
                >
                    {isLoading ? (
                        <SkeletonCollage />
                    ) : (
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {hosts.map((host, index) => (
                                <motion.div
                                    key={host.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative rounded-2xl md:rounded-3xl overflow-hidden group border border-white/10 shadow-xl bg-[#0a0a0a] cursor-pointer aspect-[3/4]"
                                    onClick={() => setSelectedHost(host)}
                                >
                                    {host.img ? (
                                        <img
                                            src={host.img}
                                            alt={host.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                                            <User size={64} className="text-white/20" />
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 md:p-6 opacity-100 transition-opacity duration-300">
                                        <h3 className="text-lg md:text-2xl font-bold text-white leading-tight mb-1">{host.name}</h3>
                                        <p className={`text-sm md:text-base font-medium ${host.role.includes('Co-Overall') ? 'text-blue-400' : 'text-purple-400'}`}>
                                            {host.role}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Popup Modal - Portaled to body for correct positioning */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedHost && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md"
                                onClick={() => setSelectedHost(null)}
                            />

                            {/* Modal Container */}
                            <div className="fixed inset-0 z-[10000] overflow-y-auto pointer-events-none">
                                <div className="flex min-h-full items-center justify-center p-4">
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden max-w-md w-full shadow-2xl pointer-events-auto"
                                    >
                                        {/* Close Button */}
                                        <button
                                            onClick={() => setSelectedHost(null)}
                                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/10"
                                        >
                                            <X size={20} />
                                        </button>

                                        {/* Image */}
                                        <div className="aspect-square overflow-hidden bg-white/5">
                                            {selectedHost.img ? (
                                                <img
                                                    src={selectedHost.img}
                                                    alt={selectedHost.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <User size={96} className="text-white/20" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h2 className="text-2xl font-bold text-white mb-1">{selectedHost.name}</h2>
                                            <p className="text-purple-400 font-medium mb-4">{selectedHost.role}</p>

                                            {selectedHost.bio && (
                                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                                    {selectedHost.bio}
                                                </p>
                                            )}

                                            <div className="flex gap-4">
                                                {selectedHost.linkedin && (
                                                    <a
                                                        href={selectedHost.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:bg-[#006699] transition-colors"
                                                    >
                                                        <Linkedin size={18} />
                                                        <span className="text-sm font-medium">LinkedIn</span>
                                                    </a>
                                                )}
                                                {selectedHost.phone && (
                                                    <a
                                                        href={`tel:${selectedHost.phone}`}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                                    >
                                                        <Phone size={18} />
                                                        <span className="text-sm font-medium">Call</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div >
    );
};
