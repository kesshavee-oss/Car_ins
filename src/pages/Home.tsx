import { motion } from "motion/react";
import { ChevronRight, ArrowRight, Play, Zap, Shield, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { CARS } from "../constants";

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/src/assets/images/aura_hero_car_1778995901567.png" 
            alt="Aura Luxury Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-electric-blue" />
              <span className="font-display text-[10px] tracking-[0.4em] text-electric-blue">UNLEASH THE FUTURE</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] font-black mb-8">
              BEYOND <br />
              <span className="text-white/20 outline-text">VELOCITY</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mb-12 leading-relaxed">
              Experience the pinnacle of automotive engineering and luxury. 
              Aura brings together a collection of hyper-exclusive assets 
              and elite insurance protocols.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link to="/collection" className="group relative px-10 py-5 bg-white text-black font-display text-[11px] tracking-[0.2em] font-bold overflow-hidden transition-all active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  EXPLORE INVENTORY <ArrowRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-electric-blue translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </Link>
              
              <button className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-electric-blue transition-colors">
                  <Play className="w-5 h-5 text-white group-hover:text-electric-blue fill-current" />
                </div>
                <span className="font-display text-[10px] tracking-widest">WATCH CINEMATIC</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 right-12 hidden lg:flex gap-16">
          {[
            { label: "HYPERCARS", value: "24" },
            { label: "COUNTRIES", value: "12" },
            { label: "VIP CLIENTS", value: "1.2k" },
          ].map((s, i) => (
            <motion.div 
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="group"
            >
              <h3 className="text-4xl font-display font-bold mb-1">{s.value}</h3>
              <p className="text-[9px] text-white/30 tracking-[0.3em] uppercase group-hover:text-electric-blue transition-colors">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Collection Carousel (Static for now) */}
      <section className="py-32 bg-deep-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-electric-blue font-display text-[10px] tracking-[0.4em] mb-4">THE REGISTRY</p>
              <h2 className="text-5xl font-bold">CURRENT HIGHLIGHTS</h2>
            </div>
            <Link to="/collection" className="text-[10px] font-display tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2">
              VIEW FULL INVENTORY <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CARS.slice(0, 3).map((car, i) => (
              <motion.div 
                key={car.id}
                whileHover={{ y: -10 }}
                className="group relative h-[500px] overflow-hidden rounded-2xl glass-dark"
              >
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="flex items-center gap-2 mb-2 text-electric-blue">
                    <Zap className="w-3 h-3 fill-current" />
                    <span className="text-[8px] font-display tracking-widest uppercase">{car.type}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{car.name}</h3>
                  <p className="text-white/40 text-xs mb-6 uppercase tracking-widest">{car.brand}</p>
                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                    <span className="text-xl font-display font-bold">{car.price}</span>
                    <button className="text-[9px] font-display tracking-widest text-electric-blue border-b border-electric-blue pb-1">VEHICLE DETAILS</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-electric-blue/10 rounded-full blur-[100px]" />
            <img 
              src="/src/assets/images/luxury_ev_suv_1778995952776.png" 
              alt="Luxury Experience" 
              className="rounded-3xl relative z-10 w-full"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -right-8 glass p-8 z-20 rounded-2xl animate-bounce-slow">
              <Shield className="text-electric-blue w-10 h-10 mb-4" />
              <h4 className="font-display text-[10px] tracking-widest mb-1">ELITE PROTECTION</h4>
              <p className="text-[8px] text-white/40">FULLY COVERED</p>
            </div>
          </div>
          <div className="lg:pl-16">
            <p className="text-gold font-display text-[10px] tracking-[0.4em] mb-4">THE ECOSYSTEM</p>
            <h2 className="text-5xl font-bold mb-8">MORE THAN JUST <br /> A DEALERSHIP</h2>
            <div className="space-y-12">
              {[
                { icon: Shield, title: "CYBER-INSURANCE", desc: "Military-grade protection for your vehicle's neural OS and physical components." },
                { icon: Crown, title: "VIP CONCIERGE", desc: "Global asset handling, relocation, and exclusive event access." },
                { icon: Zap, title: "FUTURE INFRASTRUCTURE", desc: "High-speed charging networks and private maintenance bays worldwide." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg mb-2">{item.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-white text-black text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-black/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Crown className="w-16 h-16 mx-auto mb-10 text-black/10" />
          <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter">JOIN THE INNER CIRCLE</h2>
          <p className="text-xl text-black/60 mb-12 max-w-2xl mx-auto">
            Our VIP membership unlocks the most restricted automotive opportunities 
            on the planet. Exclusive allocations, member-only auctions, and more.
          </p>
          <Link to="/vip" className="inline-block px-16 py-6 bg-black text-white font-display text-[12px] tracking-[0.3em] font-bold hover:bg-electric-blue hover:text-black transition-all">
            APPLY FOR MEMBERSHIP
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

// Add these styles for the outline text effect
const style = document.createElement('style');
style.innerHTML = `
  .outline-text {
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
    text-shadow: none;
  }
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-bounce-slow {
    animation: bounce-slow 4s infinite ease-in-out;
  }
`;
document.head.appendChild(style);
