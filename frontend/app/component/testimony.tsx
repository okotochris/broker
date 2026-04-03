'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: "Alex Chen",
    role: "Full-time Crypto Trader",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    text: "Capitextradecompany has completely changed how I trade. The real-time data is incredibly accurate, and the execution speed is unmatched. I've never felt more confident managing my portfolio.",
    country: "Singapore"
  },
  {
    name: "Fatima Okoro",
    role: "Freelance Designer & Investor",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    text: "As a beginner, I was nervous about crypto. Capitextradecompany made everything so simple and secure. The educational tools and instant notifications helped me make my first profitable trades.",
    country: "Nigeria"
  },
  {
    name: "Marcus Rodriguez",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    text: "The security features are top-notch. I love that I can connect my hardware wallet and still enjoy a smooth trading experience. Best platform I've used in 2026.",
    country: "Mexico"
  },
  {
    name: "Priya Sharma",
    role: "Day Trader",
    image: "https://images.unsplash.com/photo-1580489944761-09be1ec59862?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    text: "Low fees + lightning-fast trades = perfect combination. The portfolio analytics helped me improve my strategy significantly. Highly recommended!",
    country: "India"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Trusted by Traders Worldwide
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Do not just take our word for it — hear from real users who trade with Capitextradecompany every day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-zinc-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-3xl p-8 flex flex-col h-full group"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-orange-500/30 group-hover:text-orange-500/50 transition-colors" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 flex-grow">
                {testimonial.text}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-orange-100 dark:ring-orange-900">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role} • {testimonial.country}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-sm text-gray-500 dark:text-gray-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span>4.9/5 Average Rating</span>
          </div>
          <div>12,450+ Active Traders</div>
          <div>98% Would Recommend</div>
          <div>Featured in CoinDesk & Bloomberg</div>
        </motion.div>
      </div>
    </section>
  );
}