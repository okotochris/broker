'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wallet as WalletIcon, Send, Download, Lock, Eye, Settings, ArrowRight } from 'lucide-react';

export default function Wallet() {
  const features = [
    {
      icon: Lock,
      title: 'Maximum Security',
      description: 'Industry-leading security protocols protect your assets 24/7',
    },
    {
      icon: Send,
      title: 'Instant Transfers',
      description: 'Send and receive crypto instantly with minimal fees',
    },
    {
      icon: Eye,
      title: 'Full Control',
      description: 'You control your private keys and funds',
    },
    {
      icon: Settings,
      title: 'Customizable',
      description: 'Set withdrawal limits and security preferences',
    },
  ];

  const supportedAssets = [
    { name: 'Bitcoin', symbol: 'BTC', icon: '₿' },
    { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ' },
    { name: 'Solana', symbol: 'SOL', icon: '◎' },
    { name: 'Ripple', symbol: 'XRP', icon: '✕' },
    { name: 'Cardano', symbol: 'ADA', icon: '₳' },
    { name: 'Polkadot', symbol: 'DOT', icon: '●' },
    { name: 'Litecoin', symbol: 'LTC', icon: 'Ł' },
    { name: 'USDT', symbol: 'USDT', icon: 'U' },
  ];

  const walletTypes = [
    {
      name: 'Hot Wallet',
      description: 'Connected wallet for quick trading and transfers',
      benefits: ['Instant access', 'Quick transfers', 'Low fees'],
      color: 'from-blue-600 to-blue-400',
    },
    {
      name: 'Cold Storage',
      description: 'Offline storage for maximum security',
      benefits: ['Maximum security', 'Long-term storage', 'Enhanced protection'],
      color: 'from-purple-600 to-purple-400',
    },
    {
      name: 'Sub Accounts',
      description: 'Organize funds across multiple wallets',
      benefits: ['Organization', 'Risk management', 'Easy tracking'],
      color: 'from-green-600 to-green-400',
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
          <WalletIcon className="w-20 h-20 text-blue-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Broka Wallet
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            Secure, fast, and easy-to-use cryptocurrency wallet. Store, send, and manage your digital assets.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Create Wallet
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Wallet Features
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-blue-500/50 transition"
            >
              <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Wallet Types */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Wallet Types
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {walletTypes.map((wallet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-8 hover:border-blue-500/50 transition overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${wallet.color} opacity-10 -mr-20 -mt-20 rounded-full`} />
              
              <h3 className="text-2xl font-semibold mb-2 relative z-10">{wallet.name}</h3>
              <p className="text-zinc-400 mb-6 relative z-10">{wallet.description}</p>
              
              <ul className="space-y-3 mb-6 relative z-10">
                {wallet.benefits.map((benefit, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg font-semibold group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:border-transparent transition flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Supported Assets */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Supported Assets
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {supportedAssets.map((asset, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-blue-500/50 transition flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition">{asset.icon}</div>
              <p className="font-semibold text-sm mb-1">{asset.symbol}</p>
              <p className="text-xs text-zinc-500">{asset.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Transaction Flow */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Quick Actions
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Download,
              title: 'Deposit',
              description: 'Receive crypto to your wallet instantly',
              color: 'green',
            },
            {
              icon: Send,
              title: 'Send',
              description: 'Transfer funds securely and quickly',
              color: 'blue',
            },
            {
              icon: WalletIcon,
              title: 'Manage',
              description: 'Monitor balances and transaction history',
              color: 'purple',
            },
          ].map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br from-${action.color}-900/20 to-${action.color}-800/20 border border-${action.color}-500/30 rounded-xl p-8 hover:border-${action.color}-500/60 transition group cursor-pointer`}
            >
              <action.icon className={`w-12 h-12 text-${action.color}-400 mb-4 group-hover:scale-110 transition`} />
              <h3 className="text-xl font-semibold mb-3">{action.title}</h3>
              <p className="text-zinc-400 mb-6">{action.description}</p>
              <button className={`inline-flex items-center gap-2 text-${action.color}-400 group-hover:text-${action.color}-300 transition font-semibold`}>
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security Details */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-xl p-12"
        >
          <h2 className="text-3xl font-bold mb-8">Enterprise Security</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: '2FA Protection', desc: 'Two-factor authentication for all transactions' },
              { title: 'Cold Storage', desc: '95% of funds stored in offline cold storage' },
              { title: 'Encryption', desc: 'Military-grade encryption for all data' },
              { title: '24/7 Monitoring', desc: 'Real-time threat detection and prevention' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-blue-400 mb-2">{item.title}</h3>
                <p className="text-zinc-400">{item.desc}</p>
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
          <h2 className="text-4xl font-bold mb-6">Secure Your Assets Today</h2>
          <p className="text-xl text-zinc-300 mb-8">
            Join millions of users who trust Broka Wallet to manage their crypto.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Create Wallet
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
