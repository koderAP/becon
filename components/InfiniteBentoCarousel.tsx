import React from 'react';
import { SectionHeading } from './SectionHeading';

interface BentoCarouselProps {
    title?: string;
    subtitle?: string;
    speed?: number;
    pauseOnHover?: boolean;
}

// Bento tile design - a fixed pattern that packs perfectly without gaps
// Pattern uses a 6-column base, 2 rows
// Large tiles: 2x2, Medium tiles: 2x1 or 1x2, Small tiles: 1x1

interface BentoTile {
    src: string;
    cols: number;
    rows: number;
}

// First bento strip pattern (6 cols × 2 rows = 12 cells)
const bentoStrip1: BentoTile[] = [
    { src: '/gallery/DSC00795.avif', cols: 2, rows: 2 }, // 4 cells - New image
    { src: '/gallery/gallery-new-2.avif', cols: 1, rows: 1 }, // 1 cell
    { src: '/gallery/gallery-new-3.avif', cols: 1, rows: 1 }, // 1 cell
    { src: '/gallery/DSC01157.avif', cols: 2, rows: 1 },     // 2 cells - New image
    { src: '/gallery/gallery-2.avif', cols: 2, rows: 1 },     // 2 cells
    { src: '/gallery/gallery-3.avif', cols: 1, rows: 1 },     // 1 cell
    { src: '/gallery/gallery-4.avif', cols: 1, rows: 1 },     // 1 cell = 12 total
];

// Second bento strip pattern (12 cells)
const bentoStrip2: BentoTile[] = [
    { src: '/gallery/gallery-new-4.avif', cols: 1, rows: 2 }, // 2 cells
    { src: '/gallery/DSC02517.avif', cols: 2, rows: 1 }, // 2 cells - New image
    { src: '/gallery/DSC02587.avif', cols: 2, rows: 2 }, // 4 cells - New image
    { src: '/gallery/gallery-5.avif', cols: 1, rows: 1 },     // 1 cell
    { src: '/gallery/gallery-6.avif', cols: 2, rows: 1 },     // 2 cells
    { src: '/gallery/gallery-new-7.avif', cols: 1, rows: 1 }, // 1 cell = 12 total
];

// Third bento strip pattern (12 cells)
const bentoStrip3: BentoTile[] = [
    { src: '/gallery/gallery-9.avif', cols: 2, rows: 1 },     // 2 cells
    { src: '/gallery/DSC07026.avif', cols: 1, rows: 2 },    // 2 cells - New image
    { src: '/gallery/gallery-new-1.avif', cols: 2, rows: 2 },    // 4 cells
    { src: '/gallery/gallery-7.avif', cols: 1, rows: 1 },     // 1 cell
    { src: '/gallery/gallery-8.avif', cols: 2, rows: 1 },     // 2 cells
    { src: '/gallery/gallery-new-6.avif', cols: 1, rows: 1 },     // 1 cell = 12 total
];

const baseSize = 180; // Base grid cell size in pixels
const gap = 8; // Gap between tiles

const BentoStripComponent: React.FC<{ tiles: BentoTile[]; stripId: string }> = ({ tiles, stripId }) => (
    <div
        className="flex-shrink-0 grid gap-2"
        style={{
            gridTemplateColumns: `repeat(6, ${baseSize}px)`,
            gridTemplateRows: `repeat(2, ${baseSize}px)`,
            gridAutoFlow: 'dense',
        }}
    >
        {tiles.map((tile, index) => (
            <div
                key={`${stripId}-${index}`}
                className="overflow-hidden rounded-xl group"
                style={{
                    gridColumn: `span ${tile.cols}`,
                    gridRow: `span ${tile.rows}`,
                }}
            >
                <img
                    src={tile.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
        ))}
    </div>
);

export const InfiniteBentoCarousel: React.FC<BentoCarouselProps> = ({
    title = "Past Glimpses",
    subtitle,
    speed = 45,
    pauseOnHover = true,
}) => {
    return (
        <div className="py-16 sm:py-20 bg-[#05020a] overflow-hidden">
            {/* Header */}
            <div className="px-4 sm:px-6 md:px-12 lg:px-20 mb-8 sm:mb-12">
                <SectionHeading className="mb-3">{title}</SectionHeading>
                {subtitle && (
                    <p className="text-gray-400 text-base sm:text-lg max-w-xl">{subtitle}</p>
                )}
            </div>

            {/* Full-width Carousel - Row 1 (scrolls left) */}
            <div
                className={`flex gap-4 mb-4 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
                style={{
                    width: 'max-content',
                    animation: `bento-scroll-left ${speed}s linear infinite`,
                }}
            >
                <BentoStripComponent tiles={bentoStrip1} stripId="a1" />
                <BentoStripComponent tiles={bentoStrip2} stripId="b1" />
                <BentoStripComponent tiles={bentoStrip3} stripId="c1" />
                <BentoStripComponent tiles={bentoStrip1} stripId="a2" />
                <BentoStripComponent tiles={bentoStrip2} stripId="b2" />
                <BentoStripComponent tiles={bentoStrip3} stripId="c2" />
            </div>

            {/* Full-width Carousel - Row 2 (scrolls right) */}
            <div
                className={`flex gap-4 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
                style={{
                    width: 'max-content',
                    animation: `bento-scroll-right ${speed * 1.1}s linear infinite`,
                }}
            >
                <BentoStripComponent tiles={bentoStrip3} stripId="d1" />
                <BentoStripComponent tiles={bentoStrip1} stripId="e1" />
                <BentoStripComponent tiles={bentoStrip2} stripId="f1" />
                <BentoStripComponent tiles={bentoStrip3} stripId="d2" />
                <BentoStripComponent tiles={bentoStrip1} stripId="e2" />
                <BentoStripComponent tiles={bentoStrip2} stripId="f2" />
            </div>

            {/* CSS Keyframes */}
            <style>{`
        @keyframes bento-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes bento-scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
        </div>
    );
};

export default InfiniteBentoCarousel;
