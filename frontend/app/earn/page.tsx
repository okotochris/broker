'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Zap, Shield, ArrowRight, Coins } from 'lucide-react';

export default function Earn() {
  const opportunities = [
    {
      title: 'Staking',
      description: 'Earn passive income by staking your crypto assets',
      apy: 'Up to 20% APY',
      icon: Coins,
      features: ['Flexible terms', 'Daily rewards', 'No lock-in period'],
      color: 'from-blue-600 to-blue-400',
    },
    {
      title: 'Yield Farming',
      description: 'Provide liquidity and earn trading fees',
      apy: 'Variable APY',
      icon: TrendingUp,
      features: ['Liquidity mining', 'Reward pools', 'Risk varies'],
      color: 'from-purple-600 to-purple-400',
    },
    {
      title: 'Referral Program',
      description: 'Earn commissions by referring friends',
      apy: 'Up to 30% Commission',
      icon: Zap,
      features: ['Lifetime rewards', 'Easy tracking', 'Instant payouts'],
      color: 'from-orange-600 to-orange-400',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Sign Up',
      description: 'Create your Capitextradecompany account and complete verification',
    },
    {
      number: '02',
      title: 'Deposit',
      description: 'Transfer your crypto assets to your wallet',
    },
    {
      number: '03',
      title: 'Choose Strategy',
      description: 'Select your preferred earning opportunity',
    },
    {
      number: '04',
      title: 'Earn Rewards',
      description: 'Start earning passive income immediately',
    },
  ];

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Earn Passive Income
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            Put your crypto to work and earn rewards through staking, yield farming, and more.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Get Started Now
          </Link>
        </motion.div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Shield, title: 'Secure', desc: 'Bank-grade security' },
            { icon: Zap, title: 'Fast', desc: 'Instant settlements' },
            { icon: TrendingUp, title: 'Transparent', desc: 'Real-time tracking' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-8 text-center hover:border-amber-500/50 transition"
            >
              <item.icon className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-zinc-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Earning Opportunities */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Earning Opportunities
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {opportunities.map((opp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-8 hover:border-amber-500/50 transition overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${opp.color} opacity-10 -mr-16 -mt-16 rounded-full`} />
              
              <opp.icon className="w-12 h-12 text-amber-400 mb-4 relative z-10" />
              <h3 className="text-2xl font-semibold mb-2 relative z-10">{opp.title}</h3>
              <p className="text-zinc-400 mb-4 relative z-10">{opp.description}</p>
              
              <div className={`text-3xl font-bold bg-gradient-to-r ${opp.color} bg-clip-text text-transparent mb-6 relative z-10`}>
                {opp.apy}
              </div>

              <ul className="space-y-2 mb-6 relative z-10">
                {opp.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-lg font-semibold group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-orange-600 group-hover:border-transparent transition flex items-center justify-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[130%] h-0.5 bg-gradient-to-r from-amber-500 to-transparent" />
              )}
              
              <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl p-6 relative z-10">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div className="bg-gradient-to-r from-amber-600/10 to-orange-600/10 border border-amber-500/30 rounded-xl p-12">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { value: '$2.5B+', label: 'Assets Under Management' },
              { value: '500K+', label: 'Active Users' },
              { value: '18%', label: 'Average APY' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-zinc-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-zinc-300 mb-8">
            Join thousands of users already earning passive income with Capitextradecompany.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Create Account
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
