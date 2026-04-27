"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const stats = [
  { label: "24h Volume", value: "$4.2B" },
  { label: "Active Traders", value: "1.8M+" },
  { label: "Supported Assets", value: "420+" },
];

// 🔁 Add your images here
const images = [
  "/image7.jpg",
  "/image8.jpg",
  "/image10.jpg",
  "/image11.jpg",
  "/image12.jpg",
];

export default function Hero() {
  const [activeStat, setActiveStat] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  // Stats rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Background image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      
      {/* 🖼️ Background Image Slider */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* ✨ Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left */}
        <div className="text-center md:text-left text-white">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 leading-tight">
            Trade Crypto
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Without Limits
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-xl mb-10">
            Instant trades, real-time insights, institutional-grade security — built for serious traders and newcomers alike.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <Link
              href="/signup"
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg hover:scale-105 transition"
            >
              Get Started <ArrowRight className="inline ml-2" />
            </Link>

            <Link
              href="/demo"
              className="px-10 py-5 border border-gray-400 rounded-2xl hover:bg-white/10 transition"
            >
              Explore Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8 justify-center md:justify-start text-sm text-gray-300">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`transition-opacity duration-700 ${
                  i === activeStat ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (optional empty or image card) */}
        <div className="hidden md:block" />
      </div>


      {/* 🎥 Full Width Premium Video */}
    <div className="relative z-10 w-[90%] my-24 mx-auto">

      {/* Glow wrapper */}
      <div className="relative w-full">

        {/* Golden glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-2xl blur-lg opacity-70"></div>

        {/* Video container */}
        <div className="relative bg-black rounded-2xl overflow-hidden border border-yellow-500/40">
          <video
            className="w-full h-[260px] sm:h-[400px] md:h-[520px] lg:h-[620px] object-cover"
            controls
            autoPlay
            muted
            loop
            poster="/images/video-thumbnail.jpg"
          >
            <source src="/broker_video_demon.webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
    </section>
  );
}