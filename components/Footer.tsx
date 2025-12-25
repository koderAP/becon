import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-black border-t border-white/10 text-center md:text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                <div className="col-span-1 sm:col-span-2">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter text-white mb-3 sm:mb-4">eDC IIT Delhi</h1>
                    <p className="text-gray-400 max-w-sm text-sm sm:text-base mx-auto md:mx-0">
                        Empowering the next generation of deep-tech innovators. Join us at BECon 2026 to shape the future.
                    </p>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-3 sm:mb-4 uppercase tracking-widest text-xs sm:text-sm">Links</h3>
                    <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                        <li className="hover:text-white cursor-pointer transition-colors">About</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Events</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Sponsors</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-3 sm:mb-4 uppercase tracking-widest text-xs sm:text-sm">Socials</h3>
                    <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                        <li className="hover:text-white cursor-pointer transition-colors">Instagram</li>
                        <li className="hover:text-white cursor-pointer transition-colors">LinkedIn</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Twitter</li>
                        <li className="hover:text-white cursor-pointer transition-colors">YouTube</li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs text-gray-500">
                <p>&copy; 2026 eDC IIT Delhi. All rights reserved.</p>
                <p>Designed with ❤️ by eDC Tech Team</p>
            </div>
        </footer>
    );
};