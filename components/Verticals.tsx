import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Rocket, Globe, Recycle, Bot, ShoppingBag, CreditCard, Heart, Sun, Gamepad2, GraduationCap, Shield, Plane, Calendar, Clock, MapPin, ArrowUpRight, Cpu, Wifi } from 'lucide-react';
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
  { id: 1, title: 'Artificial Intelligence & Machine Cognition', icon: Brain, color: 'from-blue-500 to-purple-500', description: 'Exploring cutting-edge AI technologies and their real-world entrepreneurial applications.', image: '/ai-vertical.avif' },
  { id: 2, title: 'Semiconductors & Compute Infrastructure', icon: Cpu, color: 'from-purple-500 to-pink-500', description: 'Powering the future with advanced chips, processors, and computing architectures.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Defence & Space Technologies', icon: Rocket, color: 'from-indigo-500 to-blue-600', description: 'Pushing frontiers in exploration, defence systems, and next-generation aerospace.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Robotics & Advanced Manufacturing Technologies', icon: Bot, color: 'from-red-500 to-pink-500', description: 'Building intelligent systems that drive efficiency, precision, and next-generation capability.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600' },
  { id: 5, title: 'Smart Electronics & Internet of Things (IoT)', icon: Wifi, color: 'from-emerald-500 to-green-500', description: 'Connecting devices, systems, and experiences through intelligent electronics.', image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=600' },
];

