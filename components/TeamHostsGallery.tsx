import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { X, Linkedin, Phone } from 'lucide-react';

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
        <div className="flex flex-col gap-4">
            <div className="aspect-[3/4] bg-white/10 rounded-2xl border border-white/5" />
            <div className="aspect-square bg-white/10 rounded-2xl border border-white/5" />
        </div>
        <div className="flex flex-col gap-4">
            <div className="aspect-square bg-white/10 rounded-2xl border border-white/5" />
            <div className="aspect-[3/4] bg-white/10 rounded-2xl border border-white/5" />
        </div>
    </div>
);

export const TeamHostsGallery: React.FC<TeamHostsGalleryProps> = ({
    hosts,
    title = "Meet Our Hosts: The Visionaries Behind BECon Tech Summit",
    subtitle = "Our Host",
    description = "The BECon Tech Summit is brought to you by a team of passionate innovators and student leaders. Our hosts are dedicated to shaping the future of technology by bringing together the brightest minds in AI, automation, and digital transformation.",
    isLoading = false,
}) => {
    const [items, setItems] = useState<HostMember[]>(hosts);
    const [selectedHost, setSelectedHost] = useState<HostMember | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [activeId, setActiveId] = useState<number | null>(null); // For mobile tap-to-colorize

    // Detect mobile screen
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
                </motion.div>



                {/* Right: Draggable 4-Image Collage */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={isLoading ? "" : items.length > 1 ? "cursor-grab active:cursor-grabbing" : ""}
                >
                    {isLoading ? (
                        <SkeletonCollage />
                    ) : items.length === 1 ? (
                        /* Single Host - Large Featured Card */
                        <div
                            className="relative rounded-3xl overflow-hidden group border border-white/10 shadow-2xl bg-[#0a0a0a] aspect-[3/4] max-w-md mx-auto cursor-pointer"
                            onClick={() => setSelectedHost(items[0])}
                        >
                            <img src={items[0]?.img} alt={items[0]?.name} loading="lazy" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{items[0]?.name}</h3>
                                <p className="text-purple-400 text-lg">{items[0]?.role}</p>
                            </div>
                        </div>
                    ) : (
                        /* 2 Columns with alternating tall/short pattern - Draggable */
                        <Reorder.Group
                            axis="y"
                            values={items}
                            onReorder={setItems}
                            className="grid grid-cols-2 gap-4"
                        >
                            {/* Column 1: Indices 0 and 2 */}
                            <div className="flex flex-col gap-4">
                                <Reorder.Item
                                    key={items[0]?.id}
                                    value={items[0]}
                                    as="div"
                                    whileDrag={{ scale: 1.05, zIndex: 50 }}
                                    drag={!isMobile}
                                    dragMomentum={false}
                                    dragElastic={0.15}
                                    className="relative rounded-2xl overflow-hidden group border border-white/10 shadow-xl bg-[#0a0a0a] cursor-grab active:cursor-grabbing aspect-[3/4]"
                                    style={{ touchAction: isMobile ? 'auto' : 'none' }}
                                    onTap={() => isMobile && setActiveId(activeId === items[0]?.id ? null : items[0]?.id)}
                                >
                                    <img src={items[0]?.img} alt={items[0]?.name} loading="lazy" className="w-full h-full object-cover transition-all duration-500" draggable={false} />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 cursor-pointer"
                                        onClick={(e) => { e.stopPropagation(); !isMobile && setSelectedHost(items[0]); }}
                                    >
                                        <h3 className="text-lg md:text-xl font-bold text-white">{items[0]?.name}</h3>
                                        <p className="text-purple-400 text-sm">{items[0]?.role}</p>
                                    </div>
                                </Reorder.Item>

                                {items[2] && (
                                    <Reorder.Item
                                        key={items[2]?.id}
                                        value={items[2]}
                                        as="div"
                                        whileDrag={{ scale: 1.05, zIndex: 50 }}
                                        drag={!isMobile}
                                        dragMomentum={false}
                                        dragElastic={0.15}
                                        className="relative rounded-2xl overflow-hidden group border border-white/10 shadow-xl bg-[#0a0a0a] cursor-grab active:cursor-grabbing aspect-square"
                                        style={{ touchAction: isMobile ? 'auto' : 'none' }}
                                        onTap={() => isMobile && setActiveId(activeId === items[2]?.id ? null : items[2]?.id)}
                                    >
                                        <img src={items[2]?.img} alt={items[2]?.name} loading="lazy" className="w-full h-full object-cover transition-all duration-500" draggable={false} />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 cursor-pointer"
                                            onClick={(e) => { e.stopPropagation(); !isMobile && setSelectedHost(items[2]); }}
                                        >
                                            <h3 className="text-lg md:text-xl font-bold text-white">{items[2]?.name}</h3>
                                            <p className="text-blue-400 text-sm">{items[2]?.role}</p>
                                        </div>
                                    </Reorder.Item>
                                )}
                            </div>

                            {/* Column 2: Indices 1 and 3 */}
                            <div className="flex flex-col gap-4">
                                {items[1] && (
                                    <Reorder.Item
                                        key={items[1]?.id}
                                        value={items[1]}
                                        as="div"
                                        whileDrag={{ scale: 1.05, zIndex: 50 }}
                                        drag={!isMobile}
                                        dragMomentum={false}
                                        dragElastic={0.15}
                                        className="relative rounded-2xl overflow-hidden group border border-white/10 shadow-xl bg-[#0a0a0a] cursor-grab active:cursor-grabbing aspect-square"
                                        style={{ touchAction: isMobile ? 'auto' : 'none' }}
                                        onTap={() => isMobile && setActiveId(activeId === items[1]?.id ? null : items[1]?.id)}
                                    >
                                        <img src={items[1]?.img} alt={items[1]?.name} loading="lazy" className="w-full h-full object-cover transition-all duration-500" draggable={false} />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 cursor-pointer"
                                            onClick={(e) => { e.stopPropagation(); !isMobile && setSelectedHost(items[1]); }}
                                        >
                                            <h3 className="text-lg md:text-xl font-bold text-white">{items[1]?.name}</h3>
                                            <p className="text-purple-400 text-sm">{items[1]?.role}</p>
                                        </div>
                                    </Reorder.Item>
                                )}

                                {items[3] && (
                                    <Reorder.Item
                                        key={items[3]?.id}
                                        value={items[3]}
                                        as="div"
                                        whileDrag={{ scale: 1.05, zIndex: 50 }}
                                        drag={!isMobile}
                                        dragMomentum={false}
                                        dragElastic={0.15}
                                        className="relative rounded-2xl overflow-hidden group border border-white/10 shadow-xl bg-[#0a0a0a] cursor-grab active:cursor-grabbing aspect-[3/4]"
                                        style={{ touchAction: isMobile ? 'auto' : 'none' }}
                                        onTap={() => isMobile && setActiveId(activeId === items[3]?.id ? null : items[3]?.id)}
                                    >
                                        <img src={items[3]?.img} alt={items[3]?.name} loading="lazy" className="w-full h-full object-cover transition-all duration-500" draggable={false} />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 cursor-pointer"
                                            onClick={(e) => { e.stopPropagation(); !isMobile && setSelectedHost(items[3]); }}
                                        >
                                            <h3 className="text-lg md:text-xl font-bold text-white">{items[3]?.name}</h3>
                                            <p className="text-blue-400 text-sm">{items[3]?.role}</p>
                                        </div>
                                    </Reorder.Item>
                                )}
                            </div>
                        </Reorder.Group>
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
