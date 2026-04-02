'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const coins = [
  { symbol: 'BTC', price: 67240, change: 2.4 },
  { symbol: 'ETH', price: 3420, change: -1.2 },
  { symbol: 'SOL', price: 180, change: 5.6 },
];

export default function TradeSection() {
  const [activeCoin, setActiveCoin] = useState(coins[0]);
  const [amount, setAmount] = useState('');
  const [isBuy, setIsBuy] = useState(true);

  const [tickerIndex, setTickerIndex] = useState(0);

  // Fake live ticker rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % coins.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      
      {/* 🌌 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-indigo-950/20 to-purple-950/20" />

      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* 🔥 Market Ticker */}
        <div className="flex justify-center mb-12">
          <motion.div
            key={tickerIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/70 border border-zinc-800 rounded-full px-8 py-4 backdrop-blur-xl text-lg font-mono"
          >
            {coins[tickerIndex].symbol} ${coins[tickerIndex].price.toLocaleString()} 
            <span className={`ml-3 ${coins[tickerIndex].change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {coins[tickerIndex].change > 0 ? '+' : ''}
              {coins[tickerIndex].change}%
            </span>
          </motion.div>
        </div>

        {/* 🧱 Main Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* 📈 Chart (fake animated) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
          >
            <h3 className="text-xl font-semibold mb-6 text-white">
              {activeCoin.symbol} Price Chart
            </h3>

            {/* Fake animated chart */}
            <div className="h-64 flex items-end gap-2">
              {[40, 60, 30, 80, 50, 90, 70, 100, 60, 120].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: h }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-md"
                />
              ))}
            </div>
          </motion.div>

          {/* 💱 Trade Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
          >
            <h3 className="text-xl font-semibold mb-6 text-white">
              Trade {activeCoin.symbol}
            </h3>

            {/* Buy / Sell toggle */}
            <div className="flex mb-6 bg-zinc-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setIsBuy(true)}
                className={`flex-1 py-3 font-medium ${
                  isBuy ? 'bg-green-600 text-white' : 'text-zinc-400'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setIsBuy(false)}
                className={`flex-1 py-3 font-medium ${
                  !isBuy ? 'bg-red-600 text-white' : 'text-zinc-400'
                }`}
              >
                Sell
              </button>
            </div>

            {/* Coin selector */}
            <select
              value={activeCoin.symbol}
              onChange={(e) =>
                setActiveCoin(coins.find(c => c.symbol === e.target.value)!)
              }
              className="w-full mb-4 px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
            >
              {coins.map((coin) => (
                <option key={coin.symbol} value={coin.symbol}>
                  {coin.symbol}
                </option>
              ))}
            </select>

            {/* Amount input */}
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mb-6 px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
            />

            {/* Action button */}
            <button
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isBuy
                  ? 'bg-green-600 hover:bg-green-500'
                  : 'bg-red-600 hover:bg-red-500'
              }`}
            >
              {isBuy ? 'Buy' : 'Sell'} {activeCoin.symbol}
            </button>
          </motion.div>
        </div>

        {/* 🚀 Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          {[
            'Instant Execution ⚡',
            'Zero Hidden Fees 💸',
            'Bank-grade Security 🔐',
          ].map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 backdrop-blur-xl"
            >
              {feature}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}