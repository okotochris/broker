'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FancyLoader from './loading';

// -----------------------------
// 1. Strong TypeScript Type
// -----------------------------
type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
};

// -----------------------------
// 2. Component
// -----------------------------
export default function MarketsSection() {
  const [coins, setCoins] = useState<Coin[]>([]);

  const loadData = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets" +
          "?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
      );

      const data = await res.json();
      console.log(data)
      setCoins(data);
    } catch (err) {
      console.error("Failed to load market data", err);
    }
  };

  useEffect(() => {
   async function fetchData(){
     loadData();
    const interval = setInterval(loadData, 10000); // refresh every 10s
    return () => clearInterval(interval);
   }
   fetchData()
  }, []);

  return (
    <div className="bg-zinc-900 rounded-3xl p-1 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">Live Markets</h2>

      {!coins.length && (
        <div>
          <FancyLoader fullScreen message="loading live market..." /> 
        </div>
      )}

      <div className="space-y-4">
        {coins.map((coin, i) => (
          <motion.div
            key={coin.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 transition rounded-2xl p-1 md:p-4"
          >
            {/* Left: Icon + Name */}
            <div className="flex items-center gap-4">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{coin.name}</p>
                <p className="text-sm text-zinc-400">
                  {coin.symbol.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Middle: Price */}
            <div className="text-right">
              <p className="font-mono font-semibold text-lg">
                ${coin.current_price.toLocaleString()}
              </p>
              <p className="text-sm text-zinc-400">
                MCap: ${coin.market_cap.toLocaleString()}
              </p>
            </div>

            {/* Right: 24h Change */}
            <div
              className={`text-sm font-bold ${
                coin.price_change_percentage_24h > 0
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {coin.price_change_percentage_24h > 0 ? '+' : ''}
              {coin.price_change_percentage_24h && coin.price_change_percentage_24h.toFixed(2)}%
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
