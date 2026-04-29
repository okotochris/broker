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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prices, setPrices] = useState<{ btc: number; eth: number }>({ btc: 0, eth: 0 });
  const [loading, setLoading] = useState(true); // Added loading state
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
        setLoading(false); // Stop loading regardless of result
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

  // --- CALCULATION LOGIC (With Safety Fallbacks) ---
  const inv = user?.investment;
  const btcP = prices?.btc ?? 0;
  const ethP = prices?.eth ?? 0;

  const totalInvested = 
    (inv?.usdValue ?? 0) + 
    (inv?.btcValue ?? 0) * btcP + 
    (inv?.ethValue ?? 0) * ethP;

  const totalProfit = inv?.totalProfit ?? 0;
  const totalBalance = totalInvested + totalProfit;

  const menu = [
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'trade', label: 'Trade', icon: TrendingUp },
    { id: 'markets', label: 'Markets', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  if (loading) {
    return <div><FancyLoader fullScreen message="geting user ifo..." /> </div>
  }

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <div className="md:hidden fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-orange-500">Capitextradecompany</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="md:grid md:grid-cols-[256px_1fr] min-h-screen">
        <aside className={`fixed md:relative z-50 w-64 h-full bg-black/40 backdrop-blur-xl border-r border-white/10 transition ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="p-6 flex flex-col h-full">
            <h1 className="text-xl font-semibold mb-8 text-orange-500">Capitextradecompany</h1>
            <nav className="space-y-2">
              {menu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'logout') {
                      localStorage.clear();
                      window.location.href = '/';
                      return;
                    }
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${activeTab === item.id ? 'bg-orange-500/10 border border-orange-500/20 text-orange-500' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="w-full max-w-7xl px-4 md:px-8 pt-24 md:pt-10 pb-10 mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-sm text-zinc-400">Welcome back, {user?.name?.split(' ')[0] ?? 'User'}</p>
            </div>
            <button onClick={() => router.push('/dashboard/deposite')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 shadow-lg shadow-orange-500/20 hover:scale-105 transition">
              <Plus className="w-4 h-4" /> Deposit
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <Card label="Total Balance" value={totalBalance} icon={<CreditCard className="w-6 h-6 text-blue-400" />} />
            <Card label="Total Invested" value={totalInvested} icon={<DollarSign className="w-6 h-6 text-green-400" />} />
            <Card label="Total Profit" value={totalProfit} isProfit icon={<TrendingUp className="w-6 h-6 text-orange-400" />} />
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
            {activeTab === 'portfolio' && (
              <>
                <div className="flex justify-between mb-6">
                  <h2 className="text-xl font-semibold">Your Assets</h2>
                  <button onClick={() => setActiveTab('trade')} className="text-sm text-orange-400 flex items-center gap-1">
                    Live Trade <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <AssetCard 
                    label="US Dollar" 
                    value={`$${(inv?.usdValue ?? 0).toLocaleString()}`} 
                    icon={<DollarSign className="text-green-400" />} 
                  />
                  <AssetCard 
                    label="Bitcoin" 
                    value={`${(inv?.btcValue ?? 0).toFixed(6)} BTC`} 
                    subValue={`$${((inv?.btcValue ?? 0) * btcP).toLocaleString()}`} 
                    icon={<Bitcoin className="text-orange-400" />} 
                  />
                  <AssetCard 
                    label="Ethereum" 
                    value={`${(inv?.ethValue ?? 0).toFixed(4)} ETH`} 
                    subValue={`$${((inv?.ethValue ?? 0) * ethP).toLocaleString()}`} 
                    icon={<Coins className="text-purple-400" />} 
                  />
                </div>
              </>
            )}

            {activeTab === 'markets' && <MarketsSection />}
            {activeTab === 'settings' && <UserSettings />}
            {activeTab === 'trade' && <TradeSection />}
          </div>
        </main>
      </div>
      <InvestmentPopup />
    </div>
  );
}

// Fixed formatting to prevent errors on null values
function Card({ label, value, isProfit, icon }: { label: string; value: number; isProfit?: boolean; icon: React.ReactNode }) {
  const safeValue = value ?? 0;
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
      <div className="p-3 rounded-xl bg-white/5">{icon}</div>
      <div>
        <p className="text-xs uppercase text-zinc-500 font-bold">{label}</p>
        <p className={`text-2xl font-bold mt-1 ${isProfit ? (safeValue >= 0 ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>
          {isProfit && safeValue >= 0 ? '+' : ''}${safeValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}

function AssetCard({ label, value, subValue, icon }: { label: string; value: string; subValue?: string; icon: React.ReactNode }) {
  return (
    <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="text-xs text-zinc-400 uppercase font-bold">{label}</span>
      </div>
      <p className="text-xl font-mono font-bold">{value}</p>
      {subValue && <p className="text-xs text-zinc-500 mt-1">{subValue}</p>}
    </div>
  );
}