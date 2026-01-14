import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const FloatingRegisterButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button only after scrolling down a bit (past hero)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Check initial scroll position
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();

    const scrollToTickets = () => {
        const ticketsSection = document.getElementById('tickets');
        if (ticketsSection) {
            ticketsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/', { state: { scrollTo: 'tickets' } });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToTickets}
                    className="fixed bottom-6 right-6 z-[90] flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)] border border-white/20 backdrop-blur-md group font-bold tracking-wide"
                >
                    <Ticket className="w-5 h-5" />
                    <span className="text-sm">Register for Passes</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};
