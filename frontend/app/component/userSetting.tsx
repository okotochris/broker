'use client';

import { useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
};

export default function UserSettings() {
  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setName(parsed.name || '');
    }
  }, []);

  // Handle name update
  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // 🔁 Replace with your API
      const res = await fetch('/api/user/update-name', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error('Failed to update name');

      const updatedUser = { ...user, name } as User;

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      setMessage('Name updated successfully ✅');
    } catch (err) {
      setMessage('Error updating name ❌');
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // 🔁 Replace with your API
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) throw new Error('Failed to change password');

      setCurrentPassword('');
      setNewPassword('');

      setMessage('Password updated successfully ✅');
    } catch (err) {
      setMessage('Error changing password ❌');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center text-zinc-400 py-10">
        Please log in to access settings.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-10">
      <h2 className="text-2xl font-bold text-white">User Settings</h2>

      {/* Update Name */}
      <form
        onSubmit={handleNameUpdate}
        className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 space-y-4"
      >
        <h3 className="text-lg font-semibold text-white">Update Name</h3>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
          placeholder="Your name"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:brightness-110"
        >
          {loading ? 'Updating...' : 'Update Name'}
        </button>
      </form>

      {/* Change Password */}
      <form
        onSubmit={handlePasswordChange}
        className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 space-y-4"
      >
        <h3 className="text-lg font-semibold text-white">
          Change Password
        </h3>

        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current password"
          className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
          required
        />

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
          className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:brightness-110"
        >
          {loading ? 'Updating...' : 'Change Password'}
        </button>
      </form>

      {/* Feedback */}
      {message && (
        <div className="text-center text-sm text-zinc-400">
          {message}
        </div>
      )}
    </div>
  );
}