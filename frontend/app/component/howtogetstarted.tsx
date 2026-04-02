'use client';

import { motion } from 'framer-motion';
import {
  UserPlus,
  Wallet,
  ArrowRightLeft,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

export default function GetStarted() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Account',
      description:
        'Sign up in under 2 minutes. Enable 2FA for security. Your account includes a built-in wallet — no extra setup needed.',
      color: 'from-blue-500/20 to-blue-600/10',
      badge: 'Quick Setup',
    },
    {
      icon: Wallet,
      title: 'Fund Your Wallet',
      description:
        'Deposit fiat or transfer crypto from another wallet. Funds arrive fast and are ready to trade instantly.',
      color: 'from-purple-500/20 to-purple-600/10',
      badge: 'Instant Funding',
    },
    {
      icon: ArrowRightLeft,
      title: 'Start Trading',
      description:
        'Buy and sell crypto anytime. Use market or limit orders and track your portfolio in real-time.',
      color: 'from-green-500/20 to-green-600/10',
      badge: '24/7 Access',
    },
  ];

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-zinc-950 border-t border-zinc-800/50 relative overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Get Started in{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>

          <p className="mt-5 text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to start trading crypto — simple, secure, and built
            for everyone.
          </p>
        </div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
  key={index}
  // variants={item}
  className={`group relative rounded-3xl border backdrop-blur-xl p-8 transition-all duration-300 
  ${
    index === 1
      ? 'bg-gradient-to-br from-yellow-400/20 via-yellow-300/10 to-yellow-500/20 border-yellow-400/40 scale-105 shadow-2xl shadow-yellow-500/20'
      : 'bg-zinc-900/40 border-zinc-800/60 hover:border-blue-500/40 hover:-translate-y-2'
  }`}
>
  {/* Glow overlay */}
  <div
    className={`absolute inset-0 rounded-3xl opacity-0 transition 
    ${
      index === 1
        ? 'group-hover:opacity-100 bg-yellow-400/10'
        : 'group-hover:opacity-100'
    }`}
  />

  <div className="relative z-10">
    {/* Top */}
    <div className="flex items-center justify-between mb-6">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition
        ${
          index === 1
            ? 'bg-yellow-400/20'
            : 'bg-zinc-800 group-hover:scale-110'
        }`}
      >
        <step.icon
          className={`w-6 h-6 ${
            index === 1 ? 'text-yellow-300' : 'text-blue-400'
          }`}
        />
      </div>

      <span
        className={`text-xs px-3 py-1 rounded-full
        ${
          index === 1
            ? 'bg-yellow-400/20 text-yellow-200'
            : 'bg-zinc-800 text-zinc-300'
        }`}
      >
        {step.badge}
      </span>
    </div>

    {/* Title */}
    <h3 className="text-xl font-semibold text-white mb-3">
      {index + 1}. {step.title}
    </h3>

    {/* Description */}
    <p className="text-zinc-400 leading-relaxed text-sm">
      {step.description}
    </p>

    {/* Security note */}
    {index === 0 && (
      <div className="mt-5 flex items-center gap-2 text-xs text-green-400">
        <ShieldCheck className="w-4 h-4" />
        2FA enabled by default
      </div>
    )}
  </div>
</motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-semibold text-lg 
            bg-gradient-to-r from-blue-600 to-purple-600 
            hover:scale-105 hover:brightness-110 transition-all 
            shadow-lg shadow-purple-500/20"
          >
            Get Started Now
            <ArrowRightLeft className="w-5 h-5" />
          </Link>

          <p className="mt-4 text-sm text-zinc-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Footer note */}
        <div className="mt-14 flex items-center justify-center gap-2 text-xs text-zinc-500">
          <Lock className="w-4 h-4 text-green-400" />
          Bank-grade security. Never share your private keys.
        </div>
      </div>
    </section>
  );
}