import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '../../components/Footer';
import { MapPin, Calendar, ArrowRight, Zap, Mic, Trophy, Sparkles, Code, Handshake, ChevronDown, Globe, Lightbulb, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';

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

interface RegionalEventType {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ElementType;
}

const regionalCities: RegionalCity[] = [
    { name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=400' },
    { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=400' },
    { name: 'Chennai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=400' },
    { name: 'Guwahati', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=400' },
    { name: 'Jaipur', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=400' },
    { name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=400' },
];

const regionalEventTypes: RegionalEventType[] = [
    {
        id: 'blueprint',
        title: 'Blueprint',
        subtitle: 'B-Plan Competition',
        description: 'Shape early-stage ideas into strong, practical, and scalable ventures.',
        icon: Lightbulb,
    },
    {
        id: 'moonshot',
        title: 'Moonshot',
        subtitle: 'Funding Platform',
        description: 'Pitch to leading investors and unlock powerful funding opportunities.',
        icon: Target,
    },
    {
        id: 'startup-clinic',
        title: 'Start-Up Clinic',
        subtitle: 'Mentorship Sessions',
        description: "Find clarity, mentorship, and meaningful guidance from people who've built before.",
        icon: Users,
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

export const Events: React.FC = () => {
    const [isRegionalsExpanded, setIsRegionalsExpanded] = useState(false);

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

                                    {/* Regional Events */}
                                    <div>
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-[2px] bg-white"></div>
                                            <span className="text-lg text-gray-300 uppercase tracking-widest">Events</span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {regionalEventTypes.map((event, i) => {
                                                const Icon = event.icon;
                                                return (
                                                    <motion.div
                                                        key={event.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                                                            <Icon className="w-6 h-6 text-purple-400" />
                                                        </div>
                                                        <h4 className="text-xl font-bold text-white mb-1">
                                                            {event.title}
                                                        </h4>
                                                        <p className="text-purple-400 text-sm font-medium mb-3">
                                                            {event.subtitle}
                                                        </p>
                                                        <p className="text-gray-400 text-sm leading-relaxed">
                                                            {event.description}
                                                        </p>
                                                    </motion.div>
                                                );
                                            })}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {eventsData.map((event, index) => {
                        const style = categoryConfig[event.category];
                        const Icon = style.icon;

                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                            >
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
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
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

                                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {event.description}
                                    </p>

                                    <Link
                                        to={`/events/${event.id}`}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all"
                                    >
                                        View Details <ArrowRight size={16} className="text-purple-400" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>

            <div className="relative z-50">
                <Footer />
            </div>
        </div>
    );
};
