import { motion } from "motion/react";
import { 
  BarChart3, Users, Briefcase, Activity, 
  Map, Bell, Search, Filter, ArrowUpRight,
  TrendingUp, DollarSign, PieChart, ShieldAlert
} from "lucide-react";
import { CARS } from "../constants";

export default function AdminDashboard() {
  const kpis = [
    { label: "Gross Revenue", value: "$42.8M", change: "+18%", icon: DollarSign },
    { label: "Active Claims", value: "14", change: "-2", icon: ShieldAlert },
    { label: "VIP Members", value: "4,208", change: "+124", icon: Users },
    { label: "Asset Turnover", value: "12 days", change: "-2 days", icon: Activity },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase mb-1">CENTRAL INTELLIGENCE</h1>
            <p className="text-[10px] font-display tracking-[0.3em] text-white/40 uppercase">Ecosystem Admin Node v9.0.2</p>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-electric-blue" />
              <input 
                placeholder="GLOBAL SEARCH..." 
                className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2 text-xs focus:outline-none focus:border-electric-blue transition-all w-64"
              />
            </div>
            <button className="relative w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5">
              <Bell className="w-4 h-4 text-white/60" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-electric-blue rounded-full border-2 border-[#050505]" />
            </button>
          </div>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpis.map((kpi, i) => (
            <motion.div 
              key={kpi.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass p-6 rounded-3xl border border-white/5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <kpi.icon className="w-5 h-5 text-electric-blue" />
                </div>
                <span className="text-[10px] font-display font-medium text-green-400">{kpi.change}</span>
              </div>
              <p className="text-[8px] font-display tracking-widest text-white/30 uppercase mb-1">{kpi.label}</p>
              <h3 className="text-2xl font-bold">{kpi.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Heatmap / Main Chart Placeholder */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass p-8 rounded-[40px] border border-white/5 relative overflow-hidden">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="font-display text-sm tracking-widest mb-2">REVENUE VELOCITY</h3>
                  <p className="text-[10px] text-white/30 uppercase tracking-tighter">Real-time Global Ledger Monitoring</p>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-display tracking-widest text-white/40 hover:text-white transition-colors">
                  LAST 30 DAYS <Filter className="w-3 h-3" />
                </button>
              </div>
              
              {/* Animated Mock Chart */}
              <div className="h-64 flex items-end gap-3 px-4">
                {[...Array(24)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.random() * 80 + 20}%` }}
                    transition={{ delay: i * 0.05, duration: 1, ease: "easeOut" }}
                    className="flex-1 bg-white/5 group relative hover:bg-electric-blue/40 transition-colors cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-electric-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      <div className="glass p-2 rounded-lg border border-white/20 text-[8px] font-display uppercase tracking-widest">
                        DATA NODE {i} <br />
                        VAL: ${(Math.random() * 1000).toFixed(0)}k
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-between mt-6 text-white/20 font-display text-[8px] tracking-widest uppercase">
                <span>00:00 UTC</span>
                <span>12:00 UTC</span>
                <span>24:00 UTC</span>
              </div>
            </div>

            {/* Inventory Management */}
            <div>
              <div className="flex justify-between items-center mb-6 px-2">
                <h3 className="font-display text-sm tracking-widest">ECOSYSTEM ASSETS</h3>
                <button className="text-[10px] font-display tracking-widest text-electric-blue uppercase">Global Inventory Management</button>
              </div>
              <div className="glass-dark rounded-3xl overflow-hidden border border-white/10">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/5 text-[9px] font-display tracking-widest text-white/40">
                    <tr>
                      <th className="p-6">VEHICLE ID</th>
                      <th className="p-6">MODEL</th>
                      <th className="p-6">STATUS</th>
                      <th className="p-6 text-right">VALUATION</th>
                    </tr>
                  </thead>
                  <tbody className="text-[10px] tracking-widest uppercase">
                    {CARS.map((car, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group">
                        <td className="p-6 font-mono text-white/40">#USR-842{i}</td>
                        <td className="p-6 font-medium group-hover:text-electric-blue transition-colors">{car.name}</td>
                        <td className="p-6">
                           <span className={`px-2 py-1 rounded-full border text-[8px] ${
                             car.status === 'Available' ? 'border-green-500/40 text-green-400' : 'border-gold/40 text-gold'
                           }`}>{car.status}</span>
                        </td>
                        <td className="p-6 text-right font-display">{car.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-[40px] border border-white/5 bg-gradient-to-br from-white/5 to-transparent">
              <PieChart className="w-8 h-8 text-electric-blue mb-8" />
              <h3 className="font-display text-sm tracking-widest mb-6 uppercase">Customer Segmentation</h3>
              <div className="space-y-6">
                {[
                  { label: "Hypercar Collectors", val: 65, color: "bg-electric-blue" },
                  { label: "Institutional Investors", val: 24, color: "bg-white" },
                  { label: "Corporate Concierge", val: 11, color: "bg-white/20" }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] font-display tracking-widest mb-2">
                      <span className="text-white/40">{item.label}</span>
                      <span>{item.val}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Intelligence Hub */}
            <div className="glass p-8 rounded-[40px] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <DollarSign className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-5 h-5 text-electric-blue" />
                <h3 className="font-display text-sm tracking-widest uppercase">FINANCIAL REPORT</h3>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] mb-2">PROJECTED QUARTERLY EPS</p>
                   <div className="flex justify-between items-end">
                      <p className="text-2xl font-bold text-white">$12.44</p>
                      <span className="text-[10px] text-green-400 font-display font-bold">+4.2%</span>
                   </div>
                </div>
                
                <div className="space-y-4">
                   <h4 className="text-[9px] font-display text-white/40 tracking-widest uppercase">INSURANCE CLAIMS ANALYTICS</h4>
                   <div className="flex gap-1 h-12">
                     {[3, 5, 2, 8, 4, 1, 9, 3, 5, 2, 7, 4].map((h, i) => (
                       <div key={i} className="flex-1 bg-electric-blue/20 rounded-sm overflow-hidden flex flex-col justify-end">
                         <div className="bg-electric-blue w-full" style={{ height: `${h * 10}%` }} />
                       </div>
                     ))}
                   </div>
                   <div className="flex justify-between text-[8px] text-white/20 font-display uppercase tracking-widest">
                     <span>Q1</span>
                     <span>Q2</span>
                     <span>PROJ. Q3</span>
                   </div>
                </div>
              </div>

              <button className="w-full mt-8 py-4 border border-white/10 rounded-xl text-[9px] font-display font-bold tracking-widest hover:bg-white hover:text-black transition-all">
                EXPORT LEDGER DATA
              </button>
            </div>

            <div className="glass p-8 rounded-[40px] border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-5 h-5 text-gold" />
                <h3 className="font-display text-sm tracking-widest uppercase">AI INSIGHTS</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border-l-2 border-gold font-display">
                  <p className="text-[10px] text-white/80 leading-relaxed uppercase tracking-widest">
                    "High demand surge for <b>EV-Luxury</b> segment in Middle Eastern markets. Recommend price adjustment of +4.2%."
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border-l-2 border-electric-blue font-display">
                  <p className="text-[10px] text-white/80 leading-relaxed uppercase tracking-widest">
                    "Auction predictive model suggests <b>Golden Aeon</b> will exceed reserve price by 15%."
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button className="h-32 bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors text-white/60">
                <Users className="w-5 h-5" />
                <span className="text-[8px] font-display tracking-widest uppercase text-white/40">USER MGMT</span>
              </button>
              <button className="h-32 bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors text-white/60">
                <Briefcase className="w-5 h-5" />
                <span className="text-[8px] font-display tracking-widest uppercase text-white/40">EMPLOYEES</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
