'use client';

import { useEffect, useState } from 'react';
import Header from '../component/header';

type User = {
  _id: string;
  email: string;
  name: string;
  accountType: string;
  coin: string;
  coinValue: number;
  amountInvest: number;
  password: string;
  totalProfit: number;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [prices, setPrices] = useState({ btc: 0, eth: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const storedLogin = localStorage.getItem('adminLoggedIn');
    if (storedLogin === 'true') {
      setIsLoggedIn(true);
      fetchPrices();
      loadUsers();
    }
  }, []);

  async function fetchPrices() {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
      const data = await res.json();
      setPrices({ btc: data.bitcoin.usd, eth: data.ethereum.usd });
    } catch (err) {
      console.error("Price fetch failed", err);
    }
  }

  async function loadUsers() {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`);
      if (!res.ok) throw new Error('Failed to fetch users');
      const payload = await res.json();
      setUsers(payload);
    } catch (err) {
      setError('Unable to load users.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (username === 'info@capitextradecompany.com' && password === 'Money2025@@') {
      localStorage.setItem('adminLoggedIn', 'true');
      setIsLoggedIn(true);
      fetchPrices();
      loadUsers();
    } else {
      setLoginError('Invalid credentials');
    }
  }

  // Simplified Update Logic: Handles all top-level fields
  function updateField(userId: string, field: keyof User, value: any) {
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, [field]: value } : u))
    );
  }

  async function saveUser(user: User) {
    try {
      setSavingId(user._id);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${user._id}/sync-investment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: user.password,
          amountInvest: Number(user.amountInvest || 0),
          totalProfit: Number(user.totalProfit || 0),
          accountType: user.accountType,
          coin:user.coin,
          btcPrice: prices.btc,
          ethPrice: prices.eth
        }),
      });

      if (!res.ok) throw new Error('Update failed');

      setSuccess(`Updated ${user.email}`);
    } catch (err) {
      setError('Save failed.');
    } finally {
      setSavingId(null);
      setTimeout(() => setSuccess(null), 3000);
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 rounded bg-zinc-900 border border-white/20 outline-none focus:border-orange-500" placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded bg-zinc-900 border border-white/20 outline-none focus:border-orange-500" placeholder="Password" />
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <button className="w-full py-3 bg-orange-600 hover:bg-orange-500 transition rounded font-bold">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-zinc-950 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">User Management</h1>
            <div className="flex gap-4 text-xs font-mono text-zinc-400">
              <span>BTC: ${prices.btc.toLocaleString()}</span>
              <span>ETH: ${prices.eth.toLocaleString()}</span>
            </div>
          </div>

          {success && <div className="p-3 bg-emerald-500/20 text-emerald-400 mb-4 rounded border border-emerald-500/20">{success}</div>}
          {error && <div className="p-3 bg-red-500/20 text-red-400 mb-4 rounded border border-red-500/20">{error}</div>}

          <div className="overflow-x-auto border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-white/5 text-zinc-400 text-xs uppercase tracking-widest">
                  <th className="p-4">Email</th>
                  <th className="p-4">Password</th>
                  <th className="p-4">Total Invested ($)</th>
                  <th className="p-4">Total Profit ($)</th>
                  <th className="p-4">Account Type</th>
                  <th className="p-4">coin Type</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {users.map((user) => (
                  <tr key={user._id} className="border-t border-white/10 hover:bg-white/[0.02] transition">
                    <td className="p-4 font-medium">{user.email}</td>
                    
                    <td className="p-4">
                      <input 
                        type="text" 
                        value={user.password || ''} 
                        onChange={(e) => updateField(user._id, 'password', e.target.value)}
                        className="w-32 bg-zinc-900 p-2 rounded border border-white/10 focus:border-blue-500 outline-none" 
                      />
                    </td>

                    <td className="p-4">
                      <input 
                        type="number" 
                        value={user.amountInvest || 0} 
                        onChange={(e) => updateField(user._id, 'amountInvest', Number(e.target.value))} 
                        className="w-32 bg-zinc-900 p-2 rounded border border-white/10 text-orange-400 font-bold" 
                      />
                    </td>

                    <td className="p-4">
                      <input 
                        type="number" 
                        value={user.totalProfit || 0} 
                        onChange={(e) => updateField(user._id, 'totalProfit', Number(e.target.value))} 
                        className="w-32 bg-zinc-900 p-2 rounded border border-white/10 text-emerald-400 font-bold" 
                      />
                    </td>

                    <td className="p-4">
                      <select 
                        value={user.accountType || 'Starter'} 
                        onChange={(e) => updateField(user._id, 'accountType', e.target.value)}
                        className="w-32 bg-zinc-900 p-2 rounded border border-white/10 outline-none cursor-pointer"
                      >
                        <option value="Starter">Starter</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                        <option value="Vip elite">Vip elite</option>
                      </select>
                    </td>
                     <td className="p-4">
                      <select 
                        value={user.coin || 'USDT'} 
                        onChange={(e) => updateField(user._id, 'coin', e.target.value)}
                        className="w-32 bg-zinc-900 p-2 rounded border border-white/10 outline-none cursor-pointer"
                      >
                        <option value="USDT">USDT</option>
                        <option value="BTC">BTC</option>
                        
                      </select>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => saveUser(user)} 
                        disabled={savingId === user._id}
                        className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/50 px-6 py-2 rounded-xl font-bold transition-all active:scale-95"
                      >
                        {savingId === user._id ? '...' : 'Save'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}