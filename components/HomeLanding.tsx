import React from 'react';
import { Hero } from './Hero';
import { About } from './About';
import { Speakers } from './Speakers';
import { Verticals } from './Verticals';
import { Sponsors } from './Sponsors';
import { Tickets } from './Tickets';
import { Footer } from './Footer';
import { Tab } from '../types';

interface HomeLandingProps {
    setTab: (tab: Tab) => void;
}

export const HomeLanding: React.FC<HomeLandingProps> = ({ setTab }) => {
    return (
        <div className="overflow-x-hidden">
            <section id="hero">
                <Hero />
            </section>
            
            <section id="about">
                <About />
            </section>

            <section id="verticals">
                <Verticals preview onViewAll={() => setTab(Tab.EVENTS)} />
            </section>

            <section id="speakers">
                <Speakers preview onViewAll={() => setTab(Tab.SPEAKERS)} />
            </section>

             <section id="sponsors-preview">
                 {/* Reusing main sponsors component but normally would be a preview strip */}
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