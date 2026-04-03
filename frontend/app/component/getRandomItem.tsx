'use client';

import { useEffect, useState } from 'react';

const names = [
  'Michael', 'Sarah', 'David', 'Daniel', 'John',
  'Mary', 'James', 'Esther', 'Chris', 'Blessing'
];

const locations = [
  'London', 'Dubai', 'Toronto', 'Berlin', 'Paris',
  'New York', 'Tokyo', 'Sydney', 'Cape Town', 'Singapore'
];

const coins = ['USDT', 'BTC', 'ETH'];

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomAmount() {
  const amount = Math.floor(Math.random() * 5000) + 200;
  return amount.toLocaleString();
}

export default function InvestmentPopup() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const name = getRandomItem(names);
      const location = getRandomItem(locations);
      const coin = getRandomItem(coins);
      const amount = getRandomAmount();

      const text = `${name} from ${location} just invested $${amount} in ${coin}`;

      setMessage(text);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);

    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

 return (
  <div className="fixed bottom-6 left-6 z-50 animate-slide-in">
    <div className="relative w-[320px] bg-zinc-950 border border-orange-500/30 text-white px-4 py-3 rounded-xl shadow-2xl shadow-orange-500/20">

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-orange-500/10 blur-xl -z-10" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <p className="text-xs text-zinc-300">Live Investment</p>
      </div>

      {/* Message */}
      <p className="text-sm font-medium leading-snug">
        {message}
      </p>

      {/* Badge */}
      <div className="mt-2 text-[10px] text-orange-400">
        just now
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.4s ease, pulseGlow 2s infinite;
        }

        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 rgba(255, 165, 0, 0.0);
          }
          50% {
            box-shadow: 0 0 25px rgba(255, 165, 0, 0.25);
          }
        }
      `}</style>
    </div>
  </div>
);
}