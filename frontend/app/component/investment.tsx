"use client";


import { useRouter } from "next/navigation";
import React from "react";

type Plan = {
  name: string;
  price: string;
  returns: string;
  risk: string;
  duration: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$100 min",
    returns: "3–5% / month",
    risk: "Low",
    duration: "30 days",
    features: [
      "Beginner friendly",
      "Basic analytics",
      "Demo access",
    ],
  },
  {
    name: "Growth",
    price: "$1,000 min",
    returns: "6–10% / month",
    risk: "Medium",
    duration: "30–90 days",
    features: [
      "Advanced charts",
      "Priority support",
      "Flexible withdrawal",
    ],
  },
  {
    name: "Pro",
    price: "$5,000+",
    returns: "10–20% / month",
    risk: "High",
    duration: "90+ days",
    features: [
      "Full analytics suite",
      "Dedicated manager",
      "Auto-compounding",
    ],
  },
];

const InvestmentPlans = () => {
  const router = useRouter()
  return (
    <section className="bg-gray-950 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
       <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Investment Plans
      </h2>
      <p className="text-gray-400 mb-12">
        Access expertly structured investment solutions crafted to maximize returns while managing risk. Select a plan that reflects your ambition and take a step toward long-term financial success.
      </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-blue-500 transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {plan.name}
              </h3>
              <p className="text-blue-400 font-bold text-lg mb-4">
                {plan.price}
              </p>

              <div className="text-sm text-gray-300 space-y-2 mb-6">
                <p><span className="font-medium">Returns:</span> {plan.returns}</p>
                <p><span className="font-medium">Risk:</span> {plan.risk}</p>
                <p><span className="font-medium">Duration:</span> {plan.duration}</p>
              </div>

              <ul className="text-sm text-gray-400 mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>

              <button
                onClick={()=>router.push('/dashboard')}
                className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-2 font-medium">
                Invest Now
              </button>
            </div>
          ))}
        </div>
        <button
                onClick={()=>router.push('/plan')}
                className=" bg-yellow-600 hover:bg-yellow-700 transition rounded-xl py-2 px-10 mt-20 font-medium">
                View More
              </button>
        <p className="text-xs text-gray-500 mt-10">
          * Investments carry risk. Returns are not guaranteed.
        </p>

      </div>
    </section>
  );
};

export default InvestmentPlans;