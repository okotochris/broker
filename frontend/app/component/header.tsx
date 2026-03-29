// components/Header.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: { x: '100%', opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
    open: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const lineVariants = {
    closed: { rotate: 0, y: 0, opacity: 1 },
    open: (i: number) => ({
      rotate: i === 0 ? 45 : i === 1 ? -45 : 0,
      y: i === 0 ? 6 : i === 1 ? -6 : 0,
      opacity: i === 2 ? 0 : 1,
      transition: { duration: 0.3 },
    }),
  };

  const navLinks = [
    { href: '/market', label: 'Markets' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-5%] right-[-15%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-zinc-950/70 border-b border-zinc-800/60"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Broka
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-300 hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-5 py-2 rounded-full border border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-white transition-all"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium text-white hover:brightness-110 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            <motion.div className="flex flex-col justify-center items-center w-8 h-8" animate={isOpen ? 'open' : 'closed'}>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={lineVariants}
                  className="bg-white block w-6 h-0.5 rounded-full my-1"
                />
              ))}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
          
            className="fixed inset-0 bg-zinc-950/95 backdrop-blur-xl z-40 md:hidden flex flex-col overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-10 text-2xl font-medium pt-20">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-200 hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex flex-col items-center gap-6 mt-10">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-10 py-4 rounded-full border border-zinc-600 text-zinc-200 hover:border-zinc-400 hover:text-white transition-all text-xl"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:brightness-110 transition-all text-xl shadow-lg shadow-purple-500/20"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}