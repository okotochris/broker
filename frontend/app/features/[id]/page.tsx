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
    <section className="min-h-screen bg-zinc-950 py-20 md:py-28">
    <Header />
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button with motion */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Icon and Title */}
          <div className="space-y-6">
            <motion.div 
              className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
              whileHover={{ scale: 1.1, rotate: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Icon className="w-10 h-10 text-white" />
            </motion.div>

            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {feature.title}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-transparent" />
            </div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-300 leading-relaxed">
              {feature.description}
            </p>

            {/* Feature Highlights - Dynamic based on feature */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-4">
              <h2 className="text-2xl font-semibold text-white mb-6">Key Benefits</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${feature.color}`} />
                  <span className="text-gray-300">Enhanced trading capabilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${feature.color}`} />
                  <span className="text-gray-300">Improved user experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${feature.color}`} />
                  <span className="text-gray-300">Competitive advantage</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${feature.color}`} />
                  <span className="text-gray-300">24/7 reliability and support</span>
                </li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border border-orange-500/20 rounded-2xl p-8 text-center space-y-4">
              <h3 className="text-2xl font-semibold text-white">Ready to get started?</h3>
              <p className="text-gray-300">Start trading with {feature.title.toLowerCase()} today</p>
              <Link 
                href="/signup"
                className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Get Started Now
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    <Footer />
    </>

  );
}
