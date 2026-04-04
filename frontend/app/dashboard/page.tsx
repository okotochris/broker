'use client';

import { useState, useEffect } from 'react';
import {
  Wallet,
  TrendingUp,
  BarChart3,
  Bell,
  Settings,
  Plus,
  Menu,
  X,
  ArrowUpRight,
  DollarSign,
  Bitcoin,
  Coins,
  CreditCard,
} from 'lucide-react';
import Link from 'next/link';

import MarketsSection from '../component/market';
import UserSettings from '../component/userSetting';
import TradeSection from '../component/trade';
import { useRouter } from 'next/navigation';
import InvestmentPopup from '../component/getRandomItem';

type Investment = {
  amountInvest: number;
  totalProfit: number;     // Kept for backward compatibility, but we derive profit now
  usdValue: number;
  ethValue: number;
  btcValue: number;
};

type UserData = {
  _id: string;
  name: string;
  investment: Investment[];
};

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [featuredUser, setFeaturedUser] = useState<UserData | null>(null);
  const [prices, setPrices] = useState<{ btc: number; eth: number } | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      // Fetch user
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${userData.id}`);
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
          } else {
            setUser(userData);
          }
        } catch {
          setUser(userData);
        }
      }

      // Fetch crypto prices
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        if (res.ok) {
          const data = await res.json();
          setPrices({ btc: data.bitcoin.usd, eth: data.ethereum.usd });
        }
      } catch (err) {
        console.error('Failed to fetch prices:', err);
      }

      // Fetch featured user
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dashboard`);
        if (res.ok) {
          const data = await res.json();
          const investedUsers = data.users.filter((u: UserData) =>
            (u.investment || []).reduce((s: number, i: Investment) => s + (i.amountInvest || 0), 0) > 0
          );
          if (investedUsers.length > 0) {
            const randomUser = investedUsers[Math.floor(Math.random() * investedUsers.length)];
            setFeaturedUser(randomUser);
          }
        }
      } catch (err) {
        console.error('Failed to fetch featured user:', err);
      }
    }

    fetchData();
  }, []);

  const investments = user?.investment || [];
  const btcPrice = prices?.btc || 0;
  const ethPrice = prices?.eth || 0;

  // ====================== FIXED CALCULATIONS ======================
  // 1. Total Invested = Original capital put in by the user
  const totalInvested = investments.reduce((sum, inv) => {
    return sum + (inv.amountInvest || 0);
  }, 0);

  // 2. Current Portfolio Value = Real-time value of all assets
  const currentPortfolioValue = investments.reduce((sum, inv) => {
    return sum +
      (inv.usdValue || 0) +
      (inv.btcValue || 0) * btcPrice +
      (inv.ethValue || 0) * ethPrice;
  }, 0);

  // 3. Total Profit = Derived (most reliable method)
  const totalProfit = currentPortfolioValue - totalInvested;

  // 4. Total Balance = Current worth of the portfolio
  const totalBalance = currentPortfolioValue;
  // ====================== END OF CALCULATIONS ======================

  const menu = [
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'trade', label: 'Trade', icon: TrendingUp },
    { id: 'markets', label: 'Markets', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'admin', label: 'Admin', icon: Wallet },
  ];

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      {/* Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,115,0,0.08),transparent_40%)]" />

      {/* Mobile Top */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex justify-between">
        <h1 className="text-lg font-semibold">pulseMarket</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Layout */}
      <div className="md:grid md:grid-cols-[256px_1fr] min-h-screen">
        
        {/* Sidebar */}
        <aside
          className={`fixed md:relative z-50 w-64 h-full bg-black/40 backdrop-blur-xl border-r border-white/10 transition ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-6 flex flex-col h-full">
            <h1 className="text-xl font-semibold mb-8">pulseMarket</h1>

            <nav className="space-y-2">
              {menu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'admin') {
                      window.location.href = '/admin';
                      return;
                    }
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/20'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto text-sm text-zinc-400">
              {user?.name || 'Guest'}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full flex justify-center">
          <div className="w-full max-w-7xl px-4 md:px-8 pt-20 md:pt-10">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-sm text-zinc-400">
                  Welcome back {user?.name?.split(' ')[0] || ''}
                </p>
              </div>

              <button 
                onClick={() => router.push('/dashboard/deposite')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition">
                <Plus className="w-4 h-4" />
                Deposit
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              <Card
                label="Total Balance"
                value={totalBalance}
                icon={<CreditCard className="w-6 h-6 text-blue-400" />}
              />
              <Card
                label="Total Invested"
                value={totalInvested}
                icon={<DollarSign className="w-6 h-6 text-green-400" />}
              />
              <Card
                label="Total Profit"
                value={totalProfit}
                isProfit
                icon={<TrendingUp className="w-6 h-6 text-orange-400" />}
              />
            </div>

            {/* Featured User */}
            {featuredUser && (
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 mb-10">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  Featured Investor
                </h3>
                <p className="text-zinc-300">
                  <span className="font-medium text-white">{featuredUser.name}</span> has invested{' '}
                  <span className="font-mono text-green-400">
                    ${(featuredUser.investment || []).reduce((s, i) => s + (i.amountInvest || 0), 0).toLocaleString()}
                  </span>
                </p>
              </div>
            )}

            {/* Main Content Area */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
              {activeTab === 'portfolio' && (
                <>
                  <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-semibold">Portfolio</h2>
                    <Link
                      href="/trade"
                      className="text-sm text-orange-400 flex items-center gap-1"
                    >
                      Trade <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {investments.length > 0 ? (
                    <div className="space-y-4">
                      {investments.map((inv, i) => {
                        const invCurrentValue =
                          (inv.usdValue || 0) +
                          (inv.btcValue || 0) * btcPrice +
                          (inv.ethValue || 0) * ethPrice;

                        const invProfit = invCurrentValue - (inv.amountInvest || 0);

                        return (
                          <div
                            key={i}
                            className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                          >
                            <div className="flex justify-between mb-4">
                              <div>
                                <p className="text-xs uppercase text-zinc-500">Investment</p>
                                <p className="font-mono text-lg">
                                  ${inv.amountInvest?.toLocaleString() || 0}
                                </p>
                              </div>

                              <p className={invProfit >= 0 ? 'text-green-400' : 'text-red-400'}>
                                {invProfit >= 0 ? '+' : ''}${invProfit.toLocaleString()}
                              </p>
                            </div>

                            {/* Current Holdings */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/10">
                              <Coin
                                label="USD"
                                value={`$${inv.usdValue?.toLocaleString() || 0}`}
                                icon={<DollarSign className="w-5 h-5 text-green-400" />}
                              />
                              <Coin
                                label="ETH"
                                value={`${inv.ethValue?.toFixed(4) || '0.0000'}`}
                                icon={<Coins className="w-5 h-5 text-purple-400" />}
                              />
                              <Coin
                                label="BTC"
                                value={`${inv.btcValue?.toFixed(6) || '0.000000'}`}
                                icon={<Bitcoin className="w-5 h-5 text-orange-400" />}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-zinc-400 py-10">
                      No investments yet
                    </p>
                  )}
                </>
              )}

              {activeTab === 'markets' && <MarketsSection />}
              {activeTab === 'settings' && <UserSettings />}
              {activeTab === 'trade' && <TradeSection />}
            </div>
          </div>
        </main>
      </div>

      <InvestmentPopup />
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Card({
  label,
  value,
  isProfit,
  icon,
}: {
  label: string;
  value: number;
  isProfit?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-lg flex items-center gap-4">
      {icon && <div className="p-2 rounded-lg bg-white/5">{icon}</div>}
      <div>
        <p className="text-xs uppercase text-zinc-500">{label}</p>
        <p
          className={`text-3xl font-semibold mt-2 ${
            isProfit
              ? value >= 0
                ? 'text-green-400'
                : 'text-red-400'
              : ''
          }`}
        >
          {isProfit && value >= 0 ? '+' : ''}${value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function Coin({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between sm:flex-col sm:items-start gap-2">
      <div>
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
      <div className="p-2 rounded-lg bg-white/5">{icon}</div>
    </div>
  );
}