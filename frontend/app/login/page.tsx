'use client';

import { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-800">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 text-white">
          <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-3xl">
            🚀
          </div>
          <h1 className="text-3xl font-bold mt-4">Broka</h1>
          <p className="text-zinc-500 text-sm">Trading Platform</p>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Login</h2>

        {/* Form */}
        <form className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-2 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-zinc-400">Password</label>
            <div className="relative mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl focus:outline-none focus:border-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-zinc-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 transition py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Login
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
