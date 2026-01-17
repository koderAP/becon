
export interface PassFeature {
    name: string;
    included: boolean;
}

export interface Pass {
    id: string;
    name: string;
    originalPrice: number;
    price: number | 'FREE';
    image: string;
    color: string;
    glow: string;
    features: PassFeature[];
    allowedEvents: string[]; // List of event IDs or categories allowed
}

export const PASS_CONFIG: Pass[] = [
    {
        id: 'silver',
        name: 'SILVER PASS',
        originalPrice: 99,
        price: 'FREE',
        image: '/passes/silver.png',
        color: 'text-gray-200',
        glow: 'group-hover:border-gray-400/50 group-hover:shadow-[0_0_30px_rgba(200,200,200,0.2)]',
        features: [
            { name: 'Startup Expo', included: true },
            { name: 'Tech Showcase', included: true },
            { name: 'Autospark', included: true },
            { name: 'LHC Speaker Sessions', included: true },
            { name: 'Dogra Speaker Sessions', included: true },
            { name: 'Onground Activities', included: true },
            { name: 'Seminar Speaker Sessions', included: false },
            { name: 'Moonshot Delhi', included: false },
            { name: 'Blueprint Finale', included: false },
            { name: 'Workshops', included: false },
            { name: 'Creator Conclave', included: false },
            { name: 'Incubator Summit', included: false },
            { name: 'Startup Clinic', included: false },
            { name: 'Policysphere', included: false },
        ],
        allowedEvents: ['startup-expo', 'tech-showcase', 'autospark', 'lhc-sessions', 'dogra-sessions', 'onground-activities']
    },
    {
        id: 'gold',
        name: 'GOLD PASS',
        originalPrice: 499,
        price: 199,
        image: '/passes/gold.png',
        color: 'text-yellow-400',
        glow: 'group-hover:border-yellow-500/50 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]',
        features: [
            { name: 'Startup Expo', included: true },
            { name: 'Tech Showcase', included: true },
            { name: 'Autospark', included: true },
            { name: 'LHC Speaker Sessions', included: true },
            { name: 'Dogra Speaker Sessions', included: true },
            { name: 'Onground Activities', included: true },
            { name: 'Seminar Speaker Sessions', included: true },
            { name: 'Moonshot Delhi', included: true },
            { name: 'Blueprint Finale', included: true },
            { name: 'Workshops', included: true },
            { name: 'Creator Conclave', included: false },
            { name: 'Incubator Summit', included: false },
            { name: 'Startup Clinic', included: false },
            { name: 'Policysphere', included: false },
        ],
        allowedEvents: ['startup-expo', 'tech-showcase', 'autospark', 'lhc-sessions', 'dogra-sessions', 'onground-activities', 'seminar-sessions', 'moonshot-delhi', 'blueprint-finale', 'workshops']
    },
    {
        id: 'platinum',
        name: 'PLATINUM PASS',
        originalPrice: 999,
        price: 399,
        image: '/passes/platinum.png',
        color: 'text-cyan-400',
        glow: 'group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]',
        features: [
            { name: 'Startup Expo', included: true },
            { name: 'Tech Showcase', included: true },
            { name: 'Autospark', included: true },
            { name: 'LHC Speaker Sessions', included: true },
            { name: 'Dogra Speaker Sessions', included: true },
            { name: 'Onground Activities', included: true },
            { name: 'Seminar Speaker Sessions', included: true },
            { name: 'Moonshot Delhi', included: true },
            { name: 'Blueprint Finale', included: true },
            { name: 'Workshops', included: true },
            { name: 'Creator Conclave', included: true },
            { name: 'Incubator Summit', included: true },
            { name: 'Startup Clinic', included: true },
            { name: 'Policysphere', included: false },
        ],
        allowedEvents: ['startup-expo', 'tech-showcase', 'autospark', 'lhc-sessions', 'dogra-sessions', 'onground-activities', 'seminar-sessions', 'moonshot-delhi', 'blueprint-finale', 'workshops', 'creator-conclave', 'incubator-summit', 'startup-clinic']
    },
    {
        id: 'iitd_student',
        name: 'IIT DELHI STUDENT PASS',
        originalPrice: 999,
        price: 'FREE',
        image: '/iitd_logo.avif',
        color: 'text-rose-400',
        glow: 'group-hover:border-rose-500/50 group-hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]',
        features: [
            { name: 'Startup Expo', included: true },
            { name: 'Tech Showcase', included: true },
            { name: 'Autospark', included: true },
            { name: 'LHC Speaker Sessions', included: true },
            { name: 'Dogra Speaker Sessions', included: true },
            { name: 'Onground Activities', included: true },
            { name: 'Seminar Speaker Sessions', included: true },
            { name: 'Moonshot Delhi', included: true },
            { name: 'Blueprint Finale', included: true },
            { name: 'Workshops', included: true },
            { name: 'Creator Conclave', included: true },
            { name: 'Incubator Summit', included: true },
            { name: 'Startup Clinic', included: true },
        ],
        allowedEvents: ['all_access']
    }
];

// Helper to check if event is allowed
export const isEventAllowed = (passId: string, eventId: string): boolean => {
    // Implement logic to map event IDs to pass levels
    // This is a placeholder logic based on the feature list names vs event IDs

    // Base events (Silver)
    const silverEvents = ['launchpad', 'innoverse', 'autospark', 'workshops', 'bootcamp'];

    // Gold additions
    const goldEvents = [
        ...silverEvents,
        // Panels (Dogra Hall)
        'panel-aerospace', 'panel-biotech', 'panel-spacetech', 'panel-ai', 'panel-semiconductor', 'panel-deeptech-vc', 'panel-iitd-effect',
        // Keynotes & Firesides
        'moonshot-main', 'grand-moonshot', 'blueprint', 'keynotes-panels',
        'fireside-veteran-leader', 'fireside-fintech', 'fireside-consumer-tech', 'fireside-entrepreneurial-trailblazer', 'fireside-marketplace-transformation', 'fireside-creative-visionary',
        'keynote-visionary-entrepreneur', 'keynote-leadership-talent', 'keynote-growth-brand', 'keynote-scaling-impact',
        // Competitions
        'startup-debate', 'biz-e', 'purpose-to-profit', 'ipl-auction', 'midas-touch', 'tdcc', 'startup-auction'
    ];

    // Platinum additions
    const platinumEvents = [...goldEvents, 'influencer-summit', 'incubator-summit', 'startup-clinic'];

    if (passId === 'platinum' || passId === 'iitd_student') return true; // Platinum & IITD Student get everything (except maybe invite-only like Policysphere?)
    if (passId === 'gold') return goldEvents.includes(eventId) || silverEvents.includes(eventId);
    if (passId === 'silver') return silverEvents.includes(eventId);

    return false;
};
