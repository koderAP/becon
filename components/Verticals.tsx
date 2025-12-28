import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Rocket, Globe, Recycle, Bot, ShoppingBag, CreditCard, Heart, Sun, Gamepad2, GraduationCap, Shield, Plane, Calendar, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { Vertical } from '../types';
import { AnimeStagger } from './AnimeStagger';
import { SectionHeading } from './SectionHeading';

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
  image?: string;
}

const themeDomains: VerticalWithDescription[] = [
  { id: 1, title: 'Artificial Intelligence', icon: Brain, color: 'from-blue-500 to-purple-500', description: 'Exploring cutting-edge AI technologies and their real-world entrepreneurial applications.', image: '/ai-vertical.avif' },
  { id: 2, title: 'Deep Tech Startups', icon: Rocket, color: 'from-purple-500 to-pink-500', description: 'Showcasing ventures built on science, engineering, and breakthrough technology.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Robotics & Automation', icon: Bot, color: 'from-red-500 to-pink-500', description: 'Building intelligent systems that drive efficiency, precision, and next-generation capability.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Sustainable Tech', icon: Recycle, color: 'from-emerald-500 to-green-500', description: 'Advancing technologies that enable a cleaner, resilient, and sustainable tomorrow.', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600' },
  { id: 5, title: 'Global Innovation', icon: Globe, color: 'from-green-500 to-teal-500', description: 'Bringing ideas, insights, and collaborations from across the world to shape the future.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600' },
];

const widerLandscape: VerticalWithDescription[] = [
  { id: 6, title: 'Consumer Brands', icon: ShoppingBag, color: 'from-pink-500 to-rose-500', description: 'Celebrating bold ventures shaping culture, lifestyle, and everyday experience.' },
  { id: 7, title: 'FinTech & Digital Economy', icon: CreditCard, color: 'from-blue-600 to-indigo-600', description: 'Redefining financial access, transactions, and digital infrastructure.' },
  { id: 8, title: 'Healthcare & MedTech', icon: Heart, color: 'from-red-500 to-rose-500', description: 'Transforming wellness, diagnostics, accessibility, and human health outcomes.' },
  { id: 9, title: 'Climate & Clean Energy', icon: Sun, color: 'from-yellow-500 to-orange-500', description: 'Powering sustainable energy, climate resilience, and environmental responsibility.' },
  { id: 10, title: 'Gaming & Creator Economy', icon: Gamepad2, color: 'from-purple-600 to-violet-600', description: 'Driving entertainment, digital storytelling, and cultural influence.' },
  { id: 11, title: 'EdTech & Future of Learning', icon: GraduationCap, color: 'from-blue-400 to-cyan-400', description: 'Reinventing how knowledge is delivered, accessed, and experienced.' },
  { id: 12, title: 'Cybersecurity & Trust', icon: Shield, color: 'from-slate-500 to-gray-500', description: 'Safeguarding systems, data, and identity in a connected world.' },
  { id: 13, title: 'Space & Aerospace', icon: Plane, color: 'from-indigo-900 to-blue-900', description: 'Pushing frontiers in exploration, intelligence, and next-generation aviation.' },
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
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const allVerticals = [...themeDomains, ...widerLandscape];
  const selectedData = allVerticals.find(v => v.id === selectedId);

  return (
    <div className={`${preview ? 'py-10' : 'pt-20 sm:pt-24 pb-16 sm:pb-20'} px-4 sm:px-6 md:px-12 lg:px-20 bg-black`}>
      {/* Hero Image Section within Events - Only on full page */}
      {!preview && (
        <div className="relative w-full h-[30vh] sm:h-[35vh] lg:h-[40vh] rounded-2xl sm:rounded-3xl overflow-hidden mb-10 sm:mb-16 lg:mb-20 group border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000"
            alt="Audience"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-1 sm:mb-2">Events & Tracks</h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-lg">Explore the cutting-edge domains and scheduled activities for BECon 2026.</p>
          </div>
        </div>
      )}

      {/* TRACKS / VERTICALS SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3"
      >
        <SectionHeading>{preview ? 'Core Verticals' : 'Domains'}</SectionHeading>
        {preview && onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-2 text-sm sm:text-base text-white hover:text-purple-400 transition-colors group"
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
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight mb-8 sm:mb-10 lg:mb-12"
        >
          Theme Domains in <br className="hidden sm:block" />
          <span className="text-gray-500">BECon Deep Tech Summit</span>
        </motion.h1>
      )}

      {/* Theme Domains Grid */}
      <AnimeStagger className="flex overflow-x-auto pb-4 gap-3 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-3 md:gap-4 sm:overflow-visible mb-4 scrollbar-hide" staggerDelay={150}>
        {themeDomains.map((v) => (
          <motion.div
            key={v.id}
            onClick={() => setSelectedId(selectedId === v.id ? null : v.id)}
            className={`group relative flex-shrink-0 w-40 sm:w-auto h-40 md:h-48 rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 snap-center ${selectedId === v.id
              ? 'border-purple-500'
              : 'border-white/10 hover:border-white/30'
              }`}
          >
            {/* Background Image */}
            {v.image && (
              <img
                src={v.image}
                alt={v.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-70 group-hover:opacity-90"
              />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Hover Gradient Background - Subtle */}
            <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

            <div className="absolute inset-0 flex items-end justify-center p-4 text-center">
              <h3 className={`text-xs md:text-sm font-medium transition-colors ${selectedId === v.id ? 'text-purple-300' : 'text-white'
                }`}>{v.title}</h3>
            </div>
          </motion.div>
        ))}
      </AnimeStagger>

      {/* Core Verticals Description Panel */}
      <AnimatePresence>
        {selectedData && themeDomains.some(v => v.id === selectedId) && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mb-4 overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-gray-300 text-sm md:text-base">{selectedData.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wider Landscape Section */}
      <SectionHeading className="mt-8 mb-2">Wider Landscape</SectionHeading>

      <p className="text-gray-500 text-base mb-4">Explore other domains too in the summit</p>

      {/* Wider Landscape - Horizontal Scroll */}
      <div className="flex overflow-x-auto pb-4 gap-3 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        {widerLandscape.map((v) => (
          <motion.div
            key={v.id}
            onClick={() => setSelectedId(selectedId === v.id ? null : v.id)}
            className={`group relative flex-shrink-0 w-44 sm:w-52 h-24 sm:h-28 rounded-xl border overflow-hidden cursor-pointer transition-all duration-300 snap-center ${selectedId === v.id
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-white/10 bg-white/5 hover:border-white/30'
              }`}
          >
            {/* Hover Gradient Background */}
            <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
              <h3 className={`text-sm font-medium transition-colors ${selectedId === v.id ? 'text-purple-300' : 'text-gray-300 group-hover:text-white'
                }`}>{v.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Wider Landscape Description Panel */}
      <AnimatePresence>
        {selectedData && widerLandscape.some(v => v.id === selectedId) && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-4 overflow-hidden"
          >
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-gray-300 text-sm md:text-base">{selectedData.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FEATURED EVENTS SECTION (Only on Full Page) */}
      {
        !preview && (
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

            <div className="space-y-24">
              {eventsData.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Content Section */}
                  <div className="flex-1 space-y-6 text-left">
                    <div className="flex items-center gap-3">
                      <span className="h-[1px] w-8 bg-purple-500"></span>
                      <span className="text-purple-400 font-bold tracking-widest text-sm uppercase">{event.category}</span>
                    </div>

                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none">
                      {event.title}
                    </h3>

                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-500 pt-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-white" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-white" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-white" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <button className="group flex items-center gap-2 text-white font-semibold text-lg hover:text-purple-400 transition-colors pt-4">
                      Register Now
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>

                  {/* Image Section */}
                  <div className="flex-1 w-full aspect-square md:aspect-[4/3] relative rounded-3xl overflow-hidden group">
                    <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      }
    </div >
  );
};
