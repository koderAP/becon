
import React from 'react';
import { Link } from 'react-router-dom';
import { Sponsors } from '../../components/Sponsors';
import { Footer } from '../../components/Footer';
import { PageHeader } from '../../components/PageHeader';

export const SponsorsPage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <PageHeader
                title="SPONSORS"
                badge="Our Partners"
                description="Powering the deep tech revolution with industry leaders."
            />

            <div className="relative z-20 py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="mb-20 text-center">
                    <span className="px-6 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-semibold uppercase tracking-wider mb-8 inline-block">
                        Coming Soon
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">Becon 2026 Partners</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
                        We are currently onboarding partners for this year's summit. Join us in shaping the future.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                    >
                        Become a Sponsor
                    </Link>
                </div>

                <div className="border-t border-white/10 pt-20">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-[2px] bg-white"></div>
                        <span className="text-lg text-gray-300 uppercase tracking-widest">Previous Partners</span>
                    </div>
                    <Sponsors showHeader={false} className="bg-transparent !p-0" isLoading={isLoading} />
                </div>
            </div>

            <div className="relative z-50">
                <Footer />
            </div>
        </div>
    );
};
