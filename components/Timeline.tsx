import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

const scheduleData = [
    {
        day: "Day 1",
        date: "Jan 30",
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
        <div className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#05020a]">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
            >
                <div className="w-8 sm:w-12 h-[2px] bg-white"></div>
                <span className="text-sm sm:text-lg text-gray-300 uppercase tracking-widest">Schedule</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-10 sm:mb-12 lg:mb-16"
            >
                Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Timeline</span>
            </motion.h1>

            <div className="space-y-10 sm:space-y-12 lg:space-y-16">
                {scheduleData.map((day, dayIndex) => (
                    <div key={dayIndex} className="relative">
                        {/* Date Header */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-end gap-3 sm:gap-4 mb-6 sm:mb-8 sticky top-20 sm:top-24 z-20 bg-[#05020a]/80 backdrop-blur-md py-3 sm:py-4 border-b border-white/10"
                        >
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{day.day}</h2>
                            <span className="text-base sm:text-lg lg:text-xl text-purple-400 font-mono mb-0.5 sm:mb-1">{day.date}</span>
                        </motion.div>

                        <div className="relative border-l border-white/10 ml-2 sm:ml-4 md:ml-8 space-y-4 sm:space-y-6 lg:space-y-8 pb-4 sm:pb-6 lg:pb-8">
                            {day.events.map((event, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-6 sm:pl-8 md:pl-12 group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[-4px] sm:left-[-5px] top-2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-500 ring-2 sm:ring-4 ring-[#05020a] group-hover:bg-white transition-colors"></div>

                                    {/* Card */}
                                    <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                            <div className="flex items-center gap-2 text-purple-300 font-mono text-xs sm:text-sm">
                                                <Clock size={12} className="sm:w-[14px] sm:h-[14px]" />
                                                {event.time}
                                            </div>
                                            <span className="inline-block self-start sm:self-auto px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white/10 text-gray-300 border border-white/5 uppercase tracking-wide">
                                                {event.type}
                                            </span>
                                        </div>
                                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2">{event.title}</h3>
                                        <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                                            <MapPin size={12} className="sm:w-[14px] sm:h-[14px]" />
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
    );
};