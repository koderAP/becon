import React, { useEffect, lazy, Suspense } from 'react';
import { Hero } from '../../components/Hero';
import { SectionSkeleton } from '../../components/ui/SectionSkeleton';
import { useNavigate, useLocation } from 'react-router-dom';

// Lazy load heavy sections
const About = lazy(() => import('../../components/About').then(module => ({ default: module.About })));
const Speakers = lazy(() => import('../../components/Speakers').then(module => ({ default: module.Speakers })));
const Verticals = lazy(() => import('../../components/Verticals').then(module => ({ default: module.Verticals })));
const Sponsors = lazy(() => import('../../components/Sponsors').then(module => ({ default: module.Sponsors })));
const Tickets = lazy(() => import('../../components/Tickets').then(module => ({ default: module.Tickets })));
const Footer = lazy(() => import('../../components/Footer').then(module => ({ default: module.Footer })));
const InfiniteBentoCarousel = lazy(() => import('../../components/InfiniteBentoCarousel').then(module => ({ default: module.InfiniteBentoCarousel })));

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Scroll to top or specific section on page load
    useEffect(() => {
        if (location.state && (location.state as any).scrollTo === 'tickets') {
            const section = document.getElementById('tickets');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div className="overflow-x-hidden">
            <section id="hero">
                <Hero />
            </section>

            <Suspense fallback={<SectionSkeleton />}>
                <section id="about">
                    <About />
                </section>
            </Suspense>

            {/* Video Section */}
            <section className="relative py-16 bg-black">
                <div className="max-w-6xl mx-auto px-4">
                    <video
                        className="w-full rounded-2xl shadow-2xl"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    >
                        <source src="/website_video.webm" type="video/webm" />
                        <source src="/website_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            <Suspense fallback={<SectionSkeleton />}>
                <section id="verticals">
                    <Verticals preview onViewAll={() => navigate('/events')} />
                </section>
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <section id="speakers">
                    <Speakers preview onViewAll={() => navigate('/speakers')} />
                </section>
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <section id="gallery">
                    <InfiniteBentoCarousel
                        title="Past Glimpses"
                        subtitle="Memories from previous BECon summits"
                        speed={50}
                        pauseOnHover={true}
                    />
                </section>
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <section id="sponsors-preview">
                    <Sponsors />
                </section>
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <section id="cta">
                    <Tickets />
                </section>
            </Suspense>

            <Suspense fallback={<div className="h-20 bg-black" />}>
                <Footer />
            </Suspense>
        </div>
    );
};
