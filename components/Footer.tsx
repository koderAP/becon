import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="py-20 px-6 md:px-20 bg-black border-t border-white/10 text-center md:text-left">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <h1 className="text-4xl font-bold tracking-tighter text-white mb-4">eDC IIT Delhi</h1>
                    <p className="text-gray-400 max-w-sm">
                        Empowering the next generation of deep-tech innovators. Join us at BECon 2026 to shape the future.
                    </p>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Links</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="hover:text-white cursor-pointer">About</li>
                        <li className="hover:text-white cursor-pointer">Events</li>
                        <li className="hover:text-white cursor-pointer">Sponsors</li>
                        <li className="hover:text-white cursor-pointer">Contact</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Socials</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="hover:text-white cursor-pointer">Instagram</li>
                        <li className="hover:text-white cursor-pointer">LinkedIn</li>
                        <li className="hover:text-white cursor-pointer">Twitter</li>
                        <li className="hover:text-white cursor-pointer">YouTube</li>
                    </ul>
                </div>
            </div>
            <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
                <p>&copy; 2026 eDC IIT Delhi. All rights reserved.</p>
                <p>Designed with ❤️ by eDC Tech Team</p>
            </div>
        </footer>
    );
};