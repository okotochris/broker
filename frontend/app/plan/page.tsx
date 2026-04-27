"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import Footer from "../component/footer";
import Header from "../component/header";

type Plan = {
  name: string;
  price: string;
  returns: string;
  risk: "Low" | "Medium" | "High";
  duration: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$100 min",
    returns: "3–5% / month",
    risk: "Low",
    duration: "30 days",
    features: ["Beginner friendly", "Basic analytics", "Demo access"],
  },
  {
    name: "Growth",
    price: "$1,000 min",
    returns: "6–10% / month",
    risk: "Medium",
    duration: "30–90 days",
    features: ["Advanced charts", "Priority support", "Flexible withdrawal"],
  },
  {
    name: "Pro",
    price: "$5,000+",
    returns: "10–20% / month",
    risk: "High",
    duration: "90+ days",
    features: [
      "Full analytics suite",
      "Dedicated manager",
      "Auto-compounding",
    ],
  },
];

const riskColor = {
  Low: "text-green-400 bg-green-500/10 border-green-500/20",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  High: "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function InvestmentPlansPage() {
  const router = useRouter();

  return (
    <div className="bg-zinc-950 text-white min-h-screen">

      <Header />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/image9.jpg"
            className="w-full h-full object-cover opacity-30"
            alt="investment"
          />
       
        </div>

        {/* Glow */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/20 blur-[140px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">

          <div className="inline-block px-4 py-1 border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm rounded-full">
            Smart Wealth Building Platform
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Grow Your Wealth With Structured Investment Plans
          </motion.h1>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Invest smarter with data-driven strategies designed to balance risk and return.
            Build consistent financial growth with transparency and control.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium"
            >
              Get Started
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 border border-zinc-700 hover:border-blue-500 rounded-xl font-medium"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-4">

          <h2 className="text-3xl md:text-4xl font-bold">
            Why Investors Trust Us
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            We focus on transparency, risk control, and performance-driven strategies.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <h3 className="font-semibold mb-2">📊 Data-Driven Strategy</h3>
              <p className="text-gray-400 text-sm">
                Market analysis and algorithmic insights guide every investment decision.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <h3 className="font-semibold mb-2">🛡 Risk Management</h3>
              <p className="text-gray-400 text-sm">
                Smart allocation systems reduce exposure and stabilize returns.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <h3 className="font-semibold mb-2">⚡ Fast Execution</h3>
              <p className="text-gray-400 text-sm">
                Automated systems ensure smooth deposits and withdrawals.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 px-6 bg-zinc-900/40 border-y border-zinc-800">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div>
              <p className="text-blue-400 font-bold">1. Choose Plan</p>
              <p className="text-gray-400 text-sm mt-2">
                Select an investment plan that matches your goals.
              </p>
            </div>

            <div>
              <p className="text-blue-400 font-bold">2. Fund Account</p>
              <p className="text-gray-400 text-sm mt-2">
                Deposit capital securely into your wallet.
              </p>
            </div>

            <div>
              <p className="text-blue-400 font-bold">3. Earn Returns</p>
              <p className="text-gray-400 text-sm mt-2">
                Watch your portfolio grow automatically.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PLANS ================= */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Investment Plans</h2>
          <p className="text-gray-400">Flexible options for every investor level</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {plans.map((plan, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-blue-500 transition">

              <div className="flex justify-between mb-3">
                <h3 className="font-semibold">{plan.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${riskColor[plan.risk]}`}>
                  {plan.risk}
                </span>
              </div>

              <p className="text-blue-400 font-bold mb-3">{plan.price}</p>

              <p className="text-gray-400 text-sm mb-4">
                Returns: {plan.returns} <br />
                Duration: {plan.duration}
              </p>

              <ul className="text-sm text-gray-400 space-y-2 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>

              <button
                onClick={() => router.push("/dashboard")}
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-xl"
              >
                Invest Now
              </button>

            </div>
          ))}

        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-zinc-900 border border-zinc-800 p-10 rounded-2xl">

          <p className="text-gray-300 italic">
            “The platform helped me start small and grow steadily. Everything feels transparent and easy to use.”
          </p>

          <p className="mt-4 text-blue-400 font-semibold">— Verified Investor</p>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 px-6 text-center">
        <h3 className="text-3xl font-semibold mb-4">
          Start building your financial future today
        </h3>

        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium"
        >
          Open Dashboard
        </button>
      </section>

      {/* ================= DISCLAIMER ================= */}
      <p className="text-center text-xs text-gray-500 pb-10 px-6">
        * Investments carry risk. Returns are not guaranteed.
      </p>

      <Footer />
    </div>
  );
}