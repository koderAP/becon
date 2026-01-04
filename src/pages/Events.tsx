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
    whyJoin?: readonly string[];
    date: string;
    location: string;
    category: 'hackathon' | 'keynote' | 'workshop' | 'competition' | 'networking' | 'exhibition';
    image?: string;
    featured?: boolean;
    isRegional?: boolean;
}

interface RegionalCity {
    name: string;
    image: string;
}

const regionalCities: RegionalCity[] = [
    { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=400' },
    { name: 'Chennai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=400' },
    { name: 'Bengalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=400' },
    { name: 'Guwahati', image: '/guwahati.avif' },
    { name: 'Jaipur', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=400' },
    { name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=400' },
];

// ============= SHARED EVENT DEFINITIONS =============
// These events appear in both regional and main summit with different dates/locations
interface SharedEventBase {
    title: string;
    description: string;
    whyJoin: readonly string[];
    category: 'hackathon' | 'keynote' | 'workshop' | 'competition' | 'networking' | 'exhibition';
    image: string;
}

const sharedEvents = {
    blueprint: {
        title: 'Blueprint – B-Plan Competition',
        description: "Blueprint is designed for founders at the early stages of their startup journey who are looking for clarity, direction, and expert mentorship. It helps teams refine their ideas, understand real-world market fit, and strengthen how they think, plan, and build. Shortlisted startups present before experienced founders, industry mentors, and early-stage investors, gaining structured insights and long-term support. If you're building your startup story, Blueprint helps you shape it right.",
        whyJoin: [
            'Access to industry mentors and experienced founders',
            'Structured guidance to refine ideas and strategy',
            "Real-world feedback from people who've built before",
            'Clarity on business model, product direction, and growth',
            'Pathway to the Grand Summit at IIT Delhi with national visibility'
        ],
        category: 'competition' as const,
        image: '/events/Blueprint.avif',
    },
    moonshot: {
        title: 'Moonshot – Funding Platform',
        description: "Moonshot is for startups that are already building, growing, and ready to scale further. It brings strong Seed to Series A ventures to pitch before top venture capitalists and investment leaders from India and across the world. The strongest startups move forward to the Grand Moonshot at IIT Delhi, where they present to global VCs, deep-tech leaders, and ecosystem partners. If your startup is ready for its next leap, Moonshot gives you the platform to raise.",
        whyJoin: [
            'Direct access to leading VCs and investment firms',
            'A credible fundraising platform trusted by the ecosystem',
            'Powerful national visibility among investors, leaders, and media',
            'Sharp feedback to strengthen your pitch and funding readiness',
            'A pathway to the Grand Moonshot at IIT Delhi'
        ],
        category: 'competition' as const,
        image: '/events/Grandmoonshot.avif',
    },
    startupClinic: {
        title: 'Start-Up Clinic',
        description: "The Start-Up Clinic is a dedicated space for early-stage founders to engage with experienced entrepreneurs, domain experts, and industry leaders. It creates a guided yet relaxed environment for real conversations, mentorship, and relationship-building — helping founders gain clarity, refine direction, and connect with the right people who can support their journey ahead. If you value guidance and a strong network, the Clinic is designed for you.",
        whyJoin: [
            'Access to experienced mentors and industry experts',
            'A supportive environment to discuss challenges openly',
            'Meaningful networking with founders and leaders',
            'Guidance that helps shape clearer decisions and strategy',
            'Connections that often continue beyond the event'
        ],
        category: 'workshop' as const,
        image: '/events/startupclinic.avif',
    }
} as const;

// Helper to create regional event variant
const toRegional = (base: SharedEventBase, id: string, featured?: boolean): EventCard => ({
    id: `${id}-regional`,
    ...base,
    date: 'Jan 10 - Feb 1, 2026',
    location: 'Mumbai, Bangalore, Chennai, Guwahati, Jaipur, Delhi',
    isRegional: true,
    featured,
});

// Helper to create main summit event variant
const toMain = (base: SharedEventBase, id: string, date: string, location: string, featured?: boolean): EventCard => ({
    id: `${id}-main`,
    ...base,
    date,
    location,
    featured,
});

// ============= REGIONAL EVENTS =============

const regionalEventsData: EventCard[] = [
    toRegional(sharedEvents.blueprint, 'blueprint'),
    toRegional(sharedEvents.moonshot, 'moonshot', true), // featured
    toRegional(sharedEvents.startupClinic, 'startup-clinic'),
];

const eventsData: EventCard[] = [
    {
        id: 'e-raksha-hackathon',
        title: 'e-Raksha Hackathon',
        description: "The e-Raksha Hackathon is one of Asia's largest deep-tech innovation arenas, bringing together some of the brightest engineering minds to solve challenges in defence, electronics, and intelligent hardware. It focuses on creating practical, scalable solutions with real application potential, supported by guidance from industry leaders, research experts, and partner institutions. If you want to build technology that truly counts, this is the place to do it.",
        whyJoin: [
            'Work on high-impact, nationally relevant problem statements',
            'Mentorship from domain experts, researchers, and industry leaders',
            'Opportunity to build IP-ready, scalable solutions',
            'Strong ecosystem support for piloting and next-step development',
            'Recognition on one of the most respected deep-tech stages in Asia'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'Lecture Hall Complex',
        category: 'hackathon',
        featured: true,
        image: '/events/e-rakshaHackathon.avif',
    },
    {
        id: 'moonshot-main',
        title: 'Moonshot – Funding Platform',
        description: "Moonshot is for startups that are already building, growing, and ready to scale further. It brings strong Seed to Series A ventures to pitch before top venture capitalists and investment leaders from India and across the world. The strongest startups move forward to the Grand Moonshot at IIT Delhi, where they present to global VCs, deep-tech leaders, and ecosystem partners. If your startup is ready for its next leap, Moonshot gives you the platform to raise.",
        whyJoin: [
            'Direct access to leading VCs and investment firms',
            'A credible fundraising platform trusted by the ecosystem',
            'Powerful national visibility among investors, leaders, and media',
            'Sharp feedback to strengthen your pitch and funding readiness',
            'A pathway to the Grand Moonshot at IIT Delhi'
        ],
        date: 'Jan 31, 2026',
        location: 'Main Auditorium',
        category: 'competition',
        featured: true,
        image: '/events/Grandmoonshot.avif',
    },
    {
        id: 'innoverse',
        title: 'Innoverse – TechDisplay',
        description: "Innoverse is a national-scale showcase of cutting-edge technologies across drones, defence systems, robotics, manufacturing automation, and chip design. It brings together startups, R&D teams, and innovators to demonstrate real capabilities, exchange knowledge, and explore meaningful applications. By connecting academia, industry, and entrepreneurship on one stage, Innoverse enables genuine collaboration, career discovery, and informed innovation. If you want to interact with serious technology and the people building it, Innoverse is the place to be.",
        whyJoin: [
            'Experience breakthrough technologies up close',
            'Engage directly with innovators, researchers, and founders',
            'Discover opportunities for collaboration and partnerships',
            'Understand real-world applications of deep-tech innovation',
            'Explore careers and pathways in future-focused technologies'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'Exhibition Grounds',
        category: 'exhibition',
        image: '/events/innoverse.avif',
    },
    {
        id: 'autospark',
        title: 'Autospark',
        description: "Autospark is a showcase of next-generation automotive technology, featuring concept vehicles, intelligent systems, and futuristic mobility solutions. It brings together engineers, innovators, and industry leaders to explore advancements in autonomy, smart design, and sustainable transportation. If mobility excites you, Autospark puts you at the centre of its future.",
        whyJoin: [
            'Experience cutting-edge automotive technology first-hand',
            'Engage with leading automotive experts and companies',
            'Discover innovations in autonomy, intelligence, and design',
            'Explore collaboration and career opportunities',
            "Be part of conversations shaping tomorrow's mobility"
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'Outdoor Arena',
        category: 'exhibition',
        image: '/events/autospark.avif',
    },
    toMain(sharedEvents.blueprint, 'blueprint', 'Feb 1, 2026', 'Seminar Hall'),
    {
        id: 'launchpad',
        title: 'Launchpad – Startup Expo',
        description: "Launchpad is India's premier startup expo, bringing together some of the country's most promising ventures to showcase innovations shaping the deep-tech future. With live demos, real user feedback, and engagement from investors, policymakers, and industry leaders, Launchpad creates a powerful space for visibility, connections, and meaningful growth. If you want your startup to be seen, Launchpad gives it the right spotlight.",
        whyJoin: [
            'National exposure for your startup',
            'Direct access to VCs, policymakers, and industry leaders',
            'Real-time user and customer feedback',
            'Opportunities for collaboration and partnerships',
            'A credible platform to accelerate growth'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'Exhibition Grounds',
        category: 'exhibition',
        image: '/events/launchpad.avif',
    },
    toMain(sharedEvents.startupClinic, 'startup-clinic', 'Feb 1, 2026', 'LHC Foyer'),
    {
        id: 'policysphere',
        title: 'Policysphere',
        description: "Policysphere is a dedicated forum that directly connects startups with policymakers across key ministries and sectors. It creates a structured yet open space to discuss challenges, regulatory bottlenecks, and opportunities for collaboration — ensuring innovation and policy move in the same direction. If you want your idea to scale responsibly and sustainably, Policysphere helps clear the path.",
        whyJoin: [
            'Direct interaction with policymakers and government representatives',
            'Clarity on regulations, compliance, and policy frameworks',
            'Opportunity to voice challenges and suggest meaningful solutions',
            'Scope for collaboration and institutional support',
            'A platform that aligns innovation with national and sectoral priorities'
        ],
        date: 'Feb 2, 2026',
        location: 'Senate Hall',
        category: 'networking',
        image: '/events/Policysphere.avif',
    },
    {
        id: 'colab',
        title: 'CoLab – Co-Founder Matchmaking',
        description: "CoLab is a dedicated platform that helps entrepreneurs connect with potential co-founders through a structured, thoughtful matchmaking format. It brings together driven builders with complementary skills, aligned intent, and shared ambition, while also providing access to mentorship and ecosystem support to help ideas grow into real ventures. If you want a co-founder who truly matches your vision, CoLab is where you'll find them.",
        whyJoin: [
            'Meet serious, like-minded entrepreneurs',
            'Discover co-founders with complementary strengths',
            'Build meaningful, long-term collaborations',
            'Access mentorship and ecosystem support',
            'Form strong teams that can truly scale'
        ],
        date: 'Jan 31, 2026',
        location: 'Networking Zone',
        category: 'networking',
        image: '/events/Co-lab.avif',
    },
    {
        id: 'strategy-competitions',
        title: 'Strategy Competitions',
        description: "The Strategy Competitions feature curated challenges that mirror real-world business, consulting, and technology scenarios. They test analytical thinking, creativity, and decision-making under pressure, helping participants refine how they think, plan, and respond to complex situations. If real-world strategy excites you, this is your arena.",
        whyJoin: [
            'Tackle industry-inspired real-world problem statements',
            'Strengthen analytical thinking and structured decision-making',
            'Experience pressure-driven strategy building',
            'Learn through competitive yet meaningful challenges',
            'Prepare for high-impact roles in business, consulting, and tech'
        ],
        date: 'Jan 31, 2026',
        location: 'LHC Classrooms',
        category: 'competition',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'bootcamp',
        title: 'Bootcamp – Building the Future',
        description: "The Bootcamp is an intensive, hands-on learning experience for innovators working in IoT, hardware, and autonomous technologies. Guided by expert mentors, participants move beyond theory to design and prototype real solutions that address real challenges, while gaining clarity, confidence, and strong technical grounding. If you want to build the future, this is where you start shaping it.",
        whyJoin: [
            'Learn through practical, hands-on building',
            'Work closely with expert mentors and engineers',
            'Prototype real MVPs with real applications',
            'Strengthen technical clarity and problem-solving',
            'Step into the future of deep-tech innovation'
        ],
        date: 'Jan 30 - 31, 2026',
        location: 'Maker Space',
        category: 'workshop',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'workshops',
        title: 'Workshops – Transforming Today',
        description: "The Workshops bring together professionals, founders, and tech builders for practical sessions focused on AI, automation, and business transformation. Led by industry experts, they help participants understand real applications, adopt smarter tools, and strengthen everyday decision-making with modern technology. If you want to stay ahead, this is where you sharpen your edge.",
        whyJoin: [
            'Practical learning led by industry experts',
            'Real-world application, not just theory',
            'Clarity on AI, automation, and business transformation',
            'Tools and methods to improve everyday work',
            'A bridge between emerging tech and real professional impact'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'LHC Classrooms',
        category: 'workshop',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'grand-moonshot',
        title: 'Grand Moonshot',
        description: "The Grand Moonshot is the flagship fundraising arena at IIT Delhi where India's most promising, growth-ready startups pitch to leading national and global venture capital firms. Built for ventures with real traction, strong metrics, and scalable business models, it offers a high-credibility platform to raise funding, form strategic partnerships, and accelerate scale. If you're ready to raise big, this is the stage that makes it real.",
        whyJoin: [
            'Pitch to top Indian and global VCs',
            'A trusted stage built for serious fundraising',
            'Powerful visibility among investors and industry leaders',
            'Opportunities for partnerships and rapid scale',
            "Recognition on one of India's most influential startup platforms"
        ],
        date: 'Feb 2, 2026',
        location: 'Dogra Hall',
        category: 'competition',
        featured: true,
        image: '/events/Grandmoonshot.avif',
    },
    {
        id: 'keynotes-panels',
        title: 'Keynotes & Panels',
        description: "Keynotes & Panels bring together global leaders, visionary founders, policymakers, and top investors to discuss where technology, business, and innovation are headed next. Through powerful conversations, fireside chats, and unapologetically honest discussions, these sessions decode real experiences, real decisions, and real journeys that shape the future. If you want insight with impact, this is your front row.",
        whyJoin: [
            'Hear directly from global leaders and iconic founders',
            'Understand real decisions behind major milestones',
            'Gain perspective on the future of technology, innovation, and business',
            'Learn through honest, unscripted conversations',
            'Leave with ideas that challenge, inspire, and push you forward'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'Dogra Hall',
        category: 'keynote',
        image: '/events/keynote.avif',
    },
];

const categoryConfig = {
    hackathon: { icon: Zap, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    keynote: { icon: Mic, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    workshop: { icon: Code, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    competition: { icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    networking: { icon: Handshake, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    exhibition: { icon: Sparkles, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },

};

// Skeleton Loader for Regional Cards
const SkeletonRegionalCard = () => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col animate-pulse">
        <div className="h-48 bg-white/10 rounded-xl mb-6 w-full" />
        <div className="h-6 w-24 bg-white/10 rounded mb-4" />
        <div className="h-8 w-3/4 bg-white/10 rounded mb-4" />
        <div className="space-y-2 mb-6 flex-1">
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-5/6 bg-white/10 rounded" />
            <div className="h-4 w-4/6 bg-white/10 rounded" />
        </div>
        <div className="h-10 w-full bg-white/10 rounded-xl" />
    </div>
);

// Skeleton Loader for Main Cards
const SkeletonMainCard = () => (
    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 animate-pulse">
        <div className="flex-1 w-full space-y-6">
            <div className="flex items-center gap-3">
                <div className="h-1 w-8 bg-white/10 rounded" />
                <div className="h-4 w-20 bg-white/10 rounded" />
            </div>
            <div className="h-12 w-3/4 bg-white/10 rounded" />
            <div className="h-24 w-full bg-white/10 rounded" />
            <div className="flex gap-6 pt-4">
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-4 w-32 bg-white/10 rounded" />
            </div>
        </div>
        <div className="flex-1 w-full h-[300px] md:h-[400px] bg-white/10 rounded-3xl" />
    </div>
);

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

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {event.description.length > 100
                        ? `${event.description.substring(0, 100)}...`
                        : event.description}
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
    const [isRegionalsExpanded, setIsRegionalsExpanded] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<EventCard | null>(null);
    const [expandedRegionalId, setExpandedRegionalId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading delay
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Auto-close dropdown with animation after page loads
    React.useEffect(() => {
        const closeTimer = setTimeout(() => {
            setIsRegionalsExpanded(false);
        }, 1500);
        return () => clearTimeout(closeTimer);
    }, []);

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
                    {/* Cities Collage Banner with REGIONALS overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden mb-12"
                    >
                        {/* Cities Image Strip with Tilted Partitions */}
                        <div className="flex h-[300px] md:h-[400px]">
                            {regionalCities.map((city, i) => (
                                <div
                                    key={city.name}
                                    className="relative overflow-hidden"
                                    style={{
                                        flex: (i > 0 && i < regionalCities.length - 1) ? 1.05 : 1,
                                        clipPath: i === 0
                                            ? 'polygon(0 0, 100% 0, 75% 100%, 0 100%)'
                                            : i === regionalCities.length - 1
                                                ? 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)'
                                                : 'polygon(25% 0, 100% 0, 75% 100%, 0 100%)',
                                        marginLeft: i > 0 ? '-8%' : '0'
                                    }}
                                >
                                    <img
                                        src={city.image}
                                        alt={city.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40" />
                                </div>
                            ))}
                        </div>

                        {/* Overlay Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-2">
                                REGIONALS
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200">
                                Regionals - Taking BECon Across India
                            </p>
                        </div>

                        {/* City Names Strip */}
                        <div className="absolute bottom-20 left-0 right-0 flex">
                            {regionalCities.map((city) => (
                                <div key={city.name} className="flex-1 py-3 text-center">
                                    <span className="text-white text-xs md:text-sm font-semibold uppercase tracking-wider">
                                        {city.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Know More Section - Integrated into banner */}
                        <div
                            className="absolute bottom-0 left-0 right-0 py-8 bg-gradient-to-t from-[#0a0514] via-[#0a0514]/90 to-transparent backdrop-blur-sm cursor-pointer group"
                            onClick={() => setIsRegionalsExpanded(!isRegionalsExpanded)}
                        >
                            <div className="flex items-center justify-center gap-3 text-white/90 hover:text-white transition-colors">
                                <span className="text-lg md:text-xl font-semibold tracking-wide">Know More</span>
                                <ChevronDown
                                    className={`w-6 h-6 transition-transform duration-300 ${isRegionalsExpanded ? 'rotate-180' : ''}`}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Dropdown Content - Regional Events */}
                    <AnimatePresence initial={false}>
                        {isRegionalsExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                {/* Section Title */}
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white">Events</h2>
                                </div>

                                {/* Regional Events - Horizontal Accordion Layout */}
                                <div className="flex gap-2 h-[450px] md:h-[550px]">
                                    {[
                                        regionalEventsData.find(e => e.id === 'startup-clinic-regional'),
                                        regionalEventsData.find(e => e.id === 'moonshot-regional'),
                                        regionalEventsData.find(e => e.id === 'blueprint-regional'),
                                    ].filter(Boolean).map((event) => {
                                        const isSelected = expandedRegionalId === event!.id;
                                        const hasSelection = expandedRegionalId !== null;

                                        return (
                                            <motion.div
                                                key={event!.id}
                                                layout
                                                initial={false}
                                                animate={{
                                                    flex: isSelected ? 2.5 : hasSelection ? 0.75 : 1,
                                                }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                onClick={() => setExpandedRegionalId(isSelected ? null : event!.id)}
                                                className="relative cursor-pointer overflow-hidden rounded-xl border border-purple-500/30"
                                            >
                                                {/* Background - Image for collapsed, Purple gradient for expanded */}
                                                <div className="absolute inset-0">
                                                    {/* Image Background (visible when NOT selected) */}
                                                    <div className={`absolute inset-0 transition-opacity duration-500 ${isSelected ? 'opacity-0' : 'opacity-100'}`}>
                                                        <img
                                                            src={event!.image}
                                                            alt={event!.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                                    </div>

                                                    {/* Purple Gradient Background (visible when selected) */}
                                                    <div className={`absolute inset-0 transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                                                        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/90 via-[#1a0a2e] to-[#0a0514]" />
                                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-purple-500/20 rounded-full blur-[80px]" />
                                                    </div>
                                                </div>

                                                {/* Collapsed State - Title at Bottom (visible on non-selected cards) */}
                                                <div className={`absolute inset-0 flex items-end justify-center p-4 md:p-6 transition-opacity duration-300 ${isSelected ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white text-center leading-tight uppercase tracking-wide">
                                                        {event!.title.split(' – ')[0].replace('Start-Up', 'START-UP')}
                                                    </h3>
                                                </div>

                                                {/* Expanded State - Full Content (visible only on selected card) */}
                                                <div className={`absolute inset-0 flex flex-col p-5 md:p-8 overflow-y-auto transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                                    {/* Title */}
                                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 uppercase">
                                                        {event!.title.split(' – ')[0]}
                                                    </h2>

                                                    {/* Subtitle */}
                                                    <p className="text-purple-300 text-sm md:text-base mb-1">
                                                        Pitch to India's leading investors on a national stage.
                                                    </p>
                                                    <p className="text-purple-300/80 text-xs md:text-sm mb-4">
                                                        Take your next funding round to the right room.
                                                    </p>

                                                    {/* Description */}
                                                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-5">
                                                        {event!.description}
                                                    </p>

                                                    {/* Why Join */}
                                                    {event!.whyJoin && (
                                                        <div className="mb-5">
                                                            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
                                                                Why Apply for {event!.title.split(' – ')[0]}?
                                                            </h4>
                                                            <ul className="space-y-1.5">
                                                                {event!.whyJoin.map((point, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-xs md:text-sm">
                                                                        <span className="text-white mt-0.5">•</span>
                                                                        <span>{point}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Register Button */}
                                                    <div className="mt-auto pt-3">
                                                        <button
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="w-full md:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-sm uppercase tracking-wider hover:from-yellow-400 hover:to-orange-400 transition-all"
                                                        >
                                                            Register
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
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
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <SkeletonMainCard key={i} />
                        ))
                    ) : (
                        eventsData.map((event, i) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                onClick={() => setSelectedEvent(event)}
                                className={`cursor-pointer group flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl mx-auto ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Content Section */}
                                <div className="flex-1 space-y-6 text-left">


                                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none">
                                        {event.title}
                                    </h3>

                                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                        {event.description.length > 150
                                            ? `${event.description.substring(0, 150)}...`
                                            : event.description}
                                    </p>



                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedEvent(event);
                                        }}
                                        className="group inline-flex items-center gap-2 text-white font-semibold text-lg hover:text-purple-400 transition-colors pt-4"
                                    >
                                        Know More
                                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>

                                {/* Image Section */}
                                <div className="w-full md:w-[320px] aspect-square relative rounded-3xl overflow-hidden shrink-0 group">
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
                        )))}
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

                                    <div className="flex flex-col">
                                        {/* Image Top */}
                                        <div className="w-full h-64 md:h-80 relative flex-shrink-0">
                                            <img
                                                src={selectedEvent.image}
                                                alt={selectedEvent.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-transparent to-transparent" />

                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/90 text-sm font-bold uppercase tracking-wider">
                                                    {selectedEvent.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Bottom */}
                                        <div className="w-full p-8 md:p-12 flex flex-col">
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

                                            <div className="prose prose-invert prose-lg max-w-none text-gray-400 mb-6">
                                                <p>{selectedEvent.description}</p>
                                            </div>

                                            {selectedEvent.whyJoin && selectedEvent.whyJoin.length > 0 && (
                                                <div className="mb-10">
                                                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                        <Sparkles size={20} className="text-purple-400" />
                                                        Why Join?
                                                    </h4>
                                                    <ul className="space-y-3">
                                                        {selectedEvent.whyJoin.map((reason, index) => (
                                                            <li key={index} className="flex items-start gap-3 text-gray-300">
                                                                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                                                                <span>{reason}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between gap-4">
                                                <div className="flex -space-x-3">
                                                    {[1, 2, 3, 4].map(i => (
                                                        <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border-2 border-[#0a0514]" />
                                                    ))}
                                                    <div className="w-10 h-10 rounded-full bg-purple-900/50 border-2 border-[#0a0514] flex items-center justify-center text-xs font-bold text-purple-300">
                                                        +42
                                                    </div>
                                                </div>

                                                <button disabled className="flex-1 md:flex-none px-8 py-4 bg-white/20 text-white/60 font-bold text-lg rounded-xl cursor-not-allowed border border-white/20 flex items-center justify-center gap-2">
                                                    Coming Soon
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
