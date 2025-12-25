import React from 'react';
import { motion } from 'framer-motion';
import { PlasmaBackground } from '../../components/PlasmaBackground';
import { Footer } from '../../components/Footer';
import { ArrowUpRight } from 'lucide-react';

interface Speaker {
    name: string;
    designation: string;
    company: string;
    image: string;
}

interface EventItem {
    time: string;
    title: string;
    description: string;
    speakers?: Speaker[];
}

interface DaySchedule {
    label: string;
    labelColor: string;
    title: string;
    introDescription: string; // First description shown inline with header
    events: EventItem[];
}

const scheduleData: DaySchedule[] = [
    {
        label: 'Kickoff',
        labelColor: 'bg-purple-600',
        title: 'Day 1: Main Conference',
        introDescription: 'Welcome to the Becon Tech Summit. Kick off the day with an introduction from the event organizers and a sneak peek of what\'s in store.',
        events: [
            {
                time: '10.30-11.30 AM',
                title: 'Keynote Address: Revolutionizing the Future with AI',
                description: 'By [Name], [Designation, Company] at [Event Name]. Explore the transformative impact of AI on industries and society.',
                speakers: [
                    { name: 'Name', designation: 'Designation', company: 'Company', image: 'https://picsum.photos/id/64/100/100' },
                ],
            },
            {
                time: '12.30-01.30 AM',
                title: 'Grand Moonshot: Pitch before 20+ global VCs and 4,000+ audience',
                description: 'A lively discussion on how AI is being implemented in sectors like healthcare, finance, and logistics, with industry experts.',
                speakers: [
                    { name: 'Name', designation: 'Designation', company: 'Company', image: 'https://picsum.photos/id/65/100/100' },
                    { name: 'Name', designation: 'Designation', company: 'Company', image: 'https://picsum.photos/id/91/100/100' },
                    { name: 'Name', designation: 'Designation', company: 'Company', image: 'https://picsum.photos/id/129/100/100' },
                    { name: 'Name', designation: 'Designation', company: 'Company', image: 'https://picsum.photos/id/177/100/100' },
                ],
            },
        ],
    },
    {
        label: 'Main Day',
        labelColor: 'bg-purple-600',
        title: 'Day 2: Deep Dive Sessions',
        introDescription: 'Catch up with fellow attendees over coffee before diving into another exciting day of learning.',
        events: [
            {
                time: '11.30-12.30 PM',
                title: 'Keynote Address: Revolutionizing the Future with AI',
                description: 'By [Name], [Designation, Company] at [Event Name]. Explore the transformative impact of AI on industries and society.',
                speakers: [
                    { name: 'Name', designation: 'Designation', company: 'Company', image: 'https://picsum.photos/id/338/100/100' },
                ],
            },
            {
                time: '2.30-04.30 PM',
                title: 'Start-Up Clinic: 1-on-1 Sessions with industry experts',
                description: 'Panelists explore how AI-powered automation is driving the future of manufacturing and supply chain.',
                speakers: [
                    { name: 'Name', designation: 'Designation', company: 'Company', image: 'https://picsum.photos/id/342/100/100' },
                    { name: 'Name', designation: 'Designation', company: 'Company', image: 'https://picsum.photos/id/399/100/100' },
                    { name: 'Name', designation: 'Designation', company: 'Company', image: 'https://picsum.photos/id/433/100/100' },
                    { name: 'Name', designation: 'Designation', company: 'Company', image: 'https://picsum.photos/id/447/100/100' },
                ],
            },
        ],
    },
    {
        label: 'Sumup',
        labelColor: 'bg-purple-600',
        title: 'Day 3: Networking Day',
        introDescription: 'Learn how businesses can use AI to optimize operations, increase profitability, and drive growth.',
        events: [
            {
                time: '09.30-11.30 AM',
                title: '100X Hackathon: Asia\'s largest deep-tech hackathon building breakthrough solutions.',
                description: 'Learn how businesses can use AI to optimize operations, increase profitability, and drive growth.',
            },
            {
                time: '02.30-03.30 PM',
                title: 'Policysphere: Connecting startups with policymakers',
                description: 'Join [Name], [Designation Company] at [Event Name], as she discusses the role of AI in creating personalized consumer experiences.',
                speakers: [
                    { name: 'Name', designation: 'Designation', company: 'Company', image: 'https://picsum.photos/id/453/100/100' },
                ],
            },
        ],
    },
];

export const Events: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05020a] text-white">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
                <PlasmaBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05020a] z-10" />

                <div className="relative z-20 h-full flex items-center justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-7xl sm:text-8xl md:text-9xl font-bold italic tracking-tight text-white"
                    >
                        EVENTS
                    </motion.h1>
                </div>
            </div>

            {/* Agenda Section */}
            <div className="relative z-20 px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-4"
                >
                    <div className="w-8 sm:w-12 h-[2px] bg-white"></div>
                    <span className="text-sm sm:text-base text-gray-300 uppercase tracking-widest">Agenda</span>
                </motion.div>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                            Explore Events at BECon
                        </h2>
                        <p className="text-2xl sm:text-3xl md:text-4xl text-gray-500 font-light italic">
                            Summit Opportunity
                        </p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-2.5 border border-white/30 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-all group"
                    >
                        REGISTER NOW
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.button>
                </div>

                {/* Day Sections */}
                <div className="space-y-16">
                    {scheduleData.map((day, dayIndex) => (
                        <motion.div
                            key={dayIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: dayIndex * 0.1 }}
                        >
                            {/* Day Header with inline intro description */}
                            <div className="flex rounded-xl overflow-hidden border border-purple-500/30 mb-8">
                                <div className={`${day.labelColor} px-6 py-4 text-white font-semibold text-sm sm:text-base min-w-[100px] sm:min-w-[120px] flex items-center`}>
                                    {day.label}
                                </div>
                                <div className="flex-1 bg-[#0a0612] px-6 py-4">
                                    <p className="text-white font-medium text-sm sm:text-base mb-2">
                                        {day.title}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        {day.introDescription}
                                    </p>
                                </div>
                            </div>

                            {/* Events List */}
                            <div className="space-y-6">
                                {day.events.map((event, eventIndex) => (
                                    <div
                                        key={eventIndex}
                                        className="flex flex-col md:flex-row gap-4 md:gap-8"
                                    >
                                        {/* Time */}
                                        <div className="md:w-[140px] shrink-0">
                                            <span className="text-gray-400 text-sm font-medium">{event.time}</span>
                                        </div>

                                        {/* Event Card */}
                                        <div className="flex-1 bg-[#0f0a1a] rounded-xl p-5 sm:p-6 border border-white/5">
                                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                                                {event.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4">
                                                {event.description}
                                            </p>

                                            {/* Speakers */}
                                            {event.speakers && event.speakers.length > 0 && (
                                                <div className="flex flex-wrap gap-6 mt-4">
                                                    {event.speakers.map((speaker, speakerIndex) => (
                                                        <div key={speakerIndex} className="flex items-center gap-3">
                                                            <img
                                                                src={speaker.image}
                                                                alt={speaker.name}
                                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                                                            />
                                                            <div>
                                                                <p className="text-white text-sm font-medium">{speaker.name}</p>
                                                                <p className="text-gray-500 text-xs">{speaker.designation},</p>
                                                                <p className="text-gray-500 text-xs">{speaker.company}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};
