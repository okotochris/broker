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
    description: "In fast-moving financial markets, timing is everything. Our real-time market data infrastructure is built to deliver ultra-accurate price feeds, advanced charting capabilities, and deep analytical insights without latency. Traders can monitor live price movements, volume trends, and historical performance across multiple assets—all in one place. With customizable indicators, timeframes, and chart types, you gain a clearer understanding of market behavior and can make informed decisions backed by data, not guesswork. Whether you're scalping short-term opportunities or planning long-term positions, our real-time data ensures you are always one step ahead of the market.",
    color: "from-blue-500 to-cyan-500",
    image:'/trading.png'
  },
  {
    id: 'bank-grade-security',
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    description: "Security is the foundation of trust, and we take it seriously. Our platform is built with multi-layered protection systems designed to safeguard your funds and personal information at every level. We utilize AES-256 encryption, two-factor authentication (2FA), cold wallet storage, and continuous system monitoring to prevent unauthorized access. The majority of user funds are stored offline in highly secure environments, reducing exposure to potential threats. In addition, our risk management systems and insurance coverage provide an extra layer of protection, giving you peace of mind while you trade. Your assets remain protected so you can focus entirely on growing your portfolio.",
    color: "from-emerald-500 to-teal-500",
    image:"/automation.png"
  },
  {
    id: 'advanced-trading-tools',
    icon: BarChart3,
    title: "Advanced Trading Tools",
    description: "Take full control of your trading strategy with a comprehensive suite of advanced tools designed for both beginners and professional traders. From limit orders and stop-loss protection to take-profit automation and real-time portfolio analytics, every feature is built to help you trade smarter. Analyze performance metrics, track profit and loss, and optimize your strategies with precision. Our intuitive interface ensures that even complex trading operations remain simple and accessible. Whether you're managing a single asset or a diversified portfolio, our tools empower you to execute strategies efficiently and confidently.",
    color: "from-purple-500 to-violet-500",
    image:"/analytics.png"
  },
  {
    id: 'smart-notifications',
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay connected to the market no matter where you are with intelligent notification systems designed to keep you informed in real time. Receive instant alerts for price movements, trade executions, market trends, and important account activity. Customize your notification preferences to focus on the assets and events that matter most to you. Whether it's a sudden price spike or a triggered stop-loss, you'll always be the first to know. With timely insights delivered directly to your device, you can act بسرعة and never miss an opportunity in the market.",
    color: "from-amber-500 to-orange-500",
    image:"/security.png"
  },
  {
    id: 'multi-wallet-support',
    icon: Wallet,
    title: "Multi-Wallet Support",
    description: "Flexibility and control are essential in digital asset management. Our platform supports multiple wallet integrations, allowing you to connect hardware wallets, manage private keys, or utilize our secure built-in wallet system. Seamlessly transfer assets, monitor balances, and manage your holdings across different storage solutions—all from a single dashboard. Whether you prioritize convenience or maximum security, our multi-wallet support ensures your assets are always accessible and under your control.",
    color: "from-rose-500 to-pink-500",
    image:'/crypto.png'
  },
  {
    id: 'lightning-fast-trades',
    icon: Zap,
    title: "Lightning Fast Trades",
    description: "Execution speed can make the difference between profit and loss. Our high-performance trading engine is optimized for speed, stability, and scalability, ensuring your trades are executed in milliseconds. Even during periods of high market volatility and heavy trading volume, our infrastructure maintains consistent performance with minimal latency. This means you can enter and exit positions بسرعة, capture opportunities instantly, and trade with confidence knowing your orders are processed without delay.",
    color: "from-indigo-500 to-blue-500",
    image: '/saas.png'
  },
  {
    id: 'global-market-access',
    icon: Globe,
    title: "Global Market Access",
    description: "Break boundaries and explore global financial opportunities with access to a wide range of markets. Trade over 200 cryptocurrencies across spot and futures markets, all available 24/7. Our platform is designed to connect you to global liquidity, ensuring competitive pricing and seamless transactions. Whether you're diversifying your portfolio or focusing on specific assets, you have the freedom to trade anytime, anywhere, without limitations.",
    color: "from-cyan-500 to-sky-500",
    image:'/image7.jpg'
  },
  {
    id: 'low-trading-fees',
    icon: Award,
    title: "Low Trading Fees",
    description: "Keep more of your profits with our transparent and competitive fee structure. With trading fees starting as low as 0.05%, our pricing model is designed to support both new and high-volume traders. As your trading activity grows, you can unlock VIP tiers that offer additional discounts and exclusive benefits. No hidden charges, no surprises—just a fair system that helps you maximize your returns over time.",
    color: "from-yellow-500 to-amber-500",
    image:'/image8.jpg'
  }
];

export const getFeatureById = (id: string) => {
  return featuresData.find(feature => feature.id === id);
};
