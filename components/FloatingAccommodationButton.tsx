import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed } from 'lucide-react';

export const FloatingAccommodationButton: React.FC = () => {
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

    const openAccommodationForm = () => {
        window.open('https://forms.gle/gYy2sYG9eQZks9Vx8', '_blank');
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
                    onClick={openAccommodationForm}
                    className="fixed bottom-6 left-6 z-[90] flex items-center justify-center gap-0 md:gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 md:px-6 md:py-4 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)] border border-white/20 backdrop-blur-md group font-bold tracking-wide"
                >
                    <Bed className="w-6 h-6 md:w-5 md:h-5" />
                    <span className="hidden md:inline text-sm">Accommodation</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};
