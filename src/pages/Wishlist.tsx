import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ArrowRight, Layers, Sparkles } from "lucide-react";
import { useComparison } from "../App";
import { CARS } from "../constants";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useComparison();
  const favoriteCars = CARS.filter(c => wishlist.includes(c.id));

  return (
    <div className="pt-32 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-6">
             <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
               <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
             </div>
             <span className="text-pink-500 font-display text-[10px] tracking-[0.4em] uppercase">Personal Curator Wishlist</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">THE MUSEUM</h1>
          <p className="text-white/40 text-lg uppercase tracking-widest font-light max-w-2xl">
            A curated selection of assets that resonate with your vision. 
            Secure your allocation before these opportunities vanish.
          </p>
        </header>

        {favoriteCars.length === 0 ? (
          <div className="py-32 text-center glass rounded-[60px] border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_70%)]" />
            <Sparkles className="w-16 h-16 text-white/5 mx-auto mb-8" />
            <h2 className="text-3xl font-bold mb-4 uppercase">YOUR MUSEUM IS EMPTY</h2>
            <p className="text-white/40 text-xs tracking-widest mb-12 uppercase">Explore the Registry to add assets to your private collection.</p>
            <Link to="/collection" className="inline-block px-12 py-5 bg-white text-black font-display text-[11px] font-bold tracking-[0.3em] hover:bg-electric-blue transition-all">
              VIEW REGISTRY
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {favoriteCars.map((car, i) => (
              <motion.div 
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="glass-dark rounded-[40px] p-8 border border-white/5 hover:border-pink-500/30 transition-all duration-500">
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-8">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    />
                    <button 
                      onClick={() => toggleWishlist(car.id)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-pink-500 hover:bg-white hover:text-black transition-all z-20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-electric-blue font-display text-[9px] tracking-widest mb-2 uppercase">{car.brand}</p>
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{car.name}</h3>
                    <div className="flex justify-between items-end">
                      <p className="text-white font-display text-lg">{car.price}</p>
                      <p className="text-white/40 text-[9px] uppercase tracking-widest">{car.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Link to={`/car/${car.id}`} className="py-4 text-center bg-white text-black font-display text-[10px] font-bold tracking-[0.2em] hover:bg-electric-blue transition-colors">
                      DETAILS
                    </Link>
                    <button className="py-4 border border-white/10 text-white/40 font-display text-[10px] font-bold tracking-[0.2em] hover:text-white transition-colors">
                      ACQUIRE
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
