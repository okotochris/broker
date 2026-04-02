'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Play, Award, ArrowRight, Clock, BarChart3 } from 'lucide-react';

export default function CryptoAcademy() {
  const courses = [
    {
      id: 1,
      title: 'Blockchain Fundamentals',
      instructor: 'Sarah Chen',
      level: 'Beginner',
      duration: '4 weeks',
      students: '15K+',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Technical Analysis 101',
      instructor: 'Mike Johnson',
      level: 'Intermediate',
      duration: '6 weeks',
      students: '12K+',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'DeFi Smart Contracts',
      instructor: 'Alex Rivera',
      level: 'Advanced',
      duration: '8 weeks',
      students: '8K+',
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Risk Management',
      instructor: 'Emma Davis',
      level: 'Intermediate',
      duration: '5 weeks',
      students: '10K+',
      rating: 4.8,
    },
    {
      id: 5,
      title: 'Trading Strategies',
      instructor: 'James Wilson',
      level: 'Advanced',
      duration: '7 weeks',
      students: '9K+',
      rating: 4.9,
    },
    {
      id: 6,
      title: 'Cryptocurrency Wallets',
      instructor: 'Lisa Zhang',
      level: 'Beginner',
      duration: '2 weeks',
      students: '18K+',
      rating: 4.7,
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Content',
      description: 'Learn from industry experts with real-world experience',
    },
    {
      icon: Play,
      title: 'Video Tutorials',
      description: 'High-quality video lessons you can watch anytime',
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Earn recognized certificates upon completion',
    },
    {
      icon: BarChart3,
      title: 'Live Trading',
      description: 'Practice with simulated trading accounts',
    },
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
          <BookOpen className="w-20 h-20 text-indigo-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            Crypto Academy
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            Master cryptocurrency trading and blockchain with our comprehensive courses. Learn at your own pace from industry experts.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Start Learning Now
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Why Learn with Broka Academy?
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-indigo-500/50 transition"
            >
              <feature.icon className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Featured Courses
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition"
            >
              <div className="h-32 bg-gradient-to-br from-indigo-600/30 to-blue-600/30 group-hover:from-indigo-500/40 group-hover:to-blue-500/40 transition flex items-center justify-center">
                <Play className="w-12 h-12 text-indigo-400 opacity-60 group-hover:opacity-100 transition" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-400 transition">
                  {course.title}
                </h3>
                
                <p className="text-sm text-zinc-400 mb-4">
                  by {course.instructor}
                </p>

                <div className="space-y-2 mb-4 text-sm border-b border-zinc-800/50 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      Level
                    </span>
                    <span className="text-indigo-400 font-semibold">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Duration
                    </span>
                    <span className="text-white">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Students</span>
                    <span className="text-white">{course.students}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-semibold">{course.rating}</span>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border border-indigo-500/30 rounded text-sm font-semibold group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-blue-600 group-hover:border-transparent transition flex items-center gap-1">
                    Enroll
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Structured Learning Paths
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              path: 'Beginner to Trader',
              courses: 5,
              duration: '12 weeks',
              description: 'Start from scratch and become a confident trader',
            },
            {
              path: 'Advanced Strategies',
              courses: 8,
              duration: '20 weeks',
              description: 'Master advanced trading techniques and analysis',
            },
            {
              path: 'DeFi Developer',
              courses: 6,
              duration: '16 weeks',
              description: 'Learn blockchain development and smart contracts',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border border-indigo-500/30 rounded-xl p-8 hover:border-indigo-500/60 transition"
            >
              <h3 className="text-2xl font-semibold text-indigo-400 mb-3">{item.path}</h3>
              <p className="text-zinc-400 mb-6">{item.description}</p>
              <div className="flex items-center justify-between mb-6 text-sm">
                <span className="text-zinc-500">{item.courses} courses</span>
                <span className="text-zinc-500">{item.duration}</span>
              </div>
              <button className="w-full py-2 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg font-semibold hover:brightness-110 transition">
                View Path
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div className="bg-gradient-to-r from-indigo-600/10 to-blue-600/10 border border-indigo-500/30 rounded-xl p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50+', label: 'Courses' },
              { value: '100+', label: 'Video Hours' },
              { value: '200K+', label: 'Active Students' },
              { value: '95%', label: 'Completion Rate' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl font-bold text-indigo-400 mb-2">{stat.value}</div>
                <p className="text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Master Crypto?</h2>
          <p className="text-xl text-zinc-300 mb-8">
            Join thousands of students learning with Broka Academy.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Enroll Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
