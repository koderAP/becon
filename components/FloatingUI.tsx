import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';

export const FloatingUI: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        onClick={() => navigate('/tickets')}
        className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-full font-bold shadow-2xl shadow-purple-900/50 hover:scale-105 transition-transform group"
      >
        <Ticket size={20} className="group-hover:rotate-12 transition-transform" />
        <span>Register Now</span>
      </button>
    </motion.div>
  );
};