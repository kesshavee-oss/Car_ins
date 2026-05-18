import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Trash2, Shield, ArrowRight, CreditCard, Lock, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useComparison } from "../App";
import { CARS, INSURANCE_PLANS } from "../constants";
import { cn } from "../lib/utils";
import { useState } from "react";

export default function Cart() {
  const { cart, removeFromCart } = useComparison();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const price = parseInt(item.price.replace(/[$,]/g, ""));
      const insurance = INSURANCE_PLANS.find(p => p.name === item.insuranceId);
      const insurancePrice = insurance ? parseInt(insurance.price.replace(/[$,/mo]/g, "")) * 12 : 0;
      return acc + price + insurancePrice;
    }, 0);
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-40 flex items-center justify-center bg-black px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center"
        >
          <div className="w-24 h-24 bg-electric-blue/10 border border-electric-blue/20 rounded-full flex items-center justify-center mx-auto mb-10">
            <Lock className="w-10 h-10 text-electric-blue animate-pulse" />
          </div>
          <h1 className="text-5xl font-black mb-6 uppercase tracking-tighter">Acquisition Secured</h1>
          <p className="text-white/40 text-lg uppercase tracking-widest leading-relaxed mb-12">
            Your asset allocation request has been broadcasted to our global fulfillment network. 
            Digital ownership credentials will be dispatched via encrypted channel within 4 hours.
          </p>
          <Link to="/dashboard" className="inline-block px-12 py-5 bg-white text-black font-display text-[11px] font-bold tracking-[0.3em] hover:bg-electric-blue transition-colors">
            GO TO DASHBOARD
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center border border-electric-blue/20">
                 <ShoppingCart className="w-4 h-4 text-electric-blue" />
               </div>
               <span className="text-electric-blue font-display text-[10px] tracking-[0.4em] uppercase">Private Inventory Basket</span>
            </div>
            <h1 className="text-6xl font-black uppercase tracking-tighter">Acquisition Flow</h1>
          </div>
          <Link to="/collection" className="flex items-center gap-2 text-[10px] font-display tracking-widest text-white/40 hover:text-white mb-2 transition-colors">
            <ChevronLeft className="w-3 h-3" /> CONTINUE BROWSING
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="py-20 text-center glass rounded-[48px] border border-white/10">
            <ShoppingCart className="w-16 h-16 text-white/10 mx-auto mb-6" />
            <p className="text-white/40 uppercase tracking-[0.2em] mb-8">Your basket is currently empty.</p>
            <Link to="/collection" className="inline-block px-8 py-4 border border-white/20 font-display text-[11px] tracking-widest hover:bg-white hover:text-black transition-all">
              EXPLORE INVENTORY
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cart.map((item) => {
                  const car = CARS.find(c => c.id === item.carId);
                  const insurance = INSURANCE_PLANS.find(p => p.name === item.insuranceId);

                  return (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="glass p-8 rounded-[32px] border border-white/10 flex gap-8 relative group overflow-hidden"
                    >
                      <div className="w-44 h-28 rounded-2xl overflow-hidden bg-black/40 border border-white/5 shrink-0">
                        <img src={car?.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-[8px] font-display text-white/30 tracking-widest mb-1 uppercase">{car?.brand}</p>
                            <h3 className="text-2xl font-bold uppercase tracking-tight">{item.name}</h3>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-white/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex gap-4 items-center">
                          <span className="text-lg font-display text-electric-blue">{item.price}</span>
                          {insurance && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                              <Shield className="w-2.5 h-2.5 text-gold" />
                              <span className="text-[8px] font-display text-white/60 tracking-widest uppercase">{insurance.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="glass p-10 rounded-[48px] border border-white/10 sticky top-40">
                <h3 className="font-display text-xs tracking-widest mb-10 uppercase">ACQUISITION SUMMARY</h3>
                
                <div className="space-y-6 pt-6 border-t border-white/10 mb-10">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40 tracking-widest uppercase">SUBTOTAL</span>
                    <span className="font-mono">${calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40 tracking-widest uppercase">SECURE DELIVERY</span>
                    <span className="text-green-400 tracking-widest uppercase">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40 tracking-widest uppercase">ACQUISITION TAX</span>
                    <span className="font-mono">$0</span>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-white/10">
                    <span className="font-display text-xs tracking-[0.2em] uppercase">ESTIMATED TOTAL</span>
                    <span className="text-3xl font-display font-bold">${calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={cn(
                    "w-full py-6 font-display text-[11px] font-bold tracking-[0.4em] relative overflow-hidden group transition-all",
                    isProcessing ? "bg-white/10 cursor-not-allowed" : "bg-white text-black hover:bg-electric-blue"
                  )}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      SECURING ASSETS...
                    </div>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      AUTHORIZE TRANSFER <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform" />
                    </span>
                  )}
                </button>

                <div className="mt-8 flex items-center justify-center gap-3 text-[8px] text-white/20 uppercase tracking-[0.3em]">
                   <CreditCard className="w-3 h-3" />
                   SECURE QUANTUM PAYMENT ENABLED
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
