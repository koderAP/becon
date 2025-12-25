import React from 'react';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-black border-t border-white/10 relative overflow-hidden">
            {/* Subtle glow effect at the top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-sm" />

            <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20">
                {/* Brand Section */}
                <div className="lg:max-w-md">
                    <Link to="/" className="inline-block mb-8">
                        <img
                            src="/logo.avif"
                            alt="BECon Logo"
                            className="h-12 w-auto object-contain"
                        />
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                        Empowering the next generation of deep-tech innovators. Join us at BECon 2026 to shape the future.
                    </p>
                </div>

                {/* Right Side Content */}
                <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 lg:gap-32">
                    {/* Links Section */}
                    <div>
                        <h3 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs">Links</h3>
                        <ul className="space-y-4 text-gray-500 text-sm font-medium">
                            <li><Link to="/#about" className="hover:text-white transition-all duration-300 hover:pl-1 block">About</Link></li>
                            <li><Link to="/events" className="hover:text-white transition-all duration-300 hover:pl-1 block">Events</Link></li>
                            <li><Link to="/sponsors" className="hover:text-white transition-all duration-300 hover:pl-1 block">Sponsors</Link></li>
                            <li><Link to="/team" className="hover:text-white transition-all duration-300 hover:pl-1 block">Team</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition-all duration-300 hover:pl-1 block">Terms & Conditions</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-all duration-300 hover:pl-1 block">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Socials Section */}
                    <div>
                        <h3 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs">Socials</h3>
                        <div className="flex items-center gap-4">
                            {[
                                { Icon: Instagram, href: "#" },
                                { Icon: Linkedin, href: "#" },
                                { Icon: Twitter, href: "#" },
                                { Icon: Youtube, href: "#" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 hover:-translate-y-1"
                                >
                                    <social.Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-medium">
                <p>&copy; 2026 eDC IIT Delhi. All rights reserved.</p>
                <div className="flex items-center gap-1 group">
                    <span>Designed with</span>
                    <span className="text-red-500 animate-pulse">❤️</span>
                    <span>by</span>
                    <span className="text-gray-400 group-hover:text-purple-400 transition-colors">eDC Tech Team</span>
                </div>
            </div>
        </footer>
    );
};