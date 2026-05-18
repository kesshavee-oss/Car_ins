import { motion } from "motion/react";
import { Gavel, Clock, Users, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import { CARS } from "../constants";
import { useState, useEffect } from "react";

export default function AuctionHouse() {
  const auctionCar = CARS[2]; // Golden Aeon
  const [currentBid, setCurrentBid] = useState(5100000);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    const bidSimulator = setInterval(() => {
      if (Math.random() > 0.8) {
        setCurrentBid(prev => prev + Math.floor(Math.random() * 50000) + 10000);
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(bidSimulator);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="text-gold w-6 h-6" />
              <span className="font-display text-[10px] tracking-[0.4em] text-gold uppercase">Live Global Auction</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-0">THE <br /> GAVEL</h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-display text-white/40 tracking-widest mb-2 uppercase">CONNECTED NODES</p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/10" />)}
              </div>
              <span className="text-xs font-bold text-electric-blue ml-2">+124 ACTIVE</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Display */}
          <div className="lg:col-span-2 space-y-12">
            <div className="relative aspect-video rounded-[40px] overflow-hidden group">
               <img 
                 src={auctionCar.image} 
                 alt="Auction Car" 
                 className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
               <div className="absolute top-8 left-8 flex gap-4">
                  <div className="glass px-6 py-2 rounded-full border border-white/20 text-[10px] font-display tracking-widest uppercase">
                    LOT #842-GA
                  </div>
                  <div className="bg-red-500/80 backdrop-blur-xl px-6 py-2 rounded-full text-[10px] font-display tracking-widest uppercase animate-pulse">
                    LIVE NOW
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="glass p-8 rounded-3xl border border-white/10">
                  <p className="text-[9px] text-white/40 font-display tracking-widest mb-4 uppercase text-center">TIME REMAINING</p>
                  <p className="text-3xl font-display font-bold text-center tracking-widest">{formatTime(timeLeft)}</p>
               </div>
               <div className="glass p-8 rounded-3xl border border-white/10 shadow-[0_0_30px_#D4AF3722]">
                  <p className="text-[9px] text-gold font-display tracking-widest mb-4 uppercase text-center">CURRENT HIGHEST BID</p>
                  <motion.p 
                    key={currentBid}
                    initial={{ scale: 1.1, textShadow: "0 0 20px #D4AF37" }}
                    animate={{ scale: 1, textShadow: "none" }}
                    className="text-3xl font-display font-bold text-center text-gold"
                  >
                    {formatCurrency(currentBid)}
                  </motion.p>
               </div>
               <div className="glass p-8 rounded-3xl border border-white/10">
                  <p className="text-[9px] text-white/40 font-display tracking-widest mb-4 uppercase text-center">BIDS RECEIVED</p>
                  <p className="text-3xl font-display font-bold text-center">42</p>
               </div>
            </div>
          </div>

          {/* Bidding Sidebar */}
          <div className="space-y-8">
            <div className="glass-dark rounded-[40px] p-8 border border-white/5 h-full">
              <h3 className="font-display text-sm tracking-widest mb-8 border-b border-white/10 pb-6 uppercase">BIDDING CONSOLE</h3>
              
              <div className="space-y-6 mb-12">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <p className="text-[9px] text-white/40 font-display tracking-widest mb-4 uppercase">NEXT MINIMUM BID</p>
                   <p className="text-xl font-display font-bold">{formatCurrency(currentBid + 10000)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[10000, 50000, 100000, 250000].map(inc => (
                    <button 
                      key={inc}
                      onClick={() => setCurrentBid(prev => prev + inc)}
                      className="py-4 bg-white/5 border border-white/10 rounded-xl font-display text-[9px] tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                      +{inc / 1000}K
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full py-6 bg-gold text-black font-display text-[12px] font-black tracking-[0.4em] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_#D4AF3733]">
                  PLACE BID
                </button>
                <button className="w-full py-4 border border-white/10 text-white/40 font-display text-[9px] tracking-widest hover:text-white transition-colors">
                  VIEW TERMS & CONDITIONS
                </button>
              </div>

              <div className="mt-12 space-y-4">
                <p className="text-[9px] font-display tracking-widest text-white/20 uppercase mb-4">BID HISTORY</p>
                {[1,2,3].map(i => (
                  <div key={i} className="flex justify-between items-center text-[10px] pb-4 border-b border-white/5 last:border-0 opacity-40 hover:opacity-100 transition-opacity">
                    <span className="font-mono">ANON_USER_***{i}E8</span>
                    <span className="font-display font-bold">{formatCurrency(currentBid - (i * 125000))}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <section className="py-32 grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 mt-20 text-center uppercase tracking-[0.2em]">
           <div>
             <ShieldCheck className="w-10 h-10 text-gold mx-auto mb-6" />
             <h4 className="font-display text-xs mb-4">Verified Provenance</h4>
             <p className="text-white/40 text-[10px] leading-relaxed">Asset history verified through blockchain ledger.</p>
           </div>
           <div>
             <Zap className="text-gold w-10 h-10 mx-auto mb-6" />
             <h4 className="font-display text-xs mb-4">Instant Settlement</h4>
             <p className="text-white/40 text-[10px] leading-relaxed">Title transfer initiates immediately upon final gavel.</p>
           </div>
           <div>
             <ArrowUpRight className="text-gold w-10 h-10 mx-auto mb-6" />
             <h4 className="font-display text-xs mb-4">Market Liquidity</h4>
             <p className="text-white/40 text-[10px] leading-relaxed">Auction performance guarantees exit liquidity for investors.</p>
           </div>
        </section>
      </div>
    </div>
  );
}
