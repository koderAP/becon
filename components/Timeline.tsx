import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

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

export const Timeline: React.FC = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 px-6 md:px-20 bg-[#05020a]">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-4 mb-4"
                >
                    <div className="w-12 h-[2px] bg-white"></div>
                    <span className="text-lg text-gray-300 uppercase tracking-widest">Schedule</span>
                    <div className="w-12 h-[2px] bg-white"></div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold leading-tight mb-16 text-center"
                >
                    Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Timeline</span>
                </motion.h1>

                <div className="space-y-16">
                    {scheduleData.map((day, dayIndex) => (
                        <div key={dayIndex} className="relative">
                            {/* Date Header */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-end gap-4 mb-8 sticky top-24 z-20 bg-[#05020a]/80 backdrop-blur-md py-4 border-b border-white/10"
                            >
                                <h2 className="text-4xl font-bold text-white">{day.day}</h2>
                                <span className="text-xl text-purple-400 font-mono mb-1">{day.date}</span>
                            </motion.div>

                            <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-8 pb-8">
                                {day.events.map((event, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative pl-8 md:pl-12 group"
                                    >
                                        {/* Timeline Dot */}
                                        <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-[#05020a] group-hover:bg-white transition-colors"></div>

                                        {/* Card */}
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                                <div className="flex items-center gap-2 text-purple-300 font-mono text-sm mb-2 md:mb-0">
                                                    <Clock size={14} />
                                                    {event.time}
                                                </div>
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-gray-300 border border-white/5 uppercase tracking-wide">
                                                    {event.type}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <MapPin size={14} />
                                                {event.location}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};