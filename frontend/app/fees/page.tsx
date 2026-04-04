'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { DollarSign, TrendingUp, Wallet, Zap, ArrowRight, Info } from 'lucide-react';

export default function Fees() {
  const feeStructure = [
    {
      category: 'Spot Trading',
      taker: '0.10%',
      maker: '0.05%',
      description: 'Regular buy and sell orders',
    },
    {
      category: 'Futures Trading',
      taker: '0.05%',
      maker: '0.02%',
      description: 'Perpetual and quarterly contracts',
    },
    {
      category: 'Staking Fees',
      taker: '0%',
      maker: '10-15% of rewards',
      description: 'Earn rewards on your holdings',
    },
    {
      category: 'Withdrawal Fees',
      taker: 'Network dependent',
      maker: 'Variable',
      description: 'Based on blockchain network costs',
    },
  ];

  const discounts = [
    {
      tier: 'VIP 1',
      requirement: '$10K USD held',
      discount: '10% fee discount',
      benefits: ['Priority support', 'Higher withdrawal limits'],
    },
    {
      tier: 'VIP 2',
      requirement: '$50K USD held',
      discount: '20% fee discount',
      benefits: ['Dedicated account manager', 'API access', 'Custom limits'],
    },
    {
      tier: 'VIP 3',
      requirement: '$250K USD held',
      discount: '30% fee discount',
      benefits: ['White-glove service', 'Custom fee structure', 'Priority features'],
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
          <DollarSign className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Transparent Fees
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            Competitive trading fees with no hidden charges. The more you trade, the more you save.
          </p>
        </motion.div>
      </section>

      {/* Fee Disclaimer */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 flex items-start gap-4"
        >
          <Info className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-400 mb-2">Maker vs Taker Fees</h3>
            <p className="text-sm text-zinc-300">
              Maker fees apply when you post an order that sits on the order book. Taker fees apply when your order immediately matches an existing order.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Standard Fee Structure */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Standard Fee Structure
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {feeStructure.map((fee, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-yellow-500/50 transition"
            >
              <h3 className="text-lg font-semibold mb-2 text-yellow-400">{fee.category}</h3>
              <p className="text-xs text-zinc-500 mb-4">{fee.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-400">Taker</span>
                  <span className="text-lg font-bold">{fee.taker}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-400">Maker</span>
                  <span className="text-lg font-bold">{fee.maker}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VIP Tier Benefits */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          VIP Membership Tiers
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {discounts.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="group bg-gradient-to-br from-orange-900/20 to-yellow-900/20 border border-yellow-500/30 rounded-xl p-8 hover:border-yellow-500/60 transition"
            >
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">{tier.tier}</h3>
              <p className="text-sm text-zinc-400 mb-4">Requirement</p>
              <p className="text-lg font-semibold mb-4">{tier.requirement}</p>
              
              <div className="bg-yellow-500/10 rounded-lg p-4 mb-6">
                <p className="text-xs text-zinc-500 mb-1">Fee Discount</p>
                <p className="text-2xl font-bold text-yellow-400">{tier.discount}</p>
              </div>

              <h4 className="text-sm font-semibold text-zinc-300 mb-3">Additional Benefits</h4>
              <ul className="space-y-2">
                {tier.benefits.map((benefit, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <button className="w-full mt-6 py-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg text-sm font-semibold group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-orange-600 group-hover:border-transparent transition">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Fees */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Additional Fees & Charges
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: 'Deposit Fees',
              items: ['Fiat deposits: 0%', 'Crypto deposits: 0%', 'Bank transfer: Variable'],
            },
            {
              title: 'Account Fees',
              items: ['Account creation: Free', 'Account maintenance: Free', 'Sub account: $10/month (optional)'],
            },
            {
              title: 'Conversion Fees',
              items: ['Instant conversion: 0.5%', 'Market conversion: 0.1%', 'P2P conversion: 0-0.5%'],
            },
            {
              title: 'Special Services',
              items: ['Institutional account: Custom', 'API access: Free', 'Advanced charting: Free'],
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-8 hover:border-yellow-500/50 transition"
            >
              <h3 className="text-xl font-semibold mb-6 text-yellow-400">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-zinc-300">
                    <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fee Comparison */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          How We Compare
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-500/30 rounded-xl p-8"
        >
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { platform: 'Capitextradecompany', spotFee: '0.10%', futuresFee: '0.05%', hidden: 'No' },
              { platform: 'Binance', spotFee: '0.10%', futuresFee: '0.05%', hidden: 'Some' },
              { platform: 'Kraken', spotFee: '0.16%', futuresFee: '0.05%', hidden: 'Some' },
              { platform: 'Coinbase', spotFee: '0.50%', futuresFee: 'N/A', hidden: 'Yes' },
            ].map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-lg border ${
                  row.platform === 'Capitextradecompany'
                    ? 'bg-yellow-500/10 border-yellow-500/50'
                    : 'bg-zinc-800/30 border-zinc-700/50'
                }`}
              >
                <p className="font-bold text-lg mb-3">{row.platform}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Spot</span>
                    <span>{row.spotFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Futures</span>
                    <span>{row.futuresFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Hidden</span>
                    <span>{row.hidden}</span>
                  </div>
                </div>
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
          <h2 className="text-4xl font-bold mb-6">Start Trading Today</h2>
          <p className="text-xl text-zinc-300 mb-8">
            Get competitive fees and start your crypto trading journey with Capitextradecompany.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Sign Up Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
