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

            {/* Silky Water Wave Animation Layer - ROBUST SLIDING IMPLEMENTATION */}
            <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgba(139, 92, 246, 0)" />
                            <stop offset="95%" stopColor="rgba(139, 92, 246, 0.3)" />
                        </linearGradient>
                        <linearGradient id="waveGradient2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgba(56, 189, 248, 0)" />
                            <stop offset="95%" stopColor="rgba(56, 189, 248, 0.2)" />
                        </linearGradient>
                    </defs>

                    {/* Wave 1: Back layer, slower */}
                    <motion.path
                        fill="url(#waveGradient1)"
                        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        animate={{
                            x: ["0%", "-100%", "0%"],
                            scaleY: [1, 1.1, 1],
                        }}
                        transition={{
                            x: { duration: 30, repeat: Infinity, ease: "linear" },
                            scaleY: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{ transformOrigin: "bottom" }}
                    />

                    {/* Unique Wave 2: Middle layer, different phase */}
                    <motion.path
                        fill="url(#waveGradient2)"
                        d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        animate={{
                            x: ["0%", "50%", "0%"],
                            y: [0, 15, 0],
                        }}
                        transition={{
                            x: { duration: 25, repeat: Infinity, ease: "linear" },
                            y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{ opacity: 0.7 }}
                    />

                    {/* Wave 3: Front layer, fastest */}
                    <motion.path
                        fill="rgba(255, 255, 255, 0.05)"
                        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        animate={{
                            x: ["-50%", "0%", "-50%"],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
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
