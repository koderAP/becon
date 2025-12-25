import React from 'react';
import { motion } from 'framer-motion';

export const FramerBackground: React.FC = () => {
    // Silky wave paths - smoother curves
    const wavePaths = [
        "M0,50 C20,45 40,55 60,50 C80,45 100,55 120,50 140,45 160,55 180,50 200,45 220,55 240,50 V100 H0 Z",
        "M0,55 C30,60 60,50 90,55 C120,60 150,50 180,55 C210,60 240,50 270,55 V100 H0 Z",
        "M0,60 C40,55 80,65 120,60 C160,55 200,65 240,60 C280,55 320,65 360,60 V100 H0 Z"
    ];

    return (
        <div className="absolute inset-0 overflow-hidden bg-[#151326]">
            {/* Base Gradient Layer - Deep Purple/Blue */}
            <motion.div
                className="absolute inset-0 opacity-80"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 25,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                style={{
                    backgroundImage: `
            radial-gradient(circle at 50% 50%, #24006D 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, #24006D 0%, transparent 35%),
            radial-gradient(circle at 20% 80%, #3b0764 0%, transparent 35%)
          `,
                    backgroundSize: "160% 160%",
                    filter: "blur(70px)",
                }}
            />

            {/* Silky Water Wave Animation Layer */}
            <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Wave 1 - Slow flow */}
                    <motion.path
                        d={wavePaths[0]}
                        fill="url(#waveGradient1)"
                        animate={{
                            d: [
                                "M0,45 C25,40 50,50 75,45 C100,40 125,50 150,45 V100 H0 Z",
                                "M0,55 C25,60 50,50 75,55 C100,60 125,50 150,55 V100 H0 Z",
                                "M0,45 C25,40 50,50 75,45 C100,40 125,50 150,45 V100 H0 Z"
                            ]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <defs>
                        <linearGradient id="waveGradient1" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
                            <stop offset="50%" stopColor="rgba(36, 0, 109, 0.1)" />
                            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.4)" />
                        </linearGradient>
                    </defs>

                    {/* Wave 2 - Faster ripple */}
                    <motion.path
                        d={wavePaths[1]}
                        fill="rgba(255, 255, 255, 0.05)"
                        animate={{
                            d: [
                                "M0,50 C30,55 60,45 90,50 C120,55 150,45 180,50 V100 H0 Z",
                                "M0,48 C30,42 60,52 90,48 C120,42 150,52 180,48 V100 H0 Z",
                                "M0,50 C30,55 60,45 90,50 C120,55 150,45 180,50 V100 H0 Z"
                            ],
                            translateX: ["-20%", "0%", "-20%"]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{ filter: "blur(20px)" }}
                    />
                </svg>
            </div>


            {/* Moving Blobs Layer - for fluidity */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                    duration: 35,
                    ease: "linear",
                    repeat: Infinity,
                }}
                style={{
                    backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(58, 12, 163, 0.4), transparent 45%),
            radial-gradient(circle at 80% 70%, rgba(247, 37, 133, 0.15), transparent 45%),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.02), transparent 30%)
          `,
                    backgroundSize: "200% 200%",
                    filter: "blur(90px)",
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
                    opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                style={{
                    // Small, intense white core
                    backgroundImage: `
             radial-gradient(circle at 60% 50%, rgba(255, 255, 255, 0.7) 0%, transparent 20%)
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
            conic-gradient(from 220deg at 65% 40%, transparent 0deg, rgba(255, 255, 255, 0.15) 30deg, transparent 60deg)
           `,
                    filter: "blur(40px)",
                    mixBlendMode: "screen",
                }}
            />
            {/* Deep Overlay for contrast */}
            <div className="absolute inset-0 bg-[#05020a] opacity-40 mix-blend-overlay pointer-events-none" />
        </div>
    );
};
