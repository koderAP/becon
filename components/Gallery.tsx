import React from 'react';
import { motion } from 'framer-motion';

const images = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1475721027767-p74211111623?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515187029135-18eebd906c4d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1505373877841-8d43f7d34e5d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
];

export const Gallery: React.FC = () => {
    return (
        <div className="py-20 lg:py-32 bg-black overflow-hidden relative">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="px-4 sm:px-6 md:px-12 lg:px-20 mb-12 flex items-center gap-4"
            >
                <div className="w-12 h-[2px] bg-white"></div>
                <span className="text-lg text-gray-300 uppercase tracking-widest">Past Glimpses</span>
            </motion.div>

            {/* CSS-based infinite marquee for 60fps performance */}
            <div className="marquee-container overflow-hidden">
                <div
                    className="flex gap-4 sm:gap-6 animate-marquee"
                    style={{
                        width: 'max-content',
                        willChange: 'transform',
                    }}
                >
                    {/* Triple the images for seamless looping */}
                    {[...images, ...images, ...images].map((src, index) => (
                        <div
                            key={index}
                            className="relative w-[300px] sm:w-[400px] h-[200px] sm:h-[280px] rounded-2xl overflow-hidden shrink-0 border border-white/10 group grayscale hover:grayscale-0 transition-all duration-500"
                            style={{ transform: 'translateZ(0)' }}
                        >
                            <img
                                src={src}
                                alt={`Gallery ${index}`}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS keyframe animation in style tag */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};
