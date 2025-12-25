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

            {/* Subtle White Highlight (The "White - FFFFFF" requested) - Made much more prominent */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5], // Increased form 0.1-0.2 to 0.5-0.8
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                style={{
                    // Moved slightly right and down to match reference spotlight
                    backgroundImage: `
            radial-gradient(circle at 65% 45%, rgba(255, 255, 255, 0.25) 0%, rgba(139, 92, 246, 0.15) 35%, transparent 70%)
          `,
                    filter: "blur(80px)",
                    mixBlendMode: "screen", // Changed from soft-light to screen for visibility
                }}
            />

            {/* Additional "Beam" effect for the white lighting */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 15,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                style={{
                    backgroundImage: `
            conic-gradient(from 230deg at 70% 30%, transparent 0deg, rgba(255, 255, 255, 0.1) 60deg, transparent 120deg)
           `,
                    filter: "blur(60px)",
                    mixBlendMode: "lighten",
                }}
            />
            {/* Deep Overlay for contrast */}
            <div className="absolute inset-0 bg-[#151326] opacity-30 mix-blend-overlay pointer-events-none" />
        </div>
    );
};
