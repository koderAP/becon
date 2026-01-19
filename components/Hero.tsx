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

      {/* Right Middle Gear - responsive sizing */}
      <motion.div
        className="absolute -right-16 top-[30%] md:-right-20 lg:-right-24 pointer-events-none z-20"
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'center center',
          willChange: 'transform'
        }}
      >
        <motion.div
          className="relative w-[150px] h-[150px] md:w-[220px] md:h-[220px] lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px]"
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
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          <img
            src="/gear1.avif"
            alt="3D Gear"
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 0 30px rgba(124, 58, 237, 0.5))' }}
          />
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
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
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
              willChange: 'background'
            }}
          />
        </motion.div>
      </motion.div>

      {/* Left Top Gear - responsive sizing */}
      <motion.div
        className="absolute -left-12 top-[8%] md:-left-16 md:top-[12%] lg:-left-20 pointer-events-none z-20"
      >
        <motion.div
          className="relative w-[130px] h-[130px] md:w-[200px] md:h-[200px] lg:w-[260px] lg:h-[260px] xl:w-[300px] xl:h-[300px]"
          animate={{ rotateZ: [360, 0] }}
          transition={{ rotateZ: { duration: 20, repeat: Infinity, ease: "linear" } }}
          style={{ willChange: 'transform' }}
        >
          <img
            src="/gear2.avif"
            alt="3D Gear Left"
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 0 30px rgba(124, 58, 237, 0.5))' }}
          />
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
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
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
              willChange: 'background'
            }}
          />
        </motion.div>
      </motion.div>

      {/* Top Right Small Floating Gear - hidden on mobile */}
      <motion.div
        animate={{ rotate: 360, y: [0, -20, 0] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute top-24 right-20 md:top-28 md:right-40 lg:top-32 lg:right-52 xl:right-64 opacity-80 hidden md:block pointer-events-none z-10"
        style={{ willChange: 'transform' }}
      >
        <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20">
          <img
            src="/gear4.avif"
            alt="Floating Gear"
            className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          />
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
              willChange: 'background'
            }}
          />
        </div>
      </motion.div>

      {/* Bottom Left Gear - responsive sizing */}
      <motion.div
        className="absolute -left-16 bottom-[3%] md:-left-20 md:bottom-[6%] lg:-left-24 lg:bottom-[8%] pointer-events-none z-20"
      >
        <motion.div
          className="relative w-[120px] h-[120px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px] xl:w-[260px] xl:h-[260px]"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ willChange: 'transform' }}
        >
          <img
            src="/gear3.avif"
            alt="Bottom Left Gear"
            className="w-full h-full object-contain"
            style={{ filter: 'drop-shadow(0 0 30px rgba(124, 58, 237, 0.5))' }}
          />
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
              willChange: 'background'
            }}
          />
        </motion.div>
      </motion.div>

      {/* Main Hero Content - Centered vertically */}
      <div className="z-20 flex flex-col items-center text-center px-4 relative">

        {/* LOGO - BECon Logo - Responsive sizing */}
        {/* LOGO - BECon Logo - Responsive sizing */}
        <div className="relative flex items-center justify-center mb-4 md:mb-6">
          <img
            src="/logo1.avif"
            alt="BECon 2026"
            className="w-[260px] md:w-[400px] lg:w-[520px] xl:w-[640px] 2xl:w-[720px] h-auto object-contain"
          />
        </div>

        {/* Typewriter Effect - Responsive sizing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-col items-center mb-8 md:mb-10"
        >
          <Typewriter
            sentences={[
              "Engineering the Mind of Machines",
              "Crafted in India for the World"
            ]}
            typingSpeed={50}
            deletingSpeed={10}
            pauseTime={1000}
            className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-300 tracking-wide"
          />
        </motion.div>

        {/* Buttons - Always below typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-row gap-4 md:gap-6 mt-20"
        >
          {/* Register Button */}
          <Link
            to="/signup"
            className="group relative flex items-center justify-center gap-2 px-5 py-2 md:px-7 md:py-2.5 lg:px-8 lg:py-3 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_240deg,#7c3aed_280deg,#a855f7_320deg,#c084fc_360deg)] animate-[spin_2s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="absolute inset-[2px] bg-black/80 backdrop-blur-md rounded-full" />
            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-transparent transition-colors duration-300" />
            <span className="relative z-10 text-sm md:text-base lg:text-lg font-medium text-white">Register</span>
            <ArrowRight className="relative z-10 w-3.5 h-3.5 md:w-4 md:h-4 text-white group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className="group relative flex items-center justify-center gap-2 px-5 py-2 md:px-7 md:py-2.5 lg:px-8 lg:py-3 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_240deg,#7c3aed_280deg,#a855f7_320deg,#c084fc_360deg)] animate-[spin_2s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="absolute inset-[2px] bg-black/80 backdrop-blur-md rounded-full" />
            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-transparent transition-colors duration-300" />
            <span className="relative z-10 text-sm md:text-base lg:text-lg font-medium text-white">Login</span>
            <ArrowRight className="relative z-10 w-3.5 h-3.5 md:w-4 md:h-4 text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>

      {/* Bottom Bar - Date and Venue - Fixed at bottom */}


    </div>
  );
};
