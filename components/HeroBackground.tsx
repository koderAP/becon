import React from 'react';
import { PlasmaBackground } from './PlasmaBackground';

export const HeroBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* 1. Plasma Background */}
            <div className="absolute inset-0 z-0">
                <PlasmaBackground />
            </div>

            {/* Bottom blur gradient overlay */}
            <div
                className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-30"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(5, 2, 10, 0.3) 20%, rgba(5, 2, 10, 0.7) 50%, rgba(5, 2, 10, 0.95) 80%, #05020a 100%)',
                }}
            />
        </div>
    );
};
