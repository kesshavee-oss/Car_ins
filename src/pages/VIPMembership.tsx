import { motion } from "motion/react";
import { Crown, Star, CheckCircle2, Globe, Key, ShieldCheck } from "lucide-react";

export default function VIPMembership() {
  const tiers = [
    {
      name: "TITAN",
      price: "$25,000 / year",
      desc: "For the established collector seeking standard ecosystem access.",
      features: [
        "Priority Vehicle Allocations",
        "Member-Only Digital Showroom",
        "Standard Concierge Liaison",
        "Exclusive Regional Events",
        "Digital Asset Authentication"
      ],
      color: "border-white/20",
      icon: Star
    },
    {
      name: "APOLLO",
      price: "$100,000 / year",
      desc: "Our most popular tier, offering significant global privileges.",
      features: [
        "Instant Hypercar Reservation",
        "Private Track-Day Access",
        "Global Vehicle Relocation",
        "24/7 Priority Concierge",
        "Annual VIP Gala Invitation",
        "Advanced Telematics Shield"
      ],
      color: "border-electric-blue",
      highlight: true,
      icon: Crown
    },
    {
      name: "ORACLE",
      price: "By Invitation Only",
      desc: "The inner circle. Complete ecosystem dominance.",
      features: [
        "Unlimited Custom Commissions",
        "Veto Power on Community Auctions",
        "Personal Global Security Liaison",
        "Private Island Event Access",
        "Shareholder Voting Rights",
        "Lifelong Support Protocol"
      ],
      color: "border-gold",
      icon: Key
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-32 max-w-3xl mx-auto">
          <div className="w-20 h-[1px] bg-gold mx-auto mb-10" />
          <h1 className="text-6xl font-black mb-10 tracking-tighter uppercase">THE INNER <br /> CIRCLE</h1>
          <p className="text-white/40 text-lg uppercase tracking-widest font-light leading-relaxed">
            Aura VIP membership is not merely a service; it is a declaration of status 
            and a passport to the otherwise inaccessible.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {tiers.map((tier, i) => (
            <motion.div 
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`glass-dark rounded-[40px] p-10 border-t-8 ${tier.color} flex flex-col hover:scale-[1.02] transition-transform`}
            >
              <div className="mb-10">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 ${tier.highlight ? 'shadow-[0_0_20px_#00E5FF33]' : ''}`}>
                  <tier.icon className={`w-6 h-6 ${tier.name === 'TITAN' ? 'text-white' : tier.name === 'APOLLO' ? 'text-electric-blue' : 'text-gold'}`} />
                </div>
                <h3 className="text-3xl font-bold mb-2">{tier.name}</h3>
                <p className="font-display text-xs text-white/40 mb-6">{tier.price}</p>
                <p className="text-[11px] text-white/60 leading-relaxed uppercase tracking-widest">{tier.desc}</p>
              </div>

              <div className="space-y-5 flex-1 mb-12">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex gap-4 items-center">
                    <CheckCircle2 className="w-4 h-4 text-white/20 shrink-0" />
                    <span className="text-[10px] uppercase tracking-widest text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 font-display text-[11px] font-bold tracking-[0.3em] transition-all ${
                tier.highlight ? 'bg-electric-blue text-black' : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black'
              }`}>
                {tier.name === 'ORACLE' ? 'INQUIRE PRIVATELY' : 'SELECT PLAN'}
              </button>
            </motion.div>
          ))}
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 uppercase">WHY JOIN AURA?</h2>
            <div className="space-y-12">
              {[
                { icon: Globe, title: "Global Presence", desc: "Our staff are stationed in every major financial capital to facilitate your needs instantly." },
                { icon: ShieldCheck, title: "Asset Security", desc: "We utilize multi-sig wallets for all high-value transactions and digital titles." },
                { icon: Key, title: "Exclusive Lock-ups", desc: "Access cars that are never listed on the public market—reserved for members only." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-xs mb-2 tracking-widest">{item.title}</h4>
                    <p className="text-white/40 text-[11px] uppercase tracking-wide leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="aspect-square glass rounded-full flex flex-col items-center justify-center p-12 text-center border-4 border-gold/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-6xl font-black mb-4 tracking-tighter">98.4%</h3>
                <p className="font-display text-[10px] tracking-widest uppercase text-white/40">Retention among Oracle Members</p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
