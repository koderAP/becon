import React from 'react';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="relative bg-[#05020a] border-t border-white/5 pt-20 pb-10 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.4)]" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-5 lg:col-span-5">
                        <Link to="/" className="inline-block mb-6">
                            <img
                                src="/logo.avif"
                                alt="BECon Logo"
                                className="h-10 w-auto object-contain brightness-100 hover:brightness-110 transition-all"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8 font-light">
                            Empowering the next generation of deep-tech innovators. Join us at BECon 2026 to shape the future of technology and entrepreneurship in India.
                        </p>

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
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 hover:-translate-y-1 group"
                                >
                                    <social.Icon size={18} className="group-hover:stroke-2" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="md:col-span-7 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {/* Column 1 */}
                        <div>
                            <h3 className="text-white font-bold mb-6 uppercase tracking-[0.15em] text-xs">Explore</h3>
                            <ul className="space-y-3">
                                <li><Link to="/events" className="text-gray-500 text-sm hover:text-white transition-colors duration-300 hover:pl-1 block">Events</Link></li>
                                <li><Link to="/sponsors" className="text-gray-500 text-sm hover:text-white transition-colors duration-300 hover:pl-1 block">Sponsors</Link></li>
                                <li><Link to="/team" className="text-gray-500 text-sm hover:text-white transition-colors duration-300 hover:pl-1 block">Team</Link></li>
                                <li><Link to="/schedule" className="text-gray-500 text-sm hover:text-white transition-colors duration-300 hover:pl-1 block">Schedule</Link></li>
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <h3 className="text-white font-bold mb-6 uppercase tracking-[0.15em] text-xs">Legal</h3>
                            <ul className="space-y-3">
                                <li><Link to="/terms" className="text-gray-500 text-sm hover:text-white transition-colors duration-300 hover:pl-1 block">Terms & Conditions</Link></li>
                                <li><Link to="/privacy" className="text-gray-500 text-sm hover:text-white transition-colors duration-300 hover:pl-1 block">Privacy Policy</Link></li>
                                <li><Link to="/guidelines" className="text-gray-500 text-sm hover:text-white transition-colors duration-300 hover:pl-1 block">Community Guidelines</Link></li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <h3 className="text-white font-bold mb-6 uppercase tracking-[0.15em] text-xs">Contact</h3>
                            <ul className="space-y-3">
                                <li><Link to="/contact" className="text-gray-500 text-sm hover:text-white transition-colors duration-300 hover:pl-1 block">Get in Touch</Link></li>
                                <li><a href="mailto:contact@becon.in" className="text-gray-500 text-sm hover:text-white transition-colors duration-300 hover:pl-1 block">contact@becon.in</a></li>
                                <li><span className="text-gray-500 text-sm block mt-2">IIT Delhi, Hauz Khas,<br />New Delhi - 110016</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                    <p className="text-gray-600 font-medium tracking-wide">&copy; 2026 eDC IIT Delhi. All rights reserved.</p>
                    <div className="flex items-center gap-1.5 group px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <span className="text-gray-500">Designed with</span>
                        <span className="text-red-500 animate-pulse text-sm">❤️</span>
                        <span className="text-gray-500">by</span>
                        <span className="text-gray-300 font-semibold group-hover:text-purple-400 transition-colors">eDC Tech Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};