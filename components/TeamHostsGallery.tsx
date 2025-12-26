import React, { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { X, Linkedin, Instagram } from 'lucide-react';

export interface HostMember {
    id: number;
    name: string;
    role: string;
    img: string;
    bio?: string;
    linkedin?: string;
    instagram?: string;
}

interface TeamHostsGalleryProps {
    hosts: HostMember[];
    title?: string;
    subtitle?: string;
    description?: string;
}

export const TeamHostsGallery: React.FC<TeamHostsGalleryProps> = ({
    hosts,
    title = "Meet Our Hosts: The Visionaries Behind BECon Tech Summit",
    subtitle = "Our Host",
    description = "The BECon Tech Summit is brought to you by a team of passionate innovators and student leaders. Our hosts are dedicated to shaping the future of technology by bringing together the brightest minds in AI, automation, and digital transformation.",
}) => {
    const [items, setItems] = useState<HostMember[]>(hosts);
    const [selectedHost, setSelectedHost] = useState<HostMember | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="text-lg text-gray-300 uppercase tracking-widest">{subtitle}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                        {title.split('BECon')[0]}
                        <span className="text-purple-400">BECon Tech Summit</span>
                    </h1>

                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        {description}
                    </p>

                    <p className="text-gray-500 italic font-serif text-xl">Signature</p>
                </motion.div>

                {/* Right: Draggable 4-Image Collage */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="cursor-grab active:cursor-grabbing"
                >
                    <Reorder.Group
                        axis="y"
                        values={items}
                        onReorder={setItems}
                        className="grid grid-cols-2 gap-4"
                    >
                        {items.map((host, i) => (
                            <Reorder.Item
                                key={host.id}
                                value={host}
                                as="div"
                                whileDrag={{ scale: 1.05, zIndex: 50 }}
                                drag
                                dragMomentum={false}
                                dragElastic={0.15}
                                onDragStart={() => setIsDragging(true)}
                                onDragEnd={() => {
                                    setTimeout(() => setIsDragging(false), 50);
                                }}
                                className={`relative rounded-2xl overflow-hidden group border border-white/10 shadow-xl bg-[#0a0a0a] ${i === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
                                    }`}
                                style={{ touchAction: 'none' }}
                            >
                                <img
                                    src={host.img}
                                    alt={host.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    draggable={false}
                                />

                                {/* Hover Overlay */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 cursor-pointer"
                                    onClick={(e) => {
                                        if (isDragging) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            return;
                                        }
                                        setSelectedHost(host);
                                    }}
                                >
                                    <h3 className="text-xl font-bold text-white">{host.name}</h3>
                                    <p className="text-purple-400 text-sm">{host.role}</p>
                                    <p className="text-gray-400 text-xs mt-1">Click to view profile</p>
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </motion.div>
            </div>

            {/* Popup Modal */}
            <AnimatePresence>
                {selectedHost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedHost(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden max-w-md w-full shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedHost(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Image */}
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={selectedHost.img}
                                    alt={selectedHost.name}
                                    className="w-full h-full object-cover"
                                />
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
                                    <a
                                        href={selectedHost.linkedin || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:bg-[#006699] transition-colors"
                                    >
                                        <Linkedin size={18} />
                                        <span className="text-sm font-medium">LinkedIn</span>
                                    </a>
                                    <a
                                        href={selectedHost.instagram || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        <Instagram size={18} />
                                        <span className="text-sm font-medium">Instagram</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
