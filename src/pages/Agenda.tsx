import React from 'react';
import { Timeline } from '../../components/Timeline';
import { Footer } from '../../components/Footer';

export const Agenda: React.FC = () => {
    return (
        <div className="min-h-screen pt-24">
            <Timeline />
            <Footer />
        </div>
    );
};
