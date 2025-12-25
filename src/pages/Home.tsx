import React from 'react';
import { Hero } from '../../components/Hero';
import { About } from '../../components/About';
import { Speakers } from '../../components/Speakers';
import { Verticals } from '../../components/Verticals';
import { Sponsors } from '../../components/Sponsors';
import { Tickets } from '../../components/Tickets';
import { Footer } from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
    const navigate = useNavigate();

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

            <section id="sponsors-preview">
                <div className="py-20 bg-black/50">
                    <Sponsors />
                </div>
            </section>

            <section id="cta">
                <Tickets />
            </section>

            <Footer />
        </div>
    );
};
