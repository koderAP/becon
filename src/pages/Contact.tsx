import React from 'react';
import { Hosts } from '../../components/Hosts';
import { Footer } from '../../components/Footer';

export const Contact: React.FC = () => {
    return (
        <div className="min-h-screen pt-24">
            <Hosts />
            <Footer />
        </div>
    );
};
