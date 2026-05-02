'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Shield, Zap, Users, TrendingUp, Lock, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image'; 
import Header from '../component/header';
import Footer from '../component/footer';
import Link from 'next/link';
import InvestmentPopup from '../component/getRandomItem';

export default function AboutPage() {
  const [currentCoinIndex, setCurrentCoinIndex] = useState(0);
  
  // Popular coins to rotate in hero background
  const coinImages = [
    'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
    'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    'https://assets.coingecko.com/coins/images/5/large/cardano.png?1696501636',
    'https://assets.coingecko.com/coins/images/4128/large/solana.png?1718769756',
    'https://assets.coingecko.com/coins/images/12504/large/polkadot.png?1696512286',
    'https://assets.coingecko.com/coins/images/825/large/ripple-xrp-logo.png?1696502403',
  ];

  // Rotate coins every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCoinIndex((prev) => (prev + 1) % coinImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [coinImages.length]);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const features = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Your assets are protected with enterprise-grade security protocols and multi-layer encryption.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience instant transactions and real-time market data with our optimized infrastructure.',
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Make informed decisions with comprehensive market analysis and trading insights.',
    },
    {
      icon: Lock,
      title: 'Private & Secure',
      description: 'Your private keys stay with you. We never store sensitive information on our servers.',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Trade 24/7 from anywhere in the world with support for multiple currencies and payment methods.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of traders in our active community and share strategies with like-minded investors.',
    },
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Platform Launch',
      description: 'We officially launched our cryptocurrency trading platform to the public.',
    },
    {
      year: '2025',
      title: 'Market Expansion',
      description: 'Expanded to 50+ countries and added support for 200+ cryptocurrencies.',
    },
    {
      year: '2026',
      title: 'AI Integration',
      description: 'Introduced AI-powered trading signals and predictive market analysis tools.',
    },
  ];

  const stats = [
    { number: '1M+', label: 'Active Users' },
    { number: '$10B+', label: 'Trading Volume' },
    { number: '200+', label: 'Cryptocurrencies' },
    { number: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      <Header />

      {/* Hero Section */}
{/* Hero Section - Fixed with next/image */}
<section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
  {/* Background Layer */}
  <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black z-0" />

  {/* Animated Coin Background */}
  <AnimatePresence mode="wait">
    <motion.div
      key={currentCoinIndex}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="absolute inset-0 flex items-center justify-center z-10"
    >
      <div className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px]">
        <Image
          src={coinImages[currentCoinIndex]}
          alt="Featured Cryptocurrency"
          fill
          className="object-contain drop-shadow-2xl"
          priority
          sizes="(max-width: 768px) 500px, 700px"
        />
      </div>
    </motion.div>
  </AnimatePresence>

  {/* Overlay Gradient for better text readability */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-20" />

  {/* Content */}
  <div className="relative z-30 max-w-4xl mx-auto text-center px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent leading-tight">
        About Our Broker
      </h1>
      
      <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
        We are building the future of cryptocurrency trading. Our mission is to make digital asset trading 
        accessible, secure, and rewarding for everyone — from beginners to professional traders.
      </p>
    </motion.div>

    {/* CTA Buttons */}
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
    >
      <Link 
        href="/register"
        className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl font-semibold text-lg hover:brightness-110 transition"
      >
        Join Capitextradecompany Today
      </Link>
      <Link 
        href="/markets"
        className="px-10 py-4 border border-zinc-500 rounded-2xl font-semibold text-lg hover:bg-white/10 transition"
      >
        Explore Markets
      </Link>
    </motion.div>
  </div>

  {/* Scroll Indicator */}
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5 }}
    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 text-sm flex flex-col items-center"
  >
    Scroll to explore
    <div className="w-px h-12 bg-gradient-to-b from-transparent via-zinc-500 to-transparent mt-2" />
  </motion.div>
</section>
    

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                {stat.number}
              </p>
              <p className="text-zinc-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <div className="space-y-4 text-zinc-300">
              <p>
                We believe cryptocurrency trading should be democratic, transparent, and accessible to everyone. 
                Our platform eliminates barriers and empowers individuals to take control of their financial future.
              </p>
              <p>
                With cutting-edge technology and a user-centric approach, we&apos;re committed to providing the best 
                trading experience in the industry.
              </p>
              <p>
                Security, reliability, and innovation are at the core of everything we do.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-blue-500/20"
          >
            <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Industry-leading security infrastructure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Competitive trading fees and low minimums</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>24/7 customer support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Advanced trading tools and analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">✓</span>
                <span>Mobile-first platform design</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Our Core Features
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Everything you need for successful cryptocurrency trading
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  variants={item}
                  className="bg-zinc-800/50 rounded-lg p-8 border border-zinc-700 hover:border-blue-500/50 transition group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-zinc-400">
              Milestones in our growth and innovation
            </p>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                    <span className="text-lg font-bold">{item.year}</span>
                  </div>
                </div>
                <div className="flex-1 bg-zinc-800/50 rounded-lg p-6 border border-zinc-700">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 md:px-8 bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              The principles that guide our decisions and shape our culture
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Transparency',
                description: 'We believe in open communication with our users. No hidden fees or surprise changes.',
              },
              {
                title: 'Security',
                description: 'Your assets and data are our top priority. We invest heavily in security infrastructure.',
              },
              {
                title: 'Innovation',
                description: 'We constantly evolve to provide the best trading experience and latest features.',
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={item}
                className="bg-zinc-800/50 rounded-lg p-8 border border-zinc-700 text-center"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-400">{value.title}</h3>
                <p className="text-zinc-400">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Join thousands of traders already using our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-blue-500 rounded-lg font-semibold hover:bg-blue-500/10 transition"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <InvestmentPopup />
    </div>
  );
}
