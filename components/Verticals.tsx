import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Rocket, Globe, Recycle, Bot, ArrowRight, Calendar, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { Vertical } from '../types';

interface VerticalsProps {
  preview?: boolean;
  onViewAll?: () => void;
}

interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  description: string;
}

interface VerticalWithDescription extends Vertical {
  description: string;
}

const verticals: VerticalWithDescription[] = [
  { id: 1, title: 'Artificial Intelligence', icon: Brain, color: 'from-blue-500 to-purple-500', description: 'Exploring cutting-edge AI technologies from machine learning to neural networks and beyond.' },
  { id: 2, title: 'Deep Tech Startups', icon: Rocket, color: 'from-purple-500 to-pink-500', description: 'Showcasing revolutionary startups pushing the boundaries of technology and innovation.' },
  { id: 3, title: 'Global Innovation', icon: Globe, color: 'from-green-500 to-teal-500', description: 'Connecting global innovators and thought leaders shaping the future of technology.' },
  { id: 4, title: 'Sustainable Tech', icon: Recycle, color: 'from-emerald-500 to-green-500', description: 'Technology solutions for a greener, more sustainable future.' },
  { id: 5, title: 'Robotics & Automation', icon: Bot, color: 'from-red-500 to-pink-500', description: 'Advanced robotics and automation transforming industries worldwide.' },
];

const eventsData: EventItem[] = [
  {
    id: 1,
    title: "Global DeepTech Hackathon",
    date: "Jan 31 - Feb 1",
    time: "36 Hours",
    location: "Innovation Center",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855485?auto=format&fit=crop&q=80&w=800",
    category: "Competition",
    description: "Build solutions for the future. 36 hours of coding, hardware hacking, and innovation."
  },
  {
    id: 2,
    title: "AI Policy & Ethics Summit",
    date: "Feb 1",
    time: "10:00 AM",
    location: "Grand Hall",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800",
    category: "Panel Discussion",
    description: "Industry leaders discuss the regulatory landscape and ethical implications of AGI."
  },
  {
    id: 3,
    title: "Start-up Pitch Battle",
    date: "Feb 2",
    time: "02:00 PM",
    location: "Auditorium 1",
    image: "https://images.unsplash.com/photo-1559223607-a43c990ed9aa?auto=format&fit=crop&q=80&w=800",
    category: "Competition",
    description: "Top 10 selected startups pitch to a panel of tier-1 VCs for seed funding."
  }
];

export const Verticals: React.FC<VerticalsProps> = ({ preview = false, onViewAll }) => {
  const [selectedVertical, setSelectedVertical] = useState<number | null>(null);

  const handleVerticalClick = (id: number) => {
    setSelectedVertical(selectedVertical === id ? null : id);
  };

  const selectedData = verticals.find(v => v.id === selectedVertical);

  return (
    <div className={`min-h-screen ${preview ? 'pt-10 pb-10' : 'pt-24 pb-20'} px-6 md:px-20 bg-black`}>
      {/* Hero Image Section within Events - Only on full page */}
      {!preview && (
        <div className="relative w-full h-[40vh] rounded-3xl overflow-hidden mb-20 group border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000"
            alt="Audience"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute bottom-10 left-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Events & Tracks</h1>
            <p className="text-gray-300 max-w-lg">Explore the cutting-edge domains and scheduled activities for BECon 2026.</p>
          </div>
        </div>
      )}

      {/* TRACKS / VERTICALS SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-[2px] bg-white"></div>
          <span className="text-lg text-gray-300 uppercase tracking-widest">Core Verticals</span>
        </div>
        {preview && onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors group"
          >
            Explore Events <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </motion.div>

      {!preview && (
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold leading-tight mb-12"
        >
          Domains to Explore in <br />
          <span className="text-gray-500">BECon Deep Tech Summit</span>
        </motion.h1>
      )}

      {/* Vertical Cards Grid */}
      <div className={`grid grid-cols-2 md:grid-cols-3 ${preview ? 'lg:grid-cols-6' : 'lg:grid-cols-6'} gap-4`}>
        {(preview ? verticals.slice(0, 6) : verticals).map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleVerticalClick(v.id)}
            className={`group relative h-32 md:h-40 rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${selectedVertical === v.id
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-white/10 bg-white/5 hover:border-white/30'
              }`}
          >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className={`p-3 rounded-xl mb-3 transition-all duration-300 ${selectedVertical === v.id ? 'bg-purple-500/20' : 'bg-white/5 group-hover:bg-white/10'
                }`}>
                <v.icon size={28} className={`transition-colors ${selectedVertical === v.id ? 'text-purple-400' : 'text-white'}`} strokeWidth={1.5} />
              </div>
              <h3 className={`text-xs md:text-sm font-medium transition-colors ${selectedVertical === v.id ? 'text-purple-300' : 'text-gray-300 group-hover:text-white'
                }`}>{v.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Description Panel - Shows when a vertical is selected */}
      <AnimatePresence>
        {selectedData && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-6 overflow-hidden"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-300 text-base md:text-lg">
                {selectedData.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FEATURED EVENTS SECTION (Only on Full Page) */}
      {!preview && (
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[2px] bg-white"></div>
            <span className="text-lg text-gray-300 uppercase tracking-widest">Upcoming Highlights</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-16"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Events</span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {eventsData.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden bg-[#0a0514] border border-white/10 hover:border-purple-500/50 hover:bg-[#130d21] transition-all duration-300 flex flex-col md:flex-row h-auto md:h-72"
              >
                {/* Image Section */}
                <div className="w-full md:w-2/5 h-48 md:h-full overflow-hidden relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/5 text-purple-300 border border-white/10 uppercase tracking-wider">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between text-xs text-gray-400 border-t border-white/5 pt-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-purple-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-purple-500" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin size={14} /> {event.location}
                    </div>

                    <button className="mt-2 w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2 group/btn">
                      Register Now
                      <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
