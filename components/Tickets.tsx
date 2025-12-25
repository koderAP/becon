import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const Tickets: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 px-6 md:px-20 bg-black flex flex-col justify-center relative overflow-hidden">
      
      {/* Background glowing line simulating the "neon stick" in the screenshot */}
      <div className="absolute left-10 md:left-40 top-1/2 -translate-y-1/2 h-[60vh] w-2 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 blur-[4px] opacity-70"></div>
      <div className="absolute left-10 md:left-40 top-1/2 -translate-y-1/2 h-[60vh] w-2 bg-white blur-[10px] opacity-40"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pl-12 md:pl-40">
        <div>
            <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-5xl md:text-6xl font-bold leading-tight mb-12"
            >
                Secure Your Spot at <span className="text-gray-500">BECon <br /> DeepTech Summit Today!</span>
            </motion.h1>

            {/* General Admission Card */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="p-8 rounded-3xl bg-[#130d21] border border-white/10 relative overflow-hidden group hover:border-purple-500/50 transition-colors"
            >
                <div className="absolute top-0 right-0 p-3 bg-white/10 rounded-bl-2xl text-xs uppercase font-bold tracking-widest">General Admission</div>
                <h3 className="text-2xl font-bold mb-4">General Admission</h3>
                <p className="text-gray-400 text-sm mb-6 max-w-md">Access to the main stage, exhibitions, and standard networking sessions throughout the summit.</p>
                
                <ul className="space-y-3 mb-8 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><div className="w-1 h-4 bg-purple-500"></div> Entry to keynote sessions</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-4 bg-purple-500"></div> Access to tech expo floor</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-4 bg-purple-500"></div> Standard networking lounge</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-4 bg-purple-500"></div> Summit welcome kit</li>
                </ul>
            </motion.div>

             {/* Campus Ambassador Card */}
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-8 p-8 rounded-3xl bg-[#130d21] border border-white/10 relative overflow-hidden group hover:border-purple-500/50 transition-colors"
            >
                 <h3 className="text-2xl font-bold mb-4">Campus Ambassador</h3>
                 <p className="text-gray-400 text-sm mb-6 max-w-md">The initiative recruits motivated students from across campus to promote the event and its goals.</p>
                 <ul className="space-y-3 mb-8 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><div className="w-1 h-4 bg-purple-500"></div> Prize Pool of worth 30k+</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-4 bg-purple-500"></div> Certificate of Completion</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-4 bg-purple-500"></div> Exclusive entry to events</li>
                </ul>
            </motion.div>
        </div>

        <div className="space-y-8 flex flex-col justify-center">
             {/* Ticket Style Cards (Purple Gradient Backgrounds) */}
             <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="h-80 rounded-3xl p-8 relative flex flex-col justify-between overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #2e1065 0%, #000000 100%)' }}
             >
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                <div>
                     <div className="inline-block px-3 py-1 rounded-full border border-white/20 text-xs mb-4">Early Bird</div>
                     <h3 className="text-2xl font-light text-white">Single admission</h3>
                </div>
                
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-between px-6 transition-all border border-white/5">
                    <span>Register</span>
                    <ArrowUpRight size={20} />
                </button>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="h-80 rounded-3xl p-8 relative flex flex-col justify-between overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #000000 100%)' }}
             >
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                <div>
                     <div className="inline-block px-3 py-1 rounded-full border border-white/20 text-xs mb-4">Early Bird</div>
                     <h3 className="text-2xl font-light text-white">Single admission</h3>
                </div>
                
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-between px-6 transition-all border border-white/5">
                    <span>Register</span>
                    <ArrowUpRight size={20} />
                </button>
             </motion.div>
        </div>
      </div>
    </div>
  );
};