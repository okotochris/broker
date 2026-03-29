'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShieldCheck, 
  BarChart3, 
  Bell, 
  Wallet, 
  Zap, 
  Globe, 
  Award ,
  ChevronRight
} from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: "Real-time Market Data",
    description: "Live price updates, advanced charts, and market analysis with zero lag.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    description: "AES-256 encryption, 2FA, cold storage, and insurance protection for your assets.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: BarChart3,
    title: "Advanced Trading Tools",
    description: "Limit orders, stop-loss, take-profit, portfolio analytics, and performance tracking.",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get instant alerts for price changes, trade executions, and market opportunities.",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Wallet,
    title: "Multi-Wallet Support",
    description: "Connect hardware wallets, export keys, or use our secure built-in wallet.",
    color: "from-rose-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Lightning Fast Trades",
    description: "Execute trades in milliseconds with our high-performance trading engine.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: Globe,
    title: "Global Market Access",
    description: "Trade 200+ cryptocurrencies across spot and futures markets 24/7.",
    color: "from-cyan-500 to-sky-500"
  },
  {
    icon: Award,
    title: "Low Trading Fees",
    description: "Competitive fees starting at 0.05% with VIP tiers for active traders.",
    color: "from-yellow-500 to-amber-500"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  },
  hover: {
    y: -12,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

export default function FeaturedFeatures() {
  return (
    <section className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with animation */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Serious Traders
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to trade smarter, safer, and faster — all in one platform.
            </p>
          </motion.div>
        </div>

        {/* Features Grid with Staggered Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              
              whileHover="hover"
              className="group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 hover:border-orange-500/50 dark:hover:border-orange-500/30 transition-all duration-300 h-full flex flex-col"
            >
              {/* Icon with hover animation */}
              <motion.div 
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 8 }}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                {feature.description}
              </p>

              {/* Subtle bottom accent line */}
              <div className="mt-6 h-0.5 w-12 bg-gradient-to-r from-orange-500 to-transparent group-hover:w-20 transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA with animation */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a 
            href="#get-started"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold rounded-2xl transition-all hover:shadow-2xl hover:shadow-orange-500/30"
          >
            Explore All Features
            <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}