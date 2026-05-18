import { motion } from "motion/react";
import { Shield, Check, Zap, HelpCircle, Phone, Globe, Lock } from "lucide-react";
import { INSURANCE_PLANS } from "../constants";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function Insurance() {
  const [viewMode, setViewMode] = useState<"buy" | "sell">("buy");

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-electric-blue/5 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-24 flex flex-col md:flex-row gap-12 items-end justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-electric-blue w-6 h-6" />
              <span className="font-display text-[10px] tracking-[0.4em] text-electric-blue uppercase">Elite Protection Protocol</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none uppercase">Shielding <br /> Excellence</h1>
            <div className="flex bg-white/5 p-1 rounded-full w-fit mb-8 border border-white/10">
              {["buy", "sell"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as "buy" | "sell")}
                  className={cn(
                    "px-10 py-3 rounded-full font-display text-[10px] tracking-widest uppercase transition-all",
                    viewMode === mode ? "bg-white text-black" : "text-white/40 hover:text-white"
                  )}
                >
                  {mode === "buy" ? "Get Covered" : "Offer Underwriting"}
                </button>
              ))}
            </div>
            <p className="text-white/40 text-lg leading-relaxed uppercase tracking-widest font-light">
              {viewMode === "buy" 
                ? "We provide catastrophic recovery and liability shielding for assets that transcend standard market valuations."
                : "Aura is opening its risk-capital markets. Deploy your liquidity to underwrite the world's most elite automotive assets."}
            </p>
          </div>
          
          <div className="glass p-8 rounded-3xl border-l-4 border-l-electric-blue max-w-xs transition-transform hover:scale-105">
            <h3 className="font-display text-[10px] tracking-widest mb-4 opacity-60">GLOBAL STATUS</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold">24/7 CONCIERGE ACTIVE</span>
            </div>
            <p className="text-[10px] text-white/40 uppercase tracking-tighter">Response time: &lt; 5 minutes</p>
          </div>
        </header>

        {viewMode === "buy" ? (
          <>
            {/* Plans Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          {INSURANCE_PLANS.map((plan, i) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group relative"
            >
              <div className="glass-dark rounded-[40px] p-12 border border-white/5 group-hover:border-electric-blue/30 transition-all h-full flex flex-col">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="text-gold font-display text-[10px] tracking-[0.3em] mb-4 block">{plan.level}</span>
                    <h3 className="text-4xl font-bold mb-2">{plan.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-display font-bold">{plan.price}</p>
                    <p className="text-[9px] text-white/40 font-display tracking-widest">ANNUALIZED BILLING</p>
                  </div>
                </div>

                <div className="space-y-6 flex-1 mb-12">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex gap-4 items-start">
                      <div className="w-5 h-5 rounded-full bg-electric-blue/10 flex items-center justify-center shrink-0 mt-1">
                        <Check className="w-3 h-3 text-electric-blue" />
                      </div>
                      <p className="text-white/60 text-sm tracking-wide">{feature}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full py-6 bg-white text-black font-display text-[11px] font-bold tracking-[0.3em] hover:bg-electric-blue transition-all">
                  ACTIVATE SHIELD
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instant Premium Estimator (Mock UI) */}
        <section className="py-24 glass rounded-[60px] p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Lock className="w-64 h-64" />
          </div>
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">PREMIUM ESTIMATOR</h2>
            <p className="text-white/40 mb-12 uppercase tracking-widest text-xs">Analyze your risk profile instantly using our proprietary neural actuarial model.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-4">
                <label className="font-display text-[10px] tracking-widest text-white/60">ASSET VALUE</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-electric-blue appearance-none uppercase transition-colors">
                  <option>$1M - $5M</option>
                  <option>$5M - $10M</option>
                  <option>$10M+</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="font-display text-[10px] tracking-widest text-white/60">ANNUAL USAGE</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-electric-blue appearance-none uppercase transition-colors">
                  <option>EXHIBITION ONLY</option>
                  <option>&lt; 1,000 MILES</option>
                  <option>DYNAMIC DRIVING</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="font-display text-[10px] tracking-widest text-white/60">STORAGE TYPE</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-electric-blue appearance-none uppercase transition-colors">
                  <option>PRIVATE VAULT</option>
                  <option>CLIMATE CONTROLLED</option>
                  <option>HIGH SECURITY GARAGE</option>
                </select>
              </div>
            </div>

            <button className="px-12 py-5 bg-electric-blue text-black font-display text-[11px] font-bold tracking-[0.2em] rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,229,255,0.4)]">
              CALCULATE ESTIMATE
            </button>
          </div>
        </section>
      </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center py-20"
        >
          <div className="max-w-2xl">
            <h2 className="text-5xl font-black mb-8 leading-none uppercase">CAPITAL <br /> PARTNERSHIP</h2>
            <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest mb-12">
              Join our private network of institutional underwriters. By providing capital to our insurance pool, you earn standardized yields backed by physical automotive assets and sovereign-grade smart contracts.
            </p>
            <div className="space-y-8 mb-12">
              {[
                { label: "Target Yield", val: "8.2% - 14.5%" },
                { label: "Minimum Liquidity", val: "$1,000,000" },
                { label: "Asset Backing", val: "120% Collateralized" }
              ].map(stat => (
                <div key={stat.label} className="border-b border-white/10 pb-4 flex justify-between">
                  <span className="text-[10px] font-display tracking-widest text-white/40 uppercase">{stat.label}</span>
                  <span className="text-lg font-bold text-electric-blue">{stat.val}</span>
                </div>
              ))}
            </div>
            <button className="px-12 py-5 bg-electric-blue text-black font-display text-[11px] font-bold tracking-[0.2em] shadow-[0_0_20px_rgba(0,229,255,0.4)]">
              APPLY AS UNDERWRITER
            </button>
          </div>
          <div className="glass p-12 rounded-[60px] border border-white/10 text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <Zap className="w-16 h-16 text-electric-blue mx-auto mb-8 animate-bounce" />
             <h3 className="text-3xl font-black mb-4 uppercase">Risk Engine Alpha</h3>
             <p className="text-[10px] text-white/40 uppercase tracking-widest mb-8">Our proprietary AI calculates risk-adjusted returns in real-time across 40 global markets.</p>
             <div className="h-40 flex items-end gap-2 px-4">
               {[...Array(12)].map((_, i) => (
                 <div key={i} className="flex-1 bg-white/10 rounded-t" style={{ height: `${Math.random() * 80 + 20}%` }} />
               ))}
             </div>
          </div>
        </motion.div>
      )}

        {/* Global Assistance Section */}
        <section className="py-32 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Globe, title: "WORLDWIDE CLAIM", desc: "Our claims adjusters deploy via private jet to any location globally within 24 hours." },
            { icon: Phone, title: "VIP LIAISON", desc: "A dedicated human operator manages all interactions with law enforcement and recovery." },
            { icon: Lock, title: "ASSET SECURITY", desc: "Encrypted tracking and remote disabling capabilities come standard with every policy." }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-white group-hover:text-black transition-all">
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="font-display text-xs tracking-[0.3em] mb-4">{item.title}</h4>
              <p className="text-white/40 text-xs leading-relaxed uppercase tracking-widest">{item.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
