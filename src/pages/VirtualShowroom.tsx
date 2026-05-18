import { motion, AnimatePresence } from "motion/react";
import { 
  Maximize2, RotateCw, Lightbulb, MousePointer2, 
  Info, ArrowLeft, ArrowRight, Volume2, VolumeX,
  Camera, Zap, Cpu, Wind, Target
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { CARS } from "../constants";
import { cn } from "../lib/utils";

export default function VirtualShowroom() {
  const [activeCar, setActiveCar] = useState(CARS[0]);
  const [lightMode, setLightMode] = useState("Ambient");
  const [isMuted, setIsMuted] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [showAR, setShowAR] = useState(false);

  // Audio setup
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isMuted && audioRef.current) {
      audioRef.current.play().catch(() => setIsMuted(true));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isMuted]);

  const hotspots = [
    { 
      id: 1, top: "40%", left: "30%", 
      title: "VORTEX ENGINE",
      detail: "Quad-turbo carbon induction with quantum-state cooling. 2000HP Peak.",
      icon: Cpu,
      sound: "https://www.soundraid.com/wp-content/uploads/2017/10/Supercar-Engine-Start.mp3"
    },
    { 
      id: 2, top: "60%", left: "70%", 
      title: "CERAMIC BRAKING",
      detail: "Laser-sintered silicon carbide rotors with active aero-braking engagement.",
      icon: Target,
      sound: "https://www.soundjay.com/mechanical/brake-squeak-1.mp3"
    },
    { 
      id: 3, top: "30%", left: "55%", 
      title: "DIGITAL COCKPIT",
      detail: "Neural-link interface with haptic feedback and holographic navigation.",
      icon: Zap,
      sound: "https://www.soundjay.com/buttons/button-09.mp3"
    }
  ];

  const handleHotspotClick = (spot: typeof hotspots[0]) => {
    setActiveHotspot(spot.id);
    if (!isMuted) {
      const audio = new Audio(spot.sound);
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }
  };

  return (
    <div className="h-screen w-full bg-[#050505] overflow-hidden flex flex-col pt-24 select-none">
      <audio ref={audioRef} loop src="https://www.soundjay.com/free-music/ambient-01.mp3" />
      
      {/* Top Controls */}
      <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center py-6 z-20">
        <div className="flex gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tighter">{activeCar.name}</h2>
            <p className="text-[10px] font-display tracking-[0.3em] text-white/40 uppercase">Ecosystem Node v4.2 // {lightMode} Mode</p>
          </div>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/10"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-electric-blue animate-pulse" />}
          </button>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setShowAR(true)}
            className="px-6 py-2 rounded-full border border-electric-blue/40 bg-electric-blue/5 text-electric-blue font-display text-[9px] tracking-widest flex items-center gap-2 hover:bg-electric-blue hover:text-black transition-all"
          >
            <Camera className="w-4 h-4" /> VIEW IN YOUR SPACE (AR)
          </button>
          <div className="w-[1px] h-6 bg-white/10 mx-2 self-center" />
          {["Ambient", "Direct", "Noir"].map(mode => (
            <button 
              key={mode}
              onClick={() => setLightMode(mode)}
              className={cn(
                "px-6 py-2 rounded-full border border-white/10 font-display text-[9px] tracking-widest transition-all",
                lightMode === mode ? "bg-white text-black" : "hover:bg-white/5"
              )}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative group cursor-crosshair overflow-hidden">
        {/* Dynamic Lighting Overlay */}
        <div className={`absolute inset-0 z-10 pointer-events-none transition-all duration-1000 ${
          lightMode === "Ambient" ? "bg-electric-blue/5" : 
          lightMode === "Direct" ? "bg-white/5" : "bg-black/60"
        }`} />
        
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent z-0" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            key={activeCar.id}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: zoom, opacity: 1, rotateY: rotation }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="w-full h-full relative"
          >
            <img 
              src={activeCar.image} 
              alt="Showroom Car" 
              className={cn(
                "w-full h-full object-contain transition-all duration-1000",
                lightMode === "Noir" ? "contrast-150 grayscale brightness-75" : "contrast-100 grayscale-0"
              )}
              referrerPolicy="no-referrer"
            />

            {/* Enhanced Hotspots */}
            <div className="absolute inset-0 z-20">
              {hotspots.map((spot) => (
                <motion.div 
                  key={spot.id}
                  style={{ top: spot.top, left: spot.left }}
                  className="absolute"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <button 
                    onClick={() => handleHotspotClick(spot)}
                    className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center relative group"
                  >
                    <div className="w-3 h-3 rounded-full bg-electric-blue animate-ping absolute" />
                    <div className="w-3 h-3 rounded-full bg-electric-blue relative z-10" />
                    
                    {/* Floating Info Panel */}
                    <AnimatePresence>
                      {activeHotspot === spot.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-64 pointer-events-auto"
                        >
                          <div className="glass p-6 rounded-[24px] border border-white/20 shadow-2xl backdrop-blur-3xl overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-electric-blue" />
                            <div className="flex justify-between items-start mb-4">
                              <div className="w-10 h-10 rounded-xl bg-electric-blue/10 flex items-center justify-center">
                                <spot.icon className="w-5 h-5 text-electric-blue" />
                              </div>
                              <button onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }} className="text-white/20 hover:text-white">
                                <RotateCw className="w-3 h-3" />
                              </button>
                            </div>
                            <h4 className="text-[10px] font-display text-electric-blue tracking-[0.3em] mb-2 uppercase">{spot.title}</h4>
                            <p className="text-[10px] text-white/60 leading-relaxed uppercase tracking-wider">{spot.detail}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* HUD Controls Overlay */}
        <div className="absolute top-1/2 right-12 -translate-y-1/2 z-30 flex flex-col gap-6">
           <div className="glass p-2 rounded-2xl border border-white/10 flex flex-col gap-2">
              <button 
                onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                +
              </button>
              <button 
                onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                -
              </button>
           </div>

           <button 
             onClick={() => { setZoom(1); setRotation(0); }}
             className="w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center hover:border-electric-blue group"
           >
             <RotateCw className="w-5 h-5 text-white/40 group-hover:text-electric-blue transition-all" />
           </button>
        </div>

        {/* Dynamic HUD Segment */}
        <div className="absolute bottom-12 left-12 z-30 flex items-end gap-12">
          <div className="glass p-8 rounded-[32px] w-80 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Maximize2 className="w-12 h-12" />
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-display text-white/40 tracking-widest uppercase">Ecosystem Telemetry</span>
              <div className="text-electric-blue text-[8px] animate-pulse uppercase">Live Feed</div>
            </div>
            <div className="space-y-4">
              {[
                { label: "ENGINE TEMP", val: (Math.random() * 10 + 80).toFixed(1) + "°C", width: "70%" },
                { label: "BATTERY VOLTS", val: "842V", width: "95%" },
                { label: "AERO DOWNFORCE", val: "1240KG", width: "45%" }
              ].map(stat => (
                <div key={stat.label}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[8px] text-white/30 uppercase tracking-tighter">{stat.label}</span>
                    <span className="text-[10px] font-mono text-white">{stat.val}</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-electric-blue/40" style={{ width: stat.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 right-12 z-30 flex items-center gap-6">
          <div className="flex items-center gap-3 text-white/40">
            <MousePointer2 className="w-4 h-4" />
            <span className="text-[9px] font-display tracking-widest uppercase">INTERACT WITH HUD</span>
          </div>
        </div>
      </div>

      {/* AR Modal Overlay */}
      <AnimatePresence>
        {showAR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-12 text-center"
          >
            <div className="max-w-xl">
              <Camera className="w-20 h-20 text-electric-blue mx-auto mb-8 animate-pulse" />
              <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter">ENVIRONMENT SCAN REQUIRED</h2>
              <p className="text-white/40 text-lg uppercase tracking-widest font-light leading-relaxed mb-12">
                To project the {activeCar.name} into your physical space, we require camera access. 
                Please use our mobile application for the most immersive spatial experience.
              </p>
              <div className="flex flex-col gap-4">
                <button className="px-12 py-5 bg-white text-black font-display text-[11px] font-bold tracking-[0.3em]">
                  SCAN QR CODE
                </button>
                <button onClick={() => setShowAR(false)} className="px-12 py-5 border border-white/10 text-white/40 font-display text-[11px] font-bold tracking-[0.3em] hover:text-white">
                  BACK TO VIRTUAL CONSOLE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Car Selector Shelf */}
      <div className="bg-black/40 backdrop-blur-3xl border-t border-white/5 py-8 z-20">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 overflow-x-auto no-scrollbar">
          {CARS.map((car) => (
            <button 
              key={car.id}
              onClick={() => { setActiveCar(car); setRotation(0); setZoom(1); }}
              className={cn(
                "flex-none w-56 h-28 rounded-2xl border transition-all overflow-hidden relative group",
                activeCar.id === car.id ? "border-electric-blue scale-105 shadow-[0_0_30px_rgba(0,229,255,0.2)]" : "border-white/5 hover:border-white/20"
              )}
            >
              <img src={car.image} alt="Select" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-4">
                <span className="text-[9px] font-display tracking-widest uppercase">{car.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
