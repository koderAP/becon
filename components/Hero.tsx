import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
      <div className="z-20 flex flex-col items-center text-center px-4 relative -mt-12">

        {/* LOGO - BECon Logo - Emerging from background */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50, filter: 'blur(20px)' }}
          animate={{ scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.3
          }}
          className="relative flex items-center justify-center mb-2"
        >
          <img
            src="/logo.avif"
            alt="BECon 2026"
            className="w-[295px] md:w-[520px] lg:w-[680px] h-auto object-contain"
          />
        </motion.div>

        {/* Typewriter Effect - Restored with new styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <Typewriter
            sentences={[
              "Where Deep Tech Meets Vision",
              "Engineering the Mind of Machines",
              "Crafted in India for the World"
            ]}
            typingSpeed={80}
            deletingSpeed={50}
            pauseTime={2000}
            className="text-[1.4rem] md:text-[2.1rem] lg:text-[2.8rem] font-bold text-gray-300 tracking-wide"
          />
        </motion.div>

      </div>

      {/* 4. Bottom Bar - Date, Buttons, Venue - Moved up */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-16 md:bottom-24 left-0 right-0 z-30 p-4 md:p-8 flex flex-col xl:grid xl:grid-cols-3 items-center gap-6 pointer-events-none w-full"
      >
        {/* Left: Date (Stylized) */}
        <div className="pointer-events-auto transform -rotate-2 xl:justify-self-start">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400 drop-shadow-[0_2px_10px_rgba(124,58,237,0.3)]"
            style={{ textShadow: '0 0 20px rgba(124,58,237,0.5)' }}>
            30 Jan - 1 Feb 2026
          </h3>
        </div>

        {/* Center: Buttons with rotating ray effect on hover (same as Verticals cards) */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 pointer-events-auto xl:justify-self-center">
          {/* Register Button */}
          <Link
            to="/signup"
            className="group relative flex items-center justify-center gap-2 px-6 py-2 md:px-8 md:py-2.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
          >
            {/* Rotating Border Effect - Matches Verticals Ray of Light */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_320deg,#c084fc_360deg)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Inner background (inset to show border) */}
            <div className="absolute inset-[2px] bg-black/80 backdrop-blur-md rounded-full" />
            {/* Static border for non-hover */}
            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-transparent transition-colors duration-300" />
            <span className="relative z-10 text-lg font-medium text-white">Register</span>
            <ArrowRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className="group relative flex items-center justify-center gap-2 px-6 py-2 md:px-8 md:py-2.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
          >
            {/* Rotating Border Effect - Matches Verticals Ray of Light */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_320deg,#c084fc_360deg)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Inner background (inset to show border) */}
            <div className="absolute inset-[2px] bg-black/80 backdrop-blur-md rounded-full" />
            {/* Static border for non-hover */}
            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-transparent transition-colors duration-300" />
            <span className="relative z-10 text-lg font-medium text-white">Login</span>
            <ArrowRight className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right: Location */}
        <div className="pointer-events-auto text-center xl:text-right xl:justify-self-end">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-200 tracking-wide drop-shadow-lg">
            IIT Delhi, Hauz Khas
          </p>
        </div>
      </motion.div>


    </div>
  );
};
