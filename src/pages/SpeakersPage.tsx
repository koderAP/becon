import React from 'react';
import { Speakers } from '../../components/Speakers';
import { Footer } from '../../components/Footer';

export const SpeakersPage: React.FC = () => {
    return (
        <div className="min-h-screen pt-24">
            <Speakers />
            <Footer />
        </div>
    );
};
