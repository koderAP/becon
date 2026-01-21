import React, { useEffect } from 'react';
import { Hero } from '../../components/Hero';
import { SectionSkeleton } from '../../components/ui/SectionSkeleton';
import { useNavigate, useLocation } from 'react-router-dom';
import { About } from '../../components/About';
import { Speakers } from '../../components/Speakers';
import { Verticals } from '../../components/Verticals';
import { Sponsors } from '../../components/Sponsors';
import { Tickets } from '../../components/Tickets';
import { Footer } from '../../components/Footer';
import { InfiniteBentoCarousel } from '../../components/InfiniteBentoCarousel';

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

            <section id="about">
                <About />
            </section>

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

            <section id="verticals">
                <Verticals preview onViewAll={() => navigate('/events')} />
            </section>

            <section id="speakers">
                <Speakers preview onViewAll={() => navigate('/speakers')} />
            </section>

            <section id="gallery">
                <InfiniteBentoCarousel
                    title="Past Glimpses"
                    subtitle="Memories from previous BECon summits"
                    speed={50}
                    pauseOnHover={true}
                />
            </section>

            <section id="sponsors-preview">
                <Sponsors />
            </section>

            <section id="cta">
                <Tickets />
            </section>

            <Footer />
        </div>
    );
};
