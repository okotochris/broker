'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, TrendingUp, Calendar, Zap, ArrowRight } from 'lucide-react';

export default function Staking() {
  const stakingPools = [
    {
      name: 'Bitcoin Staking',
      symbol: 'BTC',
      apy: '8.5%',
      minAmount: '0.001 BTC',
      lockPeriod: 'Flexible',
      totalStaked: '$250M',
    },
    {
      name: 'Ethereum Staking',
      symbol: 'ETH',
      apy: '6.2%',
      minAmount: '0.1 ETH',
      lockPeriod: 'Flexible',
      totalStaked: '$480M',
    },
    {
      name: 'Solana Staking',
      symbol: 'SOL',
      apy: '12.3%',
      minAmount: '1 SOL',
      lockPeriod: 'Flexible',
      totalStaked: '$180M',
    },
    {
      name: 'Polkadot Staking',
      symbol: 'DOT',
      apy: '15.8%',
      minAmount: '10 DOT',
      lockPeriod: 'Flexible',
      totalStaked: '$95M',
    },
  ];

  const benefits = [
    {
      icon: Lock,
      title: 'Secure Staking',
      description: 'Your assets are protected with enterprise-grade security',
    },
    {
      icon: TrendingUp,
      title: 'Consistent Returns',
      description: 'Daily compounding rewards directly to your wallet',
    },
    {
      icon: Calendar,
      title: 'Flexible Terms',
      description: 'No lock-in periods - stake and unstake anytime',
    },
    {
      icon: Zap,
      title: 'Instant Rewards',
      description: 'Rewards calculated and paid in real-time',
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Stake and Earn
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            Generate passive income by staking your crypto with Capitextradecompany. Earn up to 15.8% APY on your holdings.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Start Staking
          </Link>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Why Stake with Capitextradecompany?
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-green-500/50 transition"
            >
              <benefit.icon className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-zinc-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Staking Pools */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Available Staking Pools
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stakingPools.map((pool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-green-500/50 transition group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-400">{pool.name}</p>
                  <p className="text-2xl font-bold group-hover:text-green-400 transition">{pool.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">APY</p>
                  <p className="text-2xl font-bold text-green-400">{pool.apy}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm border-t border-zinc-800/50 pt-4">
                <div className="flex justify-between text-zinc-400">
                  <span>Min Amount:</span>
                  <span className="text-white">{pool.minAmount}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Lock Period:</span>
                  <span className="text-white">{pool.lockPeriod}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Total Staked:</span>
                  <span className="text-white">{pool.totalStaked}</span>
                </div>
              </div>

              <button className="w-full py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-md text-sm font-semibold group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 group-hover:border-transparent transition flex items-center justify-center gap-1">
                Stake <ArrowRight className="w-3 h-3" />
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
          How Staking Works
        </motion.h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Choose Asset',
              description: 'Select from 20+ cryptocurrencies to stake',
            },
            {
              step: '02',
              title: 'Deposit Crypto',
              description: 'Transfer your holdings to your staking wallet',
            },
            {
              step: '03',
              title: 'Start Earning',
              description: 'Rewards are calculated and accrued daily',
            },
            {
              step: '04',
              title: 'Claim Rewards',
              description: 'Withdraw your rewards at any time',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {i < 3 && (
                <div className="hidden md:block absolute top-12 left-[55%] w-[100%] h-0.5 bg-gradient-to-r from-green-500 to-transparent" />
              )}
              
              <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6 relative z-10">
                <div className="text-4xl font-bold text-green-400 mb-3">{item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/30 rounded-xl p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: '20+', label: 'Supported Assets' },
              { value: '$1.2B', label: 'Total Value Staked' },
              { value: '150K+', label: 'Active Stakers' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">{stat.value}</div>
                <p className="text-zinc-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {[
            { q: 'When do I receive staking rewards?', a: 'Rewards are calculated and paid daily. You can claim them at any time.' },
            { q: 'Is there a minimum staking amount?', a: 'Each asset has different minimums. Bitcoin minimum is 0.001 BTC, Ethereum is 0.1 ETH, etc.' },
            { q: 'Can I unstake my crypto?', a: 'Yes, unstaking is instant with no lock-in period.' },
          ].map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-green-500/50 transition"
            >
              <h3 className="text-lg font-semibold mb-2 text-green-400">{faq.q}</h3>
              <p className="text-zinc-400">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold mb-6">Start Earning Today</h2>
          <p className="text-xl text-zinc-300 mb-8">
            Join thousands of users earning passive income through Capitextradecompany Staking.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Stake Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
