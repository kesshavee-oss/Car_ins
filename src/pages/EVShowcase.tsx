import { motion } from "motion/react";
import { Zap, Battery, Cpu, Wind, ShieldCheck, ArrowRight } from "lucide-react";
import { CARS } from "../constants";

export default function EVShowcase() {
  const ev = CARS.find(c => c.type === "EV");

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-24 relative">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[150px]" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center relative z-10"
          >
            <div className="w-20 h-20 rounded-full border border-electric-blue flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,229,255,0.3)]">
              <Zap className="w-10 h-10 text-electric-blue animate-pulse" />
            </div>
            <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter uppercase whitespace-pre-line">
              THE SILENT <br /> REVOLUTION
            </h1>
            <p className="max-w-2xl text-white/40 text-lg uppercase tracking-widest font-light mb-12">
              Breathtaking performance achieved through zero-emission engineering. 
              The future of luxury is electrified.
            </p>
          </motion.div>
        </header>

        {ev && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-electric-blue/5 rounded-full blur-[100px] scale-150" />
              <img src={ev.image} alt={ev.name} className="relative z-10 w-full rounded-3xl" referrerPolicy="no-referrer" />
              
              {/* Interactive Specs Overlay */}
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl border border-white/20 z-20">
                <div className="flex gap-12">
                  <div>
                    <p className="text-[10px] font-display text-white/40 tracking-widest mb-1">RANGE</p>
                    <p className="text-2xl font-bold">580 Mi</p>
                  </div>
                  <div className="w-[1px] h-10 bg-white/10" />
                  <div>
                    <p className="text-[10px] font-display text-white/40 tracking-widest mb-1">CHARGE</p>
                    <p className="text-2xl font-bold">15 Min</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-12">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-12 bg-white" />
                <span className="font-display text-[10px] tracking-[0.4em]">CORE TECHNOLOGY</span>
              </div>
              <h2 className="text-5xl font-bold uppercase tracking-tight">{ev.name} • ULTIMATE EDITION</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: Battery, title: "Quantum Cell", desc: "Next-gen solid-state density." },
                  { icon: Cpu, title: "Neural Torque", desc: "Vectoring controlled by AI." },
                  { icon: Wind, title: "Aero-Flow", desc: "Active cooling & downforce." },
                  { icon: ShieldCheck, title: "Safe-Drive", desc: "Level 4 autonomy protocol." }
                ].map((item, i) => (
                  <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover:border-electric-blue transition-colors group">
                    <item.icon className="w-6 h-6 text-electric-blue mb-4 transition-transform group-hover:scale-110" />
                    <h4 className="font-display text-xs mb-2 tracking-widest">{item.title}</h4>
                    <p className="text-white/40 text-[10px] uppercase tracking-wide leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button className="px-12 py-5 bg-white text-black font-display text-[11px] font-bold tracking-[0.2em] group">
                <span className="flex items-center gap-2">
                  CUSTOMIZE YOUR EV <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Feature Grid */}
        <section className="py-20 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <h3 className="font-display text-xs tracking-widest mb-6 opacity-60">GLOBAL NETWORK</h3>
              <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest">
                Access to over 10,000 hyper-charging bays across 40 countries, exclusive to Aura owners.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xs tracking-widest mb-6 opacity-60">SUSTAINABLE LUXURY</h3>
              <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest">
                Responsibly sourced interior materials: mushroom leather, recycled ocean plastics, and carbon-negative woods.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xs tracking-widest mb-6 opacity-60">LIFETIME UPDATES</h3>
              <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest">
                Over-the-air performance boosts and new driving modes delivered monthly via our satellite network.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
