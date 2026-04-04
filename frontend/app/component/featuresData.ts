import { 
  TrendingUp, 
  ShieldCheck, 
  BarChart3, 
  Bell, 
  Wallet, 
  Zap, 
  Globe, 
  Award 
} from 'lucide-react';

export const featuresData = [
  {
    id: 'real-time-market-data',
    icon: TrendingUp,
    title: "Real-time Market Data",
    description: "Live price updates, advanced charts, and market analysis with zero lag.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 'bank-grade-security',
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    description: "AES-256 encryption, 2FA, cold storage, and insurance protection for your assets.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: 'advanced-trading-tools',
    icon: BarChart3,
    title: "Advanced Trading Tools",
    description: "Limit orders, stop-loss, take-profit, portfolio analytics, and performance tracking.",
    color: "from-purple-500 to-violet-500"
  },
  {
    id: 'smart-notifications',
    icon: Bell,
    title: "Smart Notifications",
    description: "Get instant alerts for price changes, trade executions, and market opportunities.",
    color: "from-amber-500 to-orange-500"
  },
  {
    id: 'multi-wallet-support',
    icon: Wallet,
    title: "Multi-Wallet Support",
    description: "Connect hardware wallets, export keys, or use our secure built-in wallet.",
    color: "from-rose-500 to-pink-500"
  },
  {
    id: 'lightning-fast-trades',
    icon: Zap,
    title: "Lightning Fast Trades",
    description: "Execute trades in milliseconds with our high-performance trading engine.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    id: 'global-market-access',
    icon: Globe,
    title: "Global Market Access",
    description: "Trade 200+ cryptocurrencies across spot and futures markets 24/7.",
    color: "from-cyan-500 to-sky-500"
  },
  {
    id: 'low-trading-fees',
    icon: Award,
    title: "Low Trading Fees",
    description: "Competitive fees starting at 0.05% with VIP tiers for active traders.",
    color: "from-yellow-500 to-amber-500"
  }
];

export const getFeatureById = (id: string) => {
  return featuresData.find(feature => feature.id === id);
};
