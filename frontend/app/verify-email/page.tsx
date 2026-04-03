'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, CheckCircle, ArrowRight, Clock, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!canResend && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
    }, 1500);
  };

  const handleResend = () => {
    setCanResend(false);
    setTimeLeft(60);
    setVerificationCode(['', '', '', '', '', '']);
    setError('');
  };

  if (isVerified) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto" />
          </motion.div>

          <h1 className="text-4xl font-bold mb-4">Email Verified!</h1>
          <p className="text-lg text-zinc-300 mb-8">
            Your email has been successfully verified. You can now access your Capitextradecompany account and start trading.
          </p>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-sm text-zinc-500 mt-8">
            Didn&apos;t mean to verify? <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition">Contact support</Link>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <Mail className="w-16 h-16 text-blue-400 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Verify Email
          </h1>
          <p className="text-zinc-300 text-sm">
            We&apos;ve sent a 6-digit code to your email address. Please enter it below to verify your account.
          </p>
        </div>

        {/* Verification Code Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <label className="block text-sm font-medium mb-4 text-zinc-300">
            Verification Code
          </label>
          <div className="flex gap-3 mb-4">
            {verificationCode.map((digit, index) => (
              <motion.input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                whileFocus={{ scale: 1.05 }}
                className="w-12 h-12 text-center text-2xl font-bold bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                placeholder="0"
              />
            ))}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm font-medium"
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        {/* Verify Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleVerify}
          disabled={isLoading || verificationCode.some(d => !d)}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              Verifying...
            </>
          ) : (
            <>
              Verify Email
              <CheckCircle className="w-5 h-5" />
            </>
          )}
        </motion.button>

        {/* Resend Code */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-zinc-400 text-sm mb-4">Didn&apos;t receive the code?</p>
          
          {canResend ? (
            <button
              onClick={handleResend}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Resend Code
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 text-zinc-400">
              <Clock className="w-4 h-4" />
              <span>Resend in {timeLeft}s</span>
            </div>
          )}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5 }}
          className="my-8 border-t border-zinc-800"
        />

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-xs text-zinc-500 mb-4">
            Having trouble? Check your spam folder or contact our support team.
          </p>
          <Link
            href="/contact"
            className="text-blue-400 hover:text-blue-300 transition text-sm font-medium"
          >
            Get Help →
          </Link>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
        >
          <p className="text-xs text-zinc-300 leading-relaxed">
            <span className="font-semibold text-blue-400">Tip:</span> The verification code expires in 15 minutes. If your code expires, you can request a new one using the resend option.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
