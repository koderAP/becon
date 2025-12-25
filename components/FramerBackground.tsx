import React from 'react';
import { motion } from 'framer-motion';

export const FramerBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#151326]">
            {/* Base Gradient Layer */}
            <motion.div
                className="absolute inset-0 opacity-80"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 20,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                style={{
                    backgroundImage: `
            radial-gradient(circle at 50% 50%, #24006D 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, #24006D 0%, transparent 30%),
            radial-gradient(circle at 20% 80%, #24006D 0%, transparent 30%)
          `,
                    backgroundSize: "150% 150%",
                    filter: "blur(60px)",
                }}
            />

            {/* Moving Blobs Layer */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                }}
                style={{
                    backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(36, 0, 109, 0.8), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(21, 19, 38, 0.8), transparent 40%),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.03), transparent 30%)
          `,
                    backgroundSize: "200% 200%",
                    filter: "blur(80px)",
                    mixBlendMode: "overlay",
                }}
            />

            {/* Subtle White Highlight (The "White - FFFFFF" requested) */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 15,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                style={{
                    backgroundImage: `radial-gradient(circle at 60% 40%, rgba(255,255,255,0.15), transparent 60%)`,
                    filter: "blur(100px)",
                    mixBlendMode: "soft-light",
                }}
            />

            {/* Deep Overlay for contrast */}
            <div className="absolute inset-0 bg-[#151326] opacity-30 mix-blend-overlay pointer-events-none" />
        </div>
    );
};
