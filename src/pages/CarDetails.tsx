import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, Shield, ArrowRight, RotateCcw, 
  Maximize2, Share2, Heart, Calculator,
  Calendar, Phone, Mail, User, Info,
  CheckCircle2, Plus, Minus, MousePointer2
} from "lucide-react";
import { CARS, INSURANCE_PLANS } from "../constants";
import { cn } from "../lib/utils";
import { useComparison } from "../App";

export default function CarDetails() {
  const { id } = useParams();
  const car = CARS.find(c => c.id === id) || CARS[0];
  const { addToCart, cart, wishlist, toggleWishlist } = useComparison();
  
  const [activeTab, setActiveTab] = useState("Specs");
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success">("idle");

  const isInCart = cart.some(item => item.carId === car.id);

  const handleAddToCart = () => {
    if (isInCart) return;
    
    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      carId: car.id,
      insuranceId: selectedInsurance || undefined,
      name: car.name,
      price: car.price
    });
  };

  // Related Cars logic
  const relatedCars = useMemo(() => {
    return CARS.filter(c => c.id !== car.id && (c.type === car.type || c.brand === car.brand)).slice(0, 3);
  }, [car]);

  // EMI Calculator State
  const [loanTenure, setLoanTenure] = useState(60);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const interestRate = 0.045; // 4.5%

  const carPrice = parseInt(car.price.replace(/[$,]/g, ""));
  const downPayment = carPrice * (downPaymentPercent / 100);

  const monthlyPayment = useMemo(() => {
    const loanAmount = carPrice - downPayment;
    const monthlyRate = interestRate / 12;
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenure)) / (Math.pow(1 + monthlyRate, loanTenure) - 1);
    return isNaN(payment) ? 0 : Math.round(payment);
  }, [car.price, loanTenure, downPayment]);

  const [mainImage, setMainImage] = useState(car.image);
  const [openAccordion, setOpenAccordion] = useState<string | null>("Engine");

  const techSpecs = [
    { name: "Engine", value: car.engine, detail: "Proprietary Aura-built powertrain with quantum torque vectoring." },
    { name: "Power", value: car.power, detail: "Peak output sustained through active crystal cooling technology." },
    { name: "Torque", value: car.torque || "N/A", detail: "Instantaneous delivery across the entire RPM range." },
    { name: "Top Speed", value: car.topSpeed, detail: "Electronically limited for stability at extreme velocities." }
  ];

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("success");
    setTimeout(() => setFormStatus("idle"), 5000);
  };

  return (
    <div className="pt-32 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Breadcrumb */}
        <div className="flex gap-4 items-center mb-12 text-[10px] font-display tracking-widest text-white/40 uppercase">
          <Link to="/collection" className="hover:text-white transition-colors">Registry</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white">{car.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: Preview & Specs */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="relative aspect-[16/10] glass-dark rounded-[40px] overflow-hidden group cursor-grab active:cursor-grabbing select-none"
                   onMouseMove={(e) => isRotating && setRotation(prev => prev + e.movementX * 0.5)}
                   onMouseDown={() => setIsRotating(true)}
                   onMouseUp={() => setIsRotating(false)}
                   onMouseLeave={() => setIsRotating(false)}>
                
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.1)_0%,transparent_70%)] pointer-events-none" />
                
                <motion.div 
                  key={mainImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: zoom, rotateY: rotation }}
                  transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
                  className="w-full h-full flex items-center justify-center p-12"
                >
                  <img 
                    src={mainImage} 
                    alt={car.name} 
                    className="w-full h-full object-contain drop-shadow-[0_20px_60px_rgba(0,229,255,0.3)]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* HUD Controls */}
                <div className="absolute top-8 right-8 flex flex-col gap-4 z-20">
                  <div className="glass p-2 rounded-2xl border border-white/10 flex flex-col gap-2">
                    <button 
                      onClick={() => setZoom(prev => Math.min(prev + 0.2, 2.5))}
                      className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
                      className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all border border-white/10" 
                    onClick={() => { setRotation(0); setZoom(1); }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex gap-4 p-2 overflow-x-auto scrollbar-hide">
                {(car.images || [car.image]).map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={cn(
                      "relative w-24 aspect-video rounded-xl overflow-hidden glass border-2 transition-all shrink-0",
                      mainImage === img ? "border-electric-blue" : "border-white/5 opacity-40 hover:opacity-100"
                    )}
                  >
                    <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Car Specs Tabs & Accordion */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-sm font-display tracking-[0.4em] text-white/40 uppercase mb-8 ml-2">Technical Dossier</h3>
                <div className="space-y-2">
                  {techSpecs.map((spec) => (
                    <div key={spec.name} className="glass-dark rounded-3xl border border-white/5 overflow-hidden">
                      <button 
                        onClick={() => setOpenAccordion(openAccordion === spec.name ? null : spec.name)}
                        className="w-full p-6 flex justify-between items-center hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-6">
                          <span className="text-[10px] font-display text-white/20 uppercase tracking-widest">{spec.name}</span>
                          <span className="text-xl font-display font-medium">{spec.value}</span>
                        </div>
                        <Plus className={cn("w-4 h-4 text-electric-blue transition-transform", openAccordion === spec.name && "rotate-45")} />
                      </button>
                      <AnimatePresence>
                        {openAccordion === spec.name && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-6"
                          >
                            <p className="text-[11px] text-white/40 uppercase tracking-widest leading-relaxed">
                              {spec.detail}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Acceleration", value: car.acceleration },
                  { label: "Top Speed", value: car.topSpeed },
                  { label: "Power Output", value: car.power },
                  { label: "Status", value: car.status },
                ].map(stat => (
                  <div key={stat.label} className="p-6 glass-dark border border-white/5 rounded-3xl">
                    <p className="text-[10px] font-display text-white/30 uppercase tracking-widest mb-2">{stat.label}</p>
                    <p className="text-xl font-display font-medium tracking-tighter">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Purchase & Services */}
          <div className="space-y-12">
            <div>
              <div className="flex justify-between items-start mb-4">
                <p className="text-electric-blue font-display text-[10px] tracking-[0.4em] uppercase">{car.brand}</p>
                <button 
                  onClick={() => toggleWishlist(car.id)}
                  className={cn(
                    "w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center transition-all",
                    wishlist.includes(car.id) ? "text-pink-500 border-pink-500/20" : "text-white/40 hover:text-white"
                  )}
                >
                  <Heart className={cn("w-5 h-5", wishlist.includes(car.id) && "fill-pink-500")} />
                </button>
              </div>
              <h1 className="text-6xl font-black mb-4 uppercase tracking-tighter">{car.name}</h1>
              <div className="flex items-end gap-4 mb-10">
                <span className="text-4xl font-display font-bold">{car.price}</span>
                <span className="text-[10px] font-display text-white/30 tracking-widest uppercase pb-2">VAT INCLUDED EXCLUDING DUTIES</span>
              </div>
            </div>

            {/* Insurance Integration */}
            <div className="glass p-8 rounded-[40px] border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent pointer-events-none" />
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <Shield className="text-electric-blue w-5 h-5" />
                <h3 className="font-display text-[10px] tracking-widest uppercase">Add Elite Insurance Coverage</h3>
              </div>
              <div className="space-y-4 mb-8 relative z-10">
                {INSURANCE_PLANS.map(plan => (
                  <button 
                    key={plan.name}
                    onClick={() => setSelectedInsurance(plan.name)}
                    className={cn(
                      "w-full p-4 rounded-2xl border transition-all flex justify-between items-center group/item",
                      selectedInsurance === plan.name ? "bg-electric-blue/10 border-electric-blue" : "bg-white/5 border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="text-left">
                      <p className="text-[10px] font-bold tracking-widest mb-1 uppercase group-hover/item:text-electric-blue transition-colors">{plan.name}</p>
                      <p className="text-[9px] text-white/40 uppercase tracking-tighter">{plan.level} Level Protection</p>
                    </div>
                    <p className="text-xs font-display font-bold">{plan.price}</p>
                  </button>
                ))}
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={isInCart}
                className={cn(
                  "w-full py-5 rounded-2xl font-display text-[11px] font-bold tracking-[0.3em] transition-all relative z-10 uppercase",
                  isInCart 
                    ? "bg-green-500/20 text-green-500 border border-green-500/20 cursor-default" 
                    : "bg-white text-black hover:bg-electric-blue hover:scale-[1.02] active:scale-100"
                )}
              >
                {isInCart 
                  ? "Added to Acquisition Flow" 
                  : selectedInsurance 
                    ? `Proceed with ${selectedInsurance}` 
                    : "Initiate Acquisition Protocol"}
              </button>
            </div>

            {/* EMI Calculator */}
            <div className="glass p-8 rounded-[40px] border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <Calculator className="text-gold w-5 h-5" />
                  <h3 className="font-display text-[10px] tracking-widest uppercase">Investment Estimator</h3>
                </div>
                <div className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-full">
                  <span className="text-[8px] font-display text-gold tracking-widest uppercase">4.5% APR Special Rate</span>
                </div>
              </div>
              <div className="space-y-12">
                <div className="space-y-6">
                  <div className="flex justify-between text-[10px] font-display tracking-widest">
                    <span className="text-white/40 uppercase">Loan Tenure</span>
                    <span className="text-white font-bold">{loanTenure} MONTHS</span>
                  </div>
                  <input 
                    type="range" min="12" max="144" step="12"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(parseInt(e.target.value))}
                    className="w-full accent-gold bg-white/10 h-1 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between text-[10px] font-display tracking-widest">
                    <span className="text-white/40 uppercase">Initial Down Payment</span>
                    <span className="text-gold font-bold">{downPaymentPercent}%</span>
                  </div>
                  <input 
                    type="range" min="10" max="90" step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(parseInt(e.target.value))}
                    className="w-full accent-electric-blue bg-white/10 h-1 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Monthly Payment</p>
                    <p className="text-3xl font-display font-bold text-electric-blue">${monthlyPayment.toLocaleString()}</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Down Payment</p>
                    <p className="text-xl font-display font-medium text-white/60">${downPayment.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Drive Form */}
            <div className="glass p-8 rounded-[40px] border border-white/10">
              <h3 className="font-display text-xs tracking-widest mb-8 uppercase">BOOK PRIVATE VIEWING</h3>
              {formStatus === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/20 p-8 rounded-3xl text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="font-display text-sm mb-2">REQUEST SUBMITTED</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Our Global Concierge will contact you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleTestDriveSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="FULL NAME" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-display uppercase tracking-widest focus:outline-none focus:border-electric-blue transition-colors" />
                    <input required placeholder="PHONE" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-display uppercase tracking-widest focus:outline-none focus:border-electric-blue transition-colors" />
                  </div>
                  <input required type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-display uppercase tracking-widest focus:outline-none focus:border-electric-blue transition-colors" />
                  <input required type="datetime-local" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-display uppercase tracking-widest focus:outline-none focus:border-electric-blue transition-colors" />
                  <button className="w-full py-5 bg-electric-blue text-black font-display text-[10px] font-bold tracking-[0.4em] hover:scale-[1.02] transition-transform">
                    RESERVE PRIVATE SLOT
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Related Cars Segment */}
        <section className="mt-40 border-t border-white/10 pt-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-white/40 font-display text-[10px] tracking-[0.4em] mb-4 uppercase">SIMILAR ASSETS</p>
              <h2 className="text-4xl font-bold uppercase tracking-tight">RELATED CURATIONS</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {relatedCars.map(rc => (
              <Link key={rc.id} to={`/car/${rc.id}`} className="group glass-dark rounded-3xl p-6 border border-white/5 hover:border-white/20 transition-all">
                <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                  <img src={rc.image} alt={rc.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[8px] font-display text-white/30 tracking-widest mb-1">{rc.brand}</p>
                    <h4 className="text-lg font-bold">{rc.name}</h4>
                  </div>
                  <p className="text-electric-blue font-display text-sm">{rc.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return <ArrowRight className={cn("rotate-0", className)} />;
}
