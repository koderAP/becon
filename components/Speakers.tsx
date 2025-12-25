import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Tab } from '../types';

interface SpeakersProps {
    preview?: boolean;
    onViewAll?: () => void;
}

const speakers = [
  { id: 1, name: "Dr. Sarah Chen", designation: "AI Researcher, DeepMind", img: "https://picsum.photos/id/64/400/500" },
  { id: 2, name: "Michael Ross", designation: "Founder, QuantumLeap", img: "https://picsum.photos/id/91/400/500" },
  { id: 3, name: "Priya Patel", designation: "VC, Sequoia India", img: "https://picsum.photos/id/129/400/500" },
  { id: 4, name: "David Kim", designation: "Robotics Lead, Boston Dynamics", img: "https://picsum.photos/id/177/400/500" },
  { id: 5, name: "Elena Rodriguez", designation: "CTO, FutureSystems", img: "https://picsum.photos/id/338/400/500" },
  { id: 6, name: "James Wu", designation: "Director of Innovation, Tesla", img: "https://picsum.photos/id/342/400/500" },
];

export const Speakers: React.FC<SpeakersProps> = ({ preview = false, onViewAll }) => {
  const displaySpeakers = preview ? speakers.slice(0, 4) : speakers;

  return (
    <div className={`min-h-screen ${preview ? 'pt-10 pb-10' : 'pt-24 pb-20'} px-6 md:px-20 bg-[#05020a]`}>
       <motion.div 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         className="flex items-center justify-between mb-12"
      >
        <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-white"></div>
            <span className="text-lg text-gray-300 uppercase tracking-widest">Guests</span>
        </div>
        
        {preview && onViewAll && (
            <button 
                onClick={onViewAll}
                className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors group"
            >
                View All Speakers <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        )}
      </motion.div>

      {!preview && (
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-20"
        >
            Meet Our Esteemed Speakers <br />
            <span className="text-gray-500">and Industry Thought Leaders</span>
        </motion.h1>
      )}

      <div className={`flex ${preview ? 'overflow-hidden' : 'flex-wrap justify-center'} gap-8`}>
        {/* On mobile for preview we want scroll, for desktop maybe grid */}
        <div className={`w-full ${preview ? 'flex overflow-x-auto pb-8 snap-x' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {displaySpeakers.map((s, i) => (
            <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex-shrink-0 w-[300px] ${preview ? '' : 'w-full'} h-[450px] rounded-3xl overflow-hidden group snap-center cursor-pointer border border-white/5 bg-white/5`}
            >
                <img src={s.img} alt={s.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                
                {/* Icons */}
                <div className="absolute bottom-24 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/40"><Instagram size={20} /></div>
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/40"><Linkedin size={20} /></div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-2xl font-bold mb-1 text-white">{s.name}</h3>
                <p className="text-gray-400 font-light text-sm">{s.designation}</p>
                </div>
            </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};