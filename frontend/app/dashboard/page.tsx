'use client';

import { useState, useEffect } from 'react';
import {
  Wallet,
  TrendingUp,
  BarChart3,
  Bell,
  Settings,
  Plus,
  ArrowUpRight,
  DollarSign,
  Bitcoin,
  Coins,
  CreditCard,
  LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import MarketsSection from '../component/market';
import UserSettings from '../component/userSetting';
import TradeSection from '../component/trade';
import InvestmentPopup from '../component/getRandomItem';
import FancyLoader from '../component/loading';

type Investment = {
  amountInvest: number;
  totalProfit: number;
  usdValue: number;
  ethValue: number;
  btcValue: number;
};

type UserData = {
  _id: string;
  name: string;
  investment: Investment;
};

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [prices, setPrices] = useState<{ btc: number; eth: number }>({ btc: 0, eth: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/login');
        return;
      }

      const userData = JSON.parse(storedUser);
      
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${userData._id}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(userData);
        }
      } catch (err) {
        setUser(userData);
      } finally {
        setLoading(false);
      }

      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        if (res.ok) {
          const data = await res.json();
          setPrices({ btc: data.bitcoin.usd, eth: data.ethereum.usd });
        }
      } catch (err) {
        console.error('Price fetch error:', err);
      }
    }

    fetchData();
  }, [router]);

  const inv = user?.investment;
  const btcP = prices?.btc ?? 0;
  const ethP = prices?.eth ?? 0;

  const totalInvested = (inv?.usdValue ?? 0) + (inv?.btcValue ?? 0) * btcP + (inv?.ethValue ?? 0) * ethP;
  const totalProfit = inv?.totalProfit ?? 0;
  const totalBalance = totalInvested + totalProfit;

  const menu = [
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'trade', label: 'Trade', icon: TrendingUp },
    { id: 'markets', label: 'Markets', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  if (loading) return <FancyLoader fullScreen message="getting user info..." />;

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <div className="md:grid md:grid-cols-[256px_1fr] min-h-screen">
        
        {/* Desktop Sidebar - Hidden on Mobile */}
        <aside className="hidden md:block sticky top-0 h-screen bg-black/40 backdrop-blur-xl border-r border-white/10">
          <div className="p-6 flex flex-col h-full">
            <h1 className="text-xl font-semibold mb-8 text-orange-500">Capitextrade</h1>
            <nav className="space-y-2 flex-1">
              {menu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${activeTab === item.id ? 'bg-orange-500/10 border border-orange-500/20 text-orange-500' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-400 transition">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="w-full max-w-7xl px-4 md:px-8 pt-8 md:pt-10 pb-24 md:pb-10 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-sm text-zinc-400">Welcome, {user?.name?.split(' ')[0] ?? 'User'}</p>
            </div>
            <button onClick={() => router.push('/dashboard/deposite')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 shadow-lg shadow-orange-500/20 hover:scale-105 transition">
              <Plus className="w-4 h-4" /> Deposit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card label="Total Balance" value={totalBalance} icon={<CreditCard className="w-5 h-5 text-blue-400" />} />
            <Card label="Total Invested" value={totalInvested} icon={<DollarSign className="w-5 h-5 text-green-400" />} />
            <Card label="Total Profit" value={totalProfit} isProfit icon={<TrendingUp className="w-5 h-5 text-orange-400" />} />
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 md:p-6">
            {activeTab === 'portfolio' && (
              <>
                <div className="flex justify-between mb-6">
                  <h2 className="text-lg font-semibold">Your Assets</h2>
                  <button onClick={() => setActiveTab('trade')} className="text-sm text-orange-400 flex items-center gap-1">
                    Trade <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <AssetCard label="US Dollar" value={`$${(inv?.usdValue ?? 0).toLocaleString()}`} icon={<DollarSign className="text-green-400" />} />
                  <AssetCard label="Bitcoin" value={`${(inv?.btcValue ?? 0).toFixed(6)} BTC`} subValue={`$${((inv?.btcValue ?? 0) * btcP).toLocaleString()}`} icon={<Bitcoin className="text-orange-400" />} />
                  <AssetCard label="Ethereum" value={`${(inv?.ethValue ?? 0).toFixed(4)} ETH`} subValue={`$${((inv?.ethValue ?? 0) * ethP).toLocaleString()}`} icon={<Coins className="text-purple-400" />} />
                </div>
              </>
            )}
            {activeTab === 'markets' && <MarketsSection />}
            {activeTab === 'settings' && <UserSettings />}
            {activeTab === 'trade' && <TradeSection />}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-2xl border-t border-white/10 flex justify-around items-center py-3 px-2 z-50">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition ${activeTab === item.id ? 'text-orange-500' : 'text-zinc-500'}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-zinc-500">
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-medium">Exit</span>
        </button>
      </nav>

      <InvestmentPopup />
    </div>
  );
}

function Card({ label, value, isProfit, icon }: { label: string; value: number; isProfit?: boolean; icon: React.ReactNode }) {
  const safeValue = value ?? 0;
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
      <div className="p-2.5 rounded-xl bg-white/5">{icon}</div>
      <div>
        <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">{label}</p>
        <p className={`text-xl font-bold mt-0.5 ${isProfit ? (safeValue >= 0 ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>
          {isProfit && safeValue >= 0 ? '+' : ''}${safeValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}

function AssetCard({ label, value, subValue, icon }: { label: string; value: string; subValue?: string; icon: React.ReactNode }) {
  return (
    <div className="bg-black/40 p-4 rounded-xl border border-white/5">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-[10px] text-zinc-400 uppercase font-bold">{label}</span>
      </div>
      <p className="text-lg font-mono font-bold">{value}</p>
      {subValue && <p className="text-[10px] text-zinc-500 mt-0.5">{subValue}</p>}
    </div>
  );
}