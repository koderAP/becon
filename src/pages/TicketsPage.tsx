import React from 'react';
import { Tickets as TicketsSection } from '../../components/Tickets';
import { Footer } from '../../components/Footer';

export const TicketsPage: React.FC = () => {
    return (
        <div className="min-h-screen pt-24">
            <TicketsSection />
            <Footer />
        </div>
    );
};
