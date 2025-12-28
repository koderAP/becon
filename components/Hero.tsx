import React from 'react';
import { motion } from 'framer-motion';
import { HeroBackground } from './HeroBackground';
import { Typewriter } from './Typewriter';

export const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#05020a]">


      {/* Reusable Hero Background (Plasma Only) */}
      <HeroBackground />

      {/* 2. Right Middle Gear with purple plasma shade */}
      <motion.div
        className="absolute -right-24 top-[35%] md:-right-32 md:top-[40%] pointer-events-none z-20"
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'center center',
        }}
      >
        <motion.div
          className="relative w-[200px] h-[200px] md:w-[320px] md:h-[320px]"
          animate={{
            rotateY: [-35, 35, -35],
            rotateX: [10, -0, 10],
            rotateZ: [0, 360],
          }}
          transition={{
            rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 10, repeat: Infinity, ease: "linear" },
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src="/gear1.avif"
            alt="3D Gear"
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(124, 58, 237, 0.5))',
            }}
          />
          {/* Purple plasma shade overlay - masked to gear shape */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            animate={{
              background: [
                'linear-gradient(135deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(225deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(315deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(45deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(135deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              mixBlendMode: 'hard-light',
              opacity: 0.85,
              WebkitMaskImage: 'url(/gear1.avif)',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: 'url(/gear1.avif)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
            }}
          />
        </motion.div>
      </motion.div>

      {/* 3. Left Top Gear with purple plasma shade - 2D rotation */}
      <motion.div
        className="absolute -left-16 top-[10%] md:-left-24 md:top-[15%] pointer-events-none z-20"
      >
        <motion.div
          className="relative w-[180px] h-[180px] md:w-[280px] md:h-[280px]"
          animate={{
            rotateZ: [360, 0],
          }}
          transition={{
            rotateZ: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
        >
          <img
            src="/gear2.avif"
            alt="3D Gear Left"
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(124, 58, 237, 0.5))',
            }}
          />
          {/* Purple plasma shade overlay - masked to gear shape */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            animate={{
              background: [
                'linear-gradient(315deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(45deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(135deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(225deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(315deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              mixBlendMode: 'hard-light',
              opacity: 0.85,
              WebkitMaskImage: 'url(/gear2.avif)',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: 'url(/gear2.avif)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Top Right Small Floating Gear with plasma reflection */}
      <motion.div
        animate={{ rotate: 360, y: [0, -20, 0] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute top-32 right-32 md:right-64 opacity-80 hidden md:block pointer-events-none z-10"
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <img
            src="/gear4.avif"
            alt="Floating Gear"
            className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          />
          {/* Plasma reflection overlay */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            animate={{
              background: [
                'linear-gradient(0deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(90deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(180deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(270deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(360deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{
              mixBlendMode: 'hard-light',
              opacity: 0.7,
              WebkitMaskImage: 'url(/gear4.avif)',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: 'url(/gear4.avif)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
            }}
          />
        </div>
      </motion.div>

      {/* Bottom Left Gear - 2D rotation with plasma reflection - moved more down and left */}
      <motion.div
        className="absolute -left-24 bottom-[5%] md:-left-32 md:bottom-[8%] pointer-events-none z-20"
      >
        <motion.div
          className="relative w-[160px] h-[160px] md:w-[240px] md:h-[240px]"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <img
            src="/gear3.avif"
            alt="Bottom Left Gear"
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(124, 58, 237, 0.5))',
            }}
          />
          {/* Plasma reflection overlay */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(135deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(225deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(315deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
                'linear-gradient(45deg, rgba(76, 29, 149, 0.9) 0%, rgba(124, 58, 237, 0.8) 50%, rgba(139, 92, 246, 0.9) 100%)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
              mixBlendMode: 'hard-light',
              opacity: 0.85,
              WebkitMaskImage: 'url(/gear3.avif)',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: 'url(/gear3.avif)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
            }}
          />
        </motion.div>
      </motion.div>

      {/* 3. Main Hero Content - z-20 to be above background */}
      <div className="z-20 flex flex-col items-center text-center px-4 relative mt-0 md:-mt-8">

        {/* LOGO - BECon Logo - Emerging from background */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.3
          }}
          className="relative flex items-center justify-center mb-6 md:mb-8"
        >
          <img
            src="/logo.avif"
            alt="BECon 2026"
            className="w-[280px] md:w-[500px] lg:w-[650px] h-auto object-contain"
          />
        </motion.div>

        {/* Typewriter Effect - Clean Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="my-4 flex flex-col items-center"
        >
          <div className="h-[40px] md:h-[60px] flex items-center justify-center">
            <Typewriter
              sentences={[
                "Engineering the Mind of Machines",
                "Crafted in India for the World",
                "Where Deep Tech Meets Vision"
              ]}
              typingSpeed={80}
              deletingSpeed={50}
              pauseTime={2000}
              className="text-xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400 tracking-wide"
            />
          </div>
        </motion.div>

        {/* 4. Info HUD Bar - Date & Venue - Relative Positioning to avoid overlap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="mt-8 md:mt-12 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col md:flex-row items-stretch md:items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full p-2 pr-6 shadow-[0_0_40px_rgba(139,92,246,0.15)] group hover:border-purple-500/30 transition-all duration-500"
          >
            {/* Date Section */}
            <div className="flex items-center gap-4 px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-600/20 flex items-center justify-center border border-white/5">
                <svg className="w-5 h-5 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold">Date</span>
                <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">31 Jan - 2 Feb 2026</span>
              </div>
            </div>

            {/* Venue Section */}
            <div className="flex items-center gap-4 px-4 py-2 pt-4 md:pt-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-600/20 flex items-center justify-center border border-white/5">
                <svg className="w-5 h-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold">Venue</span>
                <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">IIT Delhi, New Delhi</span>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="hidden md:flex ml-4 pl-4 border-l border-white/10 items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-mono text-green-400/80 uppercase tracking-wider">Live</span>
            </div>
          </motion.div>
        </motion.div>

      </div>


    </div>
  );
};
