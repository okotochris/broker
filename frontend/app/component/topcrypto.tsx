'use client';

import {
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
  sparkline_in_7d?: { price: number[] };
};

const formatMarketCap = (num: number) => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  return `$${num.toLocaleString()}`;
};

export default function TopCryptos() {
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);

  const [coins, setCoins] = useState<Coin[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  // 💱 USD → Naira (approx or dynamic later)
  const USD_TO_NGN = 1600;

  const fetchCoins = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'
      );
      const data = await res.json();

      const duplicated = [
        ...data,
        ...data.map((coin: Coin) => ({
          ...coin,
          id: coin.id + '-dup',
        })),
      ];

      setCoins(duplicated);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Initial + auto refresh
  useEffect(() => {
   async function loadData() {
     fetchCoins();
    const interval = setInterval(fetchCoins, 30000);
    return () => clearInterval(interval);
   }
    loadData();
  }, []);

  // ✅ Animation
  useEffect(() => {
    if (!containerRef.current || coins.length === 0) return;

    if (isPaused) {
      controls.stop();
      return;
    }

    controls.start({
      x: [0, -containerRef.current.scrollWidth / 2],
      transition: {
        duration: 35,
        ease: 'linear',
        repeat: Infinity,
      },
    });

    return () => controls.stop();
  }, [coins, isPaused, controls]);

  return (
    <section className="py-12 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center mb-8">
          Live Crypto Market 🚀
        </h2>

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {loading ? (
            <div className="flex gap-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="min-w-[280px] h-40 bg-zinc-800 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : (
            <motion.div
              ref={containerRef}
              animate={controls}
              className="flex gap-6"
            >
              {coins.map((coin) => {
                const chartData =
                  coin.sparkline_in_7d?.price.map((p, i) => ({
                    value: p,
                    index: i,
                  })) || [];

                return (
                  <div
                    key={coin.id}
                    className="min-w-[300px] bg-zinc-900 p-5 rounded-2xl hover:-translate-y-1 transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <img src={coin.image} className="w-8 h-8" />
                      <div>
                        <p className="text-white font-semibold">
                          {coin.name}
                        </p>
                        <p className="text-xs text-zinc-500 uppercase">
                          {coin.symbol}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-lg font-bold">
                        ${coin.current_price.toLocaleString()}
                      </p>

                      <span
                        className={`flex items-center text-sm ${
                          coin.price_change_percentage_24h >= 0
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      >
                        {coin.price_change_percentage_24h >= 0
                          ? <ArrowUpRight size={16} />
                          : <ArrowDownRight size={16} />}
                        {coin.price_change_percentage_24h && coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>

                    {/* Chart */}
                    <div className="h-16">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            dot={false}
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Market Cap */}
                    <p className="text-xs text-zinc-500 mt-2">
                      M.Cap: {formatMarketCap(coin.market_cap)}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}