import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, Glitch } from '@react-three/postprocessing';
import * as THREE from 'three';
import { GlitchMode, BlendFunction } from 'postprocessing';

function Particles(props: any) {
    const ref = useRef<THREE.Points>(null);

    // Create a sphere of random points
    const [positions, setPositions] = useMemo(() => {
        const count = 200; // Number of particles
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Random distribution in a sphere
            const r = 4;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        return [positions, positions]
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#8b5cf6" // Purple-500
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    )
}

function GridBackground() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[50, 50, 50, 50]} />
            <meshBasicMaterial wireframe color="#2e1065" transparent opacity={0.3} />
        </mesh>
    );
}

export const TechBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full bg-[#05020a]">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
                <fog attach="fog" args={['#05020a', 5, 15]} />

                <Particles />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <GridBackground />

                {/* Post Processing Effects */}
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.5}
                        luminanceSmoothing={0.9}
                        height={300}
                        intensity={1.5}
                    />
                    <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    <Glitch
                        delay={[1.5, 3.5] as any} // Min and max delay between glitches
                        duration={[0.1, 0.3] as any} // Min and max duration of a glitch
                        strength={[0.1, 0.2] as any} // Strength of the glitch
                        mode={GlitchMode.SPORADIC} // Glitch mode
                        active // Turn on/off the effect
                        ratio={0.85} // Threshold for strong glitches
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};
