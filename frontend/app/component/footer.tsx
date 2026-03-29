// components/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Twitter, Linkedin, Github, Send } from 'lucide-react';

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.15 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/broka', label: 'Twitter' },
    { icon: Send, href: 'https://t.me/broka', label: 'Telegram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/broka', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/broka-app', label: 'GitHub' },
  ];

  return (
    <footer className="bg-gradient-to-b from-zinc-950 to-black border-t border-zinc-800/50 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        //   variants={footerVariants}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-12"
        >
          {/* Brand & Tagline */}
          <motion.div variants={childVariants} className="col-span-2 md:col-span-1">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Broka
            </Link>
            <p className="mt-4 text-zinc-500 text-sm leading-relaxed">
              Trade smarter. Grow faster. Secure crypto investments with real-time tools and institutional-grade security.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  variants={childVariants}
                  whileHover={{ scale: 1.15, y: -3 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="text-zinc-500 hover:text-blue-400 transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Products */}
          <motion.div variants={childVariants}>
            <h3 className="text-white font-semibold mb-5 text-lg">Products</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/trade" className="hover:text-blue-400 transition">Spot Trading</Link></li>
              <li><Link href="/futures" className="hover:text-blue-400 transition">Futures</Link></li>
              <li><Link href="/staking" className="hover:text-blue-400 transition">Staking</Link></li>
              <li><Link href="/wallet" className="hover:text-blue-400 transition">Wallet</Link></li>
              <li><Link href="/earn" className="hover:text-blue-400 transition">Earn</Link></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={childVariants}>
            <h3 className="text-white font-semibold mb-5 text-lg">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-blue-400 transition">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition">Blog</Link></li>
              <li><Link href="/press" className="hover:text-blue-400 transition">Press</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={childVariants}>
            <h3 className="text-white font-semibold mb-5 text-lg">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/academy" className="hover:text-blue-400 transition">Crypto Academy</Link></li>
              <li><Link href="/fees" className="hover:text-blue-400 transition">Fees</Link></li>
              <li><Link href="/security" className="hover:text-blue-400 transition">Security</Link></li>
              <li><Link href="/api" className="hover:text-blue-400 transition">API</Link></li>
              <li><Link href="/status" className="hover:text-blue-400 transition">Status</Link></li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={childVariants} className="col-span-2 md:col-span-1 lg:col-auto">
            <h3 className="text-white font-semibold mb-5 text-lg">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to get market insights & updates.</p>
            <form className="flex flex-col  gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                Subscribe <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={childVariants}
          className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500"
        >
          <div>
            © {new Date().getFullYear()} Broka. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-300 transition">Terms of Service</Link>
            <Link href="/risk" className="hover:text-zinc-300 transition">Risk Disclosure</Link>
            <Link href="/compliance" className="hover:text-zinc-300 transition">Compliance</Link>
          </div>

          {/* Trust Badges (placeholders – replace with real SVGs/icons) */}
          <div className="flex gap-4 text-xs opacity-70">
            <span className="px-3 py-1 bg-zinc-800/50 rounded-full">Secure</span>
            <span className="px-3 py-1 bg-zinc-800/50 rounded-full">2FA</span>
            <span className="px-3 py-1 bg-zinc-800/50 rounded-full">Regulated</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}