import React, { useEffect, useRef } from 'react';
// @ts-ignore
import { animate, stagger } from 'animejs';

interface AnimeStaggerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
    direction?: 'normal' | 'reverse' | 'alternate';
    easing?: string;
    duration?: number;
    translateY?: number | number[];
    translateX?: number | number[];
    scale?: number | number[];
    opacity?: number | number[];
}

export const AnimeStagger: React.FC<AnimeStaggerProps> = ({
    children,
    className = '',
    staggerDelay = 100,
    direction = 'normal',
    easing = 'easeOutElastic(1, .8)',
    duration = 800,
    translateY = [50, 0],
    translateX = 0,
    scale = [0.8, 1],
    opacity = [0, 1],
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<{ hasAnimated: boolean }>({ hasAnimated: false });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !infoRef.current.hasAnimated && containerRef.current) {
                        // Get all immediate children to animate
                        const targets = containerRef.current.children;

                        animate({
                            targets: targets,
                            translateY: translateY,
                            translateX: translateX,
                            scale: scale,
                            opacity: opacity,
                            easing: easing,
                            duration: duration,
                            delay: stagger(staggerDelay),
                            direction: direction,
                            begin: () => {
                                infoRef.current.hasAnimated = true;
                            }
                        });

                        // Stop observing once triggered
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [staggerDelay, direction, easing, duration, translateY, translateX, scale, opacity]);

    // Initially hide children using CSS to prevent flash before animation
    // We'll let anime.js handle the from values, but we need initial state.
    // Actually, anime.js 'from' values in the array [from, to] usually handle this,
    // but if the JS loads late, they might be visible.
    // A simple way is to ensure the children have 0 opacity initially via CSS if possible,
    // but here we rely on the component mounting and quick effect execution.
    // For a more robust solution, we could set initial styles in a layout effect.

    return (
        <div ref={containerRef} className={className} style={{ opacity: 1 }}>
            {children}
        </div>
    );
};
