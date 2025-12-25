import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

const scheduleData = [
    {
        day: "Day 1",
        date: "Jan 31",
        events: [
            { time: "09:00 AM", title: "Registration & Welcome Kit", location: "Main Foyer", type: "General" },
            { time: "10:30 AM", title: "Opening Ceremony", location: "Grand Hall", type: "Keynote" },
            { time: "11:30 AM", title: "Keynote: The Future of AI", location: "Grand Hall", type: "Keynote" },
            { time: "02:00 PM", title: "Panel: Ethics in Automation", location: "Audi 1", type: "Panel" },
            { time: "04:00 PM", title: "Startup Showcase - Round 1", location: "Exhibition Area", type: "Competition" },
        ]
    },
    {
        day: "Day 2",
        date: "Feb 01",
        events: [
            { time: "09:30 AM", title: "Workshop: Building LLMs", location: "Lab Complex", type: "Workshop" },
            { time: "11:00 AM", title: "Fireside Chat with CEO of TechGiant", location: "Grand Hall", type: "Keynote" },
            { time: "01:00 PM", title: "Networking Lunch", location: "Food Court", type: "Social" },
            { time: "03:00 PM", title: "Hackathon Finals", location: "Innovation Center", type: "Competition" },
            { time: "07:00 PM", title: "Cultural Night", location: "Open Air Theater", type: "Social" },
        ]
    },
    {
        day: "Day 3",
        date: "Feb 02",
        events: [
            { time: "10:00 AM", title: "Closing Keynote", location: "Grand Hall", type: "Keynote" },
            { time: "12:00 PM", title: "Award Ceremony", location: "Grand Hall", type: "General" },
            { time: "02:00 PM", title: "Farewell Networking", location: "Lounge Area", type: "Social" },
        ]
    }
];

const typeColors: Record<string, string> = {
    'General': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    'Keynote': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Panel': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Workshop': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Competition': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Social': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
};

export const Timeline: React.FC = () => {
    return (
        <section className="py-24 bg-[#05020a]">
            <div className="max-w-5xl mx-auto px-6">
                {/* Section Header - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-purple-500"></div>
                        <span className="text-sm text-purple-400 uppercase tracking-[0.2em] font-medium">Schedule</span>
                        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-purple-500"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">Timeline</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Three days of groundbreaking talks, workshops, and networking opportunities
                    </p>
                </motion.div>

                {/* Day Tabs - Centered */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {scheduleData.map((day, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-center hover:border-purple-500/50 hover:bg-purple-500/10 transition-all cursor-pointer"
                        >
                            <div className="text-white font-semibold">{day.day}</div>
                            <div className="text-purple-400 text-sm">{day.date}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Timeline Content */}
                <div className="space-y-20">
                    {scheduleData.map((day, dayIndex) => (
                        <motion.div
                            key={dayIndex}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            {/* Day Header */}
                            <div className="text-center mb-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-white">
                                    {day.day} <span className="text-purple-400 font-normal">— {day.date}</span>
                                </h3>
                            </div>

                            {/* Events Grid - Centered */}
                            <div className="relative">
                                {/* Center Timeline Line */}
                                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent hidden md:block"></div>

                                <div className="space-y-8">
                                    {day.events.map((event, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`relative flex flex-col md:flex-row items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                        >
                                            {/* Left/Right Card */}
                                            <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.08] transition-all inline-block max-w-md">
                                                    <div className="flex items-center gap-3 mb-3 justify-start">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${typeColors[event.type] || typeColors['General']}`}>
                                                            {event.type}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-xl font-semibold text-white mb-2">{event.title}</h4>
                                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock size={14} className="text-purple-400" />
                                                            <span>{event.time}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin size={14} className="text-purple-400" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Center Dot */}
                                            <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                                                <div className="w-4 h-4 rounded-full bg-purple-500 ring-4 ring-[#05020a] shadow-lg shadow-purple-500/30"></div>
                                            </div>

                                            {/* Spacer for alternating layout */}
                                            <div className="flex-1 hidden md:block"></div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};