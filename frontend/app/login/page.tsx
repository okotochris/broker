'use client';

import { useState } from 'react';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import LoadingBar from '../component/loading';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);  
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });
  const [error, setError] = useState('');
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (step === 'email') {
        // Request OTP
        const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login/request-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
        });

        if (data.ok) {
          setStep('otp');
        } else {
          const errorData = await data.json();
          setError(errorData.message || 'Failed to send OTP');
        }
      } else {
        // Verify OTP
        const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login/verify-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email, otp: formData.otp }),
        });

        if (data.ok) {
          const user = await data.json();
          console.log('Login successful:', user);
          localStorage.setItem('user', JSON.stringify(user.user));
          window.location.href = '/dashboard';
        } else {
          const errorData = await data.json();
          setError(errorData.message || 'Invalid OTP');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-800">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 text-white">
          <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-3xl">
            🚀
          </div>
          <h1 className="text-3xl font-bold mt-4">Capitextradecompany</h1>
          <p className="text-zinc-500 text-sm">Trading Platform</p>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Login</h2>

        {/* Form */}
        <form  className="space-y-5" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {/* Email */}
          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e)=>setFormData({...formData, email:e.target.value})}
              placeholder="you@example.com"
              className="w-full  text-gray-300 mt-2 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl focus:outline-none focus:border-orange-500"
              disabled={step === 'otp'}
            />
          </div>

          {step === 'otp' && (
            /* OTP */
            <div>
              <label className="text-sm text-zinc-400">OTP</label>
              <input
                type="text"
                value={formData.otp}
                onChange={(e)=>setFormData({...formData, otp:e.target.value})}
                placeholder="Enter 6-digit OTP"
                className="w-full  text-gray-300 mt-2 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl focus:outline-none focus:border-orange-500"
                maxLength={6}
              />
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 transition py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            {loading ? <LoadingBar /> : step === 'email' ? 'Send OTP' : 'Verify OTP'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-zinc-500 text-sm mt-6">
          Don’t have an account?{" "}
          <Link href={'/signup'}
            className="text-orange-500 hover:underline cursor-pointer">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
