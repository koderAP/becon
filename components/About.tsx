import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 px-4 sm:px-6 md:px-12 lg:px-20 pb-16 bg-black flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
      >
        <div className="w-8 sm:w-12 h-[2px] bg-white"></div>
        <span className="text-sm sm:text-lg text-gray-300 uppercase tracking-widest">The Manifesto</span>
      </motion.div>

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
            eDC IIT Delhi isn't just a club; it's an ecosystem. For over a decade, we have been the bridge between the rigorous technical brilliance of IIT Delhi and the dynamic world of business.
          </p>
          <p>
            BECon is our flagship declaration. It is a convergence of visionaries. From early-stage founders seeking their first cheque to industry titans defining policy, BECon is where the dialogue happens. We don't just celebrate success; we engineer the mindset required to achieve it.
          </p>

          <div className="pt-6 sm:pt-8">
            <button className="px-6 sm:px-8 py-3 sm:py-4 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs font-bold">
              Read our Story
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};