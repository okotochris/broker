'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';

const topCoins = [
  {
    id: 1,
    symbol: "BTC",
    name: "Bitcoin",
    price: 70145.32,
    change: 1.85,
    marketCap: "1.39T",
    volume: "48.2B",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    color: "from-orange-500 to-amber-500",
    description: "The original cryptocurrency and digital gold standard."
  },
  {
    id: 2,
    symbol: "ETH",
    name: "Ethereum",
    price: 2145.67,
    change: -0.45,
    marketCap: "258B",
    volume: "28.7B",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    color: "from-blue-500 to-indigo-500",
    description: "The world's leading smart contract and DeFi platform."
  },
  {
    id: 3,
    symbol: "SOL",
    name: "Solana",
    price: 198.45,
    change: 4.2,
    marketCap: "92.1B",
    volume: "12.8B",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    color: "from-purple-500 to-violet-500",
    description: "High-speed blockchain known for scalability and low fees."
  },
  {
    id: 4,
    symbol: "BNB",
    name: "BNB",
    price: 642.80,
    change: -1.15,
    marketCap: "87.4B",
    volume: "9.6B",
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    color: "from-yellow-500 to-amber-600",
    description: "Binance ecosystem token with utility across multiple chains."
  }
];

export default function TopCoinsSpotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCoin = topCoins[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topCoins.length);
    }, 4500); // Auto-slide every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Coins in the Spotlight
          </h2>
          <p className="text-zinc-400 text-lg">Discover the top performing cryptocurrencies right now</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -40 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="bg-zinc-900/80 backdrop-blur-2xl border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                {/* Left Side - Visual */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48 md:w-64 md:h-64">
                    <Image
                      src={currentCoin.image}
                      alt={currentCoin.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                  <div className={`mt-6 text-7xl font-bold bg-gradient-to-br ${currentCoin.color} bg-clip-text text-transparent`}>
                    {currentCoin.symbol}
                  </div>
                </div>

                {/* Right Side - Details */}
                <div className="flex flex-col justify-center space-y-8">
                  <div>
                    <h3 className="text-5xl font-bold text-white mb-1">{currentCoin.name}</h3>
                    <p className="text-2xl text-zinc-400">{currentCoin.symbol}</p>
                  </div>

                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-mono font-semibold text-white">
                      ${currentCoin.price.toLocaleString()}
                    </span>
                    <span className={`text-2xl font-medium flex items-center gap-1 ${currentCoin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {currentCoin.change >= 0 ? <TrendingUp className="w-7 h-7" /> : <TrendingDown className="w-7 h-7" />}
                      {currentCoin.change}%
                    </span>
                  </div>

                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {currentCoin.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-700">
                    <div>
                      <p className="text-zinc-500 text-sm">Market Cap</p>
                      <p className="text-2xl font-semibold text-white mt-1">${currentCoin.marketCap}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-sm">24h Volume</p>
                      <p className="text-2xl font-semibold text-white mt-1">${currentCoin.volume}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-4 mt-10">
            {topCoins.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-orange-500 scale-125 shadow-lg shadow-orange-500/50' 
                    : 'bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}