import React from 'react';
import { Sponsors } from '../../components/Sponsors';
import { SponsorsGrid } from '../../components/SponsorsGrid';
import { Footer } from '../../components/Footer';
import { PageHeader } from '../../components/PageHeader';

export const SponsorsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <PageHeader
                title="SPONSORS"
                badge="Our Partners"
                description="Powering the deep tech revolution with industry leaders."
            />

            <div className="relative z-20 py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
                <SponsorsGrid />

                <div className="border-t border-white/10 pt-20 mt-20">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="text-lg text-gray-300 uppercase tracking-widest">Previous Partners</span>
                    </div>
                    {/* We pass showHeader=false because we added our own header above */}
                    <Sponsors showHeader={false} className="bg-transparent !p-0" />
                </div>
            </div>

            <div className="relative z-50">
                <Footer />
            </div>
        </div>
    );
};
