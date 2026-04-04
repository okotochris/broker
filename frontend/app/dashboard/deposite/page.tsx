'use client';

import { useState } from 'react';
import { Copy, Check, Wallet } from 'lucide-react';

const coins = [
  { 
    symbol: 'BTC', 
    name: 'Bitcoin', 
    address: 'bc1qc3cmny3kwt605m9nzyw9a3306595mgtx2707tf',
    color: 'bg-orange-500' ,
    btc_barcode:'/btc_barcode.jpeg'
  },
 
  { 
    symbol: 'USDT', 
    name: 'Tether', 
    address: 'T0x2f05380c59e057892b5752b1a39409c43966e6c8',
    color: 'bg-emerald-500',
    usdt_barcode:'/usdt_barcode.jpeg'
  },
];

export default function DepositPage() {
  const [selectedCoin, setSelectedCoin] = useState(coins[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(selectedCoin.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-950 to-black flex flex-col items-center justify-start py-20 px-4 md:px-10 overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-float-slow delay-2000" />
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-3xl bg-zinc-900/70 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden z-10">
        
        {/* Left: Coin Selection */}
        <div className="w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-900 rounded-2xl">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Deposit</h2>
              <p className="text-sm text-zinc-400">Send funds to your account</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm text-zinc-400">Select Coin</label>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {coins.map((coin) => (
                <button
                  key={coin.symbol}
                  onClick={() => setSelectedCoin(coin)}
                  className={`flex-shrink-0 flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border transition-all snap-start
                    ${selectedCoin.symbol === coin.symbol 
                      ? 'border-orange-500 bg-zinc-900 scale-105' 
                      : 'border-zinc-700 hover:border-zinc-600 bg-zinc-950'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold text-white ${coin.color}`}>
                    {coin.symbol.slice(0, 1)}
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white text-sm">{coin.symbol}</div>
                    <div className="text-xs text-zinc-500">{coin.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Address + QR + Copy */}
        <div className="w-full md:w-2/3 p-6 flex flex-col gap-6">
          {/* Address */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-400">
                Your {selectedCoin.symbol} Deposit Address
              </label>
              <span className="text-xs px-3 py-1 bg-zinc-900 rounded-full text-zinc-500">
                {selectedCoin.symbol} Network
              </span>
            </div>
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 font-mono text-sm text-zinc-300 break-all leading-relaxed min-h-[100px] flex items-center">
              {selectedCoin.address}
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 flex flex-col items-center justify-center">
            <div className="w-36 h-36 bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-600 mb-3">
              <img src={selectedCoin.symbol === 'BTC' ? selectedCoin.btc_barcode : selectedCoin.usdt_barcode} alt={`${selectedCoin.symbol} QR Code`} className="w-32 h-32 object-contain" />  
            </div>
            <p className="text-[10px] text-zinc-500">Scan with your wallet app</p>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-medium transition-all active:scale-[0.985] ${
              copied 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40'
            }`}
          >
            {copied ? (
              <>
                <Check size={20} />
                Address Copied Successfully
              </>
            ) : (
              <>
                <Copy size={20} />
                Copy Address
              </>
            )}
          </button>

          {/* Warning */}
          <div className="bg-amber-950/60 border border-amber-900/60 rounded-2xl p-4 text-xs text-zinc-400 leading-relaxed">
            <p className="text-amber-500 font-medium mb-1">⚠️ Important</p>
            Only send <span className="text-white font-medium">{selectedCoin.symbol}</span> to this address. 
            Sending any other coin or token may result in permanent loss of funds.
          </div>
        </div>

      </div>
    </section>
  );
}