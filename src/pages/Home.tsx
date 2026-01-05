import React, { useEffect } from 'react';
import { Hero } from '../../components/Hero';
import { About } from '../../components/About';
import { Speakers } from '../../components/Speakers';
import { Verticals } from '../../components/Verticals';
import { Sponsors } from '../../components/Sponsors';
import { Tickets } from '../../components/Tickets';
import { Footer } from '../../components/Footer';
import { InfiniteBentoCarousel } from '../../components/InfiniteBentoCarousel';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
    const navigate = useNavigate();

    // Scroll to top on page load/refresh
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="overflow-x-hidden">
            <section id="hero">
                <Hero />
            </section>

            <section id="about">
                <About />
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
