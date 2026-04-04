'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, BarChart3, Zap, Shield, ArrowRight } from 'lucide-react';

export default function Futures() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Up to 125x Leverage',
      description: 'Amplify your trading potential with our advanced leverage system',
    },
    {
      icon: BarChart3,
      title: 'Real-time Charts',
      description: 'Advanced charting tools with technical indicators',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Ultra-low latency matching engine for instant executions',
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Built-in stop losses and take profit orders',
    },
  ];

  const contracts = [
    {
      name: 'Bitcoin Perpetual',
      symbol: 'BTCUSDT',
      leverage: '125x',
      volume: '$2.4B daily',
      change: '+5.2%',
    },
    {
      name: 'Ethereum Perpetual',
      symbol: 'ETHUSDT',
      leverage: '125x',
      volume: '$1.2B daily',
      change: '+3.8%',
    },
    {
      name: 'Solana Perpetual',
      symbol: 'SOLUSDT',
      leverage: '75x',
      volume: '$450M daily',
      change: '+12.5%',
    },
    {
      name: 'Ripple Perpetual',
      symbol: 'XRPUSDT',
      leverage: '75x',
      volume: '$320M daily',
      change: '-2.1%',
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
            Futures Trading
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            Trade Bitcoin, Ethereum, and 100+ altcoins with up to 125x leverage on pulseMarket Futures.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Start Trading Now
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Why Choose pulseMarket Futures?
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-red-500/50 transition"
            >
              <feature.icon className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Contracts */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Popular Contracts
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contracts.map((contract, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-red-500/50 transition group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-400">{contract.name}</h3>
                  <p className="text-2xl font-bold group-hover:text-red-400 transition">{contract.symbol}</p>
                </div>
                <span className={`text-sm font-semibold ${contract.change.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                  {contract.change}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Max Leverage</span>
                  <span className="text-red-400 font-semibold">{contract.leverage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">24h Volume</span>
                  <span className="text-white">{contract.volume}</span>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/30 rounded text-sm font-semibold group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-pink-600 group-hover:border-transparent transition flex items-center justify-center gap-1">
                Trade <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trading Tools */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Advanced Trading Tools
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Order Types',
              items: ['Limit Orders', 'Market Orders', 'Stop Loss', 'Take Profit', 'Trailing Stop'],
            },
            {
              title: 'Risk Management',
              items: ['Position Sizing', 'Risk Alerts', 'Portfolio View', 'Net Exposure', 'Liquidation Price'],
            },
            {
              title: 'Analysis',
              items: ['Technical Indicators', 'Price Charts', 'Order Book', 'Trade History', 'P&L Analysis'],
            },
          ].map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-8 hover:border-red-500/50 transition"
            >
              <h3 className="text-xl font-semibold mb-6 text-red-400">{tool.title}</h3>
              <ul className="space-y-3">
                {tool.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-zinc-300">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div className="bg-gradient-to-r from-red-600/10 to-pink-600/10 border border-red-500/30 rounded-xl p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '100+', label: 'Trading Pairs' },
              { value: '$15B+', label: 'Daily Volume' },
              { value: '0.02s', label: 'Avg Execution' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl font-bold text-red-400 mb-2">{stat.value}</div>
                <p className="text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Trade Futures?</h2>
          <p className="text-xl text-zinc-300 mb-8">
            Join thousands of traders already using pulseMarket Futures.
          </p>
          <Link
            href="/logout"
            className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Start Trading
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
