import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, ArrowRight } from 'lucide-react';

export const FloatingRegisterButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Show button only after scrolling down a bit (past hero)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTickets = () => {
        const ticketsSection = document.getElementById('tickets');
        if (ticketsSection) {
            ticketsSection.scrollIntoView({ behavior: 'smooth' });
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
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.5)] border border-white/20 backdrop-blur-md group"
                >
                    <Ticket className="w-6 h-6" />

                    {/* Desktop Text (Hidden on mobile usually, but user asked for "Register for passes" on hover) */}
                    <div className="hidden md:block overflow-hidden">
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{
                                width: isHovered ? 'auto' : 0,
                                opacity: isHovered ? 1 : 0
                            }}
                            className="whitespace-nowrap font-bold text-sm pr-1"
                        >
                            Register for Passes
                        </motion.div>
                    </div>

                    {/* Mobile Text (Always visible or Icon only? User asked "on hover say... properly placed on mobile and desktop") 
                        Usually mobile doesn't have hover. So for mobile maybe just show icon? 
                        Or maybe show text always on mobile if space permits? 
                        Let's stick to the prompt: "on hover say register".
                        Mobile taps behave like hover sometimes, but a floating action button (FAB) usually is just an icon.
                        However, to ensure clarity, maybe I'll make it always show text on mobile if it's not too wide?
                        Actually, typical FAB pattern: Icon only.
                        Let's follow the desktop hover instruction strictly. 
                        
                        Wait, "properly placed on mobile and desktop".
                        I'll add a small "Register" text for mobile if needed, or just keep icon.
                        Let's keep it icon-only by default and expand on hover (desktop).
                        Mobile users might just tap it.
                    */}
                </motion.button>
            )}
        </AnimatePresence>
    );
};
