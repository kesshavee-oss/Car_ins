import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Globe, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Real-time validation
  useEffect(() => {
    const newErrors: FormErrors = {};
    
    if (formData.name && formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (formData.message && formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final check
    if (!formData.name || !formData.email || !formData.message || Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-electric-blue" />
            <span className="font-display text-[10px] tracking-[0.4em] text-electric-blue uppercase">Direct Interface</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none uppercase">GET IN <br /> TOUCH</h1>
          <p className="text-white/40 text-lg uppercase tracking-widest font-light leading-relaxed max-w-2xl">
            Command our attention. Whether you're inquiring about an asset, 
            seeking membership, or requiring elite assistance, our team is standing by.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <div className="glass p-12 rounded-[50px] border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 uppercase">TRANSMISSION RECEIVED</h3>
                  <p className="text-white/40 uppercase tracking-widest text-sm">
                    Our Global Liaison Team has been notified. Expect a secure response within 4 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8 relative z-10"
                >
                  <div className="space-y-2">
                    <label className="block text-[10px] font-display text-white/40 tracking-[0.3em] uppercase ml-2">Full Name</label>
                    <div className="relative">
                      <input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="IDENTIFY YOURSELF" 
                        className={cn(
                          "w-full bg-white/5 border rounded-2xl px-6 py-4 text-xs font-display uppercase tracking-widest focus:outline-none transition-all",
                          errors.name ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-electric-blue"
                        )}
                      />
                      {errors.name && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-red-500">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[10px] text-red-500/80 uppercase tracking-widest ml-2"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-display text-white/40 tracking-[0.3em] uppercase ml-2">Email Address</label>
                    <div className="relative">
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="SECURE CHANNEL" 
                        className={cn(
                          "w-full bg-white/5 border rounded-2xl px-6 py-4 text-xs font-display uppercase tracking-widest focus:outline-none transition-all",
                          errors.email ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-electric-blue"
                        )}
                      />
                      {errors.email && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-red-500">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[10px] text-red-500/80 uppercase tracking-widest ml-2"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-display text-white/40 tracking-[0.3em] uppercase ml-2">Message</label>
                    <div className="relative">
                      <textarea 
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="NATURE OF INQUIRY" 
                        className={cn(
                          "w-full bg-white/5 border rounded-2xl px-6 py-4 text-xs font-display uppercase tracking-widest focus:outline-none transition-all resize-none",
                          errors.message ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-electric-blue"
                        )}
                      />
                      {errors.message && (
                        <div className="absolute right-4 top-4 flex items-center gap-2 text-red-500">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[10px] text-red-500/80 uppercase tracking-widest ml-2"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <button 
                    disabled={isSubmitting || Object.keys(errors).length > 0 || !formData.name || !formData.email || !formData.message}
                    className={cn(
                      "w-full py-6 rounded-2xl font-display text-sm font-bold tracking-[0.5em] transition-all flex items-center justify-center gap-4",
                      isSubmitting 
                        ? "bg-white/5 text-white/20 cursor-wait" 
                        : "bg-white text-black hover:bg-electric-blue disabled:opacity-30 disabled:cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? "TRANSMITTING..." : (
                      <>
                        SEND SECURE MESSAGE <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Phone, label: "Global Access", value: "+41 22 730 00 00", desc: "Geneva Headquarters" },
                { icon: Mail, label: "Secure Mail", value: "liaison@aura.luxury", desc: "Encrypted Communication" },
                { icon: MapPin, label: "Geneva HQ", value: "Quai Gustave-Ador 12", desc: "1207 Genève, Switzerland" },
                { icon: Globe, label: "Digital Satellites", value: "aura.luxury/nodes", desc: "Global Network Status" },
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-dark p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-electric-blue/20">
                    <item.icon className="w-5 h-5 text-electric-blue" />
                  </div>
                  <p className="text-[10px] text-white/40 font-display tracking-widest uppercase mb-2">{item.label}</p>
                  <p className="text-lg font-bold mb-1 tracking-tight">{item.value}</p>
                  <p className="text-[9px] text-white/20 uppercase tracking-tighter">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="glass p-10 rounded-[40px] border border-white/10 flex items-center gap-8">
              <div className="w-20 h-20 rounded-full bg-electric-blue/10 flex items-center justify-center relative shrink-0">
                <div className="absolute inset-0 bg-electric-blue/20 blur-2xl rounded-full animate-pulse" />
                <MessageSquare className="w-10 h-10 text-electric-blue relative z-10" />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2 uppercase">LIVE ASSISTANCE</h4>
                <p className="text-white/40 text-[11px] uppercase tracking-widest leading-relaxed">
                  For immediate asset crisis management, use the "Aura Secure Channel" 
                  feature in your dashboard or contact your dedicated handling agent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
