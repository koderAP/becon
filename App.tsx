import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './src/pages/Home';
import { Events } from './src/pages/Events';
import { SpeakersPage } from './src/pages/SpeakersPage';
import { SponsorsPage } from './src/pages/SponsorsPage';
import { Agenda } from './src/pages/Agenda';
import { Contact } from './src/pages/Contact';
import { TicketsPage } from './src/pages/TicketsPage';
import { TeamPage } from './src/pages/TeamPage';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'sonner';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="bg-becon-bg text-white min-h-screen font-sans selection:bg-purple-500 selection:text-white">
        <Navbar />

        <main className="relative z-0">
          <AnimatedRoutes />
        </main>

        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: 'rgba(20, 10, 30, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;