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
    { id: 1, type: 'video', url: '/VID-20250118-WA0171.mp4', span: 'col-span-1 md:col-span-2 row-span-2', title: 'Summit Highlights', desc: 'Memorable moments from 2025' },
    { id: 2, type: 'image', url: '/gallery/gallery-1.png', span: 'col-span-1 row-span-1', title: 'BECon Moments', desc: 'Past event highlights' },
    { id: 3, type: 'image', url: '/gallery/gallery-2.png', span: 'col-span-1 row-span-1', title: 'Keynote Sessions', desc: 'Industry leaders on stage' },
    { id: 4, type: 'image', url: '/gallery/gallery-3.png', span: 'col-span-1 row-span-2', title: 'Networking', desc: 'Building connections' },
    { id: 5, type: 'image', url: '/gallery/gallery-4.png', span: 'col-span-1 md:col-span-2 row-span-1', title: 'Engaged Audience', desc: 'Full house at the main stage' },
    { id: 6, type: 'image', url: '/gallery/gallery-5.png', span: 'col-span-1 row-span-1', title: 'Workshops', desc: 'Hands-on learning experiences' },
    { id: 7, type: 'image', url: '/gallery/gallery-6.png', span: 'col-span-1 row-span-1', title: 'Innovation', desc: 'Showcasing future tech' },
    { id: 8, type: 'image', url: '/gallery/gallery-7.png', span: 'col-span-1 row-span-1', title: 'Panel Discussions', desc: 'Expert insights' },
    { id: 9, type: 'image', url: '/gallery/gallery-8.png', span: 'col-span-1 row-span-1', title: 'Speakers', desc: 'Inspiring talks' },
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
