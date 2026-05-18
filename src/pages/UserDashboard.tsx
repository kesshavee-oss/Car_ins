import { motion, AnimatePresence } from "motion/react";
import { 
  User, Settings, Wallet, Key, Shield, 
  TrendingUp, CreditCard, Clock, ChevronRight,
  LogOut, Plus, Car, X, Calendar, DollarSign, ExternalLink, Globe, Heart
} from "lucide-react";
import { CARS, INSURANCE_PLANS } from "../constants";
import { useState } from "react";
import { cn } from "../lib/utils";
import { useComparison } from "../App";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const [selectedPolicy, setSelectedPolicy] = useState<typeof INSURANCE_PLANS[0] | null>(null);
  const { wishlist } = useComparison();
  
  const stats = [
    { label: "Assets Value", value: "$8.4M", trend: "+12.4%", icon: Wallet },
    { label: "Active Policies", value: "3", trend: "Secured", icon: Shield },
    { label: "Saved Assets", value: wishlist.length.toString(), trend: "Wishlist", icon: Heart, link: "/wishlist" },
  ];

  const recentTransactions = [
    { title: "Service Subscription", date: "May 12, 2026", amount: "-$1,200", status: "Completed" },
    { title: "Auction Bid Deposit", date: "May 08, 2026", amount: "-$50,000", status: "Held" },
    { title: "Investment Dividend", date: "May 01, 2026", amount: "+$12,400", status: "Completed" },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <h1 className="text-4xl font-bold mb-2 uppercase tracking-tighter">ELITE PORTFOLIO</h1>
            <p className="text-white/40 text-[10px] font-display tracking-[0.3em] uppercase">Welcome back, Kesshavee</p>
          </div>
          <div className="flex gap-4">
            <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5 text-white/60" />
            </button>
            <button className="flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 font-display text-[10px] tracking-widest hover:bg-red-500/20 transition-all">
              <LogOut className="w-4 h-4" />
              TERMINATE SESSION
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((s, i) => {
            const Content = (
              <>
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-[40px] group-hover:bg-electric-blue/10 transition-all" />
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <s.icon className="w-5 h-5 text-electric-blue" />
                  </div>
                  <span className={cn(
                    "text-[10px] font-display font-bold tracking-widest",
                    s.trend.startsWith('+') ? "text-green-400" : "text-gold"
                  )}>{s.trend}</span>
                </div>
                <p className="text-[10px] text-white/40 font-display tracking-[0.2em] mb-1 uppercase">{s.label}</p>
                <h3 className="text-3xl font-bold">{s.value}</h3>
              </>
            );

            const containerClasses = "glass p-8 rounded-[32px] border border-white/5 relative overflow-hidden group block transition-all hover:border-white/20";

            return (
              <motion.div 
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {s.link ? (
                  <Link to={s.link} className={containerClasses}>
                    {Content}
                  </Link>
                ) : (
                  <div className={containerClasses}>
                    {Content}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Garage) */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display text-lg tracking-widest">PRIVATE GARAGE</h3>
                <button className="text-[10px] font-display tracking-widest text-electric-blue flex items-center gap-2">
                  <Plus className="w-4 h-4" /> ADD ASSET
                </button>
              </div>

              <div className="space-y-6">
                {[CARS[0], CARS[1]].map((car, i) => (
                  <motion.div 
                    key={car.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="glass-dark rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-8 border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden relative">
                      <img src={car.image} alt="Owned Car" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold">{car.name}</h4>
                          <p className="text-white/40 text-[10px] font-display tracking-[0.2em]">{car.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-white/20 uppercase tracking-tighter mb-1">Current Val.</p>
                          <p className="text-sm font-display font-medium text-electric-blue">{car.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-display tracking-widest hover:bg-white hover:text-black transition-all uppercase">Remote Start</button>
                        <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-display tracking-widest hover:bg-white hover:text-black transition-all uppercase">Diagnostics</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg tracking-widest mb-8">INSURANCE PORTFOLIO</h3>
              <div 
                onClick={() => setSelectedPolicy(INSURANCE_PLANS[0])}
                className="glass p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row justify-between gap-8 cursor-pointer hover:border-electric-blue transition-all group"
              >
                <div className="flex gap-6 items-center">
                  <div className="w-16 h-16 rounded-full bg-electric-blue/10 flex items-center justify-center border border-electric-blue/20 group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8 text-electric-blue" />
                  </div>
                  <div>
                    <h4 className="font-display text-xs mb-1 group-hover:text-electric-blue transition-colors">DIAMOND CONCIERGE PLAN</h4>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">Active Coverage: Global • 24/7</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[8px] text-white/20 uppercase mb-1">Premium Status</p>
                    <p className="text-xs font-bold text-green-400">PAID</p>
                  </div>
                  <button className="px-8 py-3 border border-white/20 rounded-full font-display text-[9px] tracking-widest hover:bg-white hover:text-black transition-all font-bold">VIEW DETAILS</button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            <div>
              <h3 className="font-display text-sm tracking-widest mb-8 text-white/60">LEDGER</h3>
              <div className="glass-dark rounded-3xl overflow-hidden border border-white/5">
                {recentTransactions.map((t, i) => (
                  <div key={i} className="p-6 border-b border-white/5 last:border-0 flex justify-between items-center hover:bg-white/5 transition-colors">
                    <div>
                      <h5 className="text-[10px] font-bold tracking-widest uppercase mb-1">{t.title}</h5>
                      <span className="text-[9px] text-white/40 font-display tracking-tighter">{t.date}</span>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-[10px] font-display font-medium",
                        t.amount.startsWith('+') ? "text-green-400" : "text-white"
                      )}>{t.amount}</p>
                      <p className="text-[8px] text-white/20 uppercase tracking-tighter">{t.status}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 text-[9px] font-display tracking-widest text-white/40 hover:text-white transition-colors bg-white/5">VIEW FULL HISTORY</button>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
              <TrendingUp className="text-gold w-10 h-10 mb-6" />
              <h4 className="font-display text-xs mb-2 tracking-[0.2em]">MARKET INSIGHTS</h4>
              <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest mb-6">
                Your portfolio has grown by 4.2% this quarter. The 'Aura Vortex' asset class is predicted to rise another 12% by year-end.
              </p>
              <button className="group text-[9px] font-display tracking-widest text-gold flex items-center gap-2">
                ANALYZE OPPORTUNITIES <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Details Modal */}
      <AnimatePresence>
        {selectedPolicy && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedPolicy(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass p-12 rounded-[48px] max-w-2xl w-full border border-white/10 relative z-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-electric-blue" />
              <button 
                onClick={() => setSelectedPolicy(null)}
                className="absolute top-8 right-8 text-white/40 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex gap-8 items-start mb-12">
                <div className="w-20 h-20 rounded-[28px] bg-electric-blue/10 flex items-center justify-center border border-electric-blue/20">
                  <Shield className="w-10 h-10 text-electric-blue" />
                </div>
                <div>
                  <span className="text-gold font-display text-[10px] tracking-[0.4em] mb-3 block uppercase">{selectedPolicy.level} STATUS</span>
                  <h2 className="text-4xl font-black uppercase mb-2">{selectedPolicy.name}</h2>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-white/40 uppercase tracking-[0.2em]">Policy ID: AURA-992384-DX</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                {[
                  { icon: Calendar, label: "Renewal Date", val: "Dec 14, 2026" },
                  { icon: DollarSign, label: "Monthly Deductible", val: "$500" },
                  { icon: Globe, label: "Coverage Zone", val: "Global + Interstellar" },
                  { icon: ExternalLink, label: "Underwriter", val: "Aura Risk Mkt." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white/40" />
                    </div>
                    <div>
                      <p className="text-[9px] text-white/20 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-sm font-display font-medium uppercase">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-12">
                <h4 className="text-[10px] font-display text-electric-blue tracking-[0.3em] uppercase">Coverage Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPolicy.features.map((f, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                      <span className="text-xs text-white/60 uppercase tracking-wide">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-5 bg-white text-black font-display text-[11px] font-bold tracking-[0.3em] hover:bg-electric-blue transition-all">
                  DOWNLOAD FULL POLICY
                </button>
                <button className="flex-1 py-5 border border-white/10 text-white font-display text-[11px] font-bold tracking-[0.3em] hover:bg-white/5 transition-all">
                  FILE INCIDENT CLAIM
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
