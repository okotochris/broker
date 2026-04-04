'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');

  const posts = [
    {
      id: 1,
      title: 'Getting Started with Crypto Trading: A Beginner\'s Guide',
      excerpt: 'Learn the basics of cryptocurrency trading and how to make your first trade on Capitextradecompany.',
      author: 'Sarah Chen',
      date: 'Mar 28, 2026',
      category: 'Trading',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Understanding DeFi: Opportunities and Risks',
      excerpt: 'Explore the decentralized finance ecosystem and how it\'s transforming traditional finance.',
      author: 'Mike Johnson',
      date: 'Mar 25, 2026',
      category: 'DeFi',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Security Best Practices for Crypto Investors',
      excerpt: 'Protect your digital assets with these essential security tips and strategies.',
      author: 'Alex Rivera',
      date: 'Mar 22, 2026',
      category: 'Security',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Market Analysis: Bitcoin and Ethereum Trends',
      excerpt: 'In-depth analysis of recent market movements and what they mean for your portfolio.',
      author: 'Emma Davis',
      date: 'Mar 20, 2026',
      category: 'Market Analysis',
      readTime: '7 min read',
    },
    {
      id: 5,
      title: 'Staking vs Trading: Which Strategy is Right for You?',
      excerpt: 'Compare different investment strategies and find the approach that matches your goals.',
      author: 'James Wilson',
      date: 'Mar 18, 2026',
      category: 'Strategy',
      readTime: '9 min read',
    },
    {
      id: 6,
      title: 'The Future of Web3: What\'s Coming Next',
      excerpt: 'Exploring the next frontier of blockchain technology and its potential applications.',
      author: 'Lisa Zhang',
      date: 'Mar 15, 2026',
      category: 'Web3',
      readTime: '10 min read',
    },
  ];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-28 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Capitextradecompany Blog
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            Market insights, trading tips, and crypto news from the Capitextradecompany team.
          </p>
        </motion.div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="flex items-center gaps-3 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 focus-within:border-blue-500 transition">
            <Search className="w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder-zinc-500"
            />
          </div>
        </motion.div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition"
            >
              <Link href={`/blog/${post.id}`}>
                <div className="h-48 bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition" />
              </Link>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <Link href={`/blog/${post.id}`}>
                  <h3 className="text-lg font-semibold group-hover:text-blue-400 transition mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <span>{post.readTime}</span>
                </div>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition text-sm font-semibold"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-zinc-400 mb-4">No articles found matching your search.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Clear search
            </button>
          </motion.div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-zinc-300 mb-8">
            Subscribe to our newsletter for the latest market insights and trading tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:brightness-110 transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
