import React from 'react';

export const SectionSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#05020a] border-t border-white/5 ${className}`}>
            <div className="max-w-7xl mx-auto space-y-12 animate-pulse">
                {/* Section Header Skeleton */}
                <div className="space-y-4">
                    <div className="h-4 w-32 bg-white/10 rounded"></div>
                    <div className="h-10 w-2/3 md:w-1/2 bg-white/10 rounded"></div>
                </div>

                {/* Content Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 rounded-3xl bg-white/5 border border-white/10"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
