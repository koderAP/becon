import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 px-4 sm:px-6 md:px-12 lg:px-20 pb-16 bg-black flex flex-col justify-center">
      <SectionHeading className="mb-6 sm:mb-8">The Manifesto</SectionHeading>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 sm:mb-8"
          >
            Where Innovation Meets <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Market Reality</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group"
          >
            {/* Abstract Prisms */}
            <div className="absolute inset-0 flex items-center justify-around p-4 sm:p-6 md:p-10 gap-2">
              <img
                src="https://picsum.photos/id/20/400/400"
                className="w-1/3 h-full object-cover rounded-lg mix-blend-overlay opacity-60 hover:opacity-100 transition-opacity duration-500"
                alt="Abstract 1"
              />
              <img
                src="https://picsum.photos/id/26/400/400"
                className="w-1/3 h-full object-cover rounded-lg mix-blend-overlay opacity-60 hover:opacity-100 transition-opacity duration-500"
                alt="Abstract 2"
              />
              <img
                src="https://picsum.photos/id/16/400/400"
                className="w-1/3 h-full object-cover rounded-lg mix-blend-overlay opacity-60 hover:opacity-100 transition-opacity duration-500"
                alt="Abstract 3"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-300 text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6"
        >
          <p>
            eDC IIT Delhi is a dedicated cell that connects IIT Delhi’s technical strength with the world of entrepreneurship and innovation. Over the years, we have created platforms that encourage learning, meaningful dialogue, and real opportunities for growth.
          </p>
          <p>
            BECon is at the heart of this vision. The Nation’s biggest E-summit brings together founders, leaders, investors, and young innovators to connect, reflect, and shape ideas that truly matter. BECon is about building the mindset, purpose, and ecosystem needed to turn ideas into lasting impact.
          </p>

          {/* Stats Marquee Banner - Row 1 (Left) */}
          <div className="pt-12 w-full overflow-hidden relative mask-linear-fade">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10"></div>

            <div
              className="flex whitespace-nowrap gap-16 animate-stats-left"
              style={{ willChange: 'transform', width: 'max-content' }}
            >
              {[...Array(6)].flatMap(() => [
                { label: "Overall Footfall", value: "60K+" },
                { label: "Participants", value: "15K+" },
                { label: "Ministries", value: "10+" },
                { label: "Alumni Network", value: "1L+" },
              ]).map((stat, i) => (
                <div key={`row1-${i}`} className="flex flex-col items-center">
                  <h3 className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-sm md:text-base uppercase tracking-widest text-purple-400 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Marquee Banner - Row 2 (Right) */}
          <div className="pt-8 w-full overflow-hidden relative mask-linear-fade">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10"></div>

            <div
              className="flex whitespace-nowrap gap-16 animate-stats-right"
              style={{ willChange: 'transform', width: 'max-content' }}
            >
              {[...Array(6)].flatMap(() => [
                { label: "Events", value: "30+" },
                { label: "Startups", value: "4K+" },
                { label: "Institutes", value: "3500+" },
                { label: "Investment", value: "50Cr+" },
              ]).map((stat, i) => (
                <div key={`row2-${i}`} className="flex flex-col items-center">
                  <h3 className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-sm md:text-base uppercase tracking-widest text-blue-400 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CSS Keyframes for stats marquee */}
          <style>{`
            @keyframes stats-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes stats-right {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-stats-left {
              animation: stats-left 25s linear infinite;
            }
            .animate-stats-right {
              animation: stats-right 25s linear infinite;
            }
          `}</style>
        </motion.div>
      </div>

      {/* New Video Card - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 sm:mt-16 relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group"
      >
        <video
          src="/VID-20250118-WA0171.mp4"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      </motion.div>
    </div>
  );
};