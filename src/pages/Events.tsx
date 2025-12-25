import React from 'react';
import { motion } from 'framer-motion';
import { HeroBackground } from '../../components/HeroBackground';
import { Footer } from '../../components/Footer';
import { MapPin, Calendar, ArrowRight, Zap, Mic, Trophy, Sparkles, Code, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        id: 'startup-clinic',
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
    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <HeroBackground />

            <div className="relative z-20 pt-32 pb-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-200">BECon'26 Event Lineup</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                    >
                        Explore All <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Events</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Discover workshops, hackathons, talks, and competitions designed to ignite your entrepreneurial spirit using our world-class platform.
                    </motion.p>
                </div>

                {/* Grid */}
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

            <Footer />
        </div>
    );
};
