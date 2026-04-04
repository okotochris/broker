'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { useState } from 'react';
import Header from '../component/header';
import Footer from '../component/footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@pulsemarketio.com',
      description: 'We reply within 24 hours',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Available 24/7',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'San Francisco, CA',
      description: '123 Crypto Street, Suite 100',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: '24/7 Support',
      description: 'Always here to help',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <MessageSquare className="absolute top-20 left-20 w-32 h-32 text-blue-400 animate-pulse" />
          <Mail className="absolute bottom-32 right-20 w-32 h-32 text-cyan-400 animate-pulse delay-500" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/50 to-zinc-950 opacity-95" />

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
              Have questions or need support? We&apos;re here to help. Reach out to us and we&apos;ll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 md:px-8 bg-zinc-900/50 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={i}
                  variants={item}
                  className="bg-zinc-800/50 rounded-lg p-6 border border-zinc-700 hover:border-blue-500/50 transition text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                  <p className="text-blue-400 font-medium mb-1">{info.value}</p>
                  <p className="text-sm text-zinc-400">{info.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-300 text-center"
                >
                  ✓ Message sent successfully! We&apos;ll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* FAQ Card */}
            <div className="bg-zinc-800/50 rounded-lg p-8 border border-zinc-700">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {[
                  {
                    q: 'How long does it take to get a response?',
                    a: 'We typically respond within 24 hours during business hours.',
                  },
                  {
                    q: 'Do you offer phone support?',
                    a: 'Yes, our support team is available 24/7 via phone and email.',
                  },
                  {
                    q: 'What payment methods do you accept?',
                    a: 'We accept all major cryptocurrencies and traditional payment methods.',
                  },
                ].map((faq, i) => (
                  <div key={i}>
                    <p className="font-semibold text-white mb-2">{faq.q}</p>
                    <p className="text-zinc-400 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
              <p className="text-zinc-300 mb-6">
                Our customer support team is active 24/7. You can reach us through any of the channels listed above.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-zinc-400">
                  <span className="font-semibold text-blue-400">Live Chat:</span> Available on our website
                </p>
                <p className="text-sm text-zinc-400">
                  <span className="font-semibold text-blue-400">Email:</span> support@pulsemarketio.com
                </p>
                <p className="text-sm text-zinc-400">
                  <span className="font-semibold text-blue-400">Phone:</span> +1 (555) 123-4567
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-zinc-900/50 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Join Our Community
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Have more questions? Connect with thousands of traders in our community forum.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Visit Community Forum
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
