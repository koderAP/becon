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
            {/*
              SVG TURBULENCE FILTER
              This creates the "silky fabric" / "liquid" distortion effect
              that makes the gradients look like they are flowing/rippling.
            */}
            <svg style={{ display: 'none' }}>
                <defs>
                    <filter id="silkFlow">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.005"
                            numOctaves="3"
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale="180"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                        <feGaussianBlur stdDeviation="15" />
                        <feColorMatrix type="matrix" values="
                            1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 20 -10
                        " />
                    </filter>
                </defs>
            </svg>

            {/* MAIN GRADIENT CONTAINER WITH DISTORTION */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ filter: "url(#silkFlow) blur(30px)" }} // Apply the distortion filter here
            >
                {/* 1. Deep Base Flow */}
                <motion.div
                    className="absolute inset-0 opacity-90"
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        backgroundImage: `
                            conic-gradient(from 0deg at 50% 50%, #151326 0deg, #24006D 120deg, #05020a 240deg, #151326 360deg),
                            radial-gradient(circle at 50% 50%, #4c1d95 0%, transparent 60%)
                        `,
                        backgroundSize: "200% 200%",
                    }}
                />

                {/* 2. Lighter "Silk Folds" - Difference Blend */}
                <motion.div
                    className="absolute inset-0 opacity-50"
                    animate={{
                        backgroundPosition: ["100% 0%", "0% 100%", "100% 0%"],
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.4), transparent 50%),
                            radial-gradient(circle at 70% 70%, rgba(56, 189, 248, 0.2), transparent 50%)
                        `,
                        backgroundSize: "150% 150%",
                        mixBlendMode: "screen",
                    }}
                />
            </motion.div>

            {/* OVERLAYS (Spotlight should NOT be distorted) */}

            {/* PRIMARY SPOTLIGHT - The strong white beam */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0.8 }}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8],
                }}
                transition={{
                    duration: 6, // Faster pulse
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                style={{
                    // Main bright spot - brighter and more central
                    backgroundImage: `
            radial-gradient(circle at 60% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(139, 92, 246, 0.15) 35%, transparent 65%)
          `,
                    filter: "blur(50px)",
                    mixBlendMode: "screen",
                }}
            />

            {/* CORE HOTSPOT */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    scale: [0.95, 1, 0.95],
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
                    filter: "blur(30px)",
                    mixBlendMode: "normal",
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
