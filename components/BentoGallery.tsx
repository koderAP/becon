import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    Reorder,
    useMotionValue,
    useTransform,
    useSpring,
    AnimatePresence,
} from "framer-motion";
import { X, ZoomIn } from "lucide-react";

export interface MediaItem {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span?: string;
}

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItem[];
    title?: string;
    description?: string;
}

export const InteractiveBentoGallery: React.FC<
    InteractiveBentoGalleryProps
> = ({ mediaItems, title, description }) => {
    // local order state so Reorder can mutate it
    const [items, setItems] = useState<MediaItem[]>(mediaItems);
    useEffect(() => setItems(mediaItems), [mediaItems]);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    // track if user is currently dragging (to avoid treating drag as click)
    const [isDragging, setIsDragging] = useState(false);

    // Motion values for whole-gallery tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-300, 300], [15, -15]); // invert for natural feel
    const rotateY = useTransform(x, [-300, 300], [-15, 15]);
    const springConfig = { stiffness: 150, damping: 20 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    // container ref so pointer moves can be mapped to a center-relative x/y
    const containerRef = useRef<HTMLDivElement | null>(null);

    // map pointer move across the container to the motion values (subtle tilt)
    function handlePointerMove(ev: React.PointerEvent) {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // compute offset from center, normalized
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const offsetX = ev.clientX - cx;
        const offsetY = ev.clientY - cy;
        // scale down the influence so effect is subtle
        x.set(offsetX * 0.6);
        y.set(offsetY * 0.35);
    }

    // reset tilt when pointer leaves container
    function handlePointerLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div
            className="py-20 lg:py-32 relative overflow-hidden"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            ref={containerRef}
        >
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="px-4 sm:px-6 md:px-12 lg:px-20 mb-12 flex flex-col items-center text-center gap-4 py-8 z-10 relative"
            >
                <div className="w-12 h-[2px] bg-white" />
                <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest">
                    {title}
                </h2>
                {description && (
                    <p className="text-gray-400 text-lg max-w-2xl">{description}</p>
                )}
            </motion.div>

            <div
                className="w-full flex items-center justify-center p-4 sm:p-10 cursor-grab active:cursor-grabbing"
            // pointer handlers added to parent above
            >
                <motion.div
                    className="max-w-[1200px] w-full"
                    style={{
                        rotateX: rotateXSpring,
                        rotateY: rotateYSpring,
                        transformStyle: "preserve-3d",
                    }}
                >
                    {/* Reorder.Group provides drag-to-reorder behaviour */}
                    <Reorder.Group
                        axis="y"
                        values={items}
                        onReorder={(v: MediaItem[]) => setItems(v)}
                        className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[250px] gap-4"
                    >
                        {items.map((item, i) => (
                            <Reorder.Item
                                key={item.id}
                                value={item}
                                as="div"
                                whileDrag={{ scale: 1.03 }}
                                drag
                                dragMomentum={false}
                                dragElastic={0.15}
                                onDragStart={() => {
                                    setIsDragging(true);
                                }}
                                onDrag={(event, info) => {
                                    // update global tilt from the drag motion of this card
                                    // info.offset gives cumulative offset for this drag
                                    x.set(info.offset.x * 0.9);
                                    y.set(info.offset.y * 0.5);
                                }}
                                onDragEnd={() => {
                                    // small reset so spring animation returns nicely
                                    x.set(0);
                                    y.set(0);
                                    // toggle dragging off after a tick to allow click suppression
                                    setTimeout(() => setIsDragging(false), 50);
                                }}
                                className={`relative rounded-3xl overflow-hidden group border border-white/10 shadow-2xl bg-[#0a0a0a] cursor-pointer ${item.span ?? ""}`}
                                style={{
                                    // subtle Z-depth pattern for parallax feel
                                    transform: `translateZ(${Math.max(20, (i % 4) * 18)}px)`,
                                    transformStyle: "preserve-3d",
                                    touchAction: "none", // important to allow drag on touch devices reliably
                                }}
                            >
                                {item.type === "video" ? (
                                    <video
                                        src={item.url}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        draggable={false}
                                    />
                                )}

                                <div
                                    className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 p-4 text-center z-20"
                                    onClick={(e) => {
                                        // avoid opening on click if user was dragging
                                        if (isDragging) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            return;
                                        }
                                        setSelectedId(item.id);
                                    }}
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2">
                                        <ZoomIn size={20} />
                                    </div>
                                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                    <p className="text-gray-300 text-sm hidden sm:block">{item.desc}</p>
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </motion.div>
            </div>

            {/* Modal viewer (no shared layoutId, so it won't yank the item from the grid) */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.button
                            className="absolute top-8 right-8 text-white hover:text-purple-400 transition-colors z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(null);
                            }}
                        >
                            <X size={40} />
                        </motion.button>

                        {items.map(
                            (item) =>
                                item.id === selectedId && (
                                    <motion.div
                                        key={item.id}
                                        className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {item.type === "video" ? (
                                            <video
                                                src={item.url}
                                                className="w-full h-full object-contain"
                                                autoPlay
                                                controls
                                                playsInline
                                            />
                                        ) : (
                                            <img
                                                src={item.url}
                                                alt={item.title}
                                                className="w-full h-full object-contain"
                                            />
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                                            <h3 className="text-3xl font-bold text-white mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-300 text-lg">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
