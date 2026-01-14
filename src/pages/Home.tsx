import React, { useEffect, memo } from 'react';
import { Hero } from '../../components/Hero';
import { About } from '../../components/About';
import { Speakers } from '../../components/Speakers';
import { Verticals } from '../../components/Verticals';
import { Sponsors } from '../../components/Sponsors';
import { Tickets } from '../../components/Tickets';
import { Footer } from '../../components/Footer';
import { InfiniteBentoCarousel } from '../../components/InfiniteBentoCarousel';
import { useNavigate, useLocation } from 'react-router-dom';

const MemoizedHero = memo(Hero);
const MemoizedAbout = memo(About);
const MemoizedSpeakers = memo(Speakers);
const MemoizedVerticals = memo(Verticals);
const MemoizedSponsors = memo(Sponsors);
const MemoizedTickets = memo(Tickets);
const MemoizedFooter = memo(Footer);
const MemoizedCarousel = memo(InfiniteBentoCarousel);

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Scroll to top or specific section on page load
    useEffect(() => {
        if (location.state && (location.state as any).scrollTo === 'tickets') {
            const section = document.getElementById('tickets');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                // Clear state to prevent scrolling on refresh? optional.
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div className="overflow-x-hidden">
            <section id="hero">
                <MemoizedHero />
            </section>

            <section id="about">
                <MemoizedAbout />
            </section>

            <section id="verticals">
                <MemoizedVerticals preview onViewAll={() => navigate('/events')} />
            </section>

            <section id="speakers">
                <MemoizedSpeakers preview onViewAll={() => navigate('/speakers')} />
            </section>

            <section id="gallery">
                <MemoizedCarousel
                    title="Past Glimpses"
                    subtitle="Memories from previous BECon summits"
                    speed={50}
                    pauseOnHover={true}
                />
            </section>

            <section id="sponsors-preview">
                <MemoizedSponsors />
            </section>

            <section id="cta">
                <MemoizedTickets />
            </section>

            <MemoizedFooter />
        </div>
    );
};
