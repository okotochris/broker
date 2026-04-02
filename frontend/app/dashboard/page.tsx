'use client';

import { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Plus,
  Menu,
  X,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Link from 'next/link';
import MarketsSection from '../component/market';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = {
    name: "Alex Chen",
    balance: 12450.75,
    portfolioValue: 28760.45,
    totalProfit: 3240.80,
    profitPercentage: 12.7
  };

  const portfolio = [
    { symbol: "BTC", name: "Bitcoin", amount: 0.45, value: 31565.40, change: 2.4 },
    { symbol: "ETH", name: "Ethereum", amount: 3.2, value: 6860.00, change: -1.2 },
    { symbol: "SOL", name: "Solana", amount: 45.5, value: 9025.00, change: 5.8 },
  ];

  const menuItems = [
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'trade', label: 'Trade / Buy', icon: TrendingUp },
    { id: 'markets', label: 'Markets', icon: BarChart3 },
    { id: 'alerts', label: 'Price Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold">Broka</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-zinc-900 border-r border-zinc-800 w-72 p-8 flex flex-col z-40
          transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="flex items-center gap-3 mb-12 mt-10 md:mt-0">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-2xl">
            🚀
          </div>
          <div>
            <h1 className="text-2xl font-bold">Broka</h1>
            <p className="text-xs text-zinc-500">Trading Platform</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all ${
                activeTab === item.id
                  ? 'bg-orange-600 text-white'
                  : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-zinc-800 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-700 rounded-full"></div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-zinc-500">Premium Member</p>
            </div>
          </div>
          <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 text-red-400 hover:bg-zinc-800 rounded-2xl transition">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-72 p-6 md:p-8 mt-16 md:mt-0">

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-zinc-400">Welcome back, {user.name.split(" ")[0]}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-zinc-900 px-5 py-2.5 rounded-2xl flex items-center gap-2">
              <div className="text-emerald-400">•</div>
              <span className="text-sm">Market Open</span>
            </div>
            <button className="bg-orange-600 hover:bg-orange-700 px-6 py-2.5 rounded-2xl flex items-center gap-2 font-medium transition">
              <Plus className="w-5 h-5" />
              Deposit Funds
            </button>
          </div>
        </div>

        {/* PORTFOLIO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900 rounded-3xl p-8">
            <p className="text-zinc-400 text-sm">Total Balance</p>
            <p className="text-4xl font-bold mt-2">${user.balance.toLocaleString()}</p>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-8">
            <p className="text-zinc-400 text-sm">Portfolio Value</p>
            <p className="text-4xl font-bold mt-2">${user.portfolioValue.toLocaleString()}</p>
            <p className={`text-sm mt-2 flex items-center gap-1 ${user.profitPercentage > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {user.profitPercentage > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {user.profitPercentage}% this month
            </p>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-8">
            <p className="text-zinc-400 text-sm">Total Profit</p>
            <p className="text-4xl font-bold mt-2 text-green-400">+${user.totalProfit.toLocaleString()}</p>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="bg-zinc-900 rounded-3xl p-8">
          {activeTab === 'portfolio' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Your Portfolio</h2>
              <div className="space-y-4">
                {portfolio.map((coin, i) => (
                  <div key={i} className="flex items-center justify-between bg-zinc-800 rounded-2xl p-6 hover:bg-zinc-700 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-700 rounded-2xl flex items-center justify-center text-2xl">
                        {coin.symbol === 'BTC' ? '₿' : coin.symbol === 'ETH' ? '⟠' : '◎'}
                      </div>
                      <div>
                        <p className="font-semibold">{coin.name}</p>
                        <p className="text-sm text-zinc-400">{coin.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-semibold">${coin.value.toLocaleString()}</p>
                      <p className="text-sm text-zinc-400">{coin.amount} {coin.symbol}</p>
                    </div>
                    <div className={`text-sm font-medium ${coin.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.change > 0 ? '+' : ''}{coin.change}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'trade' && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold mb-4">Ready to Trade?</h2>
              <p className="text-zinc-400 mb-8">Buy, sell, or swap cryptocurrencies instantly</p>
              <Link
                href="/trade"
                className="inline-block bg-orange-600 hover:bg-orange-700 px-10 py-4 rounded-2xl font-semibold text-lg"
              >
                Go to Trading Terminal
              </Link>
            </div>
          )}

          {activeTab === 'markets' && (
           <MarketsSection />
          )}

          {activeTab === 'alerts' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Price Alerts</h2>
              <p className="text-zinc-400">Manage your alerts here...</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
              <p className="text-zinc-400">Profile, security, and preferences...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
