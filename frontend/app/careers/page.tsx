'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, Users, Target, ArrowRight } from 'lucide-react';

export default function Careers() {
  const positions = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
    },
    {
      title: 'Security Engineer',
      department: 'Security',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'San Francisco, CA',
      type: 'Full-time',
    },
  ];

  const benefits = [
    { icon: Users, title: 'Great Team', description: 'Work with talented professionals' },
    { icon: Target, title: 'Growth', description: 'Continuous learning opportunities' },
    { icon: Briefcase, title: 'Competitive Pay', description: 'Industry-leading compensation' },
  ];

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            Help us revolutionize the future of crypto trading and build the next generation of financial tools.
          </p>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Why Join pulseMarket?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-8 hover:border-blue-500/50 transition"
            >
              <benefit.icon className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-zinc-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Open Positions
        </motion.h2>
        <div className="space-y-4">
          {positions.map((position, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-blue-500/50 transition group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold group-hover:text-blue-400 transition">
                    {position.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-zinc-400">
                    <span>{position.department}</span>
                    <span>•</span>
                    <span>{position.location}</span>
                    <span>•</span>
                    <span>{position.type}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-2 transition" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-6">Don&apos;t see your fit?</h2>
          <p className="text-zinc-300 mb-8">
            Send us your resume and let us know what you&apos;re interested in. We are always looking for talented people.
          </p>
          <Link
            href="mailto:careers@pulsemarketio.com"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Send Your Resume
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
