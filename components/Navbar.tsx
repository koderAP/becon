import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  isButton?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Events', path: '/events' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Speakers', path: '/speakers' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'Team', path: '/team' },
  { label: 'Contact', path: '/contact' },
  { label: 'Log in', path: '/login', isButton: true },
];

export const Navbar: React.FC = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [showCompactContent, setShowCompactContent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY.current;

          if (scrollTimeout) clearTimeout(scrollTimeout);

          if (currentScrollY < 80) {
            if (isCompact) {
              setShowCompactContent(false);
              setTimeout(() => setIsCompact(false), 100);
            }
          }
          else if (scrollDelta > 15 && currentScrollY > 150) {
            if (!isCompact) {
              setIsCompact(true);
              setTimeout(() => setShowCompactContent(true), 250);
            }
          }
          else if (scrollDelta < -8) {
            if (isCompact) {
              setShowCompactContent(false);
              setTimeout(() => setIsCompact(false), 100);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isCompact]);

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(path.substring(2));
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(path.substring(2));
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center pt-6 pointer-events-none px-4">
        <motion.div
          initial={false}
          animate={{
            width: isCompact ? 240 : "min(95%, 1280px)",
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="pointer-events-auto rounded-full flex items-center overflow-hidden"
          style={{
            boxShadow: '0 8px 32px -8px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.06)',
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            padding: "12px 32px",
            justifyContent: 'center',
            height: 56,
            minHeight: 56,
            maxHeight: 56,
          }}
        >
          {/* Expanded content */}
          <motion.div
            className="flex items-center justify-between w-full absolute inset-0 px-8"
            initial={false}
            animate={{ opacity: isCompact ? 0 : 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ pointerEvents: isCompact ? 'none' : 'auto' }}
          >
            <div className="shrink-0 flex items-center">
              <Link to="/" className="flex items-center cursor-pointer group">
                <img src="/edclogo.avif" alt="eDC IIT Delhi" className="h-8 w-auto object-contain group-hover:opacity-80 transition-opacity" />
              </Link>
            </div>

            <div className="flex items-center justify-end gap-1 lg:gap-2">
              {navItems.map((item) => (
                item.isButton ? (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors group ml-2"
                  >
                    {item.label}
                    <div className="bg-black text-white rounded-full p-0.5 w-4 h-4 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                      <ArrowUpRight size={10} />
                    </div>
                  </Link>
                ) : (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`relative px-2 lg:px-3 py-1.5 text-sm font-medium transition-colors rounded-full whitespace-nowrap ${isActive(item.path) ? 'text-white' : 'text-gray-400 hover:text-purple-400'}`}
                  >
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/10 rounded-full"
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                )
              ))}
            </div>
          </motion.div>

          {/* Compact content */}
          <motion.div
            className="flex items-center justify-center gap-6 absolute inset-0 px-6"
            initial={false}
            animate={{ opacity: showCompactContent ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ pointerEvents: showCompactContent ? 'auto' : 'none' }}
          >
            <Link to="/" className="flex items-center cursor-pointer group shrink-0">
              <img src="/edclogo.avif" alt="eDC IIT Delhi" className="h-8 w-auto object-contain group-hover:opacity-80 transition-opacity" />
            </Link>

            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors group whitespace-nowrap"
            >
              Log in
              <div className="bg-black text-white rounded-full p-0.5 w-4 h-4 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                <ArrowUpRight size={10} />
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between px-4 py-4 bg-[#05020a]/80 backdrop-blur-md">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/edclogo.avif" alt="eDC IIT Delhi" className="h-8 w-auto" />
          </Link>

          {/* Hamburger Button - 4 dot grid style */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10"
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-white" />
            ) : (
              <div className="grid grid-cols-2 gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-[#05020a]/95 backdrop-blur-lg border-t border-white/10"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navItems.filter(item => !item.isButton).map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive(item.path)
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'text-gray-300 hover:bg-white/5 hover:text-purple-400'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Login Button */}
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-white text-black rounded-xl text-base font-semibold hover:bg-gray-200 transition-colors"
                >
                  Log in
                  <ArrowUpRight size={18} />
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
