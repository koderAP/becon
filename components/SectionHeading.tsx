import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
    children: React.ReactNode;
    className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`flex items-center gap-4 sm:gap-5 ${className}`}
        >
            {/* White Line */}
            <div className="w-12 sm:w-16 h-[3px] bg-white rounded-full" />

            {/* Bold White Text */}
            <span className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white">
                {children}
            </span>
        </motion.div>
    );
};

export default SectionHeading;
