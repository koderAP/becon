import React from 'react';
import { motion } from 'framer-motion';

export const Hosts: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 px-6 md:px-20 bg-black flex flex-col lg:flex-row items-center gap-20">
      
      <div className="lg:w-1/2">
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
        >
            <div className="w-12 h-[2px] bg-white"></div>
            <span className="text-lg text-gray-300 uppercase tracking-widest">Our Hosts</span>
        </motion.div>

        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold leading-tight mb-8"
        >
            Meet Our Hosts: The <br />
            Visionaries Behind <span className="text-gray-500">BECon <br /> Tech Summit</span>
        </motion.h1>

        <p className="text-gray-400 text-lg mb-12 max-w-xl">
            The Becon Tech Summit is brought to you by a team of passionate innovators and student leaders. Our hosts are dedicated to shaping the future of technology by bringing together the brightest minds in AI, automation, and digital transformation.
        </p>

        <div className="text-4xl font-handwriting text-gray-500 opacity-80" style={{ fontFamily: 'cursive' }}>
            Signature
        </div>
      </div>

      <div className="lg:w-1/2 grid grid-cols-2 gap-6 h-[600px]">
         <motion.div 
            className="col-span-1 row-span-2 rounded-[40px] overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
         >
            <img src="https://picsum.photos/id/338/400/600" className="w-full h-full object-cover" alt="Host 1" />
         </motion.div>
         <motion.div 
            className="col-span-1 row-span-1 rounded-[40px] overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
         >
             <img src="https://picsum.photos/id/342/400/300" className="w-full h-full object-cover" alt="Host 2" />
         </motion.div>
         <motion.div 
            className="col-span-1 row-span-1 rounded-[40px] overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
         >
             <img src="https://picsum.photos/id/334/400/300" className="w-full h-full object-cover" alt="Host 3" />
         </motion.div>
      </div>

    </div>
  );
};