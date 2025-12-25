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
    introDescription: string;
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

export const Schedule: React.FC = () => {
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
                        SCHEDULE
                    </motion.h1>
                </div>
            </div>

            {/* Schedule Section */}
            <div className="relative z-20 px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-4"
                >
                    <div className="w-8 sm:w-12 h-[2px] bg-white"></div>
                    <span className="text-sm sm:text-base text-gray-300 uppercase tracking-widest">Schedule</span>
                </motion.div>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                            Detailed Timeline
                        </h2>
                        <p className="text-2xl sm:text-3xl md:text-4xl text-gray-500 font-light italic">
                            Don't miss a beat
                        </p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-2.5 border border-white/30 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-all group"
                    >
                        DOWNLOAD PDF
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
                            {/* Day Header with inline intro description - Sticky */}
                            <div className="sticky top-24 z-30 mb-12 shadow-2xl shadow-black/50">
                                <div className="flex rounded-2xl overflow-hidden border border-white/10 backdrop-blur-md bg-[#05020a]/90">
                                    <div className={`${day.labelColor} px-8 py-5 text-white font-bold text-lg sm:text-xl min-w-[140px] flex items-center justify-center`}>
                                        {day.label}
                                    </div>
                                    <div className="flex-1 px-8 py-5 flex flex-col justify-center">
                                        <p className="text-white text-xl font-medium mb-1">
                                            {day.title}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            {day.introDescription}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Events List */}
                            <div className="space-y-8 pl-0 md:pl-4">
                                {day.events.map((event, eventIndex) => (
                                    <div
                                        key={eventIndex}
                                        className="flex flex-col md:flex-row gap-6 md:gap-16 relative"
                                    >
                                        {/* Time */}
                                        <div className="md:w-[180px] shrink-0 pt-4 text-right hidden md:block">
                                            <span className="text-gray-400 text-lg font-medium tracking-wide sticky top-48">{event.time}</span>
                                        </div>
                                        {/* Mobile Time */}
                                        <div className="md:hidden pb-2">
                                            <span className="text-gray-400 text-base font-medium tracking-wide">{event.time}</span>
                                        </div>

                                        {/* Event Card */}
                                        <div className="flex-1 bg-[#0a0a0a] rounded-[2rem] p-8 sm:p-10 border border-white/10 hover:border-white/20 transition-colors group">
                                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                                                {event.title}
                                            </h3>
                                            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-3xl">
                                                {event.description}
                                            </p>

                                            {/* Speakers */}
                                            {event.speakers && event.speakers.length > 0 && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                                                    {event.speakers.map((speaker, speakerIndex) => (
                                                        <div key={speakerIndex} className="flex items-center gap-5">
                                                            <img
                                                                src={speaker.image}
                                                                alt={speaker.name}
                                                                className="w-20 h-20 rounded-2xl object-cover shadow-lg bg-gray-800"
                                                            />
                                                            <div>
                                                                <p className="text-white text-lg font-semibold">{speaker.name}</p>
                                                                <p className="text-gray-500 text-sm leading-snug">{speaker.designation},</p>
                                                                <p className="text-gray-500 text-sm leading-snug">{speaker.company}</p>
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
