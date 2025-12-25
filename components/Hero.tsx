import React from 'react';
import { motion } from 'framer-motion';
import { HeroBackground } from './HeroBackground';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#05020a]">

      {/* Reusable Hero Background (Plasma + Gears) */}
      <HeroBackground />

      {/* 3. Main Hero Content - z-20 to be above background */}
      <div className="z-20 flex flex-col items-center text-center px-4 relative mt-10">

        {/* LOGO - BECon Logo - Emerging from background */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.3
          }}
          className="relative flex items-center justify-center mb-8"
        >
          <img
            src="/logo.avif"
            alt="BECon 2026"
            className="w-[320px] md:w-[550px] lg:w-[700px] h-auto object-contain"
          />
        </motion.div>

        {/* Subtitle - Fade up with stagger */}
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 0.8,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-xl md:text-3xl font-light text-white tracking-wide"
        >
          Deep-Tech Summit for all the <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">AI Enthusiasts</span>
        </motion.h2>

      </div>

      {/* 4. Bottom Info Bar - Date & Venue */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-32 w-full flex items-center justify-center z-20"
      >
        <div className="flex items-center gap-4 md:gap-8 px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span className="text-white font-medium text-sm md:text-base">31 Jan - 2 Feb 2026</span>
          </div>
          <div className="h-4 w-[1px] bg-white/30"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span className="text-white font-medium text-sm md:text-base">IIT Delhi, Hauz Khas</span>
          </div>
        </div>
      </motion.div>


    </div>
  );
};
