import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { Search, Filter, ChevronDown, Zap, Shield, ArrowRight, Layers, Check, Heart, SlidersHorizontal, Activity, Gauge } from "lucide-react";
import { CARS } from "../constants";
import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useComparison } from "../App";
import { cn } from "../lib/utils";

function CarCard({ car, i, wishlist, toggleWishlist, compareList, addToCompare, removeFromCompare }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = (mouseXPos / width - 0.5) * 20;
    const yPct = (mouseYPos / height - 0.5) * 20;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <div className="glass-dark rounded-[40px] overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-700">
        <div className="relative aspect-video overflow-hidden">
          <motion.img 
            src={car.image} 
            alt={car.name} 
            style={{ x, y, scale: 1.1 }}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-6 left-6 flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-white/10">
            <div className={`w-1.5 h-1.5 rounded-full ${car.status === 'Available' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gold shadow-[0_0_8px_#D4AF37]'}`} />
            <span className="text-[8px] font-display tracking-widest uppercase">{car.status}</span>
          </div>

          <button 
            onClick={() => toggleWishlist(car.id)}
            className={cn(
              "absolute top-6 right-6 w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center transition-all z-20 hover:scale-110",
              wishlist.includes(car.id) ? "text-pink-500" : "text-white/40 hover:text-white"
            )}
          >
            <Heart className={cn("w-4 h-4", wishlist.includes(car.id) && "fill-pink-500")} />
          </button>

          {/* Quick Action Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
            <button 
              onClick={() => compareList.includes(car.id) ? removeFromCompare(car.id) : addToCompare(car.id)}
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl",
                compareList.includes(car.id) ? "bg-electric-blue text-black" : "glass border border-white/20 hover:bg-white hover:text-black"
              )}
            >
              {compareList.includes(car.id) ? <Check className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
            </button>
            <Link to={`/car/${car.id}`} className="w-14 h-14 rounded-2xl glass border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-2xl">
              <ArrowRight className="-rotate-45 w-6 h-6" />
            </Link>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="group-hover:translate-x-2 transition-transform duration-500">
              <p className="text-electric-blue font-display text-[9px] tracking-widest mb-2 uppercase">{car.brand}</p>
              <h3 className="text-2xl font-black uppercase tracking-tighter">{car.name}</h3>
            </div>
            <p className="text-lg font-display font-medium group-hover:text-electric-blue transition-colors">{car.price}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-white/20 group-hover:text-electric-blue transition-colors" />
              <div>
                <p className="text-[8px] text-white/20 font-display uppercase tracking-widest">0-60 MPH</p>
                <p className="text-[11px] font-display font-bold">{car.acceleration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Gauge className="w-4 h-4 text-white/20 group-hover:text-electric-blue transition-colors" />
              <div>
                <p className="text-[8px] text-white/20 font-display uppercase tracking-widest">POWER</p>
                <p className="text-[11px] font-display font-bold">{car.power}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Collection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priceRange, setPriceRange] = useState(10000000);
  const [showFilters, setShowFilters] = useState(false);
  
  const { compareList, addToCompare, removeFromCompare, wishlist, toggleWishlist } = useComparison();

  const filteredCars = useMemo(() => {
    return CARS.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           car.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "All" || car.type === typeFilter;
      const matchesBrand = brandFilter === "All" || car.brand === brandFilter;
      const price = parseInt(car.price.replace(/[$,]/g, ""));
      const matchesPrice = price <= priceRange;
      
      return matchesSearch && matchesType && matchesBrand && matchesPrice;
    });
  }, [searchTerm, typeFilter, brandFilter, priceRange]);

  const brands = ["All", ...new Set(CARS.map(c => c.brand))];
  const types = ["All", "Hypercar", "Luxury Sedan", "EV", "GT"];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-electric-blue" />
            <span className="font-display text-[10px] tracking-[0.4em] text-electric-blue">CURRENT INVENTORY</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">THE <br /> REGISTRY</h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <p className="text-white/40 max-w-lg uppercase tracking-widest text-[10px] leading-relaxed">
              Every vehicle in our collection undergoes a rigorous 500-point quantum certification 
              process. Performance, provenance, and pedigree—guaranteed.
            </p>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "px-8 py-4 rounded-full border font-display text-[10px] tracking-widest uppercase transition-all flex items-center gap-4",
                showFilters ? "bg-white text-black border-white" : "border-white/10 hover:bg-white/5"
              )}
            >
              Advanced Filters <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-b border-white/5 pb-10 mb-20"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  <div className="space-y-6">
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-electric-blue transition-colors" />
                      <input 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="SEARCH..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-[10px] font-display tracking-widest focus:outline-none focus:border-electric-blue/40 transition-all uppercase"
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="text-[8px] font-display text-white/20 tracking-widest uppercase">Max Valuation</p>
                      <div className="flex justify-between items-end">
                        <p className="text-sm font-display font-medium text-electric-blue">${(priceRange / 1000000).toFixed(1)}M</p>
                      </div>
                      <input 
                        type="range" min="100000" max="10000000" step="100000"
                        value={priceRange}
                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                        className="w-full accent-electric-blue h-[1px] bg-white/10 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[9px] font-display text-white/40 tracking-widest uppercase">Manufacturer</p>
                    <div className="flex flex-wrap gap-2">
                       {brands.map(b => (
                         <button 
                          key={b} 
                          onClick={() => setBrandFilter(b)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-[8px] font-display border transition-all",
                            brandFilter === b ? "bg-electric-blue border-electric-blue text-black" : "border-white/5 hover:border-white/20"
                          )}
                         >
                           {b.toUpperCase()}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[9px] font-display text-white/40 tracking-widest uppercase">Asset Class</p>
                    <div className="flex flex-wrap gap-2">
                       {types.map(t => (
                         <button 
                          key={t} 
                          onClick={() => setTypeFilter(t)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-[8px] font-display border transition-all",
                            typeFilter === t ? "bg-white border-white text-black" : "border-white/5 hover:border-white/20"
                          )}
                         >
                           {t.toUpperCase()}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car, i) => (
              <CarCard 
                key={car.id} 
                car={car} 
                i={i} 
                wishlist={wishlist} 
                toggleWishlist={toggleWishlist}
                compareList={compareList}
                addToCompare={addToCompare}
                removeFromCompare={removeFromCompare}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
