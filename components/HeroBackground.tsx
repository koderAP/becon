import React from 'react';
import { FramerGradient } from './FramerGradient';

export const HeroBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Framer "Animated Gradient Background" - Exact Settings */}
            <div className="absolute inset-0 z-0">
                <FramerGradient
                    // Colors from Framer
                    color1="#08081a"  // Blackish Blue
                    color2="#1a0a5c"  // Navy Blue
                    color3="#ffffff"  // White 100

                    // Exact Framer parameters from screenshot
                    rotation={0}      // Rotation: 0°
                    proportion={28}   // Proportion: 28
                    scale={0.45}      // Scale: 0.45
                    speed={53}        // Speed: 53
                    distortion={0}    // Distortion: 0
                    swirl={31}        // Swirl: 31
                    iterations={10}   // Iterations: 10
                    softness={100}    // Softness: 100
                    offset={0}        // Offset: 0
                    shapeSize={10}    // Shape Size: 10
                    radius={0}        // Radius: 0
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
