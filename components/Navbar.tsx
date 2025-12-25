import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  isButton?: boolean;
}

const navItems: NavItem[] = [
  { label: 'About', path: '/#about' },
  { label: 'Events', path: '/events' },
  { label: 'Agenda', path: '/agenda' },
  { label: 'Speakers', path: '/speakers' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'Contact', path: '/contact' },
  { label: 'Log in', path: '/login', isButton: true },
];

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [isCompact, setIsCompact] = useState(false);
  const [showCompactContent, setShowCompactContent] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contentTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      if (!isCompact) {
        setIsCompact(true);
        if (contentTimeoutRef.current) clearTimeout(contentTimeoutRef.current);
        contentTimeoutRef.current = setTimeout(() => {
          setShowCompactContent(true);
        }, 350);
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setShowCompactContent(false);
        setTimeout(() => {
          setIsCompact(false);
        }, 200);
      }, 800);
    } else {
      setShowCompactContent(false);
      if (isCompact) {
        setTimeout(() => setIsCompact(false), 200);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (contentTimeoutRef.current) {
        clearTimeout(contentTimeoutRef.current);
      }
    }
  });

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (contentTimeoutRef.current) clearTimeout(contentTimeoutRef.current);
    };
  }, []);

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  const handleNavClick = (path: string) => {
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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none px-4">
      <motion.div
        initial={false}
        animate={{
          width: isCompact ? 220 : "min(95%, 1280px)",
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
        className="pointer-events-auto rounded-full flex items-center overflow-hidden"
        style={{
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.06)',
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          padding: "12px 32px",
          justifyContent: 'center',
          height: 56, // Fixed height to prevent vertical motion
          minHeight: 56,
          maxHeight: 56,
        }}
      >
        {/* Expanded content - Logo + Nav Items */}
        <div
          className="flex items-center justify-between w-full absolute inset-0 px-8"
          style={{
            opacity: isCompact ? 0 : 1,
            pointerEvents: isCompact ? 'none' : 'auto',
            transition: `opacity 0.3s ease-in-out`,
          }}
        >
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="flex items-center cursor-pointer group">
              <img
                src="/edclogo.avif"
                alt="eDC IIT Delhi"
                className="h-8 w-auto object-contain group-hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex items-center justify-end gap-2">
            {navItems.map((item) => (
              item.isButton ? (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors group ml-3"
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
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full whitespace-nowrap ${isActive(item.path) ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
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
        </div>

        {/* Compact content - Logo + Login only */}
        <div
          className="flex items-center justify-center gap-6 absolute inset-0 px-6"
          style={{
            opacity: showCompactContent ? 1 : 0,
            pointerEvents: showCompactContent ? 'auto' : 'none',
            transition: `opacity 0.3s ease-in-out`,
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer group shrink-0">
            <img
              src="/edclogo.avif"
              alt="eDC IIT Delhi"
              className="h-8 w-auto object-contain group-hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-1.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors group whitespace-nowrap"
          >
            Log in
            <div className="bg-black text-white rounded-full p-0.5 w-4 h-4 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <ArrowUpRight size={10} />
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
