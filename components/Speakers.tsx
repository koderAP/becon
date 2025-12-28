import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

interface SpeakersProps {
  preview?: boolean;
  onViewAll?: () => void;
  showHeader?: boolean;
  className?: string;
}

const speakers = [
  { id: 1, name: "Sachin Bansal", designation: "Co-Founder, Flipkart", img: "/speakers/SachinBansal.avif" },
  { id: 2, name: "Mark Zuckerberg", designation: "CEO, Meta", img: "/speakers/MarkZuckerberg.avif" },
  { id: 3, name: "Deepinder Goyal", designation: "CEO, Zomato", img: "/speakers/DeepinderGoyal.avif" },
  { id: 4, name: "Bill Gates", designation: "Co-Founder, Microsoft", img: "/speakers/BillGates.avif" },
  { id: 5, name: "Raghuram Rajan", designation: "Former Governor, RBI", img: "/speakers/RaghuramRajan.avif" },
];

export const Speakers: React.FC<SpeakersProps> = ({ preview = false, onViewAll, showHeader = true, className = "" }) => {
  const displaySpeakers = speakers;

  return (
    <div className={`px-4 sm:px-6 md:px-12 lg:px-20 ${preview ? 'py-10' : 'pb-16 sm:pb-20'} ${className} ${!className.includes('bg-') ? 'bg-[#05020a]' : ''}`}>
      {showHeader && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4"
          >
            <SectionHeading>{preview ? 'Past Speakers' : 'Our Guests'}</SectionHeading>

            {preview && onViewAll && (
              <button
                onClick={onViewAll}
                className="flex items-center gap-2 text-sm sm:text-base text-white hover:text-purple-400 transition-colors group ml-auto sm:ml-0"
              >
                View All Speakers <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </motion.div>

          {!preview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 sm:mb-16 lg:mb-20"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-2">
                Discover Leading Masters and <br className="hidden lg:block" />
                <span className="text-gray-500">Creative Visionaries</span>
              </h1>
            </motion.div>
          )}
        </>
      )}

      {/* Responsive Grid Layout */}
      <div className={`${preview ? 'overflow-x-auto' : ''}`}>
        <div className={`${preview
          ? 'flex gap-4 sm:gap-6 pb-4 snap-x overflow-x-auto'
          : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
          }`}>
          {displaySpeakers.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex-shrink-0 ${preview ? 'w-[260px] sm:w-[280px] md:w-[300px]' : 'w-full'
                } group snap-center cursor-pointer`}
            >
              {/* Image Card */}
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-4 bg-[#111] border border-white/5">
                <img src={s.img} alt={s.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-all duration-500" />

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/40 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Social Icons Overlay - Bottom Right */}
                <div className="absolute bottom-5 right-5 flex gap-3 z-10">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 group-hover:text-[#0077b5] transition-colors duration-300 shadow-lg cursor-pointer">
                    <Linkedin size={20} />
                  </div>
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 group-hover:text-[#E1306C] transition-colors duration-300 shadow-lg cursor-pointer">
                    <Instagram size={20} />
                  </div>
                </div>
              </div>

              {/* Info Below Image */}
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-1">{s.name}</h3>
                <p className="text-gray-500 text-sm">{s.designation}</p>
              </div>
            </motion.div>
          ))}

          {/* Add "See All" Card if in Preview Mode */}
          {preview && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onClick={onViewAll}
              className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] group snap-center cursor-pointer"
            >
              <div className="w-full aspect-[3/4] rounded-[32px] bg-[#111] border border-white/10 flex flex-col items-center justify-center group-hover:bg-[#161616] group-hover:border-purple-500/30 transition-all duration-300 mb-4">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300 mb-4">
                  <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={24} />
                </div>
                <span className="text-lg font-bold text-white text-center px-4">See All</span>
                <span className="text-purple-400 text-xs font-medium mt-1 text-center px-4">Past Speakers</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};