'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
import Header from '../component/header';
import Footer from '../component/footer';

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
};

export default function MarketPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'market_cap' | 'price_change' | 'volume'>('market_cap');

  const loadMarketData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets' +
          '?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
      );

      const data = await res.json();
      setCoins(data);
    } catch (err) {
      console.error('Failed to load market data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketData();
    const interval = setInterval(loadMarketData, 15000); // Refresh every 15 seconds
    return () => clearInterval(interval);
  }, []);

  // Filter and sort coins
  const filteredCoins = coins
    .filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'market_cap') {
        return (b.market_cap || 0) - (a.market_cap || 0);
      } else if (sortBy === 'price_change') {
        return (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0);
      } else {
        return (b.total_volume || 0) - (a.total_volume || 0);
      }
    });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 md:px-8 border-b border-zinc-800 overflow-hidden">
        {/* Animated Background Graph */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          <g stroke="#334155" strokeWidth="2" opacity="0.5">
            <line x1="0" y1="100" x2="1000" y2="100" />
            <line x1="0" y1="200" x2="1000" y2="200" />
            <line x1="0" y1="300" x2="1000" y2="300" />
            <line x1="250" y1="0" x2="250" y2="400" />
            <line x1="500" y1="0" x2="500" y2="400" />
            <line x1="750" y1="0" x2="750" y2="400" />
          </g>
          
          {/* Chart line (uptrend) */}
          <polyline
            points="0,300 100,280 200,250 300,220 400,200 500,180 600,160 700,140 800,120 900,100 1000,80"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Area under chart */}
          <polygon
            points="0,300 100,280 200,250 300,220 400,200 500,180 600,160 700,140 800,120 900,100 1000,80 1000,400 0,400"
            fill="url(#graphGradient)"
          />
          
          {/* Animated dots on line */}
          <motion.circle
            cx="500"
            cy="180"
            r="8"
            fill="#06b6d4"
            animate={{
              cx: [100, 900, 100],
              cy: [280, 100, 280],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/50 to-zinc-950 opacity-95" />

        <div className="relative max-w-7xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Live Market
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Track real-time cryptocurrency prices, market caps, and 24-hour price changes. 
              Stay updated with the top 50 cryptocurrencies by market capitalization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-8 px-4 md:px-8 bg-zinc-900/50 border-b border-zinc-800 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by name or symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Sort Options */}
            <div className="flex gap-2">
              {(['market_cap', 'price_change', 'volume'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    sortBy === option
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {option === 'market_cap' ? 'Market Cap' : option === 'price_change' ? '24h Change' : 'Volume'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Markets Table */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {loading && coins.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-zinc-400 mt-4">Loading market data...</p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {/* Header Row */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-800/50 rounded-lg text-sm font-semibold text-zinc-300 border border-zinc-700">
                <div className="col-span-1">#</div>
                <div className="col-span-4">Coin</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">24h Change</div>
                <div className="col-span-3">Market Cap</div>
              </div>

              {/* Coin Rows */}
              {filteredCoins.map((coin, index) => (
                <motion.div
                  key={coin.id}
                  variants={item}
                  className="group md:grid md:grid-cols-12 md:gap-4 md:px-6 md:py-4 md:bg-zinc-800/30 md:rounded-lg md:hover:bg-zinc-700/50 md:border md:border-zinc-700/50 md:hover:border-blue-500/30 transition cursor-pointer block bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50 hover:border-blue-500/30"
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{coin.name}</p>
                        <p className="text-xs text-zinc-400">{coin.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold">${coin.current_price.toLocaleString()}</p>
                      <p
                        className={`text-sm font-semibold ${
                          (coin.price_change_percentage_24h ?? 0) > 0
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      >
                        {(coin.price_change_percentage_24h ?? 0) > 0 ? '+' : ''}
                        {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:contents">
                    <div className="col-span-1 flex items-center text-zinc-400">
                      {coin.market_cap_rank || index + 1}
                    </div>

                    <div className="col-span-4 flex items-center gap-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{coin.name}</p>
                        <p className="text-sm text-zinc-400">{coin.symbol.toUpperCase()}</p>
                      </div>
                    </div>

                    <div className="col-span-2 font-mono font-bold">
                      ${coin.current_price.toLocaleString()}
                    </div>

                    <div className="col-span-2 flex items-center gap-1">
                      <span
                        className={`font-semibold ${
                          (coin.price_change_percentage_24h ?? 0) > 0
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      >
                        {(coin.price_change_percentage_24h ?? 0) > 0 ? '+' : ''}
                        {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                      </span>
                      {(coin.price_change_percentage_24h ?? 0) > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                    </div>

                    <div className="col-span-3 text-right font-mono text-sm text-zinc-300">
                      ${((coin.market_cap ?? 0) / 1e9).toFixed(2)}B
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && filteredCoins.length === 0 && (
            <div className="text-center py-12">
              <p className="text-zinc-400 text-lg">No cryptocurrencies found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 md:px-8 bg-zinc-900/50 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-800/50 rounded-lg p-6 border border-zinc-700"
          >
            <h3 className="text-lg font-semibold mb-2">Real-Time Updates</h3>
            <p className="text-zinc-400 text-sm">
              Market data updates every 15 seconds to ensure you have the most current cryptocurrency prices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-800/50 rounded-lg p-6 border border-zinc-700"
          >
            <h3 className="text-lg font-semibold mb-2">Top 50 Cryptocurrencies</h3>
            <p className="text-zinc-400 text-sm">
              Browse the top 50 cryptocurrencies ranked by market capitalization with detailed statistics.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-800/50 rounded-lg p-6 border border-zinc-700"
          >
            <h3 className="text-lg font-semibold mb-2">Powered by CoinGecko</h3>
            <p className="text-zinc-400 text-sm">
              All market data is sourced from CoinGecko, a trusted cryptocurrency data provider.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
