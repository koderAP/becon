import React, { Suspense, lazy, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { StatsMarquee } from './StatsMarquee';

// Lazy load Spline for better performance
const Spline = lazy(() => import('@splinetool/react-spline'));

export const About: React.FC = () => {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Intersection Observer for Spline section
    const splineObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadSpline(true);
          splineObserver.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    // Intersection Observer for Video section
    const videoObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true);
          videoObserver.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (containerRef.current) {
      splineObserver.observe(containerRef.current);
    }
    if (videoRef.current) {
      videoObserver.observe(videoRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      splineObserver.disconnect();
      videoObserver.disconnect();
    };
  }, []);

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

          {/* Spline 3D Scene - Only load when in viewport and not mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#E3E3E3]"
          >
            <div className="h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
              <div className="w-full h-[calc(100%+60px)]">
                {shouldLoadSpline ? (
                  <Suspense fallback={
                    <div className="w-full h-full bg-[#E3E3E3] flex items-center justify-center">
                      <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
                    </div>
                  }>
                    <Spline
                      scene="https://prod.spline.design/MdKiraeI2uexdEOZ/scene.splinecode"
                      className="w-full h-full"
                    />
                  </Suspense>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
                    <div className="text-purple-400/50 text-sm">3D Experience</div>
                  </div>
                )}
              </div>
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

      {/* Video Card - Lazy loaded */}
      <motion.div
        ref={videoRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 sm:mt-16 relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group"
      >
        {shouldLoadVideo ? (
          <video
            src="/VID-20250118-WA0171.mp4"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
            <div className="animate-pulse w-16 h-16 rounded-full bg-white/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      </motion.div>
    </div>
  );
};