import React from 'react';
import { Hero } from '../../components/Hero';
import { About } from '../../components/About';
import { Speakers } from '../../components/Speakers';
import { Verticals } from '../../components/Verticals';
import { Sponsors } from '../../components/Sponsors';
import { Tickets } from '../../components/Tickets';
import { Footer } from '../../components/Footer';
import { InteractiveBentoGallery, MediaItem } from '../../components/BentoGallery';
import { useNavigate } from 'react-router-dom';

const galleryItems: MediaItem[] = [
    { id: 1, type: 'image', url: '/gallery/gallery-new-1.avif', span: 'col-span-1 md:col-span-2 row-span-2', title: 'BECon 2025', desc: 'Highlights from our flagship event' },
    { id: 2, type: 'image', url: '/gallery/gallery-new-2.avif', span: 'col-span-1 row-span-1', title: 'Keynote Sessions', desc: 'Industry leaders on stage' },
    { id: 3, type: 'image', url: '/gallery/gallery-new-3.avif', span: 'col-span-1 row-span-1', title: 'Networking', desc: 'Building connections' },
    { id: 4, type: 'image', url: '/gallery/gallery-new-4.avif', span: 'col-span-1 row-span-2', title: 'Workshops', desc: 'Hands-on learning experiences' },
    { id: 5, type: 'image', url: '/gallery/gallery-new-5.avif', span: 'col-span-1 row-span-1', title: 'Panel Discussions', desc: 'Expert insights' },
    { id: 6, type: 'image', url: '/gallery/gallery-new-6.avif', span: 'col-span-1 md:col-span-2 row-span-1', title: 'Engaged Audience', desc: 'Full house at the main stage' },
    { id: 7, type: 'image', url: '/gallery/gallery-new-7.avif', span: 'col-span-1 row-span-1', title: 'Innovation', desc: 'Showcasing future tech' },
];

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

            <section id="gallery">
                <InteractiveBentoGallery
                    mediaItems={galleryItems}
                    title="Past Glimpses"
                    description="Drag and explore our curated collection of moments from previous summits."
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
