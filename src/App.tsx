import { Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Car, Shield, Crown, Gavel, Headset, 
  LayoutDashboard, User, Zap, Menu, X, 
  MessageSquare, Search, Globe, ChevronRight,
  Sparkles, Layers, ShoppingCart, Heart
} from "lucide-react";
import { useState, useEffect, createContext, useContext } from "react";
import { cn } from "./lib/utils";

// Pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import EVShowcase from "./pages/EVShowcase";
import Insurance from "./pages/Insurance";
import VIPMembership from "./pages/VIPMembership";
import AuctionHouse from "./pages/AuctionHouse";
import Concierge from "./pages/Concierge";
import VirtualShowroom from "./pages/VirtualShowroom";
import Finance from "./pages/Finance";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CarDetails from "./pages/CarDetails";
import Compare from "./pages/Compare";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Contact from "./pages/Contact";

// Comparison & Cart Context
interface CartItem {
  id: string;
  carId: string;
  insuranceId?: string;
  price: string;
  name: string;
}

interface ComparisonContextType {
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) throw new Error("useComparison must be used within ComparisonProvider");
  return context;
};

// Cinematic Page Wrapper
export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { compareList, cart, wishlist } = useComparison();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inventory", path: "/collection", icon: Car },
    { name: "EV", path: "/ev", icon: Zap },
    { name: "Showroom", path: "/showroom", icon: Globe },
    { name: "Insurance", path: "/insurance", icon: Shield },
    { name: "VIP", path: "/vip", icon: Crown },
    { name: "Auction", path: "/auction", icon: Gavel },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500",
      scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-8"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-electric-blue rounded-full flex items-center justify-center neon-glow group-hover:scale-110 transition-transform">
            <Car className="text-black w-6 h-6" />
          </div>
          <span className="font-display text-2xl font-bold tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">
            AURA
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "font-display text-[10px] tracking-widest text-white/60 hover:text-electric-blue transition-colors relative group",
                location.pathname === link.path && "text-electric-blue"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-2 left-0 w-0 h-[1px] bg-electric-blue transition-all group-hover:w-full",
                location.pathname === link.path && "w-full"
              )} />
            </Link>
          ))}
          <div className="w-[1px] h-4 bg-white/20" />
          
          <Link to="/compare" className="relative group text-white/60 hover:text-white transition-colors">
            <Layers className="w-5 h-5" />
            {compareList.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-electric-blue text-black text-[8px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {compareList.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative group text-white/60 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-black text-[8px] font-bold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="relative group text-white/60 hover:text-white transition-colors">
            <Heart className={cn("w-5 h-5", wishlist.length > 0 && "fill-pink-500 text-pink-500")} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-pink-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/dashboard" className="text-white/60 hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <button className="px-6 py-2 bg-white text-black font-display text-[10px] tracking-widest font-bold hover:bg-electric-blue transition-colors rounded-none overflow-hidden relative group">
            <span className="relative z-10">BOOK TEST DRIVE</span>
            <div className="absolute inset-0 bg-electric-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="font-display text-2xl tracking-widest text-white hover:text-electric-blue transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="font-display text-2xl tracking-widest text-white mt-8">DASHBOARD</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([
    { role: "assistant", content: "Greetings. I am AURA. How may I assist your luxury journey today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: messages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.text }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 sm:w-96 glass-dark rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="font-display text-[10px] tracking-widest">AURA AI CONCIERGE</h3>
                  <p className="text-[8px] text-white/40 uppercase tracking-tighter">Operational • High Availability</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-4 flex flex-col gap-4 text-xs">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "p-3 rounded-xl max-w-[85%]",
                  m.role === "assistant" ? "bg-white/5 self-start" : "bg-electric-blue/20 self-end border border-electric-blue/20"
                )}>
                  {m.content}
                </div>
              ))}
              {loading && <div className="animate-pulse text-white/40">Aura is contemplating...</div>}
            </div>

            <div className="p-4 border-t border-white/10 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Inquire about vehicles or services..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-electric-blue transition-colors"
              />
              <button 
                onClick={sendMessage}
                className="w-10 h-10 rounded-full bg-electric-blue flex items-center justify-center text-black hover:scale-105 transition-transform"
              >
                <div className="rotate-45 -translate-y-0.5">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-2xl hover:border-electric-blue transition-all group overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageSquare className="w-6 h-6 text-white group-hover:text-electric-blue transition-colors relative z-10" />
      </button>
    </div>
  );
}

