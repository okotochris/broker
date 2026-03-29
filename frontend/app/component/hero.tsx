'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AnimationIcon  from '../component/animatedcoin'

// Optional: tiny live stats simulation
const stats = [
  { label: '24h Volume', value: '$4.2B' },
  { label: 'Active Traders', value: '1.8M+' },
  { label: 'Supported Assets', value: '420+' },
];

export default function Hero() {
  const [activeStat, setActiveStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 md:pt-0 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-indigo-950/20 to-purple-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.12),transparent_40%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.10),transparent_50%)] animate-pulse-slow delay-3000" />
      </div>

      {/* Floating subtle particles / orbs (CSS only) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-float-slow delay-2000" />
        <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl animate-float" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text + CTA */}
        <div className="text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-5xl sm:text-6xl md:text-7xl  font-black tracking-tight mb-8 bg-gradient-to-br from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight"
          >
            Trade Crypto
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Without Limits</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-300 max-w-xl mx-auto md:mx-0 mb-10"
          >
            Instant trades, real-time insights, institutional-grade security — built for serious traders and newcomers alike.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 100 }}
            className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start"
          >
            <Link
              href="/register"
              className="group relative px-10 py-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl font-bold text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-600/50 hover:scale-[1.03] transition-all duration-400 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Get Started <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </Link>

            <Link
              href="/demo"
              className="px-10 py-6 border-2 border-zinc-600/70 rounded-2xl font-semibold hover:bg-zinc-800/40 hover:border-zinc-500 backdrop-blur-sm transition-all"
            >
              Explore Demo
            </Link>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-12 flex flex-wrap justify-center md:justify-start gap-8 text-sm text-zinc-400"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`transition-opacity duration-800 ${i === activeStat ? 'opacity-100' : 'opacity-40'}`}
              >
                <div className="font-mono text-2xl font-bold text-white">{stat.value}</div>
                <div>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Visual mock (dashboard preview / animated coins) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 0.5, type: 'spring' }}
          className="hidden md:block relative"
        >
          <div className="bg-gradient-to-br from-zinc-900/80 to-black/60 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-8 shadow-2xl shadow-black/60">
            {/* Mock dashboard content – replace with real chart / 3D later */}
            <div className="h-80 flex items-center justify-center text-zinc-500 text-xl font-mono">
             <AnimationIcon />
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-purple-500/30 rounded-full blur-2xl animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}