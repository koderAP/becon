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

            {/* PRIMARY SPOTLIGHT - The strong white beam */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0.8 }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8],
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                style={{
                    // Main bright spot - brighter and more central
                    backgroundImage: `
            radial-gradient(circle at 60% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 60%)
          `,
                    filter: "blur(60px)",
                    mixBlendMode: "screen",
                }}
            />

            {/* CORE HOTSPOT - Pure white center for "front" feel */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: [0.9, 1, 0.9],
                    opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                style={{
                    // Small, intense white core
                    backgroundImage: `
             radial-gradient(circle at 60% 50%, rgba(255, 255, 255, 0.6) 0%, transparent 25%)
           `,
                    filter: "blur(40px)",
                    mixBlendMode: "normal", // Normal blend mode to sit ON TOP
                }}
            />

            {/* Beam/Ray Effect */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 12,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                style={{
                    backgroundImage: `
            conic-gradient(from 220deg at 65% 40%, transparent 0deg, rgba(255, 255, 255, 0.15) 45deg, transparent 90deg)
           `,
                    filter: "blur(50px)",
                    mixBlendMode: "screen",
                }}
            />
            {/* Deep Overlay for contrast */}
            <div className="absolute inset-0 bg-[#151326] opacity-30 mix-blend-overlay pointer-events-none" />
        </div>
    );
};
