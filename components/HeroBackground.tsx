import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export const HeroBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* ShaderGradient from @shadergradient/react - Framer compatible */}
            <ShaderGradientCanvas
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
                pixelDensity={1}
                fov={45}
            >
                <ShaderGradient
                    // Type of gradient shape
                    type="waterPlane"

                    // Animation
                    animate="on"
                    uSpeed={0.3}
                    uStrength={2}
                    uDensity={1.5}
                    uFrequency={3}

                    // Colors matching Framer settings:
                    // Color 1: Blackish Blue, Color 2: Navy Blue, Color 3: White
                    color1="#050510"    // Blackish Blue (very dark)
                    color2="#1a0a4a"    // Navy Blue (deep purple/blue)
                    color3="#ffffff"    // White (the bright glow)

                    // Camera settings for the gradient perspective
                    cDistance={5}
                    cPolarAngle={90}
                    cAzimuthAngle={180}

                    // Position adjustments
                    positionX={0}
                    positionY={0}
                    positionZ={0}

                    // Rotation
                    rotationX={0}
                    rotationY={0}
                    rotationZ={0}

                    // Lighting
                    lightType="3d"
                    brightness={1.2}

                    // Grain effect (subtle texture)
                    grain="off"
                />
            </ShaderGradientCanvas>

            {/* Bottom blur gradient overlay for smooth transition */}
            <div
                className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-30"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(5, 2, 10, 0.3) 20%, rgba(5, 2, 10, 0.7) 50%, rgba(5, 2, 10, 0.95) 80%, #05020a 100%)',
                }}
            />
        </div>
    );
};
