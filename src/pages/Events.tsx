import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Footer } from '../../components/Footer';
import { MapPin, Calendar, ArrowRight, Zap, Mic, Trophy, Sparkles, Code, Handshake, ChevronDown, X, CheckCircle, ExternalLink, Loader2, Rocket } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { createPortal } from 'react-dom';
import { useEventRegistration } from '../hooks/useEventRegistration';
import { useAuth } from '../contexts/AuthContext';
import { apiRequest } from '../lib/api';
import { EventFormPopup } from '../../components/EventFormPopup';

// Helper to strip HTML tags for plain text display
const stripHtml = (html: string): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&[a-z]+;/gi, ' ').trim();
};


// Event types for filtering
type EventType = 'strategy' | 'main' | 'showcase' | 'sessions' | 'other';

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
    eventType?: EventType;
    minPassLevel?: string;
    formFields?: string; // For dynamic events
    isDynamic?: boolean;
    linkedFormId?: string; // For dynamic events
    customButtons?: EventButton[];
}

interface EventButton {
    text: string;
    url?: string;
    type?: 'primary' | 'secondary' | 'outline';
    action?: 'register';
    disabled?: boolean;
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
const toMain = (base: SharedEventBase, id: string, date: string, location: string, featured?: boolean, eventType?: EventType): EventCard => ({
    id: `${id}-main`,
    ...base,
    date,
    location,
    featured,
    eventType,
});

// ============= REGIONAL EVENTS =============

const regionalEventsData: EventCard[] = [
    toRegional(sharedEvents.blueprint, 'blueprint'),
    toRegional(sharedEvents.moonshot, 'moonshot', true), // featured
    toRegional(sharedEvents.startupClinic, 'startup-clinic'),
];

const eventsData: EventCard[] = [
    {
        id: 'grand-moonshot',
        title: 'Grand Moonshot',
        description: "The Grand Moonshot is the flagship fundraising arena at IIT Delhi where India's most promising, growth-ready startups from regional locations pitch to leading national and global venture capital firms and an audience of 5000+. Final top teams pitch in front of a real audience in the arena and investors to raise funding. This isn't just a pitch—it's a high-stakes opportunity to secure funding, gain massive visibility, and prove your mettle on a national stage. If you're ready to raise big, this is the stage that makes it real.",
        whyJoin: [
            'Pitch to top Indian and global VCs',
            'A trusted stage built for serious fundraising',
            'Powerful visibility among investors and industry leaders',
            'Opportunities for partnerships and rapid scale',
            "Recognition on one of India's most influential startup platforms"
        ],
        date: 'Feb 1, 2026',
        location: 'Open Air Theatre, IIT Delhi',
        category: 'competition',
        featured: true,
        image: '/events/Grandmoonshot.avif',
        eventType: 'main',
        minPassLevel: 'iitd_student',
        customButtons: [
            { text: 'Apply (Startups)', url: 'https://becon.edciitd.com/forms/6934558c6b959ada62127360', type: 'primary' },
            { text: 'Register as Audience (IITD Only)', action: 'register', type: 'secondary' }
        ]
    },
    {
        id: 'blueprint-finale',
        title: 'Blueprint Finale',
        description: "Blueprint is designed for founders at the early stages of their startup journey who are looking for clarity, direction, and expert mentorship. It helps teams refine their ideas, understand real-world market fit, and strengthen how they think, plan, and build. Shortlisted startups present before experienced founders, industry mentors, and early-stage investors, gaining structured insights and long-term support. If you're building your startup story, Blueprint helps you shape it right.",
        whyJoin: [
            'Access to industry mentors and experienced founders',
            'Structured guidance to refine ideas and strategy',
            "Real-world feedback from people who've built before",
            'Clarity on business model, product direction, and growth',
            'Pathway to the Grand Summit at IIT Delhi with national visibility'
        ],
        date: 'Feb 1, 2026',
        location: 'LHC',
        category: 'competition',
        featured: false,
        image: '/events/Blueprint.avif',
        eventType: 'main',
        customButtons: [
            { text: 'Register as Audience', action: 'register', type: 'primary' }
        ]
    },
    {
        id: 'e-raksha-hackathon',
        title: 'e-Raksha Hackathon',
        description: "The e-Raksha Hackathon is one of India's largest deep-tech hackathons in collaboration with Ministry of Home Affairs and Cyberpeace, bringing together some of the brightest engineering minds to solve challenges in defence, electronics, and intelligent hardware. It focuses on creating practical, scalable solutions with real application potential, supported by guidance from industry leaders, research experts, and partner institutions. If you want to build technology that truly counts, this is the place to do it.",
        whyJoin: [
            'Work on high-impact, nationally relevant problem statements',
            'Mentorship from domain experts, researchers, and industry leaders',
            'Opportunity to build IP-ready, scalable solutions',
            'Strong ecosystem support for piloting and next-step development',
            'Recognition on one of the most respected deep-tech stages in Asia'
        ],
        date: 'Jan 17 - Jan 18, 2026',
        location: 'RNI Park, IIT Delhi',
        category: 'hackathon',
        featured: true,
        image: '/events/e-rakshaHackathon.avif',
        eventType: 'main',
    },

    {
        id: 'innoverse',
        title: 'Technoverse – Tech Showcase',
        description: "Technoverse is a national-scale showcase of cutting-edge technologies across drones, defence systems, robotics, manufacturing automation, and chip design. It brings together startups, R&D teams, and innovators to demonstrate real capabilities, exchange knowledge, and explore meaningful applications. By connecting academia, industry, and entrepreneurship on one stage, Innoverse enables genuine collaboration, career discovery, and informed innovation. If you want to interact with serious technology and the people building it, Innoverse is the place to be.",
        whyJoin: [
            'Experience breakthrough technologies up close',
            'Engage directly with innovators, researchers, and founders',
            'Discover opportunities for collaboration and partnerships',
            'Understand real-world applications of deep-tech innovation',
            'Explore careers and pathways in future-focused technologies'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'LHC Lane, IIT Delhi',
        category: 'exhibition',
        image: '/events/innoverse.avif',
        eventType: 'showcase',
        customButtons: [
            { text: 'Apply', url: 'https://docs.google.com/forms/d/e/1FAIpQLScm7QP3Lx3rheWpmZdAvYqv5HCkL7t6O4SWyj0xfaoVEFTzrg/viewform', type: 'primary' },
            { text: 'Register as Audience', action: 'register', type: 'secondary' }
        ]
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
        location: 'Wind Tunnel Lane, IIT Delhi',
        category: 'exhibition',
        image: '/events/autospark.avif',
        eventType: 'showcase',
        customButtons: [
            { text: 'Apply', url: 'https://docs.google.com/forms/d/e/1FAIpQLScZCJTPgVV65htz-cBQfSzNh9p92L-YU1Jdi2C7G9HHWkoing/viewform?usp=publish-editor', type: 'primary' },
            { text: 'Register as Audience', action: 'register', type: 'secondary' }
        ]
    },

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
        eventType: 'showcase',
        customButtons: [
            { text: 'Apply', url: 'https://docs.google.com/forms/d/e/1FAIpQLScQ35mQOSYzwUWR3N4I7ASMgUIzzHvY9HwVDrpdCXMM-YlT5Q/viewform', type: 'primary' },
            { text: 'Register as Audience', action: 'register', type: 'secondary' }
        ]
    },
    {
        ...toMain(sharedEvents.startupClinic, 'startup-clinic', 'Feb 1, 2026', 'LHC Foyer', false, 'main'),
        linkedFormId: '257a172b-1f19-45c6-800f-b851b722bbd7'
    },
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
        date: 'Jan 30 - Feb 1, 2026',
        location: 'Senate Hall',
        category: 'networking',
        image: '/events/Policysphere.avif',
        eventType: 'main',
    },
    {
        id: 'colab',
        title: 'CoLab – Co-Founder Catalyst',
        description: "CoLab is a dedicated platform that helps entrepreneurs connect with potential co-founders through a structured, thoughtful matchmaking format. It brings together driven builders with complementary skills, aligned intent, and shared ambition, while also providing access to mentorship and ecosystem support to help ideas grow into real ventures. If you want a co-founder who truly matches your vision, CoLab is where you'll find them.",
        whyJoin: [
            'Meet serious, like-minded entrepreneurs',
            'Discover co-founders with complementary strengths',
            'Build meaningful, long-term collaborations',
            'Access mentorship and ecosystem support',
            'Form strong teams that can truly scale'
        ],
        date: 'Jan 17, 18, 31 - Feb 1, 2026',
        location: 'LH 121, IIT Delhi',
        category: 'networking',
        image: '/events/Co-lab.avif',
        eventType: 'main',
        customButtons: [
            { text: 'Apply', url: 'https://forms.gle/x96pktsTHEYcrKyLA', type: 'primary' }
        ]
    },
    {
        id: 'startup-debate',
        title: 'Startup Debate | StartUp the Debate 4.0',
        description: "StartUp the Debate 4.0 is an intellectually stimulating debate competition organized by BECon’26 in collaboration with DebSoc IIT Delhi. The event challenges participants to critically analyze contemporary startup and business issues, articulate structured arguments, and propose thoughtful solutions in a conventional debate format.",
        whyJoin: [
            'Sharpen critical thinking and structured argumentation skills',
            'Engage with contemporary startup and business challenges',
            'Compete in a high-quality intellectual environment',
            'Collaborate with DebSoc IIT Delhi and BECon’26',
            'Gain recognition for analytical and communication excellence'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'LHC Classrooms',
        category: 'competition',
        image: '/events/startupdebate.avif',
        eventType: 'strategy',
        customButtons: [
            { text: 'Apply', url: 'https://unstop.com/p/startup-the-debate-40-iit-delhi-1615531', type: 'primary' }
        ]
    },
    {
        id: 'biz-e',
        title: 'Biz-E 4.0 | Beyond the Seen',
        description: "Biz-E 4.0: Beyond the Seen is a high-energy SciBizTech quiz competition at BECon’26, hosted by IIT Delhi. The event blends science, business, and technology into a fast-paced quizzing experience designed to test knowledge, strategy, and presence of mind.",
        whyJoin: [
            'Test knowledge across science, business, and technology',
            'Experience competitive quizzing in a high-pressure format',
            'Compete against sharp minds from across institutions',
            'Enhance strategic thinking and decision-making',
            'Win recognition in a flagship BECon quiz event'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'LHC Classrooms',
        category: 'competition',
        image: '/events/biz.avif',
        eventType: 'strategy',
    },
    {
        id: 'purpose-to-profit',
        title: 'Purpose to Profit | Enactus IIT Delhi',
        description: "Purpose to Profit is an inter-college competition organized by Enactus IIT Delhi, focused on transforming socially impactful ideas into scalable business solutions. Teams work on the theme ‘Scaling India’s Superfood from Local Wetlands to Global Retail’, modernizing the Makhana (Fox Nut) industry for sustainable impact.",
        whyJoin: [
            'Work on real-world social and environmental challenges',
            'Learn to convert impact-driven ideas into scalable businesses',
            'Collaborate in interdisciplinary teams',
            'Gain exposure to social entrepreneurship frameworks',
            'Compete under a nationally relevant theme'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'LHC Classrooms',
        category: 'competition',
        image: '/events/purposetoprofit.avif',
        eventType: 'strategy',
    },
    {
        id: 'ipl-auction',
        title: 'IPL Auction Simulation',
        description: "The IPL Auction Simulation is a strategy-based event where participants simulate a real IPL auction. Teams bid on cricket players using a fixed budget to build the strongest possible team, balancing performance, value, and constraints.",
        whyJoin: [
            'Experience real-world auction dynamics',
            'Apply strategy, analytics, and budget optimization',
            'Compete in a fun yet decision-intensive environment',
            'Test team-building and valuation skills',
            'Engage with sports-business intersections'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'LHC Classrooms',
        category: 'competition',
        image: '/events/iplauction.avif',
        eventType: 'strategy',
    },
    {
        id: 'midas-touch',
        title: 'Private Equity | Midas Touch',
        description: "Midas Touch is a Private Equity and Venture Capital themed competition introducing participants to venture investing through an expert-led session. Teams build and justify portfolio strategies, with finalists evaluated by a jury of VCs on investment rationale and presentation quality.",
        whyJoin: [
            'Learn PE and VC fundamentals from experienced investors',
            'Practice portfolio construction and investment strategy',
            'Receive feedback from a professional VC jury',
            'Develop financial and analytical thinking',
            'Present to and network with industry professionals'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'LHC Classrooms',
        category: 'competition',
        image: '/events/midastouch.avif',
        eventType: 'strategy',
    },
    {
        id: 'tdcc',
        title: 'TDCC | Startup Simulation',
        description: "TDCC is a two-day startup simulation competition where participants step into the role of CEOs of fictional startups. Teams make real-time decisions across product development, market analysis, fundraising, and crisis management.",
        whyJoin: [
            'Experience end-to-end startup decision-making',
            'Understand trade-offs in product, market, and funding',
            'Develop leadership and crisis-management skills',
            'Compete in a fast-paced simulation environment',
            'Learn practical startup execution dynamics'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'LHC Classrooms',
        category: 'competition',
        image: '/events/twodayceo.avif',
        eventType: 'strategy',
    },
    {
        id: 'startup-auction',
        title: 'Startup Auction',
        description: "The Startup Auction is a simulation-based competition where participants bid on a curated set of existing startups using a fixed budget. The winning team is the one whose selected portfolio demonstrates the highest projected growth.",
        whyJoin: [
            'Learn startup evaluation and growth assessment',
            'Practice capital allocation and portfolio strategy',
            'Understand key drivers of startup scalability',
            'Compete in an investor-style simulation',
            'Sharpen analytical and forecasting skills'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'LHC Classrooms',
        category: 'competition',
        image: '/events/startupauction.avif',
        eventType: 'strategy',
    },
    {
        id: 'reel-the-deal',
        title: 'Reel the Deal',
        description: "Reel the Deal is an online creator–brand deal-making challenge by BECon, IIT Delhi, designed to bridge the gap between college creators and real startups. Participants work on authentic marketing briefs, creating impactful reels for emerging brands, and get evaluated directly by founders and brand leaders. Powered by Grifi and featuring startup partners like Coding Ninjas, Gimi Michi, and Dopamine Store, the challenge offers real exposure, hands-on marketing experience, and a chance to stand out in the creator economy.",
        whyJoin: [
            "Create reels based on real marketing briefs from live startups",
            "Get evaluated by startup founders and brand leaders",
            "Gain real-world exposure in the creator and marketing ecosystem",
            "Build a strong portfolio with practical brand collaborations",
            "Compete for a ₹25,000 prize pool"
        ],
        date: 'Jan 21 - Jan 31, 2026',
        location: 'Online | Unstop',
        category: 'competition',
        image: '/reel_deal.avif',
        eventType: 'strategy',
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
        eventType: 'main',
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
        eventType: 'main',
    },

    {
        id: 'incubator-summit',
        title: 'Incubator Summit',
        description: "The Incubator Summit at BECon is a curated, outcome-driven platform that brings together top incubators and accelerators from across India with high-potential startups. Designed to eliminate friction in the startup–incubator discovery process, the summit enables founders to pitch, connect, and network directly with decision-makers—quickly, efficiently, and at scale. It compresses months of outreach and follow-ups into focused, high-signal interactions that move startups forward.",
        whyJoin: [
            'Fastest access to leading incubators and accelerators in India',
            'Direct pitching to program heads and investment teams—no cold outreach',
            'High-quality networking with ecosystem leaders who matter',
            'Clear next steps toward incubation, acceleration, pilots, and funding',
            'Founder-first format focused on real outcomes, not just discussions'
        ],
        date: 'Jan 30 - Feb 1, 2026',
        location: 'Red Square, IIT Delhi',
        category: 'networking',
        image: '/events/incubator.avif',
        eventType: 'main',
        customButtons: [
            { text: 'Apply as Startup', url: 'https://becon.edciitd.com/forms/424993b4-3e6b-49ce-8228-e6caa479ae2a', type: 'primary' },
        ]
    },
    {
        id: 'creators-conclave',
        title: 'Creators Conclave',
        description: "The Creators Conclave at BECon is a global gathering of top creators, influencers, and digital leaders from India and around the world. The summit serves as a high-energy platform for insightful discussions, keynote sessions, and panel conversations on content creation, personal branding, influence at scale, and the evolving creator economy. Designed to be highly interactive, it enables influencers to engage directly with the audience, share real-world experiences, and build meaningful connections—while also celebrating excellence through awards across multiple competitions and categories.",
        whyJoin: [
            'Learn directly from leading global and Indian influencers through talks and sessions',
            'Network one-on-one with creators, industry leaders, and fellow aspirants',
            'Gain insights into content strategy, growth, monetization, and brand building',
            'Engage and interact—Q&A, discussions, and audience-driven conversations',
            'Celebrate impact and creativity through awards recognizing outstanding talent and innovation'
        ],
        date: 'Jan 31 - Feb 1, 2026',
        location: 'LH 121, IIT Delhi',
        category: 'keynote',
        image: '/events/influencer.avif',
        eventType: 'main',
        customButtons: [
            { text: 'Register as Audience', action: 'register', type: 'primary' }
        ]
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
                        <span>
                            {new Date(event.date).toString() !== 'Invalid Date' && !isNaN(Date.parse(event.date)) && event.date.includes('T')
                                ? new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                                : event.date}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-blue-400" />
                        <span className="truncate max-w-[150px]">{event.location}</span>
                    </div>
                </div>

                {event.whyJoin && event.whyJoin.length > 0 && (
                    <div className="space-y-2 mb-6">
                        {event.whyJoin.slice(0, 2).map((reason, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                                <div className="w-1 h-1 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                                <span className="line-clamp-1">{reason}</span>
                            </div>
                        ))}
                    </div>
                )}

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {(() => {
                        const plainText = stripHtml(event.description);
                        return plainText.length > 100 ? `${plainText.substring(0, 100)}...` : plainText;
                    })()}
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
    const [activeFilter, setActiveFilter] = useState<EventType | null>(null);
    const { user } = useAuth();
    const { isRegistered, registerForEvent, markAsRegistered, cancelRegistration, registering, userPass, fetchRegistrations } = useEventRegistration();
    const [searchParams] = useSearchParams();

    // Dynamic Events State
    const [feedbackMessage, setFeedbackMessage] = useState<{ text: string, type: 'success' | 'error' | 'info', eventId?: string } | null>(null);

    // Event registration info (Internal & External Links)
    // Note: 'unstopEvents' handles all external links (Google Forms, Unstop, etc.)
    const unstopEvents: Record<string, string> = {
        'moonshot-main': 'https://becon.edciitd.com/forms/6934558c6b959ada62127360',
        'blueprint': 'https://becon.edciitd.com/forms/6932c9fab6b260b21594aaad',
        'startup-clinic': 'https://becon.edciitd.com/forms/6939cf5892c07ad44e06e259',
        // New External Links
        'colab': 'https://docs.google.com/forms/d/e/1FAIpQLSe1HoV9eEnE1E_2Rd21i8tCZC9cCu0QeaXT6Yka_-qNlvjYCQ/viewform?usp=publish-editor',
        'startup-debate': 'https://unstop.com/competitions/startup-the-debate-40-iit-delhi-1615531',
        'biz-e': 'https://unstop.com/quiz/biz-e-quiz-40-iit-delhi-1617021',
        'purpose-to-profit': 'https://unstop.com/competitions/purpose-to-profit-enactus-iit-delhi-1616481',
        'ipl-auction': 'https://unstop.com/competitions/ipl-auction-iit-delhi-1612805',
        'midas-touch': 'https://unstop.com/competitions/midas-touch-iit-delhi-1612275',
        'tdcc': 'https://unstop.com/o/ayeTALp?utm_medium=Share&utm_source=edciit4317&utm_campaign=Competitions',
        'startup-auction': 'https://unstop.com/competitions/startup-auction-20-iit-delhi-1615579',
        'reel-the-deal': 'https://unstop.com/competitions/reel-the-deal-iit-delhi-1621694',
    };

    // Special Event States
    const closedEvents = new Set([
        'moonshot-regional',
        'startup-clinic-regional',
        'e-raksha-hackathon',
        'startup-clinic-main'
    ]);

    const inviteOnlyEvents = new Set(['policysphere']);
    const noRegistrationEvents = new Set(['bootcamp', 'workshops']);
    const iitdOnlyEvents = new Set(['grand-moonshot']);


    // Dynamic Events State
    const [dynamicEvents, setDynamicEvents] = useState<EventCard[]>([]);
    const [loadingDynamic, setLoadingDynamic] = useState(true);
    const [formPopup, setFormPopup] = useState<{
        isOpen: boolean;
        eventId: string;
        formId: string;
        title: string;
        isDynamic?: boolean;
    }>({
        isOpen: false,
        eventId: '',
        formId: '',
        title: ''
    });

    // Combined Events
    const allEvents = [...eventsData, ...dynamicEvents];

    // Fetch Dynamic Events
    React.useEffect(() => {
        const fetchDynamicEvents = async () => {
            try {
                const res = await apiRequest('/api/events/public');
                if (res.events) {
                    const mapped: EventCard[] = res.events.map((e: any) => ({
                        id: e.id,
                        title: e.name,
                        description: e.description || e.name,
                        date: e.date,
                        time: new Date(e.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        location: e.location || 'TBA',
                        category: mapCategory(e.type), // Map backend type to frontend category
                        eventType: mapEventType(e.type),   // Map backend type to specific event type
                        image: e.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
                        isRegional: false,
                        linkedFormId: e.linkedFormId,
                        formFields: e.formFields,
                        minPassLevel: e.minPassLevel,
                        // isDynamic: true // Removed to use unified registration flow
                    })); setDynamicEvents(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch dynamic events", err);
            } finally {
                setLoadingDynamic(false);
            }
        };

        fetchDynamicEvents();
    }, []);

    const mapCategory = (type: string): EventCard['category'] => {
        const mapping: Record<string, EventCard['category']> = {
            'hackathon': 'hackathon',
            'talk': 'keynote',
            'workshop': 'workshop',
            'competition': 'competition',
            'networking': 'networking',
            'other': 'exhibition',
            'sessions': 'workshop' // Map sessions to workshop category
        };
        return mapping[type] || 'keynote';
    };

    const mapEventType = (type: string): EventType => {
        if (type === 'workshop') return 'sessions'; // Legacy mapping
        if (['strategy', 'main', 'showcase', 'sessions'].includes(type)) return type as EventType;
        return 'main';
    };

    const handleRegister = async (eventId: string, formData?: any) => {
        setFeedbackMessage(null); // Clear previous messages

        if (!user) {
            toast.error('Please login to register for events');
            setFeedbackMessage({
                type: 'error',
                text: 'Please login to register for events'
            });
            return;
        }

        if (unstopEvents[eventId]) {
            window.open(unstopEvents[eventId], '_blank');
            toast.success('Opening event registration page...');
            setFeedbackMessage({ eventId, type: 'success', text: 'Opened in new tab!' });
        } else {
            const result = await registerForEvent(eventId, { formData });
            if (result && typeof result === 'object') {
                setFeedbackMessage({
                    eventId,
                    type: result.success ? 'success' : result.type === 'already_registered' ? 'info' : 'error',
                    text: result.message || 'Something went wrong'
                });
            }
        }

        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            setFeedbackMessage(null);
        }, 3000);
    };

    const handleAction = async (event: EventCard) => {
        // 1. Pass Check (Shared Logic)
        // 1. Pass Check (Shared Logic)
        const checkPass = async () => {
            // Strict check for minPassLevel events
            if (event.minPassLevel && !userPass) {
                toast.error(`This event requires a ${event.minPassLevel.toUpperCase()} Pass.`);
                return false;
            }

            if (!userPass) return true; // Let them try (for legacy open events)

            // Dynamic Pass Check
            if (event.minPassLevel) {
                const levels = ['silver', 'gold', 'platinum', 'priority', 'iitd_student'];

                // Normalize: "GOLD PASS" -> "gold"
                let normalizedUserPass = userPass.toLowerCase().replace(/ pass$/, '').trim();
                // Handle "iit delhi student pass" variation if any, or just standard mapping
                if (normalizedUserPass.includes('student')) normalizedUserPass = 'iitd_student';

                const userLevelIndex = levels.indexOf(normalizedUserPass);

                // map 'iitd_student' to highest level effectively for now, or treat same as platinum
                const effectiveUserLevelIndex = normalizedUserPass === 'iitd_student' ? 3 : userLevelIndex;

                const reqLevelIndex = levels.indexOf(event.minPassLevel.toLowerCase());

                if (effectiveUserLevelIndex < reqLevelIndex) {
                    toast.error(`This event requires a ${event.minPassLevel.toUpperCase()} Pass.`);
                    return false;
                }
                return true;
            }

            const { isEventAllowed } = await import('../constants/passes');
            if (!isEventAllowed(userPass, event.id)) {
                toast.error(`Your ${userPass.toUpperCase()} Pass does not cover this event.`);
                return false;
            }
            return true;
        };

        if (!(await checkPass())) return;

        if (event.linkedFormId) {
            setFormPopup({
                isOpen: true,
                eventId: event.id,
                formId: event.linkedFormId,
                title: event.title,
                isDynamic: event.isDynamic
            });
        } else {
            handleRegister(event.id, event.isDynamic);
        }
    };

    // Clean up effects


    React.useEffect(() => {
        const eventId = searchParams.get('event');
        if (eventId) {
            // Find the event in eventsData
            const event = eventsData.find(e => e.id === eventId);
            if (event) {
                setSelectedEvent(event);
            }
        }
    }, [searchParams]);

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
                                        loading="lazy"
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
                                    <span className="text-white text-[6px] md:text-sm font-semibold uppercase tracking-wider">
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
                                {/* Interstitial Text Block - Inside Dropdown */}
                                <div className="mb-16 mt-8 px-4 text-left">
                                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl mb-8">
                                        Regionals carry BECon beyond IIT Delhi into key startup hubs across the country. Bringing together <span className="text-white font-bold">Moonshot, Blueprint, and the Start-Up Clinic</span> under one umbrella, they create powerful city-level ecosystems where founders can pitch, learn, connect, and grow with real support.
                                    </p>

                                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                                        If innovation needs reach,<br />
                                        <span className="text-gray-500">Regionals make sure it gets there.</span>
                                    </h2>
                                </div>

                                {/* Section Title */}
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white">Events</h2>
                                </div>

                                {/* Regional Events - Horizontal Slider on Mobile, Accordion on Desktop */}
                                <div className="flex gap-2 md:gap-2 h-[350px] md:h-[550px] overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-hide pb-4 md:pb-0">
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
                                                onMouseEnter={() => window.innerWidth >= 768 && setExpandedRegionalId(event!.id)}
                                                onMouseLeave={() => window.innerWidth >= 768 && setExpandedRegionalId(null)}
                                                onClick={() => window.innerWidth < 768 && setExpandedRegionalId(isSelected ? null : event!.id)}
                                                className="relative cursor-pointer overflow-hidden rounded-xl border border-purple-500/30 min-w-[280px] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink"
                                            >
                                                {/* Background - Image for collapsed, Purple gradient for expanded */}
                                                <div className="absolute inset-0">
                                                    {/* Image Background (visible when NOT selected) */}
                                                    <div className={`absolute inset-0 transition-opacity duration-500 ${isSelected ? 'opacity-0' : 'opacity-100'}`}>
                                                        <img
                                                            src={event!.image}
                                                            alt={event!.title}
                                                            loading="lazy"
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
                                                        {stripHtml(event!.description)}
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
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // Map regional IDs to their main event counterparts
                                                                const registrationId = event!.id === 'startup-clinic-regional' ? 'startup-clinic' :
                                                                    event!.id === 'moonshot-regional' ? 'moonshot-main' :
                                                                        event!.id === 'blueprint-regional' ? 'blueprint' :
                                                                            event!.id;
                                                                handleRegister(registrationId);
                                                            }}
                                                            className="w-full md:w-auto px-8 py-3 rounded-full bg-yellow-500 text-black font-bold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-500/25"
                                                        >
                                                            Register Now
                                                        </button>
                                                        {event!.id.includes('startup-clinic') && (
                                                            <p className="text-yellow-400/90 text-[10px] md:text-xs font-medium mt-2 text-center leading-tight">
                                                                *Limited Seats, Buy Gold Pass or above for Guaranteed Entry.
                                                            </p>
                                                        )}
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
                    <span className="text-lg text-gray-300 uppercase tracking-widest">
                        {activeFilter === 'strategy' ? 'Strategy Competitions' :
                            activeFilter === 'main' ? 'Main Events' :
                                activeFilter === 'showcase' ? 'Showcase & Exhibitions' :
                                    activeFilter === 'sessions' ? 'Sessions & Workshops' :
                                        'All Events'}
                    </span>
                </motion.div>

                {/* Filter Tabs - Horizontal scroll */}
                <div className="sticky top-20 z-40 bg-[#05020a]/90 backdrop-blur-md py-3 -mx-4 px-4 mb-8 md:static md:bg-transparent md:backdrop-blur-none md:p-0 md:m-0 md:mb-12">
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide md:pb-0">
                        <button
                            onClick={() => setActiveFilter(null)}
                            className={`shrink-0 px-8 py-3 rounded-full text-base font-bold transition-all border ${activeFilter === null
                                ? 'bg-white text-black border-white'
                                : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
                                }`}
                        >
                            All Events
                        </button>
                        <button
                            onClick={() => setActiveFilter('strategy')}
                            className={`shrink-0 px-8 py-3 rounded-full text-base font-bold transition-all border ${activeFilter === 'strategy'
                                ? 'bg-yellow-500 text-black border-yellow-500'
                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20'
                                }`}
                        >
                            Strategy Competitions
                        </button>
                        <button
                            onClick={() => setActiveFilter('main')}
                            className={`shrink-0 px-8 py-3 rounded-full text-base font-bold transition-all border ${activeFilter === 'main'
                                ? 'bg-purple-500 text-white border-purple-500'
                                : 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20'
                                }`}
                        >
                            Main Events
                        </button>
                        <button
                            onClick={() => setActiveFilter('showcase')}
                            className={`shrink-0 px-8 py-3 rounded-full text-base font-bold transition-all border ${activeFilter === 'showcase'
                                ? 'bg-cyan-500 text-black border-cyan-500'
                                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20'
                                }`}
                        >
                            Showcase & Exhibitions
                        </button>
                        <button
                            onClick={() => setActiveFilter('sessions')}
                            className={`shrink-0 px-8 py-3 rounded-full text-base font-bold transition-all border ${activeFilter === 'sessions'
                                ? 'bg-pink-500 text-white border-pink-500'
                                : 'bg-pink-500/10 text-pink-400 border-pink-500/20 hover:bg-pink-500/20'
                                }`}
                        >
                            Sessions & Workshops
                        </button>
                    </div>
                </div>


                {/* Events Grid */}
                {/* Events List - Alternating Layout */}
                <div className="space-y-4">
                    {isLoading || loadingDynamic ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <SkeletonMainCard key={i} />
                        ))
                    ) : (
                        allEvents
                            .filter(event => !activeFilter || event.eventType === activeFilter)
                            .map((event, i) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    onClick={() => setSelectedEvent(event)}
                                    className="cursor-pointer group relative bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"

                                >
                                    <div className="space-y-3 flex-1">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl line-clamp-2">
                                            {stripHtml(event.description)}
                                        </p>
                                    </div>

                                    <div className="shrink-0 relative flex flex-col items-center">
                                        {/* Feedback Message Bubble for List Item */}
                                        <AnimatePresence>
                                            {feedbackMessage && feedbackMessage.eventId === event.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                                    className={`absolute bottom-full mb-4 px-4 py-2 rounded-lg border backdrop-blur-md shadow-xl z-50 w-max max-w-[200px] text-center
                                                    ${feedbackMessage.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-300' :
                                                            feedbackMessage.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-300' :
                                                                'bg-blue-500/10 border-blue-500/30 text-blue-300'}`}
                                                >
                                                    <div className="font-bold text-xs leading-relaxed">
                                                        {feedbackMessage.text}
                                                    </div>
                                                    {/* Arrow */}
                                                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 border-r border-b 
                                                    ${feedbackMessage.type === 'success' ? 'bg-[#0a0514] border-green-500/30' :
                                                            feedbackMessage.type === 'error' ? 'bg-[#0a0514] border-red-500/30' :
                                                                'bg-[#0a0514] border-blue-500/30'}`}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="flex flex-col gap-3 items-center">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedEvent(event);
                                                }}
                                                className="inline-flex items-center gap-2 text-white font-semibold text-sm md:text-base border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all group-hover:border-white"
                                            >
                                                Know More
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )))}
                </div>

            </div >


            {/* Event Details Modal - Rendered via Portal */}
            {
                createPortal(
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
                                            <div className="w-full relative flex-shrink-0 bg-[#05020a]">
                                                <img
                                                    src={selectedEvent.image}
                                                    alt={selectedEvent.title}
                                                    loading="lazy"
                                                    className="w-full h-auto block"
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
                                                        <span className="text-lg">
                                                            {new Date(selectedEvent.date).toString() !== 'Invalid Date' && !isNaN(Date.parse(selectedEvent.date))
                                                                ? new Date(selectedEvent.date).toLocaleDateString(undefined, {
                                                                    weekday: 'long',
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })
                                                                : selectedEvent.date}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-gray-300">
                                                        <MapPin className="text-blue-400" />
                                                        <span className="text-lg">{selectedEvent.location}</span>
                                                    </div>
                                                </div>

                                                <div
                                                    className="prose prose-invert prose-lg max-w-none text-gray-400 mb-6"
                                                    dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                                                />

                                                {selectedEvent.whyJoin && selectedEvent.whyJoin.length > 0 && (
                                                    <div className="mb-10">
                                                        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                                            <Sparkles size={20} className="text-purple-400" />
                                                            {selectedEvent.eventType === 'sessions' ? 'Key Themes Covered' :
                                                                selectedEvent.category === 'workshop' ? "What You'll Learn" :
                                                                    selectedEvent.category === 'competition' ? 'Why Compete?' :
                                                                        selectedEvent.category === 'hackathon' ? 'Why Participate?' :
                                                                            selectedEvent.category === 'exhibition' ? 'Highlights' :
                                                                                'Why Join?'}
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


                                                    {/* Coming Soon - Registration temporarily disabled */}
                                                    {/* Registration Button */}
                                                    {/* Registration Section with Inline Feedback */}
                                                    <div className="flex-1 md:flex-none relative flex flex-col items-center">

                                                        {/* Popup Feedback Message */}
                                                        <AnimatePresence>
                                                            {feedbackMessage && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                                                    className={`absolute bottom-full mb-4 px-6 py-3 rounded-xl border backdrop-blur-md shadow-2xl z-50 w-max max-w-[320px] text-center
                                                                    ${feedbackMessage.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-300' :
                                                                            feedbackMessage.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-300' :
                                                                                'bg-blue-500/10 border-blue-500/30 text-blue-300'}`}
                                                                >
                                                                    <div className="font-bold text-sm leading-relaxed">
                                                                        {feedbackMessage.text}
                                                                    </div>
                                                                    {/* Arrow */}
                                                                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 border-r border-b 
                                                                    ${feedbackMessage.type === 'success' ? 'bg-[#0a0514] border-green-500/30' :
                                                                            feedbackMessage.type === 'error' ? 'bg-[#0a0514] border-red-500/30' :
                                                                                'bg-[#0a0514] border-blue-500/30'}`}
                                                                    />
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>

                                                        {selectedEvent.customButtons ? (
                                                            <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                                                                {selectedEvent.customButtons.map((btn, idx) => {
                                                                    const isReg = btn.action === 'register' && isRegistered(selectedEvent.id) && !unstopEvents[selectedEvent.id];

                                                                    return (
                                                                        <button
                                                                            key={idx}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                if (isReg) return;
                                                                                if (btn.url) {
                                                                                    window.open(btn.url, '_blank');
                                                                                } else if (btn.action === 'register') {
                                                                                    handleAction(selectedEvent);
                                                                                }
                                                                            }}
                                                                            className={`relative overflow-hidden group px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center transition-all duration-300 w-full md:w-auto
                                                                            ${isReg
                                                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default'
                                                                                    : btn.type === 'primary'
                                                                                        ? 'bg-white text-black hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]'
                                                                                        : 'bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50'
                                                                                }`}
                                                                        >
                                                                            {isReg ? (
                                                                                <>
                                                                                    <CheckCircle size={22} className="mr-2" />
                                                                                    Registered
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {btn.text}
                                                                                    {btn.url && <ExternalLink className="ml-2" size={18} />}
                                                                                </>
                                                                            )}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => {
                                                                    if (closedEvents.has(selectedEvent.id) || inviteOnlyEvents.has(selectedEvent.id) || (noRegistrationEvents.has(selectedEvent.id) && !selectedEvent.linkedFormId)) return;
                                                                    handleAction(selectedEvent);
                                                                }}
                                                                disabled={
                                                                    registering === selectedEvent.id ||
                                                                    isRegistered(selectedEvent.id) ||
                                                                    closedEvents.has(selectedEvent.id) ||
                                                                    inviteOnlyEvents.has(selectedEvent.id) ||
                                                                    noRegistrationEvents.has(selectedEvent.id)
                                                                }
                                                                className={`relative overflow-hidden group px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center transition-all duration-300 w-full md:w-auto
                                                            ${(isRegistered(selectedEvent.id) && !unstopEvents[selectedEvent.id]) // Only show green if registered internally, external links always clickable unless explicitly closed
                                                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20 cursor-default'
                                                                        : (closedEvents.has(selectedEvent.id) || inviteOnlyEvents.has(selectedEvent.id) || noRegistrationEvents.has(selectedEvent.id))
                                                                            ? 'bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed opacity-70'
                                                                            : 'bg-white text-black hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]'
                                                                    } ${registering === selectedEvent.id ? 'opacity-80 cursor-wait' : ''}`}
                                                            >
                                                                {registering === selectedEvent.id ? (
                                                                    <>
                                                                        <Loader2 className="animate-spin text-purple-600" size={22} />
                                                                        <span className="text-gray-600">Registering...</span>
                                                                    </>
                                                                ) : isRegistered(selectedEvent.id) && !unstopEvents[selectedEvent.id] ? (
                                                                    <>
                                                                        <CheckCircle size={22} />
                                                                        Registered
                                                                    </>
                                                                ) : closedEvents.has(selectedEvent.id) ? (
                                                                    <span className="relative text-center w-full">Registration Closed</span>
                                                                ) : inviteOnlyEvents.has(selectedEvent.id) ? (
                                                                    <span className="relative text-center w-full">Invite Only</span>
                                                                ) : noRegistrationEvents.has(selectedEvent.id) ? (
                                                                    <span className="relative text-center w-full">No Registration Required</span>
                                                                ) : (
                                                                    <>
                                                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                        <span className="relative text-center w-full">
                                                                            {unstopEvents[selectedEvent.id] ? 'Register Now' : 'Register Now'}
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </button>
                                                        )}
                                                        {/* IITD Only Warning */}
                                                        {iitdOnlyEvents.has(selectedEvent.id) && (
                                                            <p className="text-red-400 text-sm mt-3 font-semibold text-center">
                                                                * Only for IIT Delhi Students
                                                            </p>
                                                        )}

                                                        {selectedEvent.id.includes('startup-clinic') && (
                                                            <p className="text-yellow-400/90 text-sm font-medium mt-3 text-center leading-tight">
                                                                * Limited Seats, Buy Gold Pass or above for Guaranteed Entry.
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body
                )
            }

            {/* Floating Regional PASS CTA - Right Edge - Rendered via Portal */}
            {
                createPortal(
                    <a
                        href="https://becon.edciitd.com/forms/695bd50bd15c275150c07921"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed right-0 top-48 z-[9999] group cursor-pointer hidden md:block"
                    >
                        {/* Main card - slides out on hover */}
                        <motion.div
                            initial={{ x: 0 }}
                            whileHover={{ x: -10 }}
                            className="bg-black/90 backdrop-blur-md border-2 border-purple-500 rounded-l-xl overflow-hidden shadow-[0_0_20px_rgba(147,51,234,0.3)] group-hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-shadow duration-300"
                        >
                            <div className="flex items-center">
                                {/* Expanded content - shows on hover */}
                                <div className="w-0 group-hover:w-48 overflow-hidden transition-all duration-300 ease-out">
                                    <div className="px-4 py-4 whitespace-nowrap">
                                        <p className="text-purple-400 font-bold text-sm">Want to attend</p>
                                        <p className="text-white font-bold text-sm">Regionals as Audience?</p>
                                    </div>
                                </div>

                                {/* Always visible part */}
                                <div className="px-3 py-4 flex flex-col items-center gap-3">
                                    {/* Ticket icon */}
                                    <svg
                                        className="w-6 h-6 text-purple-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>

                                    {/* Vertical text */}
                                    <span
                                        className="text-white font-bold text-sm tracking-widest"
                                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                                    >
                                        REGIONAL PASS
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </a>,
                    document.body
                )
            }

            {/* Bottom spacer instead of side tabs */}
            <div className="mb-20" />

            <div className="relative z-50">
                <Footer />
            </div>
            {/* Event Form Popup */}
            {formPopup.isOpen && (
                <EventFormPopup
                    isOpen={formPopup.isOpen}
                    onClose={() => setFormPopup(prev => ({ ...prev, isOpen: false }))}
                    eventId={formPopup.eventId}
                    formId={formPopup.formId}
                    title={formPopup.title}
                    onSuccess={async (data, formId) => {
                        await handleRegister(formPopup.eventId, data);
                        setFormPopup(prev => ({ ...prev, isOpen: false }));
                        // fetchRegistrations(); // handleRegister already returns status, but we can refresh
                        toast.success("Successfully registered!");
                    }}
                />
            )}
        </div >
    );
};
