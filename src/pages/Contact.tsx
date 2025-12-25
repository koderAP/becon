import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroBackground } from '../../components/HeroBackground';
import { Footer } from '../../components/Footer';
import { Mail, MapPin, Phone, Send, MessageSquare, User, AtSign, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formState);
    };

    return (
        <div className="min-h-screen bg-[#05020a] text-white font-sans selection:bg-purple-500 selection:text-white">
            <HeroBackground />

            <div className="relative z-20 pt-32 pb-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6"
                    >
                        <MessageSquare className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-200">Get in Touch</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                    >
                        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Us</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Have questions about BECon'26? We're here to help. Reach out to us and we'll get back to you as soon as possible.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Contact Info Column */}
                    <div className="space-y-8">
                        {/* Info Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 transition-colors"
                        >
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <MapPin className="text-purple-400" /> Visit Us
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Entrepreneurship Development Cell,<br />
                                Indian Institute of Technology Delhi,<br />
                                Hauz Khas, New Delhi - 110016
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="grid sm:grid-cols-2 gap-6"
                        >
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-blue-500/30 transition-colors">
                                <Mail className="w-8 h-8 text-blue-400 mb-4" />
                                <h4 className="font-semibold text-lg mb-1">Email Us</h4>
                                <a href="mailto:contact@becon.in" className="text-gray-400 hover:text-white transition-colors">contact@becon.in</a>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-pink-500/30 transition-colors">
                                <Phone className="w-8 h-8 text-pink-400 mb-4" />
                                <h4 className="font-semibold text-lg mb-1">Call Us</h4>
                                <a href="tel:+911126597135" className="text-gray-400 hover:text-white transition-colors">+91 11 2659 7135</a>
                            </div>
                        </motion.div>

                        {/* Map Preview (Placeholder for iframe) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="h-64 rounded-3xl overflow-hidden border border-white/10 relative group"
                        >
                            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                                {/* Replace this with actual Google Maps iframe */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.3869279401735!2d77.19069697621406!3d28.52809797576435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sIndian%20Institute%20of%20Technology%20Delhi!5e0!3m2!1sen!2sin!4v1703668128362!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem]"
                    >
                        <h3 className="text-3xl font-bold mb-8">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Your Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                                <div className="relative">
                                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    rows={5}
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group"
                            >
                                Send Message
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
