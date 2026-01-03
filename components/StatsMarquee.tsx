import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';


interface StatItem {
    label: string;
    value: string;
}

interface StatsMarqueeProps {
    items: StatItem[];
    direction?: 'left' | 'right';
    speed?: number; // pixels per second
    colorClass?: string;
    className?: string; // For padding/margins on wrapper
}

export const StatsMarquee: React.FC<StatsMarqueeProps> = ({
    items,
    direction = 'left',
    speed = 50,
    colorClass = "text-purple-400",
    className = ""
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // We duplicate the items enough times to ensure seamless looping.
    // Original used 6 sets.
    const duplications = 6;
    const extendedItems = Array(duplications).fill(items).flat();

    const x = useMotionValue(0);

    useEffect(() => {
        if (containerRef.current) {
            // Calculate the seamless loop point.
            // We assume the content is symmetric in halves.
            // We have 6 chunks. Half is 3 chunks.
            setContentWidth(containerRef.current.scrollWidth / 2);

            // Initial position for 'right' direction to avoid blank space
            if (direction === 'right') {
                // We can't easily set x here and expect no flash if we render server side first, 
                // but strictly client side it's fine.
                x.set(-containerRef.current.scrollWidth / 2);
            }
        }
    }, [direction, x]);

    useAnimationFrame((t, delta) => {
        if (!contentWidth) return;

        // speed factor: slow down when hovered
        const currentSpeed = isHovered ? speed * 0.1 : speed; // 10x slower on hover

        // delta is in ms, we want pixels per second, so * delta / 1000
        const moveBy = currentSpeed * (delta / 1000);

        let newX = x.get();

        if (direction === 'left') {
            newX -= moveBy;
            // Wrap at -contentWidth
            if (newX <= -contentWidth) {
                newX += contentWidth;
            }
        } else {
            newX += moveBy;
            // Wrap at 0
            if (newX >= 0) {
                newX -= contentWidth;
            }
        }

        x.set(newX);
    });

    return (
        <div
            className={`w-full overflow-hidden relative mask-linear-fade ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

            <motion.div
                ref={containerRef}
                className="flex whitespace-nowrap gap-16"
                style={{ x }}
            >
                {extendedItems.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center shrink-0">
                        <h3 className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.value}</h3>
                        <p className={`text-sm md:text-base uppercase tracking-widest font-semibold ${colorClass}`}>{stat.label}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
