import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export const ExperienceBECon: React.FC = () => {
    return (
        <div className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#05020a]">
            <SectionHeading className="mb-6">Experience BECon</SectionHeading>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
            >
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                    Across keynote stages, startup platforms, hackathons, and innovation showcases,
                    BECon brings together the minds, ideas, and ecosystems shaping what comes next.
                </p>

                <Link
                    to="/events"
                    className="inline-flex items-center gap-2 text-white hover:text-purple-400 transition-colors group font-medium"
                >
                    Explore all events
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </div>
    );
};

export default ExperienceBECon;
