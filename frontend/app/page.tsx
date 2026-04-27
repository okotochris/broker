'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from './component/header';
import Hero from './component/hero';
import Footer from './component/footer';
import TopCryptos from './component/topcrypto';
import GetStarted from './component/howtogetstarted';
import SecuritySection from './component/security';
import FeaturedFeatures from './component/feature';
import Testimonials from './component/testimony';
import TopCoinsSpotlight from './component/topcoins';
import InvestmentPlans from './component/investment';

// Fake live prices (in real app → fetch from backend / CoinGecko)
const mockPrices = [
  { symbol: 'BTC', price: 84250, change: 2.4 },
  { symbol: 'ETH', price: 3850, change: 1.8 },
  { symbol: 'SOL', price: 195, change: -0.7 },
  { symbol: 'ADA', price: 1.24, change: 3.1 },
];

export default function Home() {
  const [prices, setPrices] = useState(mockPrices);
  // Simulate price updates (demo only)
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((p) => ({
          ...p,
          price: Number((p.price * (1 + (Math.random() - 0.5) * 0.004)).toFixed(2)),
          change: Number((Math.random() * 4 - 2).toFixed(1)),
        }))
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', damping: 15 } },
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-950 via-zinc-900 to-black text-white overflow-x-hidden">
    <Header/>
    <Hero/>
  
      {/* Live Prices Ticker */}
    <TopCryptos/>
    <SecuritySection/>
    <FeaturedFeatures/>
    <GetStarted />
      {/* Features */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20"
          >
            Why Traders Choose Capitextradecompany
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                desc: 'Real-time prices, instant trades, zero lag experience.',
              },
              {
                icon: ShieldCheck,
                title: 'Bank-grade Security',
                desc: '2FA, cold storage, encrypted everything — your funds stay safe.',
              },
              {
                icon: TrendingUp,
                title: 'Smart Insights',
                desc: 'Advanced charts, portfolio analytics, profit/loss tracking.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                // variants={item}
                className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-8 hover:border-blue-600/30 transition-all group backdrop-blur-sm"
              >
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-zinc-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Footer-ish */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 border-t border-zinc-800/50 bg-gradient-to-b from-transparent to-zinc-950"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Level Up Your Crypto Game?
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Join thousands of traders already using Capitextradecompany to trade smarter.
          </p>
          <Link
            href="/signin"
            className="inline-flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xl font-semibold hover:brightness-110 hover:scale-105 transition-all shadow-2xl shadow-purple-500/20"
          >
            Create Free Account <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </motion.section>
      <TopCoinsSpotlight/>
      <InvestmentPlans />
      <Testimonials />
      <Footer />
    </div>
  );
}