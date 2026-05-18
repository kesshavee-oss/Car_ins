import { motion } from "motion/react";
import { Headset, Globe, Shield, MapPin, Plane, Coffee, ChevronRight, MessageSquare } from "lucide-react";

export default function Concierge() {
  const services = [
    { icon: Plane, title: "Asset Relocation", desc: "Private global logistics for your collection, door-to-door, fully insured." },
    { icon: Shield, title: "Diplomatic Handling", desc: "Secure transport and clearance through international borders via elite channels." },
    { icon: Coffee, title: "Lifestyle Management", desc: "Reservations at the world's most restricted venues and events." },
    { icon: MapPin, title: "Global Storage", desc: "Access to our network of ultra-secure climate-controlled vaults." },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-24 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-electric-blue flex items-center justify-center animate-pulse">
                <Headset className="w-5 h-5 text-electric-blue" />
              </div>
              <span className="font-display text-[10px] tracking-[0.4em] text-electric-blue uppercase text-center md:text-left">24/7 Global Liaison</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none uppercase">THE LIAISON <br /> PROTOCOL</h1>
            <p className="text-white/40 text-lg uppercase tracking-widest font-light leading-relaxed">
              Your personal interface for every automotive and luxury requirement. 
              One point of contact. Total global capability.
            </p>
          </div>
          <div className="glass p-12 rounded-[50px] border border-white/20 relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <Globe className="w-16 h-16 text-white mb-8 group-hover:rotate-12 transition-transform" />
             <h3 className="text-4xl font-bold mb-2">STATUS:</h3>
             <p className="text-green-400 font-display text-lg">AVAILABLE</p>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {services.map((s, i) => (
            <motion.div 
              key={s.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-dark p-10 rounded-[40px] border border-white/5 hover:border-electric-blue/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-electric-blue/20">
                <s.icon className="w-6 h-6 text-electric-blue" />
              </div>
              <h4 className="font-display text-sm mb-4 tracking-widest">{s.title}</h4>
              <p className="text-white/40 text-[11px] uppercase tracking-wide leading-relaxed mb-8">{s.desc}</p>
              <button className="text-electric-blue text-[9px] font-display tracking-widest flex items-center gap-2 group/btn">
                INQUIRE <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </section>

        <div className="glass p-16 rounded-[80px] border border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter">IMMEDIATE <br /> ASSISTANCE</h2>
            <p className="text-white/60 mb-12 uppercase tracking-widest text-sm leading-relaxed">
              Facing a complex asset challenge? Our specialist team is ready to deploy. 
              Whether it's an emergency recovery or a last-minute logistics hurdle, 
              Aura Concierge is your definitive solution.
            </p>
            <div className="flex flex-wrap gap-6">
               <button className="px-10 py-5 bg-white text-black font-display text-[11px] font-bold tracking-[0.3em] flex items-center gap-4">
                 <MessageSquare className="w-5 h-5" /> OPEN SECURE CHANNEL
               </button>
               <button className="px-10 py-5 border border-white/20 text-white font-display text-[11px] font-bold tracking-[0.3em] hover:bg-white/5">
                 VIEW GLOBAL NODES
               </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-electric-blue/20 blur-[100px] rounded-full animate-pulse" />
            <div className="relative z-10 glass-dark p-12 rounded-[50px] border border-white/20 text-center">
              <h4 className="text-[10px] font-display tracking-[0.5em] text-white/40 mb-10 uppercase">Global Response Team</h4>
              <div className="space-y-8">
                {[
                  { city: "GENEVA", time: "05:30", status: "Active" },
                  { city: "DUBAI", time: "08:30", status: "Active" },
                  { city: "SINGAPORE", time: "12:30", status: "Active" },
                  { city: "NEW YORK", time: "23:30", status: "Standby" }
                ].map((node, i) => (
                  <div key={node.city} className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{node.city}</span>
                    <div className="text-right">
                      <p className="text-lg font-mono mb-1">{node.time}</p>
                      <p className={`text-[8px] font-display tracking-widest ${node.status === 'Active' ? 'text-green-400' : 'text-white/20'}`}>
                        {node.status.toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
