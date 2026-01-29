import React, { useRef, useEffect, useState } from 'react';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (footerRef.current) {
                const rect = footerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        const currentFooter = footerRef.current;
        if (currentFooter) {
            currentFooter.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (currentFooter) {
                currentFooter.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative bg-[#05020a] border-t border-white/5 pt-16 pb-8 overflow-hidden group"
        >
            {/* Dynamic Cursor Spotlight */}
            <div
                className="absolute pointer-events-none inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(1200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15), transparent 40%)`
                }}
            />

            {/* Ambient Background Glows - Increased Intensity */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[2px] bg-gradient-to-r from-transparent via-purple-500/80 to-transparent shadow-[0_0_40px_rgba(168,85,247,0.6)]" />
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Wider Container */}
            <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 mb-8">
                    {/* Brand Column */}
                    <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <Link to="/" className="inline-block mb-8">
                                <img
                                    src="/logo1.avif"
                                    alt="BECon Logo"
                                    className="h-14 w-auto object-contain brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                />
                            </Link>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10 font-light tracking-wide">
                                Empowering the next generation of deep-tech innovators. <br />
                                <span className="text-white font-medium">Join us at BECon 2026</span> to shape the future of technology and entrepreneurship in India.
                            </p>

                            <div className="flex items-center gap-5">
                                {[
                                    { Icon: Instagram, href: "https://www.instagram.com/edc_iitd/" },
                                    { Icon: Linkedin, href: "https://www.linkedin.com/company/edc-iit-delhi/" },
                                    { Icon: Twitter, href: "https://x.com/edciitdelhi" },
                                    { Icon: Youtube, href: "https://www.youtube.com/@edciitd6869" }
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] group"
                                    >
                                        <social.Icon size={20} className="group-hover:stroke-2" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:pl-12">
                        {/* Column 1 */}
                        <div>
                            <h3 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-purple-500 rounded-full"></span> Explore
                            </h3>
                            <ul className="space-y-2">
                                {['Events', 'Sponsors', 'Team', 'Schedule'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to={`/${item.toLowerCase()}`}
                                            className="text-gray-400 text-sm hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                                        >
                                            <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <a
                                        href="https://thedopaminestore.in/collections/becon-iit-delhi"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 text-sm hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        Merch ↗
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <h3 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-purple-500 rounded-full"></span> Legal
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        to="/terms"
                                        className="text-gray-400 text-sm hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/privacy-policy"
                                        className="text-gray-400 text-sm hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/refund-policy"
                                        className="text-gray-400 text-sm hover:text-white transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        Refund Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <h3 className="text-white font-bold mb-6 uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-purple-500 rounded-full"></span> Contact
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/contact" className="text-gray-400 text-sm hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                                        Get in Touch
                                    </Link>
                                </li>
                                <li>
                                    <a href="mailto:team@edciitd.com" className="text-white font-semibold text-base hover:text-purple-400 transition-colors">
                                        team@edciitd.com
                                    </a>
                                </li>
                                <li>
                                    <p className="text-gray-500 text-xs leading-relaxed">
                                        eDC Office, IIT Delhi,<br />
                                        Hauz Khas, New Delhi - 110016
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 text-sm tracking-wide order-2 md:order-1">
                        &copy; 2026 Entrepreneurship Development Cell, IIT Delhi. All rights reserved.
                    </p>

                    <div className="order-1 md:order-2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all cursor-default group">
                        <span className="text-gray-400 text-sm">Designed with</span>
                        <span className="text-red-500 animate-pulse text-base drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">❤️</span>
                        <span className="text-gray-400 text-sm">by</span>
                        <span className="text-white font-semibold text-sm group-hover:text-purple-400 transition-colors">eDC Tech Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};