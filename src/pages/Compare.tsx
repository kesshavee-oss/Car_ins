import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { X, Layers, Plus, Shield, Zap, Activity, Info, ArrowRight } from "lucide-react";
import { useComparison } from "../App";
import { CARS } from "../constants";
import { cn } from "../lib/utils";

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare } = useComparison();
  const selectedCars = CARS.filter(c => compareList.includes(c.id));

  return (
    <div className="pt-32 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex justify-between items-end mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Layers className="text-electric-blue w-6 h-6" />
              <span className="font-display text-[10px] tracking-[0.4em] text-electric-blue uppercase">Asset Comparison Engine</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-0 leading-none uppercase tracking-tighter">THE BATTLE</h1>
          </div>
          {selectedCars.length > 0 && (
            <button onClick={clearCompare} className="text-[10px] font-display tracking-widest text-white/40 hover:text-white uppercase transition-colors">
              Clear All Selections
            </button>
          )}
        </header>

        {selectedCars.length === 0 ? (
          <div className="py-40 text-center glass-dark rounded-[50px] border border-white/5">
             <Layers className="w-20 h-20 text-white/10 mx-auto mb-8" />
             <h2 className="text-3xl font-bold mb-4 uppercase">NO ASSETS SELECTED</h2>
             <p className="text-white/40 text-sm tracking-widest mb-12 uppercase">Select up to 3 vehicles from the inventory to compare specifications.</p>
             <Link to="/collection" className="px-12 py-5 bg-white text-black font-display text-[11px] font-bold tracking-[0.3em] inline-flex items-center gap-4">
               VIEW INVENTORY <ArrowRight className="w-5 h-5" />
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Legend Column */}
            <div className="hidden md:block pt-80 space-y-20 border-r border-white/5 pr-8">
              <div className="space-y-24">
                <p className="text-[9px] font-display text-white/20 tracking-widest uppercase">PERFORMANCE</p>
                <div className="space-y-20">
                   <p className="text-[10px] font-display tracking-widest text-white/60">ACCELERATION</p>
                   <p className="text-[10px] font-display tracking-widest text-white/60">TOP SPEED</p>
                   <p className="text-[10px] font-display tracking-widest text-white/60">OUTPUT</p>
                </div>
              </div>
              <div className="space-y-24">
                <p className="text-[9px] font-display text-white/20 tracking-widest uppercase">VALUATION</p>
                <div className="space-y-20">
                   <p className="text-[10px] font-display tracking-widest text-white/60">BASE PRICE</p>
                   <p className="text-[10px] font-display tracking-widest text-white/60">MAINTENANCE Est.</p>
                </div>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className={cn(
              "md:col-span-3 grid gap-8",
              selectedCars.length === 1 ? "grid-cols-1 md:grid-cols-1" : 
              selectedCars.length === 2 ? "grid-cols-1 md:grid-cols-2" : 
              "grid-cols-1 md:grid-cols-3"
            )}>
              <AnimatePresence>
                {selectedCars.map((car, i) => (
                  <motion.div 
                    key={car.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass rounded-[40px] border border-white/10 relative overflow-hidden flex flex-col group"
                  >
                    <button 
                      onClick={() => removeFromCompare(car.id)}
                      className="absolute top-6 right-6 w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all z-20"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="p-10 flex-1">
                      <div className="aspect-video mb-12 relative">
                         <div className="absolute inset-x-0 bottom-0 h-12 bg-electric-blue/10 blur-[40px]" />
                         <img src={car.image} alt={car.name} className="w-full h-full object-contain relative z-10" referrerPolicy="no-referrer" />
                      </div>
                      
                      <div className="mb-12">
                        <p className="text-electric-blue font-display text-[9px] tracking-widest mb-2 uppercase">{car.brand}</p>
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{car.name}</h3>
                        <p className="text-white/40 text-[10px] uppercase tracking-widest">{car.type} • {car.status}</p>
                      </div>

                      {/* Stats Grid for Mobile (or alternate layout) */}
                      <div className="space-y-12">
                        <div className="space-y-8">
                          <div className="p-6 glass-dark rounded-3xl border border-white/5">
                            <p className="md:hidden text-[8px] text-white/20 mb-1 uppercase">ACCELERATION</p>
                            <p className="text-2xl font-display font-medium">{car.acceleration}</p>
                          </div>
                          <div className="p-6 glass-dark rounded-3xl border border-white/5">
                            <p className="md:hidden text-[8px] text-white/20 mb-1 uppercase">TOP SPEED</p>
                            <p className="text-2xl font-display font-medium">{car.topSpeed}</p>
                          </div>
                          <div className="p-6 glass-dark rounded-3xl border border-white/5">
                            <p className="md:hidden text-[8px] text-white/20 mb-1 uppercase">OUTPUT</p>
                            <p className="text-2xl font-display font-medium">{car.power}</p>
                          </div>
                        </div>

                        <div className="space-y-8 pt-12 border-t border-white/5">
                          <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                            <p className="md:hidden text-[8px] text-white/20 mb-1 uppercase">BASE PRICE</p>
                            <p className="text-3xl font-display font-bold text-electric-blue">{car.price}</p>
                          </div>
                          <div className="p-6 glass-dark rounded-3xl border border-white/5">
                            <p className="md:hidden text-[8px] text-white/20 mb-1 uppercase">MAINTENANCE Est.</p>
                            <p className="text-xl font-display text-white/60">$2,400 / mo</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link to={`/car/${car.id}`} className="w-full py-8 text-center bg-white text-black font-display text-[11px] font-black tracking-[0.3em] hover:bg-electric-blue transition-colors grayscale group-hover:grayscale-0">
                      EXPLORE ASSET
                    </Link>
                  </motion.div>
                ))}
                
                {selectedCars.length < 3 && (
                   <Link to="/collection" className="group rounded-[40px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-6 hover:border-electric-blue transition-all min-h-[600px]">
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="text-white/20 w-8 h-8 group-hover:text-electric-blue transition-colors" />
                      </div>
                      <span className="text-[10px] font-display tracking-widest text-white/20 uppercase group-hover:text-white transition-colors">Add Comparison Asset</span>
                   </Link>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* AI Insight Bridge */}
        {selectedCars.length > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-32 glass p-12 rounded-[50px] border border-white/10 flex flex-col md:flex-row items-center gap-12"
          >
             <div className="w-20 h-20 rounded-full bg-electric-blue/10 flex items-center justify-center shrink-0">
                <Zap className="text-electric-blue w-10 h-10 animate-pulse" />
             </div>
             <div>
                <h4 className="font-display text-sm tracking-widest mb-4 uppercase">AI CO-PILOT ANALYSIS</h4>
                <p className="text-white/40 text-[11px] leading-relaxed uppercase tracking-widest">
                  Based on market trends, the <b>{selectedCars[0].name}</b> offers 12.4% higher appreciation potential, while the <b>{selectedCars[1].name}</b> maintains superior reliability in tropical climates. Institutional investors are currently favoring the {selectedCars[0].brand} segment for portfolio diversification.
                </p>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
