import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PlasmaBackground } from './PlasmaBackground';
import { GearWithPlasma } from './GearWithPlasma';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 60]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#05020a]">

      {/* 1. Plasma Background */}
      <div className="absolute inset-0 z-0">
        <PlasmaBackground />
      </div>

      {/* 2. Bottom Right Gear with purple plasma shade */}
      <motion.div
        className="absolute -right-28 bottom-4 md:-right-34 md:bottom-8 pointer-events-none z-20"
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
              filter: 'drop-shadow(0 15px 35px rgba(36, 0, 109, 0.6))',
            }}
          />
          {/* Purple plasma shade overlay - masked to gear shape */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            animate={{
              background: [
                'linear-gradient(135deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
                'linear-gradient(225deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
                'linear-gradient(315deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
                'linear-gradient(45deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
                'linear-gradient(135deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
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

      {/* 3. Left Gear with purple plasma shade */}
      <motion.div
        className="absolute -left-28 top-[20%] md:-left-36 md:top-[25%] pointer-events-none z-20"
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'center center',
        }}
      >
        <motion.div
          className="relative w-[180px] h-[180px] md:w-[280px] md:h-[280px]"
          animate={{
            rotateY: [35, -35, 35],
            rotateX: [-10, 10, -10],
            rotateZ: [360, 0],
          }}
          transition={{
            rotateY: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 12, repeat: Infinity, ease: "linear" },
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src="/gear2.avif"
            alt="3D Gear Left"
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 15px 35px rgba(36, 0, 109, 0.6))',
            }}
          />
          {/* Purple plasma shade overlay - masked to gear shape */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            animate={{
              background: [
                'linear-gradient(315deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
                'linear-gradient(45deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
                'linear-gradient(135deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
                'linear-gradient(225deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
                'linear-gradient(315deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
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
                'linear-gradient(0deg, rgba(36, 0, 109, 0.8) 0%, rgba(36, 0, 109, 0.6) 100%)',
                'linear-gradient(90deg, rgba(36, 0, 109, 0.8) 0%, rgba(36, 0, 109, 0.6) 100%)',
                'linear-gradient(180deg, rgba(36, 0, 109, 0.8) 0%, rgba(36, 0, 109, 0.6) 100%)',
                'linear-gradient(270deg, rgba(36, 0, 109, 0.8) 0%, rgba(36, 0, 109, 0.6) 100%)',
                'linear-gradient(360deg, rgba(36, 0, 109, 0.8) 0%, rgba(36, 0, 109, 0.6) 100%)',
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

      {/* Bottom Left Gear - 2D rotation with plasma reflection */}
      <motion.div
        className="absolute -left-12 bottom-[5%] md:-left-16 md:bottom-[10%] pointer-events-none z-20"
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
              filter: 'drop-shadow(0 15px 35px rgba(36, 0, 109, 0.6))',
            }}
          />
          {/* Plasma reflection overlay */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
                'linear-gradient(135deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
                'linear-gradient(225deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
                'linear-gradient(315deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
                'linear-gradient(45deg, rgba(36, 0, 109, 0.9) 0%, rgba(36, 0, 109, 0.7) 50%, rgba(36, 0, 109, 0.8) 100%)',
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
            src="/logo.png"
            alt="BECon 2026"
            className="w-[280px] md:w-[450px] lg:w-[550px] h-auto object-contain"
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

      {/* 4. Bottom Info Bar & Register CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 w-full px-6 md:px-20 flex flex-col md:flex-row items-center justify-between z-20"
      >
        <div className="flex items-center gap-6 text-lg md:text-xl font-light text-white mb-6 md:mb-0">
          <span>31 Jan - 2 Feb 2026</span>
          <div className="h-[1px] w-20 md:w-40 bg-white/30"></div>
          <span>IIT Delhi, Hauz Khas</span>
        </div>

        {/* Circular Scroll Down Button */}
        <div className="flex items-center gap-4">
          <div className="w-[1px] h-10 bg-white/30 hidden md:block"></div>
          <div className="group relative cursor-pointer">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all">
              <ChevronDown size={20} className="animate-bounce" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
