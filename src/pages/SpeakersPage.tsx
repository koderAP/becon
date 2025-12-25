import React from 'react';
import { Speakers } from '../../components/Speakers';
import { Footer } from '../../components/Footer';
import { PageHeader } from '../../components/PageHeader';

export const SpeakersPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <PageHeader
                title="SPEAKERS"
                badge="Our Guests"
                description="Meet the visionaries and industry leaders shaping the future of deep tech."
            />

            <div className="relative z-20 py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
                <Speakers showHeader={false} className="bg-transparent !p-0" />
            </div>

            <div className="relative z-50">
                <Footer />
            </div>
        </div>
    );
};
