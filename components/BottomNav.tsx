import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, CalendarDays, Users, Ticket, Phone, ArrowUpRight } from 'lucide-react';

export const BottomNav: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: CalendarDays, label: 'Events', path: '/events' },
        { icon: Users, label: 'Speakers', path: '/speakers' },
        { icon: Phone, label: 'Contact', path: '/contact' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4 pointer-events-none">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pointer-events-auto flex items-center gap-2 sm:gap-4 p-2 pl-4 sm:pl-6 pr-2 bg-[#05020a]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50"
            >
                {/* Logo Section */}
                <Link to="/" className="flex items-center shrink-0 mr-2 sm:mr-4 border-r border-white/10 pr-4 sm:pr-6 py-1">
                    <img
                        src="/logo.avif"
                        alt="BECon"
                        className="h-6 sm:h-8 w-auto object-contain"
                    />
                </Link>

                {/* Navigation Items */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                    relative flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full transition-all duration-300
                                    ${isActive
                                        ? 'bg-white/10 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                <item.icon size={18} className="sm:mr-2" />
                                <span className="hidden sm:inline text-sm font-medium">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="bottom-nav-indicator"
                                        className="absolute inset-0 border border-white/20 rounded-full"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Register Action */}
                <Link
                    to="/tickets"
                    className="flex items-center gap-2 ml-2 sm:ml-4 px-4 sm:px-6 py-2.5 bg-white text-black rounded-full font-bold text-sm hover:bg-purple-50 transition-colors group"
                >
                    <Ticket size={16} className="group-hover:rotate-12 transition-transform" />
                    <span className="hidden sm:inline">Register</span>
                </Link>
            </motion.div>
        </div>
    );
};