export default function App() {
  const [compareList, setCompareList] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const location = useLocation();

  const addToCompare = (id: string) => {
    if (compareList.length < 3 && !compareList.includes(id)) {
      setCompareList([...compareList, id]);
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList(compareList.filter(i => i !== id));
  };

  const clearCompare = () => setCompareList([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <ComparisonContext.Provider value={{ 
      compareList, addToCompare, removeFromCompare, clearCompare,
      cart, addToCart, removeFromCart,
      wishlist, toggleWishlist
    }}>
      <div className="min-h-screen">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/collection" element={<PageWrapper><Collection /></PageWrapper>} />
            <Route path="/car/:id" element={<PageWrapper><CarDetails /></PageWrapper>} />
            <Route path="/compare" element={<PageWrapper><Compare /></PageWrapper>} />
            <Route path="/ev" element={<PageWrapper><EVShowcase /></PageWrapper>} />
            <Route path="/showroom" element={<PageWrapper><VirtualShowroom /></PageWrapper>} />
            <Route path="/insurance" element={<PageWrapper><Insurance /></PageWrapper>} />
            <Route path="/vip" element={<PageWrapper><VIPMembership /></PageWrapper>} />
            <Route path="/auction" element={<PageWrapper><AuctionHouse /></PageWrapper>} />
            <Route path="/concierge" element={<PageWrapper><Concierge /></PageWrapper>} />
            <Route path="/finance" element={<PageWrapper><Finance /></PageWrapper>} />
            <Route path="/dashboard" element={<PageWrapper><UserDashboard /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
            <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
            <Route path="/wishlist" element={<PageWrapper><Wishlist /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
        <Chatbot />
        
        {/* Footer */}
        <footer className="bg-deep-black pt-20 pb-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-20">
            <div className="col-span-1 md:col-span-2">
              <h2 className="font-display text-3xl mb-6 tracking-[0.3em]">AURA LUXURY</h2>
              <p className="text-white/40 text-sm max-w-sm leading-relaxed mb-8">
                The world's premier automotive ecosystem for the discerning elite. 
                Future-forward technology, timeless luxury, and hyper-exclusive assets.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'LinkedIn'].map(s => (
                  <button key={s} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-electric-blue hover:text-electric-blue transition-all text-white/60">
                    <span className="sr-only">{s}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display text-xs mb-8 tracking-widest text-white/80">SERVICES</h4>
              <ul className="space-y-4 text-white/40 text-xs tracking-widest uppercase">
                <li><Link to="/collection" className="hover:text-electric-blue">Inventory</Link></li>
                <li><Link to="/insurance" className="hover:text-electric-blue">Elite Insurance</Link></li>
                <li><Link to="/finance" className="hover:text-electric-blue">Finance & Investment</Link></li>
                <li><Link to="/auction" className="hover:text-electric-blue">Auction House</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-xs mb-8 tracking-widest text-white/80">ECOSYSTEM</h4>
              <ul className="space-y-4 text-white/40 text-xs tracking-widest uppercase">
                <li><Link to="/vip" className="hover:text-electric-blue">VIP Membership</Link></li>
                <li><Link to="/concierge" className="hover:text-electric-blue">Global Concierge</Link></li>
                <li><Link to="/contact" className="hover:text-electric-blue">Contact Liaison</Link></li>
                <li><Link to="/showroom" className="hover:text-electric-blue">Virtual Showroom</Link></li>
                <li><Link to="/privacy" className="hover:text-electric-blue">Privacy Protocol</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-white/20 tracking-tighter">© 2026 AURA LUXURY ENTERPRISE. ALL RIGHTS SECURED BY QUANTUM ENCRYPTION.</p>
            <div className="flex gap-8 text-[10px] text-white/40 tracking-widest uppercase">
              <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> GENEVA HQ</span>
              <span className="flex items-center gap-1"><Search className="w-3 h-3" /> GLOBAL STATUS: OPERATIONAL</span>
            </div>
          </div>
        </footer>
      </div>
    </ComparisonContext.Provider>
  );
}
