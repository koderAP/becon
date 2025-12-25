import React from 'react';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-black border-t border-white/10 text-center md:text-left">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                {/* Brand Section */}
                <div className="col-span-1 md:col-span-2">
                    <div className="flex justify-center md:justify-start mb-6">
                        <img
                            src="/logo.avif"
                            alt="BECon Logo"
                            className="h-10 sm:h-12 w-auto object-contain"
                        />
                    </div>
                    <p className="text-gray-400 max-w-sm text-sm leading-relaxed mx-auto md:mx-0">
                        Empowering the next generation of deep-tech innovators. Join us at BECon 2026 to shape the future.
                    </p>
                </div>

                {/* Links Section */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Links</h3>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><Link to="/#about" className="hover:text-white transition-colors">About</Link></li>
                        <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
                        <li><Link to="/sponsors" className="hover:text-white transition-colors">Sponsors</Link></li>
                        <li><Link to="/team" className="hover:text-white transition-colors">Team</Link></li>
                        <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Socials Section */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Socials</h3>
                    <div className="flex items-center gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/50 transition-all group">
                            <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-blue-500/50 transition-all group">
                            <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-sky-500/50 transition-all group">
                            <Twitter size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-red-500/50 transition-all group">
                            <Youtube size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                <p>&copy; 2026 eDC IIT Delhi. All rights reserved.</p>
                <p className="flex items-center gap-1">
                    Designed with <span className="text-red-500">♥</span> by eDC Tech Team
                </p>
            </div>
        </footer>
    );
};