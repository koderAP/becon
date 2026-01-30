import React from 'react';
import sponsorsData from '../src/data/sponsors_2026.json';

// Types
interface Sponsor {
    category: string;
    partner_title: string;
    company: string;
    logo_size: string;
    logo_image: string;
    invert_logo?: boolean;
}

interface SponsorCardProps {
    sponsor: Sponsor;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor }) => {
    const [imageError, setImageError] = React.useState(false);

    // Determine grid/card sizing logic based on 'logo_size' if needed for specific overrides,
    // but the main grid layout usually handles the constraints.
    // Here we use the size to determine padding/min-height to match user requests.
    const getSizeClasses = () => {
        switch (sponsor.logo_size) {
            case 'Large': return 'p-4 min-h-[200px] rounded-3xl';
            case 'Medium': return 'p-3 min-h-[160px] rounded-2xl';
            case 'Mid': return 'p-3 min-h-[140px] rounded-2xl';
            case 'Small': return 'p-2 min-h-[130px] rounded-xl';
            case 'Very Small': return 'p-2 min-h-[100px] rounded-xl';
            default: return 'p-2 min-h-[130px] rounded-xl';
        }
    };

    return (
        <div className={`
            flex flex-col items-center justify-between
            bg-white rounded-xl
            transition-all duration-300
            hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:-translate-y-1
            group
            ${getSizeClasses()}
        `}>
            <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                {imageError ? (
                    <div className="text-center w-full">
                        <span className="text-sm font-bold text-gray-400">
                            {sponsor.company}
                        </span>
                    </div>
                ) : (
                    <img
                        src={sponsor.logo_image}
                        alt={`${sponsor.company} - ${sponsor.partner_title} `}
                        onError={() => setImageError(true)}
                        className={`max-w-full max-h-full object-contain transition-all duration-500 ${sponsor.invert_logo ? 'invert' : ''}`}
                    />
                )}
            </div>

            <div className="mt-3 text-center w-full border-t border-gray-100 pt-2">
                <h4 className="text-gray-900 font-bold text-sm leading-tight group-hover:text-purple-600 transition-colors">
                    {sponsor.company}
                </h4>
                {sponsor.partner_title && sponsor.partner_title !== sponsor.company && (
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1 font-medium">
                        {sponsor.partner_title}
                    </p>
                )}
            </div>
        </div>
    );
};

interface TierSectionProps {
    title: string;
    sponsors: Sponsor[];
}

const TierSection: React.FC<TierSectionProps> = ({ title, sponsors }) => {
    // Determine grid columns based on the first sponsor's size in the group (assuming homogeneous groups)
    const size = sponsors[0]?.logo_size || 'Small';

    const getGridClasses = () => {
        switch (size) {
            case 'Large': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
            case 'Medium': return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
            case 'Mid': return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'; // Similar to Medium
            case 'Small': return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
            case 'Very Small': return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6';
            default: return 'grid-cols-2 md:grid-cols-4';
        }
    };

    return (
        <div className="mb-20 last:mb-0">
            <div className="flex items-center gap-4 mb-8 justify-center">
                <div className="h-[1px] w-full max-w-[100px] bg-gradient-to-r from-transparent to-purple-500/50"></div>
                <h3 className="text-sm font-bold text-purple-400 tracking-[0.2em] uppercase whitespace-nowrap text-center">
                    {title}
                </h3>
                <div className="h-[1px] w-full max-w-[100px] bg-gradient-to-l from-transparent to-purple-500/50"></div>
            </div>

            <div className={`grid gap-6 ${getGridClasses()}`}>
                {sponsors.map((sponsor, index) => (
                    <SponsorCard key={index} sponsor={sponsor} />
                ))}
            </div>
        </div>
    );
};

export const SponsorsGrid: React.FC = () => {
    // Group sponsors by Tier (Category)
    // The JSON order is significant, so we can iterate through unique categories in order
    // or manually define the order if needed. Based on JSON, they are ordered.

    // We can also double check grouping.
    // Let's use the categories present in the data to maintain dynamic nature.
    const categories = Array.from(new Set(sponsorsData.becon_2026_sponsors.map(s => s.category)));

    return (
        <div className="w-full">
            {categories.map((category) => {
                const categorySponsors = sponsorsData.becon_2026_sponsors.filter(s => s.category === category);
                return (
                    <TierSection
                        key={category}
                        title={category}
                        sponsors={categorySponsors}
                    />
                );
            })}
        </div>
    );
};
