'use client';

import { useEffect, useState } from 'react';
import Header from '../component/header';

// 1. Updated Type: Removed the array brackets
type Investment = {
  amountInvest: number;
  totalProfit: number;
  usdValue: number;
  ethValue: number;
  btcValue: number;
};

type User = {
  _id: string;
  name: string;
  email: string;
  investment?: Investment; // Changed from Investment[] to Investment
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

  // 2. Updated State Logic: Spread object instead of mapping array
  function updateField(userId: string, field: keyof Investment, value: number) {
    setUsers((prev) =>
      prev.map((user) => {
        if (user._id !== userId) return user;
        const current = user.investment || { usdValue: 0, btcValue: 0, ethValue: 0, amountInvest: 0, totalProfit: 0 };
        return {
          ...user,
          investment: { 
            ...current, 
            [field]: value 
          },
        };
      })
    );
  }

  async function saveUser(user: User) {
    const inv = user.investment;
    if (!inv) return;

    try {
      setSavingId(user._id);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${user._id}/sync-investment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usdValue: Number(inv.usdValue || 0),
          btcValue: Number(inv.btcValue || 0),
          ethValue: Number(inv.ethValue || 0),
          btcPrice: prices.btc,
          ethPrice: prices.eth
        }),
      });

      if (!res.ok) throw new Error('Update failed');

      setSuccess(`Updated ${user.email}`);
      loadUsers(); 
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
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 rounded bg-zinc-900 border border-white/20" placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded bg-zinc-900 border border-white/20" placeholder="Password" />
            {loginError && <p className="text-red-400">{loginError}</p>}
            <button className="w-full py-3 bg-orange-500 rounded font-bold">Login</button>
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
          <h1 className="text-3xl font-bold mb-6">User Management</h1>
          {success && <div className="p-3 bg-green-500/20 text-green-200 mb-4 rounded">{success}</div>}
          <div className="overflow-x-auto border border-white/10 rounded-xl">
            <table className="min-w-full text-left">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-4">Email</th>
                  <th className="p-4">USDT</th>
                  <th className="p-4">BTC</th>
                  <th className="p-4">ETH</th>
                  <th className="p-4">Total Invested</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  // 3. Render Logic: Access object directly
                  const inv = user.investment || { usdValue: 0, btcValue: 0, ethValue: 0, amountInvest: 0 };
                  return (
                    <tr key={user._id} className="border-t border-white/10">
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <input type="number" value={inv.usdValue} onChange={(e) => updateField(user._id, 'usdValue', Number(e.target.value))} className="w-24 bg-zinc-900 p-1 rounded border border-white/10" />
                      </td>
                      <td className="p-4">
                        <input type="number" step="0.000001" value={inv.btcValue} onChange={(e) => updateField(user._id, 'btcValue', Number(e.target.value))} className="w-24 bg-zinc-900 p-1 rounded border border-white/10" />
                      </td>
                      <td className="p-4">
                        <input type="number" step="0.0001" value={inv.ethValue} onChange={(e) => updateField(user._id, 'ethValue', Number(e.target.value))} className="w-24 bg-zinc-900 p-1 rounded border border-white/10" />
                      </td>
                      <td className="p-4 text-orange-400 font-mono">${inv.amountInvest?.toLocaleString()}</td>
                      <td className="p-4">
                        <button onClick={() => saveUser(user)} className="bg-blue-600 px-4 py-1 rounded">
                          {savingId === user._id ? '...' : 'Save'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}