import React from 'react';
import { Sponsors } from '../../components/Sponsors';
import { Footer } from '../../components/Footer';

export const SponsorsPage: React.FC = () => {
    return (
        <div className="min-h-screen pt-24">
            <Sponsors />
            <Footer />
        </div>
    );
};