const widerLandscape: VerticalWithDescription[] = [
  { id: 6, title: 'Consumer & Industrial Services', icon: ShoppingBag, color: 'from-pink-500 to-rose-500', description: 'Celebrating bold ventures shaping culture, lifestyle, and everyday experience.' },
  { id: 7, title: 'Healthcare, MedTech & Bio-Intelligent Platforms', icon: Heart, color: 'from-red-500 to-rose-500', description: 'Transforming wellness, diagnostics, accessibility, and human health outcomes.' },
  { id: 8, title: 'FinTech & Digital Economy', icon: CreditCard, color: 'from-blue-600 to-indigo-600', description: 'Redefining financial access, transactions, and digital infrastructure.' },
  { id: 9, title: 'Cybersecurity & Trusted Machine Intelligence', icon: Shield, color: 'from-slate-500 to-gray-500', description: 'Safeguarding systems, data, and identity in a connected world.' },
  { id: 10, title: 'EdTech & Future of Deep-Tech', icon: GraduationCap, color: 'from-blue-400 to-cyan-400', description: 'Reinventing how knowledge is delivered, accessed, and experienced.' },
  { id: 11, title: 'Gaming, Simulation & Virtual World', icon: Gamepad2, color: 'from-purple-600 to-violet-600', description: 'Driving entertainment, digital storytelling, and immersive experiences.' },
  { id: 12, title: 'Sustainable & Climate Intelligent Technologies', icon: Sun, color: 'from-yellow-500 to-orange-500', description: 'Powering sustainable energy, climate resilience, and environmental responsibility.' },
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

      {/* EXPERIENCE BECON - Main Section */}
      {preview && (
        <>
          <div className="flex flex-row items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-4">
              <span className="w-8 h-[2px] bg-white"></span>
              <span className="text-sm md:text-base text-gray-300 font-medium uppercase tracking-wider">Theme Domains</span>
            </div>
            <Link
              to="/events"
              className="flex items-center gap-2 text-sm sm:text-base text-gray-400 hover:text-purple-400 transition-colors group"
            >
              Explore BECon <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
            DOMAINS TO EXPLORE <br />
            <span className="text-gray-500">IN BECon'26</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 text-left">
            Across keynote stages, startup platforms, hackathons, and innovation showcases,
            BECon brings together the minds, ideas, and ecosystems shaping what comes next.
          </p>
        </>
      )}

      {/* Core Verticals Subsection */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3"
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-300 uppercase tracking-wider">{preview ? 'Core Verticals' : 'Domains'}</h3>
      </div>

      {!preview && (
        <div className="mb-12">
          <SectionHeading className="mb-6">THEME DOMAINS</SectionHeading>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight uppercase"
          >
            DOMAINS TO EXPLORE<br />
            <span className="text-gray-500">IN BECon'26</span>
          </h1>
        </div>
      )}

      <AnimeStagger
        className="flex overflow-x-auto pb-8 -mx-4 px-4 gap-4 md:grid md:grid-cols-5 md:gap-6 md:pb-0 md:px-0 md:mx-0 snap-x hide-scrollbar"
        staggerDelay={150}
      >
        {themeDomains.map((v) => (
          <div key={v.id} className="min-w-[280px] md:min-w-0 snap-center group relative w-full aspect-square perspective-1000">
            <div
              className="relative w-full h-full flip-card-inner"
            >
              {/* Box Shadow / Glow Effect behind the card */}
              <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* FRONT SIDE */}
              <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden border border-white/10 bg-[#0a0514]">
                {/* Image */}
                {v.image ? (
                  <img
                    src={v.image}
                    alt={v.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1a1a1a]" />
                )}
                {/* Gradient Overlay & Title for Front */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end justify-center p-4">
                  <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wider text-center">{v.title}</h3>
                </div>
              </div>

              {/* BACK SIDE */}
              <div
                className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden bg-black"
              >
                {/* Rotating Border Effect - Matches Ray of Light */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_320deg,#c084fc_360deg)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Inner Content Container (Inset 2px to show 2px border) */}
                <div className="absolute inset-[2px] bg-[#0a0514] rounded-xl flex flex-col items-center justify-center p-4 text-center">
                  {/* Purple Gradient Background inside back card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/10 opacity-50" />

                  <div className="relative z-10 space-y-3">
                    <v.icon className="w-8 h-8 text-purple-400 mx-auto" />
                    <h3 className="text-sm font-bold text-white uppercase">{v.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-4">{v.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

      {/* Wider Landscape Subsection */}
      {/* adding some space */}
      <div className="h-12 md:h-20" />

      <div className="mb-0 md:mb-20">
        <h3 className="text-3xl md:text-5xl font-bold mb-10">
          <span className="text-white">Wider</span> <span className="text-gray-500">Landscape</span>
        </h3>

        {/* DESKTOP VIEW (Grid) */}
        <div className="hidden md:grid grid-cols-2 gap-x-16 gap-y-0">
          {widerLandscape.map((v) => (
            <div key={v.id} className="group relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-purple-400 to-transparent -translate-x-full ray-of-light" />
              </div>
              <div className="flex items-center justify-between py-6 hover:bg-white/5 transition-colors px-2 rounded-lg cursor-pointer">
                <div className="flex flex-col flex-1 pr-6">
                  <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors loading-tight">{v.title}</h4>
                  <div className="description-reveal text-sm text-gray-400 leading-relaxed font-light">{v.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE VIEW (Slider with 4 columns - 8 items paired) */}
        <div className="flex md:hidden overflow-x-auto pb-8 -mx-4 px-4 gap-4 snap-x hide-scrollbar">
          {(() => {
            // Group all 8 items into 4 pairs
            const slides = [];
            for (let i = 0; i < widerLandscape.length; i += 2) {
              slides.push(widerLandscape.slice(i, i + 2));
            }

            return slides.map((slideGroup, groupIndex) => (
              <div key={`slide-${groupIndex}`} className="min-w-[85vw] snap-center flex flex-col gap-4">
                {slideGroup.map((v) => (
                  <div
                    key={v.id}
                    className="group relative flex-1 bg-white/5 rounded-xl border border-white/10 overflow-hidden cursor-pointer touch-manipulation active:scale-[0.98] transition-transform duration-200"
                    onClick={() => setSelectedId(selectedId === v.id ? null : v.id)}
                  >
                    {/* Removed Ray Animation for Mobile to prevent sticky hover issues */}

                    <div className="flex flex-col p-6 h-full select-none justify-center">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`text-lg font-bold transition-colors duration-200 ${selectedId === v.id ? 'text-purple-400' : 'text-white'}`}>{v.title}</h4>
                      </div>

                      {/* Click-to-Reveal Description */}
                      <div className={`grid transition-all duration-300 ease-in-out ${selectedId === v.id ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                        <div className="overflow-hidden">
                          <p className="text-sm text-gray-400 leading-relaxed">{v.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ));
          })()}
        </div>
      </div>

      {/* Removed redundant Wider Landscape Description Panel */}

      {/* FEATURED EVENTS SECTION (Only on Full Page) */}
      {
        !preview && (
          <div className="mt-32">
            <div
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[2px] bg-white"></div>
              <span className="text-lg text-gray-300 uppercase tracking-widest">Upcoming Highlights</span>
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold leading-tight mb-16"
            >
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Events</span>
            </h1>

            <div className="space-y-24">
              {eventsData.map((event, i) => (
                <div
                  key={event.id}
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
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div >
  );
};
