'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '1M+', label: 'Active Users' },
  { value: '$4.2B+', label: '24h Trading Volume' },
  { value: '420+', label: 'Supported Assets' },
  { value: '99.99%', label: 'Uptime' },
];

export default function TrustedStats() {
  return (
    <section className="relative border-y border-zinc-800/50 bg-zinc-950">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 100 },
                },
              }}
              className="group"
            >
              <div className="text-2xl md:text-3xl font-bold text-white font-mono group-hover:scale-105 transition">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-500 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}