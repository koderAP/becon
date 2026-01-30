import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../../components/Footer';
import { PageHeader } from '../../components/PageHeader';

// --- Data Interfaces ---
interface EventItem {
    time: string;
    title: string;
    description?: string; // Optional subtitle/speakers
    speakers?: string[];
}

interface VenueSchedule {
    venue: string;
    events: EventItem[];
}

interface AllDayEvent {
    location: string;
    title: string;
}

interface DaySchedule {
    label: string;
    date: string;
    allDayEvents?: AllDayEvent[];
    sections: {
        type: 'grid' | 'full' | 'flex'; // grid = 2 cols, full = full width single col, flex = specific layouts
        venues?: VenueSchedule[];
        title?: string;
        customContent?: React.ReactNode;
    }[];
}

// --- Data ---
const scheduleData: DaySchedule[] = [
    {
        label: 'DAY 1',
        date: 'Saturday, 31 January 2026',
        allDayEvents: [
            { location: 'Wind T Lane', title: 'Auto Expo' },
            { location: 'Wind T Stones', title: 'Media Lounge' },
            { location: 'Biotech Lawn', title: 'Launchpad' },
            { location: 'Biotech Lawn', title: 'Startup Clinic' },
            { location: 'LH Lane', title: 'TechnoVerse' },
            { location: 'Academic Section Terrace', title: 'Incubator Summit' },
        ],
        sections: [
            {
                type: 'grid',
                venues: [
                    {
                        venue: 'Dogra Hall',
                        events: [
                            // { time: '11:00-11:45', title: 'Opening Session' },
                            { time: '12:00-12:45', title: 'Fireside Chat', description: 'with Anil Agarwal(Member CCI), Arvind Gupta(Co-founder, Digital India foundation) & Alok Kumar (UP-Ad. Chief Secretary)' },
                            { time: '13:00-13:45', title: 'Panel Discussion: Consumer Brand', description: '(Amit Khatri: Noise; Sameer Mahandru: IndoBeVs; Shalabh Gupta: Nuuk; Pankaj Vermani: Clovia)' },
                            { time: '14:00-14:45', title: 'Fireside Chat', description: 'with RKS bhadauria (former Chief of Air Staff, IAF) & Ravinder Singh (CIO vistara)' },
                            { time: '15:00-15:45', title: 'Fireside Chat', description: 'with Shallaz Nag (Founder: DotPe & PayU)' },
                            { time: '16:00-16:45', title: 'Shark tank panel', description: '(Shaily Mehrotra: Fixderma & Pratham Mittal: Masters\' Union)' },
                            { time: '17:00-18:15', title: 'Fireside Chat', description: 'with Tanya Sachdev (Chess International Master and Woman Grandmaster)' }
                        ]
                    },
                    {
                        venue: 'Seminar Hall',
                        events: [
                            { time: '11:00-11:45', title: 'Inauguration Ceremony' },
                            { time: '12:00-12:45', title: 'Panel Discussion: Drone Technology', description: '(Vivek Mishra: Raphe mPhibr; Dr. R. Shivaraman: Big Bang Boom Solutions; Sarita Ahlawat: Botlab Dynamics)' },
                            { time: '13:00-13:45', title: 'Fireside Chat', description: 'with Hitesh Oberoi(MD InfoEdge) & Kaushik Dutta (Chairman & Director Eternal)' },
                            { time: '14:00-14:45', title: 'Panel Discussion: Biotech & Pharma', description: '(Sanjay R Sharma: Zydus Life; Kuldeep Sharma: Agilent Technologies; Prabuddha Kundu: Premas Biotech; Rajesh Joshi: Wembrace Biopharma)' },
                            { time: '15:00-15:45', title: 'Fireside Chat', description: 'with Akash Saxena - CTO JioStar' },
                            { time: '16:00-16:45', title: 'Panel Discussion: The IITD Effect', description: '(Vikram Gupta: IvyCap; Alok Mittal: Indifi; Ruchira: Green Marble VC; Anant Vidur Puri: Bessemer Ventures)' },
                            { time: '17:00-17:45', title: 'Panel Discussion: Deeptech VCs', description: '(Saharsh Sharma: Chiratae; Anisha Singh: SHE Capital; Sunil Goyal: Yournest Venture)' }
                        ]
                    }
                ]
            },
            {
                type: 'full',
                venues: [
                    {
                        venue: 'OAT (Open Air Theatre)',
                        events: [
                            { time: '18:30 - 19:30', title: 'Fireside Chat', description: 'with Ashneer Grover' },
                            { time: '19:30 - 21:30', title: 'Burn Burn', description: '(Founder Roast Show by Madhur Virli, Kaustubh & Pankaj Vermani)' }
                        ]
                    }
                ]
            },
            {
                type: 'grid',
                venues: [
                    {
                        venue: 'Lecture Hall Complex (LHC)',
                        events: [
                            { time: '10:00 - 14:00', title: 'Moonshot', description: 'LH 114' },
                            { time: '11:00 - 17:00', title: 'Creators Conclave', description: 'LH 121' },
                            { time: '11:00 - 13:00\n 15:00 - 17:00', title: 'PolicySphere', description: 'LH 212' },
                            { time: '11:00 - 16:00', title: 'Blueprint Regionals', description: 'LH 413' },
                            { time: '14:00 - 18:00', title: 'Co founder Catalyst', description: 'LH 316' },
                            { time: '10:00 - 15:00', title: 'Startup Debate', description: 'LH 418' },
                            { time: '10:00 - 17:00', title: 'NPL Auction', description: 'LH 325' }
                        ]
                    },
                    {
                        venue: 'Lecture Hall Complex (LHC)',
                        events: [
                            { time: '10:00 - 17:00', title: 'Private Equity - Midas Touch', description: 'LH 108' },
                            { time: '10:00 - 17:00', title: 'Product Arena', description: 'LH 416' },
                            { time: '10:00 - 17:00', title: 'Two Day CEO Challenge', description: 'LH 410' },
                            { time: '11:00 - 12:00', title: 'Workshops (Google)', description: 'Scaling Indian Startups Globally - LH 308' },
                            { time: '15:00 - 17:00', title: 'Workshops (Open Source)', description: 'Open Source Hardware - LH 308' },
                            { time: '12:00 - 13:00', title: 'Workshops (Defense Tech)', description: 'Defense Tech - LH 517' }
                        ]
                    }
                ]
            },
            {
                type: 'full',
                venues: [
                    {
                        venue: 'SPECIAL EVENT: CONFLUENCE at R&I Park',
                        events: [
                            { time: '17:30 - 19:00', title: 'Pan-IIT Founder Meetup', description: '' },
                            { time: '19:00 - 21:00', title: 'Networking Dinner', description: '' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'DAY 2',
        date: 'Sunday, 1st February 2026',
        allDayEvents: [
            { location: 'Wind T Lane', title: 'Auto Spark' },
            { location: 'Wind T Lane', title: 'Media Lounge' },
            { location: 'Biotech Lawn', title: 'Launchpad' },
            { location: 'Biotech Lawn', title: 'Startup Clinic' },
            { location: 'LH Lane', title: 'TechnoVerse' },
            { location: 'Academic Section Terrace', title: 'Incubator Summit' },
        ],
        sections: [
            {
                type: 'grid',
                venues: [
                    {
                        venue: 'Dogra Hall',
                        events: [
                            { time: '11:00-11:45', title: 'Keynote Session', description: 'By Sanjeev Bikhchandani' },
                            { time: '12:00-12:45', title: 'Fireside Chat', description: 'with Urban Company(Raghav Chandra), Zeropearl(Bipin Shah) & Credgenix(Rishabh Goel)' },
                            { time: '13:00-13:45', title: 'Panel Discussion: AI Future', description: '(Ramprakash Ramamoorthy: Zoho; Jithendra Vepa: Observe.AI; Prince Kohli: Sauce Labs; Sharath Keshava Narayana: Sanas.AI)' },
                            { time: '15:00-15:45', title: 'Fireside Chat', description: 'with Shraddha Sharma (Your Story)' },
                            { time: '16:00-16:45', title: 'Fireside Chat', description: 'with Nitin Vijay (NV sir, Educator)' },
                            { time: '17:00-17:45', title: 'Keynote Session', description: 'By Ankur Warikoo' }
                        ]
                    },
                    {
                        venue: 'Seminar Hall',
                        events: [
                            { time: '12:00-12:45', title: 'Fireside Chat', description: 'with Anant Ahuja (Shahi Export)' },
                            { time: '13:00-13:45', title: 'Panel Discussion: Chips & Semiconductor', description: '(Chirag Gupta: AMD; Ranbir Singh: GeneSiC Semiconductor; Vishal Sipani: Micron India; Sanjay Gupta: L&T Semiconductor )' },
                            { time: '14:00-14:45', title: 'Panel Discussion: Smart Automotive', description: '' },
                            { time: '15:00-15:45', title: 'Fireside Chat', description: 'with Radhika Ghai: ShopClues; Tejinder Miglani: Incedo-IITD Angels; Nitin Jain: Of Business' },
                            { time: '16:00-16:45', title: 'Fireside Chat', description: 'with Nitin Agarwal, Co-Founder GlobalBees' },
                            { time: '17:00-17:45', title: 'Keynote Session', description: '' }
                        ]
                    }
                ]
            },
            {
                type: 'full',
                venues: [
                    {
                        venue: 'Grand Finale @ OAT',
                        events: [
                            { time: '18:00 - 19:00', title: 'Grand Moonshot', description: '' },
                            { time: '19:00 - 19:45', title: 'Convergence of Silicon Valley & Cinema', description: '(Actor Nikita Dutta)' },
                            { time: '20:00 - 20:30', title: 'Standup Comedy', description: '' },
                            { time: '20:45 - 21:30', title: 'Talk show by Tanmay Bhat', description: '' },
                        ]
                    }
                ]
            },
            {
                type: 'grid',
                venues: [
                    {
                        venue: 'Lecture Hall Complex (LHC)',
                        events: [
                            { time: '11:00 - 17:00', title: 'Blueprint Finals', description: 'LH 413.1-5 & LH 408' },
                            { time: '13:00 - 17:00', title: 'Co founder Catalyst', description: 'LH 316' },
                            { time: '11:00 - 13:00\n& 15:00- 17:00', title: 'PolicySphere', description: 'LH 212' },
                            { time: '10:00 - 15:00', title: 'Startup Auction', description: 'LH 310' },
                            { time: '15:00 - 17:00', title: 'Mad4AD', description: 'LH 121' },

                        ]
                    },
                    {
                        venue: 'Lecture Hall Complex (LHC)',
                        events: [
                            { time: '15:00 - 17:00', title: 'Workshop: Microsoft', description: 'Building Blocks of a Successful Tech Startup - LH 418' },
                            { time: '13:00 - 15:00', title: 'Vajiram', description: 'LH 108' },
                            { time: '11:00 - 12:00', title: 'Sukoon Health', description: 'LH 416' },
                            { time: '11:00 - 15:00', title: 'Biz-E 4.0', description: 'LH 114' },
                            { time: '10:00 - 16:00', title: 'Purpose to Profit', description: 'LH 408' },
                            { time: '10:00 - 17:00', title: 'Two Day CEO Challenge', description: 'LH 410' },
                        ]
                    }
                ]
            }
        ]
    }
];

// --- Components ---

const DayHeader = ({ label, date }: { label: string; date: string }) => (
    <div className="flex flex-col items-center justify-center mb-8 sm:mb-12">
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-wider mb-2">
            SCHEDULE : <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">{label}</span>
        </h2>
        <p className="text-lg sm:text-2xl text-purple-200 font-medium">{date}</p>
    </div>
);

const AllDayEvents = ({ events }: { events: AllDayEvent[] }) => (
    <div className="mb-12">
        <div className="bg-[#1a1033] py-3 px-6 rounded-t-2xl border-x border-t border-purple-500/30">
            <h3 className="text-xl font-bold text-white tracking-wide text-center">All Day Events (10:00 - 18:00)</h3>
        </div>
        <div className="bg-[#0a0a0a]/50 backdrop-blur-md rounded-b-2xl border border-purple-500/20 p-6">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {events.map((event, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-4 py-3 border border-white/5">
                        <div className="w-1.5 h-8 bg-purple-500 rounded-full" />
                        <div>
                            <p className="text-purple-300 text-xs font-bold uppercase tracking-wider mb-0.5">{event.location}</p>
                            <p className="text-white font-semibold">{event.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const VenueCard = ({ venue, events }: VenueSchedule) => (
    <div className="flex flex-col h-full">
        {/* Venue Header */}
        <div className="bg-[#1a1033] py-4 px-6 rounded-t-2xl border-x border-t border-purple-500/30 text-center min-h-[80px] flex items-center justify-center">
            <h3 className="text-xl font-bold text-white tracking-wide">{venue}</h3>
        </div>

        {/* Events List */}
        <div className="flex-1 bg-[#0a0a0a]/50 backdrop-blur-md rounded-b-2xl border border-purple-500/20 p-4 sm:p-6 space-y-6">
            {events.map((event, idx) => (
                <div key={idx} className="flex flex-row gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="w-24 sm:w-32 shrink-0 pt-1">
                        <div className="text-purple-300 font-mono text-xs sm:text-sm font-bold bg-purple-500/10 px-2 py-1.5 rounded inline-flex flex-col items-center justify-center text-center w-full min-h-[30px]">
                            {event.time.split('\n').map((line, i) => (
                                <span key={i} className={i > 0 ? "mt-1 pt-1 border-t border-purple-500/20 w-full block" : "block"}>
                                    {line}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-white font-bold text-base sm:text-lg leading-tight mb-1">{event.title}</h4>
                        {event.description && (
                            <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ... (imports remain the same)

export const Schedule: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="min-h-screen bg-[#05020a] text-white">
            <PageHeader
                title="SCHEDULE"
                badge="Detailed Timeline"
                description="Join us for 2 days of innovation, entrepreneurship, and inspiration"
            />

            <div className="relative z-20 px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16">

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {scheduleData.map((day, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`
                                relative px-8 py-4 rounded-2xl transition-all duration-300 group
                                ${activeTab === index
                                    ? 'bg-purple-600/20 border-purple-500/50'
                                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}
                                border backdrop-blur-sm
                            `}
                        >
                            <div className="flex flex-col items-center">
                                <span className={`
                                    text-2xl font-black tracking-wider mb-1
                                    ${activeTab === index ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}
                                `}>
                                    {day.label}
                                </span>
                                <span className={`
                                    text-sm font-medium
                                    ${activeTab === index ? 'text-purple-300' : 'text-gray-500 group-hover:text-gray-400'}
                                `}>
                                    {day.date}
                                </span>
                            </div>

                            {activeTab === index && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-2xl ring-2 ring-purple-500 ring-offset-2 ring-offset-[#05020a]"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="space-y-8 min-h-[600px]">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Note: We removed the DayHeader here since the tabs act as the header, 
                            but if you want to reiterate it, you can uncomment below. 
                            For now, let's keep it clean as the user selects "Day 0 - 30 Jan" directly. */}

                        {/* <DayHeader label={scheduleData[activeTab].label} date={scheduleData[activeTab].date} /> */}

                        {scheduleData[activeTab].allDayEvents && scheduleData[activeTab].allDayEvents!.length > 0 && (
                            <AllDayEvents events={scheduleData[activeTab].allDayEvents!} />
                        )}

                        <div className="space-y-12">
                            {scheduleData[activeTab].sections.map((section, secIndex) => (
                                <div key={secIndex}>
                                    {section.type === 'grid' && section.venues && (
                                        (() => {
                                            const hasDuplicates = new Set(section.venues.map(v => v.venue)).size !== section.venues.length;

                                            if (!hasDuplicates) {
                                                return (
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                        {section.venues.map((venue, vIndex) => (
                                                            <VenueCard key={vIndex} {...venue} />
                                                        ))}
                                                    </div>
                                                );
                                            }

                                            // Merge duplicates for mobile view
                                            const mergedVenues = section.venues.reduce<VenueSchedule[]>((acc, curr) => {
                                                const existing = acc.find(v => v.venue === curr.venue);
                                                if (existing) {
                                                    existing.events = [...existing.events, ...curr.events];
                                                } else {
                                                    acc.push({ ...curr, events: [...curr.events] });
                                                }
                                                return acc;
                                            }, []);

                                            return (
                                                <>
                                                    {/* Desktop View: Keep original split */}
                                                    <div className="hidden lg:grid lg:grid-cols-2 gap-8">
                                                        {section.venues.map((venue, vIndex) => (
                                                            <VenueCard key={vIndex} {...venue} />
                                                        ))}
                                                    </div>

                                                    {/* Mobile View: Merged */}
                                                    <div className="flex flex-col gap-8 lg:hidden">
                                                        {mergedVenues.map((venue, vIndex) => (
                                                            <VenueCard key={vIndex} {...venue} />
                                                        ))}
                                                    </div>
                                                </>
                                            );
                                        })()
                                    )}
                                    {section.type === 'full' && section.venues && (
                                        <div className="max-w-4xl mx-auto">
                                            {section.venues.map((venue, vIndex) => (
                                                <VenueCard key={vIndex} {...venue} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
