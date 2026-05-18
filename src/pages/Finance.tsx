import { motion } from "motion/react";
import { TrendingUp, PieChart, Landmark, ArrowUpRight, ChevronRight, Calculator, FileText } from "lucide-react";

export default function Finance() {
  const opportunities = [
    { title: "Hypercar Index Fund", return: "14.2%", risk: "Low-Med", desc: "Diversified exposure to ultra-exclusive automotive assets." },
    { title: "Custom Commission Loans", return: "8.5%", risk: "Institutional", desc: "Asset-backed financing for custom hypercar builds." },
    { title: "Classic Resoration Yield", return: "22.0%", risk: "Medium", desc: "Participate in the appreciation of restored blue-chip classics." },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-gold" />
            <span className="font-display text-[10px] tracking-[0.4em] text-gold uppercase">Asset Finance & Wealth Management</span>
          </div>
          <h1 className="text-6xl md:text-[9rem] font-black mb-10 tracking-tighter uppercase leading-[0.8]">LIQUID <br /> ASSETS</h1>
          <p className="max-w-xl text-white/40 text-lg uppercase tracking-widest font-light">
            Automotive assets are the new gold standard. Leverage your collection, 
            diversify into high-yield funds, and secure institutional-grade financing.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          {opportunities.map((opt, i) => (
            <motion.div 
              key={opt.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[50px] border border-white/10 hover:border-gold/30 transition-all flex flex-col"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <TrendingUp className="text-gold w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-display font-bold text-gold">{opt.return}</p>
                  <p className="text-[9px] text-white/40 font-display tracking-widest">ANNUAL PROJECTED</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase">{opt.title}</h3>
              <p className="text-white/40 text-[11px] uppercase tracking-wide leading-relaxed mb-10 flex-1">{opt.desc}</p>
              <div className="flex justify-between items-center pt-8 border-t border-white/5 uppercase">
                <span className="text-[9px] text-white/30 tracking-widest">Risk Tier: <span className="text-white">{opt.risk}</span></span>
                <button className="text-gold text-[9px] font-display tracking-widest flex items-center gap-2 group">
                  VIEW PROSPECTUS <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="glass-dark p-16 rounded-[80px] border border-white/10 relative overflow-hidden">
             <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
             <Landmark className="w-20 h-20 text-gold/20 mb-8" />
             <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter">LEVERAGE YOUR <br /> COLLECTION</h2>
             <p className="text-white/60 mb-12 uppercase tracking-widest text-sm leading-relaxed">
               Unlock immediate liquidity without parting with your assets. 
               Our collateralized lending protocols offer competitive rates 
               against your vehicle titles, protected by multi-sig escrow systems.
             </p>
             <div className="flex flex-wrap gap-6">
                <button className="px-12 py-5 bg-gold text-black font-display text-[11px] font-bold tracking-[0.3em] flex items-center gap-4 hover:scale-105 transition-transform">
                  <Calculator className="w-5 h-5" /> CALCULATE LEVERAGE
                </button>
             </div>
          </div>
          
          <div className="lg:pl-16 space-y-12">
            {[
              { icon: FileText, title: "Structured Tax Exit", desc: "Sophisticated strategies for asset disposal and capital gains management." },
              { icon: PieChart, title: "Portfolio Rebalancing", desc: "Algorithmic insights to ensure your automotive collection maintains optimal yield." },
              { icon: Landmark, title: "Institutional Custody", desc: "World-class vaulting and security protocols for your physical titles and digital tokens." }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 group cursor-pointer">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-gold transition-colors">
                  <item.icon className="w-6 h-6 text-white/40 group-hover:text-gold transition-colors" />
                </div>
                <div className="pt-2 border-b border-white/5 pb-8 flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-display text-sm tracking-widest uppercase">{item.title}</h4>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-gold transition-colors" />
                  </div>
                  <p className="text-white/40 text-[10px] uppercase tracking-wide">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
