'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ChevronRight
} from 'lucide-react';
import { featuresData } from './featuresData';

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
    <section className="py-20 md:py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with animation */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features for Serious Traders
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
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
          {featuresData.map((feature, index) => (
            <Link href={`/features/${feature.id}`} key={index}>
              <motion.div
               
                whileHover="hover"
                className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-orange-500/50 dark:hover:border-orange-500/30 transition-all duration-300 h-full flex flex-col cursor-pointer"
              >
                {/* Icon with hover animation */}
                <motion.div 
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 8 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed grow">
                  {feature.description.slice(0, 100)} ....
                </p>

                {/* Subtle bottom accent line with arrow */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="h-0.5 w-12 bg-linear-to-r from-orange-500 to-transparent group-hover:w-20 transition-all duration-300" />
                  <ChevronRight className="w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            </Link>
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
          
        </motion.div>
      </div>
    </section>
  );
}