import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '../../components/Footer';
import { MapPin, Calendar, ArrowRight, Zap, Mic, Trophy, Sparkles, Code, Handshake, ChevronDown, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { createPortal } from 'react-dom';

interface EventCard {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    category: 'hackathon' | 'keynote' | 'workshop' | 'competition' | 'networking';
    image?: string;
    featured?: boolean;
}

interface RegionalCity {
    name: string;
    image: string;
}

const regionalCities: RegionalCity[] = [
    { name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=400' },
    { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=400' },
    { name: 'Chennai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=400' },
    { name: 'Guwahati', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=400' },
    { name: 'Jaipur', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=400' },
    { name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=400' },
];

const regionalEventsData: EventCard[] = [
    {
        id: 'blueprint',
        title: 'Blueprint – B-Plan Competition',
        description: 'Shape early-stage ideas into strong, practical, and scalable ventures.',
        date: 'Jan 2026',
        location: 'Multiple Cities',
        category: 'competition',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'moonshot-regional',
        title: 'Moonshot – Funding Platform',
        description: 'Pitch to leading investors and unlock powerful funding opportunities.',
        date: 'Jan 2026',
        location: 'Multiple Cities',
        category: 'competition',
        featured: true,
        image: 'https://images.unsplash.com/photo-1559223607-a43c990ed9aa?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'startup-clinic-regional',
        title: 'Start-Up Clinic',
        description: "Find clarity, mentorship, and meaningful guidance from people who've built before.",
        date: 'Jan 2026',
        location: 'Multiple Cities',
        category: 'workshop',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
    },
];

const eventsData: EventCard[] = [
    {
        id: '100x-hackathon',
        title: '100X Hackathon',
        description: "Asia's largest deep-tech hackathon aimed at building breakthrough solutions for real-world problems. Join 500+ developers.",
        date: 'Jan 31 - Feb 2, 2026',
        location: 'Lecture Hall Complex',
        category: 'hackathon',
        featured: true,
        image: 'https://images.unsplash.com/photo-1504384308090-c54be3852f33?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'keynote-ai',
        title: 'Keynote: Future of AI',
        description: 'An exclusive session with industry leaders discussing the transformative impact of Artificial Intelligence on global markets.',
        date: 'Jan 31, 2026 | 10:30 AM',
        location: 'Dogra Hall',
        category: 'keynote',
        image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'startup-clinic-main',
        title: 'Start-Up Clinic',
        description: 'One-on-one mentorship sessions with top VCs and angel investors to refine your pitch and business model.',
        date: 'Feb 1, 2026 | 02:00 PM',
        location: 'Seminar Hall',
        category: 'workshop',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'grand-moonshot',
        title: 'Grand Moonshot Pitch',
        description: 'The ultimate pitch competition where finalists present their startups to a panel of global investors for funding.',
        date: 'Feb 1, 2026 | 05:00 PM',
        location: 'Main Auditorium',
        category: 'competition',
        featured: true,
        image: 'https://images.unsplash.com/photo-1559223606-3b292fdd18a9?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'networking-night',
        title: 'Founders Networking',
        description: 'An evening dedicated to connecting with fellow founders, investors, and industry experts over dinner.',
        date: 'Feb 1, 2026 | 08:00 PM',
        location: 'Faculty House',
        category: 'networking',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'workshop-web3',
        title: 'Web3 & Blockchain Workshop',
        description: 'Hands-on workshop on building decentralized applications (dApps) on the latest blockchain protocols.',
        date: 'Feb 2, 2026 | 11:00 AM',
        location: 'LH 101',
        category: 'workshop',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    },
];

const categoryConfig = {
    hackathon: { icon: Zap, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    keynote: { icon: Mic, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    workshop: { icon: Code, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    competition: { icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    networking: { icon: Handshake, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
};

// Reusable Event Card Component
const EventCardComponent: React.FC<{ event: EventCard; index: number; animate?: boolean }> = ({ event, index, animate = true }) => {
    const style = categoryConfig[event.category];
    const Icon = style.icon;

    const cardContent = (
        <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 h-full">
            {/* Image Container */}
            <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#05020a] via-transparent to-transparent z-10" />
                {event.image ? (
                    <img
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center ${style.bg}`}>
                        <Icon className={`w-12 h-12 ${style.color}`} />
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${style.border} ${style.bg} ${style.color} backdrop-blur-md uppercase tracking-wider flex items-center gap-1`}>
                        <Icon size={12} />
                        {event.category}
                    </span>
                    {event.featured && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 backdrop-blur-md uppercase tracking-wider flex items-center gap-1">
                            <Sparkles size={12} />
                            Featured
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {event.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-purple-400" />
                        {event.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-blue-400" />
                        {event.location}
                    </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {event.description}
                </p>

                <Link
                    to={`/events/${event.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all"
                >
                    View Details <ArrowRight size={16} className="text-purple-400" />
                </Link>
            </div>
        </div>
    );

    if (animate) {
        return (
            <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
            >
                {cardContent}
            </motion.div>
        );
    }

    return (
        <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            {cardContent}
        </motion.div>
    );
};

export const Events: React.FC = () => {
    const [isRegionalsExpanded, setIsRegionalsExpanded] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventCard | null>(null);

    // Lock body scroll when modal is open
    React.useEffect(() => {
        if (selectedEvent) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedEvent]);

    // Close modal on ESC key press
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedEvent) {
                setSelectedEvent(null);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [selectedEvent]);

    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white relative">
            <PageHeader
                title="EVENTS"
                badge="BECon'26 Event Lineup"
                description="Discover workshops, hackathons, talks, and competitions designed to ignite your entrepreneurial spirit."
            />

            <div className="relative z-20 py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto pb-32">

                {/* REGIONALS SECTION - HIGHLIGHTED AT TOP */}
                <div className="mb-20">
                    {/* Regionals Clickable Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => setIsRegionalsExpanded(!isRegionalsExpanded)}
                        className="relative cursor-pointer group"
                    >
                        <div className="relative overflow-hidden rounded-3xl">
                            {/* Purple Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 via-purple-900/20 to-black"></div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/30 rounded-full blur-[120px]"></div>

                            <div className="relative z-10 py-16 px-8 md:px-16 text-center">
                                {/* Big Title */}
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
                                    REGIONALS
                                </h1>

                                <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
                                    Regionals – Taking BECon Across India
                                </h2>

                                <p className="text-gray-400 italic text-lg max-w-2xl mx-auto mb-8">
                                    Engineering the Minds of Machines. Crafted in India, for the World.
                                </p>

                                <div className="flex items-center justify-center gap-3 text-purple-300 group-hover:text-white transition-colors">
                                    <span className="text-sm font-semibold uppercase tracking-wider">
                                        {isRegionalsExpanded ? 'Collapse' : 'Explore Regionals'}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 transition-transform duration-300 ${isRegionalsExpanded ? 'rotate-180' : ''}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Expandable Regional Content */}
                    <AnimatePresence>
                        {isRegionalsExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="pt-12 space-y-16">
                                    {/* Intro Text */}
                                    <div className="max-w-4xl">
                                        <p className="text-gray-400 text-lg mb-8">
                                            Regionals carry BECon beyond IIT Delhi into key startup hubs across the country. Bringing together{' '}
                                            <span className="text-white font-semibold">Moonshot, Blueprint, and the Start-Up Clinic</span>{' '}
                                            under one umbrella, they create powerful city-level ecosystems where founders can pitch, learn, connect, and grow with real support.
                                        </p>

                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold italic leading-tight">
                                            If innovation needs reach,<br />
                                            Regionals make sure it gets there.
                                        </h3>
                                    </div>

                                    {/* Cities Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                        {regionalCities.map((city, i) => (
                                            <motion.div
                                                key={city.name}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                                            >
                                                <img
                                                    src={city.image}
                                                    alt={city.name}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                                <div className="absolute bottom-4 left-4">
                                                    <h4 className="text-xl font-bold text-white">{city.name}</h4>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Regional Events - Same card style as main events */}
                                    <div>
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-[2px] bg-white"></div>
                                            <span className="text-lg text-gray-300 uppercase tracking-widest">Regional Events</span>
                                        </div>

                                        <div className="space-y-24">
                                            {regionalEventsData.map((event, i) => (
                                                <motion.div
                                                    key={event.id}
                                                    initial={{ opacity: 0, y: 40 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                                    onClick={() => setSelectedEvent(event)}
                                                    className={`cursor-pointer group flex flex-col md:flex-row items-center gap-12 md:gap-24 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                                                >
                                                    {/* Content Section */}
                                                    <div className="flex-1 space-y-6 text-left">
                                                        <div className="flex items-center gap-3">
                                                            <span className="h-[1px] w-8 bg-purple-500"></span>
                                                            <span className="text-purple-400 font-bold tracking-widest text-sm uppercase">{event.category}</span>
                                                        </div>

                                                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none group-hover:text-purple-300 transition-colors">
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
                                                                <MapPin size={16} className="text-white" />
                                                                <span>{event.location}</span>
                                                            </div>
                                                        </div>

                                                        <span className="inline-flex items-center gap-2 text-white font-semibold text-lg group-hover:text-purple-400 transition-colors pt-4">
                                                            View Details
                                                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                                        </span>
                                                    </div>

                                                    {/* Image Section */}
                                                    <div className="flex-1 w-full aspect-square md:aspect-[4/3] relative rounded-3xl overflow-hidden">
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

                                    {/* Register Button */}
                                    <div className="flex justify-center">
                                        <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-purple-400 hover:text-white transition-all">
                                            Register Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* MAIN SUMMIT EVENTS SECTION */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="w-12 h-[2px] bg-white"></div>
                    <span className="text-lg text-gray-300 uppercase tracking-widest">Main Summit Events</span>
                </motion.div>

                {/* Events Grid */}
                {/* Events List - Alternating Layout */}
                <div className="space-y-24">
                    {eventsData.map((event, i) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            onClick={() => setSelectedEvent(event)}
                            className={`cursor-pointer group flex flex-col md:flex-row items-center gap-12 md:gap-24 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
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
                                        <span>{event.date.split('|')[0].trim()}</span>
                                    </div>
                                    {event.date.includes('|') && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center">
                                                <span className="w-2.5 h-0.5 bg-white"></span>
                                            </div>
                                            <span>{event.date.split('|')[1].trim()}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-white" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedEvent(event);
                                    }}
                                    className="group inline-flex items-center gap-2 text-white font-semibold text-lg hover:text-purple-400 transition-colors pt-4"
                                >
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


            {/* Event Details Modal - Rendered via Portal */}
            {createPortal(
                <AnimatePresence>
                    {selectedEvent && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedEvent(null)}
                                className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md"
                            />

                            {/* Modal Content - Centered */}
                            <div className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center p-4">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative w-full max-w-4xl bg-[#0a0514] border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setSelectedEvent(null)}
                                        className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                    >
                                        <X size={20} />
                                    </button>

                                    <div className="flex flex-col md:flex-row">
                                        {/* Image Side */}
                                        <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                                            <img
                                                src={selectedEvent.image}
                                                alt={selectedEvent.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-transparent to-transparent md:bg-gradient-to-r" />

                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/90 text-sm font-bold uppercase tracking-wider">
                                                    {selectedEvent.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Side */}
                                        <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col">
                                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                                {selectedEvent.title}
                                            </h2>

                                            <div className="space-y-4 mb-8">
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <Calendar className="text-purple-400" />
                                                    <span className="text-lg">{selectedEvent.date}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <MapPin className="text-blue-400" />
                                                    <span className="text-lg">{selectedEvent.location}</span>
                                                </div>
                                            </div>

                                            <div className="prose prose-invert prose-lg max-w-none text-gray-400 mb-10">
                                                <p>{selectedEvent.description}</p>
                                                <p>Join us to experience ground-breaking innovation and network with the best minds in the industry. This event is designed to foster collaboration and growth.</p>
                                            </div>

                                            <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between gap-4">
                                                <div className="flex -space-x-3">
                                                    {[1, 2, 3, 4].map(i => (
                                                        <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border-2 border-[#0a0514]" />
                                                    ))}
                                                    <div className="w-10 h-10 rounded-full bg-purple-900/50 border-2 border-[#0a0514] flex items-center justify-center text-xs font-bold text-purple-300">
                                                        +42
                                                    </div>
                                                </div>

                                                <button className="flex-1 md:flex-none px-8 py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2">
                                                    Register Now
                                                    <ArrowRight size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}

            <div className="relative z-50">
                <Footer />
            </div>
        </div>
    );
};
