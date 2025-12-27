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
      <div className="z-20 flex flex-col items-center text-center px-4 relative -mt-8">

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

        {/* Typewriter Effect - Premium Shimmer Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-4 flex flex-col items-center"
        >
          <div className="h-[60px] md:h-[80px] flex items-center justify-center relative overflow-hidden">
            {/* Shimmer overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s infinite linear',
                mixBlendMode: 'overlay',
              }}
            />
            <Typewriter
              sentences={[
                "Engineering the Mind of Machines",
                "Crafted in India for the World",
                "Where Deep Tech Meets Vision"
              ]}
              typingSpeed={50}
              deletingSpeed={30}
              pauseTime={2500}
              className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{
                fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 25%, #ffffff 50%, #c4b5fd 75%, #ffffff 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-flow 4s ease infinite',
                textShadow: '0 0 80px rgba(139, 92, 246, 0.5)',
              }}
            />
          </div>

          {/* Glowing underline */}
          <motion.div
            className="mt-6 h-[2px] rounded-full relative overflow-hidden"
            style={{ width: '200px' }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
            />
          </motion.div>
        </motion.div>

        {/* Add keyframe styles */}
        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; transform: scaleX(0.8); }
            50% { opacity: 1; transform: scaleX(1); }
          }
        `}</style>

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
