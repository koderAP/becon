import React from 'react';
import { PlasmaBackground } from './PlasmaBackground';

export const HeroBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Plasma Background - tuned to match Framer design */}
            <div className="absolute inset-0 z-0">
                <PlasmaBackground
                    color1="#08081a"  // Blackish Blue (very dark base)
                    color2="#1a0a5c"  // Navy Blue (deep purple-blue)
                    color3="#b794f4"  // Lighter purple for highlights
                    speed={0.3}
                    scale={1.2}
                    offsetX={0.15}
                    interactive={true}
                />
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
