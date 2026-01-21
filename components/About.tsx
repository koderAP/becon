import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { StatsMarquee } from './StatsMarquee';

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="min-h-screen pt-20 sm:pt-24 px-4 sm:px-6 md:px-12 lg:px-20 pb-16 bg-black flex flex-col justify-center">
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
            <span className="text-gray-500">Market Reality</span>
          </motion.h1>

          {/* Featured Image - Replaced Spline for performance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden relative">
              <img
                src="/gallery-lg1.avif"
                alt="BECon Experience"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Colorful overlay for vibrancy */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.4) 0%, rgba(139, 92, 246, 0.3) 30%, rgba(59, 130, 246, 0.3) 70%, rgba(124, 58, 237, 0.4) 100%)',
                  mixBlendMode: 'overlay',
                }}
              />
              {/* Bottom fade for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-300 text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6 min-w-0"
        >
          <p>
            eDC IIT Delhi is a dedicated cell that connects IIT Delhi's technical strength with the world of entrepreneurship and innovation. Over the years, we have created platforms that encourage learning, meaningful dialogue, and real opportunities for growth.
          </p>
          <p>
            BECon is at the heart of this vision. The Nation's biggest student-run E-summit brings together founders, leaders, investors, and young innovators to connect, reflect, and shape ideas that truly matter. BECon is about building the mindset, purpose, and ecosystem needed to turn ideas into lasting impact.
          </p>

          <div className="space-y-12 pt-12">
            <StatsMarquee
              items={[
                { label: "Overall Footfall", value: "60K+" },
                { label: "Participants", value: "15K+" },
                { label: "Ministries", value: "10+" },
                { label: "Alumni Network", value: "1L+" },
              ]}
              speed={40}
              colorClass="text-purple-400"
              direction="left"
            />

            <StatsMarquee
              items={[
                { label: "Events", value: "30+" },
                { label: "Startups", value: "4K+" },
                { label: "Institutes", value: "3500+" },
                { label: "Investment", value: "50Cr+" },
              ]}
              speed={40}
              colorClass="text-blue-400"
              direction="right"
              className="mt-8"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};