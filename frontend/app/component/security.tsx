'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, KeyRound, Database } from 'lucide-react';

const slides = [
   {
    icon: ShieldCheck,
    title: 'Military-Grade Encryption & Zero-Knowledge Architecture',
    desc: 'Every transaction, login, and stored data point is protected using AES-256 encryption combined with end-to-end zero-knowledge proofs. Even Capitextradecompany cannot access your private information or transaction details. In an era where quantum threats are emerging in 2026, our post-quantum cryptography layer ensures long-term future-proofing. Your financial privacy remains intact — no backdoors, no compromises.',
    image: '/image1.jpg', // modern encryption visual
  },
  {
    icon: Lock,
    title: 'Mandatory Two-Factor Authentication + Biometric Safeguards',
    desc: '2FA is enforced by default on every account — supporting authenticator apps, hardware keys (YubiKey), and SMS as fallback. For added protection, enable biometric verification (fingerprint/face ID) on mobile and desktop apps. Withdrawals and high-value actions require secondary confirmation. This multi-layered approach has prevented millions in potential losses across the industry, making unauthorized access virtually impossible.',
    image: '/image5.jpg', // secure lock / auth visual
  },
  {
    icon: KeyRound,
    title: 'Full Self-Custody & Private Key Sovereignty',
    desc: 'Unlike many platforms that hold your keys, Capitextradecompany gives you true ownership. Export your private keys or seed phrase at any time, connect hardware wallets (Ledger, Trezor), or use multisig setups for extra security. You decide who controls your assets — not us. This non-custodial option empowers advanced users while beginners enjoy our secure custodial wallet with insurance coverage up to $250M per user.',
    image: '/image2.jpg', // key / wallet visual
  },
  {
    icon: Database,
    title: 'Institutional-Grade Cold Storage & Insurance Fund',
    desc: 'Over 95% of user funds are stored in geographically distributed, air-gapped cold wallets offline, protected by multi-signature protocols and physical security measures. Our real-time monitoring detects anomalies instantly. In addition, Capitextradecompany maintains a comprehensive insurance fund covering hacks, theft, and internal errors — providing peace of mind even in worst-case scenarios. Industry-leading practices trusted by high-net-worth individuals and institutions alike.',
    image: '/image6.jpg', // secure vault / cold storage visual
  },
];

export default function SecuritySection() {
  const [index, setIndex] = useState(0);

  // 🔁 Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">

      {/* 🟡 Gold background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/10 via-yellow-400/10 to-yellow-600/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.15),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Your Assets,{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Fully Protected
            </span>
          </h2>

          <p className="mt-5 text-zinc-400 max-w-2xl mx-auto text-lg">
            Built with multiple layers of security to keep your funds safe.
          </p>
        </div>

        {/* Slider */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* 🖼️ Image */}
          <div className="relative h-[320px] md:h-[400px] rounded-3xl overflow-hidden border border-yellow-500/20">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.image}
                src={current.image}
                alt={current.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* overlay */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* 📝 Text */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-14 h-14 rounded-xl bg-yellow-400/20 flex items-center justify-center mb-6">
                  <current.icon className="w-7 h-7 text-yellow-300" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {current.title}
                </h3>

                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  {current.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex gap-3 mt-6">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? 'w-8 bg-yellow-400'
                      : 'w-2 bg-zinc-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom trust */}
        <div className="mt-16 text-center text-sm text-zinc-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-5 h-5 text-yellow-400" />
          Bank-grade security trusted by millions worldwide
        </div>
      </div>
    </section>
  );
}