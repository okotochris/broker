'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Lock, Eye, AlertCircle, CheckCircle, ArrowRight, Zap } from 'lucide-react';

export default function Security() {
  const securityFeatures = [
    {
      icon: Lock,
      title: '2FA Authentication',
      description: 'Two-factor authentication for maximum account protection',
      details: 'Google Authenticator, SMS, Email verification options',
    },
    {
      icon: Shield,
      title: 'Cold Storage',
      description: '95% of funds stored in offline cold wallets',
      details: 'Industry-standard multi-signature architecture',
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: '24/7 threat detection and prevention systems',
      details: 'Advanced AI-powered anomaly detection',
    },
    {
      icon: Zap,
      title: 'Instant Alerts',
      description: 'Get notified of all account activities immediately',
      details: 'Email, SMS, and push notifications available',
    },
  ];

  const certifications = [
    { name: 'ISO 27001', description: 'Information Security Management' },
    { name: 'SOC 2 Type II', description: 'Compliance & Security Audit' },
    { name: 'PCI DSS', description: 'Payment Card Industry Standard' },
    { name: 'GDPR Compliant', description: 'Data Protection Regulation' },
  ];

  const bestPractices = [
    'Use a unique, strong password (16+ characters)',
    'Enable two-factor authentication on your account',
    'Never share your seed phrase or private keys',
    'Verify URLs before logging in',
    'Use a secure VPN when accessing from public networks',
    'Update your devices and browsers regularly',
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
          <Shield className="w-20 h-20 text-green-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
            Security First
          </h1>
          <p className="text-xl text-zinc-300 mb-8">
            Your security is our top priority. We use industry-leading security protocols to protect your assets 24/7.
          </p>
        </motion.div>
      </section>

      {/* Key Security Features */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Enterprise-Grade Security
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-green-500/50 transition"
            >
              <feature.icon className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400 mb-3">{feature.description}</p>
              <p className="text-xs text-zinc-500">{feature.details}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security Infrastructure */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Security Infrastructure
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: 'Network Security',
              items: [
                'DDoS Protection - Multi-layer defense',
                'WAF - Web Application Firewall',
                'SSL/TLS Encryption - All connections',
                'Zero Trust Architecture',
              ],
            },
            {
              title: 'Data Protection',
              items: [
                'AES-256 Encryption - Data at rest',
                'TLS 1.3 - Data in transit',
                'Regular Backups - Distributed storage',
                'Disaster Recovery - Multiple locations',
              ],
            },
            {
              title: 'Compliance & Audits',
              items: [
                'Regular Security Audits',
                'Penetration Testing - Quarterly',
                'Bug Bounty Program',
                'Compliance Monitoring',
              ],
            },
            {
              title: 'Asset Protection',
              items: [
                'Multi-signature Wallets',
                'Hardware Security Modules',
                'Segregated Accounts',
                'Insurance Coverage - $250M+',
              ],
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-xl p-8 hover:border-green-500/60 transition"
            >
              <h3 className="text-xl font-semibold text-green-400 mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Industry Certifications
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-green-500/50 transition text-center"
            >
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{cert.name}</h3>
              <p className="text-sm text-zinc-400">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* User Security Best Practices */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Security Best Practices
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-xl p-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {bestPractices.map((practice, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4"
              >
                <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
                <p className="text-zinc-300">{practice}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Incident Response */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Incident Response
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-600/10 to-teal-600/10 border border-green-500/30 rounded-xl p-12"
          >
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Detection', desc: 'Real-time threat monitoring' },
                { step: '02', title: 'Analysis', desc: 'Immediate incident assessment' },
                { step: '03', title: 'Response', desc: 'Swift mitigation actions' },
                { step: '04', title: 'Notification', desc: 'User communication & resolution' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-green-400 mb-2">{item.step}</div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Security Support
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: AlertCircle,
              title: 'Report Vulnerabilities',
              description: 'Found a security issue? Report it to our security team.',
              action: 'Report',
              email: 'security@broka.com',
            },
            {
              icon: Eye,
              title: 'Security Blog',
              description: 'Stay updated with the latest security insights and tips.',
              action: 'Read Blog',
              link: '/blog',
            },
            {
              icon: Shield,
              title: '24/7 Support',
              description: 'Our security team is available 24/7 for your concerns.',
              action: 'Contact Support',
              link: '/contact',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-8 hover:border-green-500/50 transition"
            >
              <item.icon className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-400 mb-6">{item.description}</p>
              <button className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition font-semibold">
                {item.action}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold mb-6">Trade with Confidence</h2>
          <p className="text-xl text-zinc-300 mb-8">
            Join thousands of users who trust Broka&apos;s security infrastructure.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Get Started Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
