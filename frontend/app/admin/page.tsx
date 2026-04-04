'use client';

import { useEffect, useState } from 'react';
import Header from '../component/header';

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
  investment?: Investment[];
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  // Login states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const storedLogin = localStorage.getItem('adminLoggedIn');
    if (storedLogin === 'true') {
      setIsLoggedIn(true);
      loadUsers();
    }
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`);
      if (!res.ok) throw new Error('Failed to fetch users');
      const payload = await res.json();
      setUsers(
        (payload.users as User[]).map((u) => ({
          ...u,
          investment: u.investment && u.investment.length ? u.investment : [{ usdValue: 0, btcValue: 0, ethValue: 0, amountInvest: 0, totalProfit: 0 }],
        }))
      );
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Unable to load users.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);

    // Hardcoded credentials
    if (username === 'info@capitextradecompany.com' && password === 'Money2025@@') {
      localStorage.setItem('adminLoggedIn', 'true');
      setIsLoggedIn(true);
      loadUsers();
    } else {
      setLoginError('Invalid username or password');
    }
  }

  function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
    setUsers([]);
    setUsername('');
    setPassword('');
  }

  function updateField(userId: string, field: 'usdValue' | 'btcValue' | 'ethValue', value: number) {
    setUsers((prev) =>
      prev.map((user) => {
        if (user._id !== userId) return user;
        const current = user.investment?.[0] || { usdValue: 0, btcValue: 0, ethValue: 0, amountInvest: 0, totalProfit: 0 };
        return {
          ...user,
          investment: [
            {
              ...current,
              [field]: value,
            },
          ],
        };
      })
    );
  }

  async function saveUser(user: User) {
    if (!user.investment?.length) return;
    const balance = user.investment[0];

    try {
      setSavingId(user._id);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${user._id}/balance`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usdValue: Number(balance.usdValue || 0),
          btcValue: Number(balance.btcValue || 0),
          ethValue: Number(balance.ethValue || 0),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || 'Update failed');
      }

      setSuccess(`Balances updated for ${user.email}`);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Unable to save user balances.');
      setSuccess(null);
    } finally {
      setSavingId(null);
      setTimeout(() => setSuccess(null), 3000);
    }
  }

  async function deleteUser(userId: string) {
    if (!confirm('Delete this user permanently?')) return;

    try {
      setSavingId(userId);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${userId}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || 'Delete failed');
      }

      setUsers((prev) => prev.filter((u) => u._id !== userId));
      setSuccess('User deleted successfully');
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Unable to delete user.');
      setSuccess(null);
    } finally {
      setSavingId(null);
      setTimeout(() => setSuccess(null), 3000);
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
       
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-zinc-900 border border-white/20 text-white focus:outline-none focus:border-orange-400"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-zinc-900 border border-white/20 text-white focus:outline-none focus:border-orange-400"
                placeholder="Enter password"
              />
            </div>
            {loginError && <div className="text-red-400 text-sm">{loginError}</div>}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold hover:scale-[1.02] transition"
            >
              Login
            </button>
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Super Admin: User Management</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white"
          >
            Logout
          </button>
        </div>
        <p className="mb-6 text-zinc-300">Update each user’s USDT (usdValue), BTC, and ETH holdings directly.</p>

        {loading && <div className="py-8">Loading users...</div>}
        {error && <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-500/20 text-green-200 p-3 rounded mb-4">{success}</div>}

        {!loading && !users.length && <div>No users found.</div>}

        {!loading && users.length > 0 && (
          <div className="overflow-x-auto border border-white/10 rounded-xl">
            <table className="min-w-full text-left">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">USDT</th>
                  <th className="px-4 py-3">BTC</th>
                  <th className="px-4 py-3">ETH</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const inv = user.investment?.[0] || { usdValue: 0, btcValue: 0, ethValue: 0, amountInvest: 0, totalProfit: 0 };
                  return (
                    <tr key={user._id} className="border-t border-white/10">
                      <td className="px-4 py-3">{user.name || '-'}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          value={inv.usdValue ?? 0}
                          onChange={(e) => updateField(user._id, 'usdValue', Number(e.target.value))}
                          className="w-28 p-1 rounded border border-white/20 bg-zinc-900 text-white"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          step="0.000001"
                          value={inv.btcValue ?? 0}
                          onChange={(e) => updateField(user._id, 'btcValue', Number(e.target.value))}
                          className="w-28 p-1 rounded border border-white/20 bg-zinc-900 text-white"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          step="0.0001"
                          value={inv.ethValue ?? 0}
                          onChange={(e) => updateField(user._id, 'ethValue', Number(e.target.value))}
                          className="w-28 p-1 rounded border border-white/20 bg-zinc-900 text-white"
                        />
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => saveUser(user)}
                          disabled={savingId === user._id}
                          className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-400 disabled:opacity-50"
                        >
                          {savingId === user._id ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={() => deleteUser(user._id)}
                          disabled={savingId === user._id}
                          className="px-3 py-1 rounded bg-red-500 hover:bg-red-400 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </>
  );
}