import React, { Suspense, lazy, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { StatsMarquee } from './StatsMarquee';

// Lazy load Spline for better performance
const Spline = lazy(() => import('@splinetool/react-spline'));

export const About: React.FC = () => {
  const splineRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse globally and send to Spline
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (splineRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Normalize mouse position relative to container
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        // Emit look-at event to Spline (if the scene supports it)
        try {
          splineRef.current.emitEvent('mouseHover', 'Robot');
        } catch {
          // Scene may not have this event configured
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const onSplineLoad = (spline: any) => {
    splineRef.current = spline;
  };

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

          {/* Spline 3D Scene - cropped to hide watermark */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#E3E3E3]"
          >
            {/* Inner container with negative margin to crop bottom watermark */}
            <div className="h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
              <div className="w-full h-[calc(100%+60px)]">
                <Suspense fallback={
                  <div className="w-full h-full bg-[#E3E3E3] flex items-center justify-center">
                    <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
                  </div>
                }>
                  <Spline
                    scene="https://prod.spline.design/MdKiraeI2uexdEOZ/scene.splinecode"
                    className="w-full h-full"
                    onLoad={onSplineLoad}
                  />
                </Suspense>
              </div>
            </div>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-300 text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6"
        >
          <p>
            eDC IIT Delhi is a dedicated cell that connects IIT Delhi's technical strength with the world of entrepreneurship and innovation. Over the years, we have created platforms that encourage learning, meaningful dialogue, and real opportunities for growth.
          </p>
          <p>
            BECon is at the heart of this vision. The Nation's biggest E-summit brings together founders, leaders, investors, and young innovators to connect, reflect, and shape ideas that truly matter. BECon is about building the mindset, purpose, and ecosystem needed to turn ideas into lasting impact.
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