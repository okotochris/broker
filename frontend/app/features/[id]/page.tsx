'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getFeatureById } from '@/app/component/featuresData';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Header from '@/app/component/header';
import { section } from 'framer-motion/m';
import Footer from '@/app/component/footer';

export default function FeatureDetail() {
  const params = useParams();
  const id = params.id as string;
  
  const feature = getFeatureById(id);

  if (!feature) {
    notFound();
  }

  const Icon = feature.icon;

 return (
  <>
    <Header />

    {/* HERO SECTION */}
    <section className="relative overflow-hidden bg-zinc-950 pt-28 pb-16">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={feature.image} // 👈 make sure this exists in your data
          alt={feature.title}
          className="w-full h-full object-cover opacity-30"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Optional glow overlay (keeps your aesthetic) */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>

        {/* Hero Content */}
        <div className="text-center space-y-6">

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
          >
            <Icon className="w-10 h-10 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white"
          >
            {feature.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Discover how {feature.title.toLowerCase()} transforms your trading experience with speed, precision, and intelligence.
          </motion.p>

          {/* Accent line */}
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-orange-500 to-cyan-500 rounded-full" />
        </div>
      </div>
    </section>

    {/* MAIN CONTENT */}
    <section className="bg-zinc-950 pb-20">
      <div className="max-w-4xl mx-auto px-6 space-y-12">

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            {feature.description}
          </p>

          {/* Feature Highlights */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Key Benefits
            </h2>

            <ul className="space-y-3">
              {[
                "Enhanced trading capabilities",
                "Improved user experience",
                "Competitive advantage",
                "24/7 reliability and support",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${feature.color}`}
                  />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border border-orange-500/20 rounded-2xl p-8 text-center space-y-4">
            <h3 className="text-2xl font-semibold text-white">
              Ready to get started?
            </h3>
            <p className="text-gray-300">
              Start trading with {feature.title.toLowerCase()} today
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition"
            >
              Get Started Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

    <Footer />
  </>
);
}
